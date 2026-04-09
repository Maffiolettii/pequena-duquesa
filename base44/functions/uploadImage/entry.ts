import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();

  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const { image_base64 } = await req.json();

  if (!image_base64) {
    return Response.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
  }

  const apiKey = Deno.env.get('IMGBB_API_KEY');

  const body = new URLSearchParams();
  body.append('key', apiKey);
  body.append('image', image_base64);

  const response = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body,
  });

  const data = await response.json();

  if (!data.success) {
    return Response.json({ error: 'Falha no upload', details: data }, { status: 500 });
  }

  return Response.json({ file_url: data.data.url });
});