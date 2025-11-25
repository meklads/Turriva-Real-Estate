import React, { useState, useEffect } from 'react';
import { XIcon, SparklesIcon } from './Icons';
import { Language } from '../types';
import { translations } from '../lib/translations';

interface EmailCaptureModalProps {
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
  lang: Language;
}

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ onClose, onSubmit, lang }) => {
  const t = translations[lang].emailCaptureModal;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-zinc-200 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fade-in-scale 0.3s forwards' }}
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-zinc-500 hover:text-black transition-colors">
            <XIcon />
          </button>
        </div>
        
        <div className="px-8 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <SparklesIcon className="w-12 h-12 text-gold"/>
          </div>
          <h2 className={`text-3xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>
            {t.title}
          </h2>
          <p className="text-zinc-600 mt-2 mb-6">{t.subtitle}</p>
        
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="capture-name" className="sr-only">{t.nameLabel}</label>
              <input type="text" id="capture-name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-zinc-100 border-zinc-300 py-3 px-4 text-zinc-900 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" placeholder={t.nameLabel} />
            </div>
            <div>
              <label htmlFor="capture-email" className="sr-only">{t.emailLabel}</label>
              <input type="email" id="capture-email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-zinc-100 border-zinc-300 py-3 px-4 text-zinc-900 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" placeholder={t.emailLabel}/>
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full bg-black text-white font-bold py-3 px-6 hover:bg-zinc-800 transition-colors text-lg">
                {t.button}
              </button>
            </div>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
            animation: fade-in-scale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EmailCaptureModal;