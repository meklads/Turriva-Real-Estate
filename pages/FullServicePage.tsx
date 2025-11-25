import React from 'react';
import { Page, Language } from '../types';
import { translations } from '../lib/translations';
import { ConsultationIcon, DesignIcon, PermitIcon, ConstructionIcon, KeyIcon } from '../components/Icons';

interface FullServicePageProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
}

const FullServicePage: React.FC<FullServicePageProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang].fullServicePage;

  const steps = [
    { icon: <ConsultationIcon className="w-8 h-8" />, title: t.step1Title, desc: t.step1Desc },
    { icon: <DesignIcon className="w-8 h-8" />, title: t.step2Title, desc: t.step2Desc },
    { icon: <PermitIcon className="w-8 h-8" />, title: t.step3Title, desc: t.step3Desc },
    { icon: <ConstructionIcon className="w-8 h-8" />, title: t.step4Title, desc: t.step4Desc },
    { icon: <KeyIcon className="w-8 h-8" />, title: t.step5Title, desc: t.step5Desc },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-6">
          <h1 className={`text-5xl md:text-7xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.title}</h1>
          <p className="text-xl md:text-2xl mt-4 max-w-4xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.processTitle}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-gold text-white flex items-center justify-center mr-6 rtl:ml-6">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">{step.title}</h3>
                  <p className="text-zinc-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.ctaTitle}</h2>
          <p className="text-lg mt-4 mb-8 max-w-2xl mx-auto">{t.ctaSubtitle}</p>
          <button className="bg-gold text-white font-bold py-4 px-10 text-lg hover:bg-gold-dark transition-colors">
            {t.ctaButton}
          </button>
        </div>
      </section>
    </div>
  );
};

export default FullServicePage;