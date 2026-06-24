'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsPremium, useHasUsedTrial } from '@/lib/farmateca/store/auth-store';
import { getNLPEngine, type ChatMessage } from '@/lib/farmateca/chatbot/nlp-engine';

// ─── Default quick suggestions ────────────────────────────────────

const DEFAULT_SUGGESTIONS = [
  { label: '💊 Paracetamol', query: '¿Para qué sirve el paracetamol?' },
  { label: '🤕 Fiebre', query: '¿Qué tomo para la fiebre?' },
  { label: '🦠 Antibióticos', query: 'Buscar antibióticos' },
  { label: '❓ Ayuda', query: 'ayuda' },
];

// ─── Typing indicator ──────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 mb-4">
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, var(--color-farmateca-primary-dark), var(--color-farmateca-primary))' }}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        </svg>
      </div>
      <div className="bg-white dark:bg-farmateca-gray-800 border border-gray-100 dark:border-farmateca-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-farmateca-primary"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Rich text renderer — primera línea en negrita si ≤80 chars ───

function RichText({ text }: { text: string }) {
  const lines = text.split('\n');
  const firstLine = lines[0];
  const rest = lines.slice(1).join('\n');
  const isTitleLine = firstLine.length <= 80 && !firstLine.startsWith('•');

  if (!isTitleLine || lines.length === 1) {
    return <span className="whitespace-pre-line">{text}</span>;
  }

  return (
    <>
      <span className="font-semibold">{firstLine}</span>
      {rest && <span className="whitespace-pre-line">{'\n' + rest}</span>}
    </>
  );
}

// ─── Action chips under medication responses ───────────────────────

function ActionChips({ medicationName, onSend }: { medicationName: string; onSend: (q: string) => void }) {
  const chips = [
    { label: '🎯 Para qué sirve', query: `¿Para qué sirve el ${medicationName}?` },
    { label: '💊 Dosis', query: `Dosis del ${medicationName}` },
    { label: '⚠️ Efectos', query: `Efectos adversos del ${medicationName}` },
    { label: '🚫 Contraindicaciones', query: `Contraindicaciones del ${medicationName}` },
  ];

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {chips.map(chip => (
        <button
          key={chip.label}
          onClick={() => onSend(chip.query)}
          className="text-xs px-2.5 py-1 rounded-full border transition-colors"
          style={{
            borderColor: 'var(--color-farmateca-primary)',
            color: 'var(--color-farmateca-primary)',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-farmateca-primary)';
            (e.currentTarget as HTMLButtonElement).style.color = 'white';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-farmateca-primary)';
          }}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}

// ─── Suggestion chips (medicationList / suggestions types) ────────

function MedChips({ meds, onSend }: { meds: string[]; onSend: (q: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {meds.slice(0, 5).map(med => (
        <button
          key={med}
          onClick={() => onSend(`¿Para qué sirve el ${med}?`)}
          className="text-xs px-2.5 py-1 rounded-full border transition-colors flex items-center gap-1"
          style={{ borderColor: 'var(--color-farmateca-primary)', color: 'var(--color-farmateca-primary)', backgroundColor: 'transparent' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-farmateca-primary)';
            (e.currentTarget as HTMLButtonElement).style.color = 'white';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-farmateca-primary)';
          }}
        >
          💊 {med}
        </button>
      ))}
    </div>
  );
}

// ─── Message bubble ────────────────────────────────────────────────

function MessageBubble({ msg, onSend }: { msg: ChatMessage; onSend: (q: string) => void }) {
  const isUser = msg.isUser;
  const time = msg.timestamp.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex justify-end mb-4"
      >
        <div className="max-w-xs sm:max-w-md">
          <div
            className="px-4 py-3 rounded-2xl rounded-br-sm text-white text-sm leading-relaxed"
            style={{ background: 'linear-gradient(135deg, var(--color-farmateca-primary-dark), var(--color-farmateca-primary))' }}
          >
            {msg.text}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-right mt-1 px-1">{time}</p>
        </div>
      </motion.div>
    );
  }

  const medicationName = msg.metadata?.medicationName as string | undefined;
  const suggestedMeds = msg.metadata?.suggestedMeds as string[] | undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-3 mb-4"
    >
      {/* Bot avatar */}
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mb-5"
        style={{ background: 'linear-gradient(135deg, var(--color-farmateca-primary-dark), var(--color-farmateca-primary))' }}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        </svg>
      </div>
      <div className="max-w-xs sm:max-w-md">
        <div
          className={`px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed shadow-sm border
            ${msg.type === 'error'
              ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-700 dark:text-red-300'
              : msg.type === 'system'
              ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-100 dark:border-teal-800 text-teal-800 dark:text-teal-200'
              : 'bg-white dark:bg-farmateca-gray-800 border-gray-100 dark:border-farmateca-gray-700 text-gray-800 dark:text-gray-200'
            }`}
        >
          <RichText text={msg.text} />
        </div>

        {/* Chips de acción bajo respuestas de medicamento */}
        {msg.type === 'medicationDetail' && medicationName && !medicationName.includes(' vs ') && (
          <ActionChips medicationName={medicationName} onSend={onSend} />
        )}

        {/* Chips de medicamentos sugeridos bajo listas */}
        {(msg.type === 'medicationList' || msg.type === 'suggestions') && suggestedMeds && suggestedMeds.length > 0 && (
          <MedChips meds={suggestedMeds} onSend={onSend} />
        )}

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-1">{time}</p>
      </div>
    </motion.div>
  );
}

