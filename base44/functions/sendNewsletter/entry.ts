import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const { campaignId } = await req.json();

  // Buscar campanha
  const campaigns = await base44.asServiceRole.entities.NewsletterCampaign.filter({ id: campaignId });
  const campaign = campaigns[0];
  if (!campaign) {
    return Response.json({ error: 'Campanha não encontrada' }, { status: 404 });
  }

  // Buscar todos os inscritos
  const subscribers = await base44.asServiceRole.entities.NewsletterSubscriber.list();
  if (!subscribers || subscribers.length === 0) {
    return Response.json({ error: 'Nenhum inscrito encontrado' }, { status: 400 });
  }

  // Montar HTML do email
  const imageBlock = campaign.image_url
    ? `<div style="text-align:center;margin:32px 0;">
        <img src="${campaign.image_url}" alt="Pequena Duquesa" style="max-width:100%;border-radius:16px;" />
       </div>`
    : '';

  const emailBody = `
    <div style="background:#FFFAF0;font-family:'Georgia',serif;max-width:600px;margin:0 auto;padding:40px 32px;">
      <div style="text-align:center;margin-bottom:32px;">
        <h1 style="font-family:'Georgia',serif;font-style:italic;font-weight:400;font-size:2rem;color:#7A5A5A;letter-spacing:0.05em;">
          Pequena Duquesa
        </h1>
        <div style="width:60px;height:1px;background:#D4A5A5;margin:12px auto;"></div>
      </div>

      ${imageBlock}

      <div style="color:#6B5252;font-size:1rem;line-height:1.8;margin-bottom:32px;white-space:pre-line;">
        ${campaign.message}
      </div>

      <div style="text-align:center;margin:32px 0;">
        <a href="https://app.base44.com/apps/pequenaduquesa/Products"
           style="background:#D4A5A5;color:white;text-decoration:none;padding:14px 36px;border-radius:50px;font-family:'Arial',sans-serif;font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;">
          Ver Coleção
        </a>
      </div>

      <div style="border-top:1px solid rgba(212,165,165,0.2);margin-top:40px;padding-top:20px;text-align:center;">
        <p style="font-size:0.7rem;color:#A17C7C;font-family:'Arial',sans-serif;letter-spacing:0.1em;">
          © 2026 Pequena Duquesa · Recife, Brasil
        </p>
      </div>
    </div>
  `;

  // Enviar para cada inscrito
  let sent = 0;
  for (const subscriber of subscribers) {
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: subscriber.email,
      subject: campaign.subject,
      body: emailBody,
      from_name: 'Pequena Duquesa',
    });
    sent++;
  }

  // Atualizar campanha como enviada
  await base44.asServiceRole.entities.NewsletterCampaign.update(campaignId, {
    status: 'enviado',
    sent_at: new Date().toISOString(),
    recipients_count: sent,
  });

  return Response.json({ success: true, sent });
});