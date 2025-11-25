import React from 'react';
import { Page, AuthModalView, Language } from '../types';
import { LockIcon } from '../components/Icons';
import { translations } from '../lib/translations';

interface UpgradePromptPageProps {
  setCurrentPage: (page: Page) => void;
  lang: Language;
  isAuth: boolean;
  openAuthModal: (view: AuthModalView) => void;
}

const UpgradePromptPage: React.FC<UpgradePromptPageProps> = ({ setCurrentPage, lang, isAuth, openAuthModal }) => {
  const t = translations[lang].upgradePromptPage;
  return (
    <div className="container mx-auto px-6 py-24 flex items-center justify-center min-h-[calc(100vh-72px)]">
      <div className="text-center max-w-2xl bg-white p-12 border border-zinc-200">
        <div className="flex justify-center mb-6">
            <LockIcon className="w-16 h-16 text-gold" />
        </div>
        <h1 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
        <p className="text-lg text-zinc-600 mt-4 mb-8">
          {isAuth ? t.subtitleAuth : t.subtitle}
        </p>
        {isAuth ? (
            <button
            onClick={() => setCurrentPage('upgrade')}
            className="bg-gold text-white font-bold py-3 px-8 text-lg hover:bg-gold-dark transition-colors"
            >
            {t.buttonText}
            </button>
        ) : (
            <button
            onClick={() => openAuthModal('login')}
            className="bg-black text-white font-bold py-3 px-8 text-lg hover:bg-zinc-800 transition-colors"
            >
            {t.loginButtonText}
            </button>
        )}

      </div>
    </div>
  );
};

export default UpgradePromptPage;