// ─── Paywall screen ────────────────────────────────────────────────

function PaywallScreen({ hasUsedTrial }: { hasUsedTrial: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 px-6 py-12 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: 'linear-gradient(135deg, var(--color-farmateca-primary-dark), var(--color-farmateca-primary))' }}
      >
        <svg className="w-10 h-10 text-farmateca-premium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Asistente Farmacológico
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
          El chatbot farmacológico es una función{' '}
          <span className="font-semibold text-farmateca-premium">Premium</span>.
          Actualiza tu plan para acceder a consultas ilimitadas.
        </p>
      </div>
      <div className="w-full max-w-xs space-y-3">
        <div className="bg-white dark:bg-farmateca-gray-800 rounded-xl p-4 border border-gray-100 dark:border-farmateca-gray-700 text-left space-y-2">
          {[
            '💊 Información de +200 compuestos',
            '📋 Posología y dosis detalladas',
            '⚠️ Efectos adversos y contraindicaciones',
            '🔬 Mecanismos de acción',
            '🏭 Marcas y laboratorios',
          ].map(f => (
            <p key={f} className="text-sm text-gray-700 dark:text-gray-300">{f}</p>
          ))}
        </div>
        <Link
          href="/farmateca/web/app/paywall"
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm text-white shadow-md hover:shadow-lg transition-all"
          style={{ background: 'linear-gradient(135deg, var(--color-farmateca-primary-dark), var(--color-farmateca-primary))' }}
        >
          <svg className="w-4 h-4 text-farmateca-premium" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          {hasUsedTrial ? 'Ver Planes Premium' : 'Prueba GRATIS 7 días'}
        </Link>
      </div>
    </div>
  );
}

// ─── Main chat UI ──────────────────────────────────────────────────

export default function ChatPage() {
  const isPremium = useIsPremium();
  const hasUsedTrial = useHasUsedTrial();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isPremium) return;
    const engine = getNLPEngine();
    setMessages([engine.getWelcomeMessage()]);
    engine.loadData().then(() => setEngineReady(true));
  }, [isPremium]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      text: text.trim(),
      isUser: true,
      type: 'text',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

    const engine = getNLPEngine();
    const response = await engine.processQuery(text.trim());
    setIsTyping(false);
    setMessages(prev => [...prev, response]);
  }, [isTyping]);

  // Sugerencias contextuales: basadas en el último medicamento encontrado
  const getContextualSuggestions = () => {
    const engine = getNLPEngine();
    const active = engine.activeMedication;
    if (active) {
      return engine.getSuggestionsForMedication(active).map((q, i) => ({
        label: ['🎯 Para qué sirve', '💊 Dosis', '⚠️ Efectos', '🚫 Contraindicaciones'][i] ?? q,
        query: q,
      }));
    }
    return DEFAULT_SUGGESTIONS;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleClear = () => {
    const engine = getNLPEngine();
    setMessages([engine.getWelcomeMessage()]);
  };

  const suggestions = getContextualSuggestions();

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-2xl mx-auto -mt-4">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-farmateca-gray-800 border border-gray-100 dark:border-farmateca-gray-700 rounded-2xl mb-4 shadow-sm">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--color-farmateca-primary-dark), var(--color-farmateca-primary))' }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-gray-900 dark:text-white text-sm">Asistente Farmateca</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isPremium
              ? (engineReady ? 'En línea' : 'Cargando base de datos...')
              : 'Función Premium'}
          </p>
        </div>
        {isPremium && (
          <button
            onClick={handleClear}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Limpiar chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Body */}
      {!isPremium ? (
        <PaywallScreen hasUsedTrial={hasUsedTrial} />
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0">
            <AnimatePresence>
              {messages.map(msg => (
                <MessageBubble key={msg.id} msg={msg} onSend={sendMessage} />
              ))}
            </AnimatePresence>
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick / contextual suggestions */}
          <div className="flex gap-2 overflow-x-auto py-2 px-1 scrollbar-hide">
            {suggestions.map(s => (
              <button
                key={s.label}
                onClick={() => sendMessage(s.query)}
                disabled={isTyping}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors disabled:opacity-40"
                style={{
                  borderColor: 'var(--color-farmateca-primary)',
                  color: 'var(--color-farmateca-primary)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-farmateca-primary)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'white';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-farmateca-primary)';
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 pt-2 border-t border-gray-100 dark:border-farmateca-gray-700 mt-2"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu consulta farmacológica..."
              rows={1}
              className="flex-1 resize-none rounded-2xl border border-gray-200 dark:border-farmateca-gray-600 bg-white dark:bg-farmateca-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all max-h-28"
              style={{ minHeight: '46px' }}
              onInput={e => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = Math.min(el.scrollHeight, 112) + 'px';
              }}
            />
            <motion.button
              type="submit"
              disabled={!input.trim() || isTyping}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all"
              style={{ background: 'linear-gradient(135deg, var(--color-farmateca-primary-dark), var(--color-farmateca-primary))' }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.button>
          </form>
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 py-2">
            ⚠️ Información orientativa. Consulta siempre con un profesional de salud.
          </p>
        </>
      )}
    </div>
  );
}
