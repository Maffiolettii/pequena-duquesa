import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { productId } = await req.json();

  const products = await base44.asServiceRole.entities.Product.filter({ id: productId });
  const product = products[0];
  if (!product) return Response.json({ error: 'Not found' }, { status: 404 });

  const prompt = `Você é especialista em moda infantil artesanal brasileira de luxo.
Analise esta imagem de produto da boutique "Pequena Duquesa" e descreva com precisão e elegância o que está na foto.

Nome atual: "${product.name}"

REGRAS IMPORTANTES:
- Descreva APENAS as ROUPAS (vestido, blusa, shorts, calcinha, conjunto)
- Mencione: cor do tecido, tipo de peça, bordados, rendas, gola, mangas, barra
- NÃO mencione: cestos, flores decorativas de cenário, ursinhos de pelúcia, chapéus de palha, sapatos, superfícies
- Linguagem poética e sofisticada para boutique de luxo infantil
- Máximo 4 frases

Retorne APENAS a descrição, sem explicações.`;

  const description = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    file_urls: [product.image_url],
    model: 'claude_sonnet_4_6'
  });

  return Response.json({ id: product.id, name: product.name, description });
});