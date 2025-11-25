import React from 'react';
import { Page, AuthModalView, Language } from '../types';
import { translations } from '../lib/translations';

interface JoinProPageProps {
  setCurrentPage: (page: Page) => void;
  lang: Language;
  openAuthModal: (view: AuthModalView, redirectPage: Page) => void;
}

const JoinProPage: React.FC<JoinProPageProps> = ({ setCurrentPage, lang, openAuthModal }) => {
  const t = translations[lang].joinProPage;
  
  return (
    <div className="bg-zinc-50">
      <div className="container mx-auto px-6 py-20 flex items-center justify-center min-h-[calc(100vh-250px)]">
        <div className="max-w-xl w-full mx-auto bg-white p-10 border border-zinc-200 text-center">
            <h1 className={`text-5xl font-bold text-zinc-900 ${lang === 'en' ? 'font-en-serif': ''}`}>{t.form.createAccount}</h1>
            <p className="text-zinc-600 my-6 text-lg">{t.subtitle}</p>
            <button 
              onClick={() => openAuthModal('signup', 'join-pro-success')}
              className="w-full bg-black text-white font-bold py-4 px-6 hover:bg-zinc-800 transition-colors text-2xl">
              {t.form.createButton}
            </button>
             <p className="text-center text-xs text-zinc-500 mt-4">{t.form.agreeTo} <a href="#" className="underline hover:text-black">{t.form.terms}</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default JoinProPage;