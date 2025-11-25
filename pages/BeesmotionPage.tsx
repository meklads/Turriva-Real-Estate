import React from 'react';
import { Language } from '../types';
import { translations } from '../lib/translations';
import { SearchIcon, ChatBubbleLeftRightIcon, CashIcon, DocumentCheckIcon } from '../components/Icons';

interface BeesmotionPageProps {
  lang: Language;
}

const BeesmotionPage: React.FC<BeesmotionPageProps> = ({ lang }) => {
  const t = translations[lang].beesmotionPage;

  const services = [
    { icon: <SearchIcon className="w-10 h-10 text-gold" strokeWidth={1.5} />, title: t.service1Title, desc: t.service1Desc },
    { icon: <ChatBubbleLeftRightIcon className="w-10 h-10 text-gold" />, title: t.service2Title, desc: t.service2Desc },
    { icon: <CashIcon className="w-10 h-10 text-gold" />, title: t.service3Title, desc: t.service3Desc },
    { icon: <DocumentCheckIcon className="w-10 h-10 text-gold" />, title: t.service4Title, desc: t.service4Desc },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/6476587/pexels-photo-6476587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 px-6">
          <h1 className={`text-5xl md:text-7xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.heroTitle}</h1>
          <p className="text-xl md:text-2xl mt-4 max-w-4xl mx-auto">{t.heroSubtitle}</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.servicesTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mr-6 rtl:ml-6">{service.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">{service.title}</h3>
                  <p className="text-zinc-600">{service.desc}</p>
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
          <a
            href="http://beesmotion.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-white font-bold py-4 px-10 text-lg hover:bg-gold-dark transition-colors"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>
    </div>
  );
};

export default BeesmotionPage;