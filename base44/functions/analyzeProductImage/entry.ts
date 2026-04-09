import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  // Support both direct calls and automation payload
  const body = await req.json().catch(() => ({}));
  const productId = body.product_id || body?.data?.id || body?.event?.entity_id;

  if (!productId) {
    return Response.json({ error: 'product_id é obrigatório' }, { status: 400 });
  }

  // Fetch the product
  const products = await base44.asServiceRole.entities.Product.filter({ id: productId });
  const product = products[0];

  if (!product) {
    return Response.json({ error: 'Produto não encontrado' }, { status: 404 });
  }

  if (!product.image_url) {
    return Response.json({ error: 'Produto sem imagem principal' }, { status: 400 });
  }

  // Mark as analyzing
  await base44.asServiceRole.entities.Product.update(productId, {
    description_validation_status: 'analyzing',
  });

  const prompt = `Você é um especialista em moda infantil de luxo para a marca "Pequena Duquesa".

Analise a imagem deste produto e realize duas tarefas:

1. **Validação**: Compare a imagem com a descrição atual abaixo. Verifique se há inconsistências (cores, detalhes, bordados, estampas, etc.).
   Descrição atual: "${product.description || 'Sem descrição'}"

2. **Sugestão**: Gere uma descrição detalhada, elegante e apaixonante para este produto, com base SOMENTE no que você vê na imagem. A descrição deve ter tom sofisticado, feminino e encantador, adequado para uma boutique de roupas de bebê de luxo.

Retorne um JSON com:
- "is_consistent": boolean (true se a descrição atual corresponde à imagem, false se houver inconsistências)
- "inconsistency_details": string (descreva as inconsistências encontradas, ou "Descrição consistente com a imagem" se não houver)
- "suggested_description": string (a descrição nova sugerida, com 2-3 frases elegantes)`;

  const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    file_urls: [product.image_url],
    response_json_schema: {
      type: 'object',
      properties: {
        is_consistent: { type: 'boolean' },
        inconsistency_details: { type: 'string' },
        suggested_description: { type: 'string' },
      },
    },
  });

  const status = result.is_consistent ? 'ok' : 'inconsistent';

  await base44.asServiceRole.entities.Product.update(productId, {
    description_validation_status: status,
    inconsistency_details: result.inconsistency_details,
    suggested_description: result.suggested_description,
  });

  return Response.json({
    success: true,
    product_id: productId,
    status,
    inconsistency_details: result.inconsistency_details,
    suggested_description: result.suggested_description,
  });
});