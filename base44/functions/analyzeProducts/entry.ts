import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const products = await base44.asServiceRole.entities.Product.list();
  const results = [];

  for (const product of products) {
    if (!product.image_url) continue;

    const prompt = `Você é um especialista em moda infantil artesanal brasileira de luxo. 
Analise esta imagem de produto da loja "Pequena Duquesa" e gere uma descrição precisa e poética do que REALMENTE aparece na foto.

Nome atual do produto: "${product.name}"
Descrição atual: "${product.description}"

Instruções:
1. Descreva APENAS o que está claramente visível na imagem (cor, tecido, tipo de peça, bordados, rendas, detalhes)
2. NÃO mencione acessórios de cenário (cestos, flores decorativas, ursinhos, chapéus de palha) — apenas a ROUPA
3. Use linguagem poética e sofisticada, adequada para uma boutique de luxo infantil
4. Se a descrição atual está correta, retorne ela melhorada. Se estiver incorreta, corrija-a.
5. Máximo de 4 frases elegantes.

Retorne APENAS a nova descrição, sem explicações adicionais.`;

    const newDescription = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      file_urls: [product.image_url],
      model: 'claude_sonnet_4_6'
    });

    results.push({
      id: product.id,
      name: product.name,
      old_description: product.description,
      new_description: newDescription
    });
  }

  return Response.json({ results });
});