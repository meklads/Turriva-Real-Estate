

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../lib/translations';
import { LayoutIcon, UsersIcon, ConsultationIcon, HandshakeIcon, BadgeCheckIcon, ChevronDownIcon, ChartBarIcon } from '../components/Icons';

interface ListLandLandingPageProps {
  lang: Language;
}

const FAQItem: React.FC<{ q: string; a: string; lang: Language }> = ({ q, a, lang }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-zinc-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-5"
            >
                <span className="text-lg font-semibold text-zinc-800">{q}</span>
                <ChevronDownIcon className={`w-6 h-6 text-zinc-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                 <p className="text-zinc-600 pb-5 pr-4 rtl:pl-4">{a}</p>
            </div>
        </div>
    );
};


const ListLandLandingPage: React.FC<ListLandLandingPageProps> = ({ lang }) => {
  const t = translations[lang].listLandLandingPage;
  
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const steps = [
    { icon: <LayoutIcon className="text-gold" />, title: t.step1Title, desc: t.step1Desc },
    { icon: <UsersIcon className="text-gold" />, title: t.step2Title, desc: t.step2Desc },
    { icon: <ConsultationIcon className="text-gold" />, title: t.step3Title, desc: t.step3Desc },
    { icon: <HandshakeIcon className="text-gold" />, title: t.step4Title, desc: t.step4Desc },
  ];

  const benefits = [
    { icon: <UsersIcon className="w-12 h-12 text-gold" />, title: t.benefit1Title, desc: t.benefit1Desc },
    { icon: <ChartBarIcon className="w-12 h-12 text-gold" />, title: t.benefit2Title, desc: t.benefit2Desc },
    { icon: <BadgeCheckIcon className="w-12 h-12 text-gold" />, title: t.benefit3Title, desc: t.benefit3Desc },
  ];

  const faqs = [
      { q: t.faq1Question, a: t.faq1Answer },
      { q: t.faq2Question, a: t.faq2Answer },
      { q: t.faq3Question, a: t.faq3Answer },
      { q: t.faq4Question, a: t.faq4Answer },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl text-white">
             <h1 className={`text-5xl md:text-7xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.heroTitle}</h1>
             <p className="text-xl md:text-2xl mt-4">{t.heroSubtitle}</p>
             <button onClick={scrollToForm} className="mt-8 bg-gold text-white font-bold py-4 px-10 text-lg hover:bg-gold-dark transition-colors">
              {t.heroButton}
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black mb-16`}>{t.howItWorksTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white border-2 border-gold flex items-center justify-center mb-5">{step.icon}</div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-zinc-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.whyUsTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-zinc-50 p-8">
                 {benefit.icon}
                 <h3 className="text-2xl font-bold text-zinc-900 my-4">{benefit.title}</h3>
                 <p className="text-zinc-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-zinc-900 text-white">
         <div className="container mx-auto px-6 text-center">
           <h2 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold mb-12`}>{t.testimonialsTitle}</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <p className="text-2xl text-zinc-300 italic mb-4">"{t.testimonial1}"</p>
                <p className="font-bold text-gold">{t.testimonial1Author}</p>
              </div>
               <div>
                <p className="text-2xl text-zinc-300 italic mb-4">"{t.testimonial2}"</p>
                <p className="font-bold text-gold">{t.testimonial2Author}</p>
              </div>
            </div>
         </div>
      </section>
      
      {/* Form Section */}
      <section id="contact-form" className="py-20 bg-zinc-50">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.formTitle}</h2>
            <p className="text-lg text-zinc-600 mt-4">{t.formSubtitle}</p>
          </div>
          <form className="max-w-3xl mx-auto bg-white p-10 border border-zinc-200 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">{t.formName}</label>
                    <input type="text" required className="w-full bg-white border border-zinc-300 py-3 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">{t.formPhone}</label>
                    <input type="tel" required className="w-full bg-white border border-zinc-300 py-3 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" />
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">{t.formEmail}</label>
                    <input type="email" required className="w-full bg-white border border-zinc-300 py-3 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">{t.formCity}</label>
                    <input type="text" required className="w-full bg-white border border-zinc-300 py-3 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">{t.formMessage}</label>
                <textarea rows={5} className="w-full bg-white border border-zinc-300 py-3 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors"></textarea>
            </div>
            <div>
                <button type="submit" className="w-full bg-black text-white font-bold py-4 px-8 text-lg hover:bg-zinc-800 transition-colors">
                    {t.formSubmit}
                </button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className={`text-4xl text-center ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black mb-12`}>{t.faqTitle}</h2>
            <div className="space-y-2">
                {faqs.map((faq, index) => <FAQItem key={index} q={faq.q} a={faq.a} lang={lang} />)}
            </div>
        </div>
      </section>

    </div>
  );
};

export default ListLandLandingPage;