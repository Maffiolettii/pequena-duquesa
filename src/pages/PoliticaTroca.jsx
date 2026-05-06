import React from 'react';
import { motion } from 'framer-motion';
import NewsletterFooter from '../components/store/NewsletterFooter';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2
      className="text-xl mb-4"
      style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontStyle: 'italic', color: '#2A1A1A' }}
    >
      {title}
    </h2>
    <div
      className="space-y-3 text-sm leading-relaxed"
      style={{ fontFamily: 'Montserrat, sans-serif', color: '#2A1A1A', fontWeight: 400, letterSpacing: '0.03em' }}
    >
      {children}
    </div>
  </div>
);

export default function PoliticaTroca() {
  return (
    <div>
      {/* Header */}
      <div className="pt-14 sm:pt-16 pb-10 px-6 text-center" style={{ backgroundColor: '#F4E2E2' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B4F4F', fontWeight: 500 }}>
            Informações
          </p>
          <h1 className="text-4xl sm:text-5xl"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: '#2A1A1A' }}>
            Política de Troca e Devolução
          </h1>
        </motion.div>
      </div>

      {/* Content */}
      <div className="py-16 px-6" style={{ backgroundColor: '#FBFAF5' }}>
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>

            <p className="text-sm leading-relaxed mb-12"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#2A1A1A', fontWeight: 400, letterSpacing: '0.03em' }}>
              Nosso compromisso é assegurar a plena satisfação de cada cliente Pequena Duquesa. Nossa política tem como base o Código de Defesa do Consumidor. Para evitar contratempos, recomendamos a leitura atenta das descrições e tabelas de medidas de cada produto.
            </p>

            <div style={{ borderTop: '0.5px solid rgba(161,124,124,0.2)', paddingTop: '2.5rem' }}>
              <Section title="Troca por Defeito de Fabricação">
                <p><span style={{ color: '#6B4F4F', fontWeight: 500 }}>Prazo:</span> 7 (sete) dias corridos a partir da data de recebimento do produto.</p>
                <p>Entre em contato pelo nosso WhatsApp informando:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Número do pedido</li>
                  <li>Nome do comprador</li>
                  <li>Fotos do defeito identificado</li>
                </ul>
                <p>O envio da peça para troca deve ser feito pelos Correios via PAC. Fretes por Sedex a cobrar não serão recebidos.</p>
                <p>Produtos devolvidos devem estar em estado original, sem danos ou alterações, acompanhados de nota fiscal, etiquetas e embalagem original.</p>
                <p>A mercadoria será analisada e em até 30 (trinta) dias será apresentada a solução ao cliente. Confirmado o defeito de fabricação, o reenvio não terá custo algum para o cliente.</p>
                <p style={{ color: '#7A4F4F', fontStyle: 'italic', fontWeight: 500 }}>
                  Atenção: O frete de retorno será reembolsado somente nos casos de troca por defeito comprovado de fabricação.
                </p>
              </Section>

              <div style={{ borderTop: '0.5px solid rgba(161,124,124,0.2)', paddingTop: '2.5rem' }}>
                <Section title="Troca por Insatisfação ou Desistência">
                  <p><span style={{ color: '#6B4F4F', fontWeight: 500 }}>Prazo:</span> 7 (sete) dias corridos a partir da data de recebimento do produto.</p>
                  <p>A mercadoria deve ser enviada em sua embalagem original, em perfeito estado e acompanhada da nota fiscal. Qualquer indício de uso indevido isenta a Pequena Duquesa de aceitar a solicitação.</p>
                  <p>Caso o produto desejado para troca não esteja disponível em estoque, oferecemos um vale-troca no valor da peça para uso em nova compra.</p>
                  <p style={{ color: '#7A4F4F', fontStyle: 'italic', fontWeight: 500 }}>
                    O frete de envio para troca por insatisfação é de responsabilidade do cliente.
                  </p>
                </Section>
              </div>

              <div style={{ borderTop: '0.5px solid rgba(161,124,124,0.2)', paddingTop: '2.5rem' }}>
                <Section title="Restituição de Valores">
                  <p>A restituição de valores será realizada <span style={{ color: '#6B4F4F', fontWeight: 500 }}>exclusivamente em casos de defeito de fabricação</span>, mediante análise da peça.</p>
                  <p>Não realizamos devoluções ou reembolsos por motivos de arrependimento, escolha incorreta de tamanho, modelo ou preferência pessoal.</p>
                  <p>O reembolso será feito na conta bancária do titular do pedido, em até 30 dias após confirmação do defeito.</p>
                  <p style={{ color: '#7A4F4F', fontStyle: 'italic', fontWeight: 500 }}>
                    Não serão efetuados ressarcimentos em contas de terceiros.
                  </p>
                </Section>
              </div>

              <div style={{ borderTop: '0.5px solid rgba(161,124,124,0.2)', paddingTop: '2.5rem' }}>
                <Section title="Precauções Importantes">
                  <ul className="list-disc list-inside space-y-2 pl-2">
                    <li>Confira sua mercadoria no ato da entrega.</li>
                    <li>Recuse produtos com embalagens abertas ou avariadas.</li>
                    <li>Todo cancelamento com devolução de valores deve ser solicitado via WhatsApp.</li>
                    <li>Nossas peças são produzidas artesanalmente e podem apresentar pequenas variações no comprimento e busto — isso é parte da beleza do trabalho manual.</li>
                  </ul>
                </Section>
              </div>
            </div>

            {/* CTA WhatsApp */}
            <div className="mt-12 text-center py-10 px-6 rounded-[20px]" style={{ backgroundColor: '#F4E2E2' }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B4F4F', fontWeight: 500 }}>
                Dúvidas?
              </p>
              <p className="mb-6 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.2rem', color: '#2A1A1A' }}>
                Estamos aqui para ajudar
              </p>
              <a
                href="https://wa.me/5581992656652"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-3 px-10 text-xs tracking-[0.2em] uppercase rounded-full text-white transition-all duration-300"
                style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: '#A17C7C', letterSpacing: '0.15em' }}
              >
                Falar pelo WhatsApp
              </a>
            </div>

          </motion.div>
        </div>
      </div>

      <NewsletterFooter />
    </div>
  );
}