import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Send, ImagePlus, Loader2, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AgentProductChat() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function init() {
    setLoading(true);
    const conv = await base44.agents.createConversation({
      agent_name: 'product_manager',
      metadata: { name: 'Cadastro de Produtos via IA' },
    });
    setConversation(conv);

    const unsub = base44.agents.subscribeToConversation(conv.id, (data) => {
      setMessages(data.messages || []);
    });

    setLoading(false);
    return () => unsub();
  }

  function handleFileChange(e) {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
    const previews = selected.map(f => URL.createObjectURL(f));
    setFilePreviews(prev => [...prev, ...previews]);
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSend() {
    if ((!input.trim() && files.length === 0) || !conversation || sending) return;
    setSending(true);

    let uploadedUrls = [];
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      uploadedUrls.push(file_url);
    }

    const messageContent = input.trim() || (uploadedUrls.length > 0
      ? `Analise estas ${uploadedUrls.length} imagem(ns) de produto(s). Identifique cada vestido/conjunto, agrupe as fotos de detalhe corretamente e cadastre cada produto com nome, descrição e categoria adequados.`
      : '');

    setFiles([]);
    setFilePreviews([]);
    setInput('');

    await base44.agents.addMessage(conversation, {
      role: 'user',
      content: messageContent,
      file_urls: uploadedUrls,
    });

    setSending(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={20} className="animate-spin" style={{ color: '#A17C7C' }} />
      </div>
    );
  }

  const visibleMessages = messages.filter(m => m.role === 'user' || m.role === 'assistant');

  return (
    <div className="flex flex-col h-[70vh] rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(161,124,124,0.2)', backgroundColor: 'white' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: 'rgba(161,124,124,0.15)', backgroundColor: '#FBFAF5' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4A5A5' }}>
          <Sparkles size={14} color="white" />
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', color: '#7A5A5A', fontWeight: 500 }}>
            Assistente de Catálogo
          </p>
          <p className="text-[10px]" style={{ fontFamily: 'Montserrat, sans-serif', color: '#A17C7C', fontWeight: 300 }}>
            Envie fotos dos produtos para cadastrá-los automaticamente
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {visibleMessages.length === 0 && (
          <div className="text-center py-12">
            <ImagePlus size={40} className="mx-auto mb-4 opacity-20" style={{ color: '#D4A5A5' }} />
            <p className="text-sm" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#A17C7C' }}>
              Envie as fotos dos vestidos e conjuntos para começar
            </p>
            <p className="text-[10px] mt-2 tracking-[0.1em]" style={{ fontFamily: 'Montserrat, sans-serif', color: '#C4A4A4', fontWeight: 300 }}>
              Pode enviar várias fotos de uma vez — o agente identificará e agrupará automaticamente
            </p>
          </div>
        )}

        {visibleMessages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-1" style={{ backgroundColor: '#D4A5A5' }}>
                <Bot size={12} color="white" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
              style={{
                backgroundColor: msg.role === 'user' ? '#D4A5A5' : '#F8F0F0',
                color: msg.role === 'user' ? 'white' : '#4A3A3A',
              }}>
              {msg.file_urls?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {msg.file_urls.map((url, j) => (
                    <img key={j} src={url} alt="" className="w-16 h-16 object-cover rounded-lg" />
                  ))}
                </div>
              )}
              {msg.content && (
                <div className="text-sm leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              )}
              {/* Tool calls in progress */}
              {msg.tool_calls?.filter(tc => tc.status === 'running' || tc.status === 'in_progress').map((tc, j) => (
                <div key={j} className="flex items-center gap-2 mt-2 text-[10px] opacity-70" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <Loader2 size={10} className="animate-spin" />
                  Cadastrando produto...
                </div>
              ))}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-1" style={{ backgroundColor: '#6B5252' }}>
                <User size={12} color="white" />
              </div>
            )}
          </div>
        ))}

        {sending && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#D4A5A5' }}>
              <Bot size={12} color="white" />
            </div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3" style={{ backgroundColor: '#F8F0F0' }}>
              <Loader2 size={14} className="animate-spin" style={{ color: '#A17C7C' }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* File previews */}
      {filePreviews.length > 0 && (
        <div className="flex gap-2 px-6 py-3 border-t overflow-x-auto" style={{ borderColor: 'rgba(161,124,124,0.15)', backgroundColor: '#FBFAF5' }}>
          {filePreviews.map((src, i) => (
            <div key={i} className="relative flex-shrink-0">
              <img src={src} alt="" className="w-14 h-14 object-cover rounded-lg" />
              <button onClick={() => removeFile(i)}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center"
                style={{ backgroundColor: '#6B5252' }}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-4 border-t flex items-end gap-3" style={{ borderColor: 'rgba(161,124,124,0.15)', backgroundColor: '#FBFAF5' }}>
        <button onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-70"
          style={{ backgroundColor: '#F0E4E4' }}>
          <ImagePlus size={16} style={{ color: '#A17C7C' }} />
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />

        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Envie fotos ou escreva uma instrução..."
          rows={1}
          className="flex-1 resize-none bg-white rounded-2xl px-4 py-3 text-sm outline-none border"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            color: '#4A3A3A',
            borderColor: 'rgba(161,124,124,0.2)',
            maxHeight: 100,
          }}
        />

        <button
          onClick={handleSend}
          disabled={(!input.trim() && files.length === 0) || sending}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-40"
          style={{ backgroundColor: '#D4A5A5' }}>
          <Send size={14} color="white" />
        </button>
      </div>
    </div>
  );
}