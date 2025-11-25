
import React from 'react';
import { Page, Language } from '../types';
import { translations } from '../lib/translations';
import { BadgeCheckIcon } from '../components/Icons';

interface JoinProSuccessPageProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
}

const NextStepCard: React.FC<{
    step: string;
    title: string;
    desc: string;
    onClick: () => void;
}> = ({ step, title, desc, onClick }) => (
    <div onClick={onClick} className="bg-white border border-zinc-200 p-6 text-center group hover:border-gold hover:shadow-lg transition-all duration-300 cursor-pointer">
        <div className="w-12 h-12 bg-gold/10 text-gold font-bold text-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
            {step}
        </div>
        <h3 className="text-2xl font-bold text-black mb-2">{title}</h3>
        <p className="text-zinc-600">{desc}</p>
    </div>
);

const JoinProSuccessPage: React.FC<JoinProSuccessPageProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang].joinProSuccessPage;

  return (
    <div className="bg-zinc-50 min-h-[calc(100vh-250px)] py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
                <BadgeCheckIcon className="w-20 h-20 text-gold" />
            </div>
            <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
            <p className="text-xl text-zinc-600 mt-4">{t.subtitle}</p>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto">
             <h2 className="text-3xl font-bold text-center text-zinc-800 mb-8">{t.nextSteps}</h2>
             <div className="grid md:grid-cols-3 gap-8">
                <NextStepCard step="1" title={t.step1} desc={t.step1Desc} onClick={() => setCurrentPage('hub')} />
                <NextStepCard step="2" title={t.step2} desc={t.step2Desc} onClick={() => setCurrentPage('hub')} />
                <NextStepCard step="3" title={t.step3} desc={t.step3Desc} onClick={() => setCurrentPage('directory')} />
             </div>
        </div>

        <div className="text-center mt-16">
            <button 
                onClick={() => setCurrentPage('hub')}
                className="bg-black text-white font-bold py-4 px-10 text-lg hover:bg-zinc-800 transition-colors"
            >
                {t.goToHub} &rarr;
            </button>
        </div>

      </div>
    </div>
  );
};

export default JoinProSuccessPage;
