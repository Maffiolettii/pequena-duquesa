import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();

  if (user?.role !== 'admin') {
    return Response.json({ error: 'Acesso negado. Apenas admins.' }, { status: 403 });
  }

  const products = await base44.asServiceRole.entities.Product.list();

  // --- 1. Remover duplicatas por image_url (manter o mais recente) ---
  const byImage = {};
  for (const p of products) {
    if (!p.image_url) continue;
    if (!byImage[p.image_url]) {
      byImage[p.image_url] = [];
    }
    byImage[p.image_url].push(p);
  }

  const deletedIds = [];
  for (const [imageUrl, group] of Object.entries(byImage)) {
    if (group.length <= 1) continue;
    // Ordenar do mais recente para o mais antigo
    group.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    // Manter o primeiro (mais recente), excluir os demais
    const toDelete = group.slice(1);
    for (const p of toDelete) {
      await base44.asServiceRole.entities.Product.delete(p.id);
      deletedIds.push({ id: p.id, name: p.name });
    }
  }

  // --- 2. Corrigir tamanhos antigos para formato "baby" ---
  const SIZE_MAP = { 'P': 'P baby', 'M': 'M baby', 'G': 'G baby' };
  const remainingProducts = await base44.asServiceRole.entities.Product.list();
  const updatedIds = [];

  for (const p of remainingProducts) {
    if (!p.sizes || p.sizes.length === 0) continue;
    const newSizes = p.sizes.map(s => SIZE_MAP[s] || s);
    const changed = newSizes.some((s, i) => s !== p.sizes[i]);
    if (changed) {
      await base44.asServiceRole.entities.Product.update(p.id, { sizes: newSizes });
      updatedIds.push({ id: p.id, name: p.name, oldSizes: p.sizes, newSizes });
    }
  }

  return Response.json({
    success: true,
    deletedDuplicates: deletedIds,
    updatedSizes: updatedIds,
    summary: `${deletedIds.length} duplicata(s) removida(s), ${updatedIds.length} produto(s) com tamanhos corrigidos.`
  });
});