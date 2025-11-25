
import React from 'react';
import { Language } from '../types';
import { translations } from '../lib/translations';
import { SparklesIcon, ShieldCheckIcon, BoltIcon, ArrowRightIcon } from '../components/Icons';

interface AboutUsPageProps {
  lang: Language;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ lang }) => {
  const t = translations[lang].aboutUsPage;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.title}</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">{t.subtitle}</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
               <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">{t.missionTitle}</span>
               <h2 className={`text-4xl md:text-5xl font-bold text-black mb-8 leading-tight ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.visionTitle}</h2>
               <p className="text-lg text-zinc-600 leading-loose mb-8">
                 {t.missionDesc}
               </p>
               <div className="flex gap-8">
                  <div className="flex items-center gap-3">
                      <SparklesIcon className="w-6 h-6 text-gold" />
                      <span className="font-bold text-black">{t.values.inspiration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <ShieldCheckIcon className="w-6 h-6 text-gold" />
                      <span className="font-bold text-black">{t.values.trust}</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <BoltIcon className="w-6 h-6 text-gold" />
                      <span className="font-bold text-black">{t.values.innovation}</span>
                  </div>
               </div>
            </div>
            <div className="relative">
                <div className="aspect-square bg-zinc-100 relative overflow-hidden rounded-lg">
                    <img src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Team working" className="object-cover w-full h-full" />
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Company Section (Graphics House) */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
          <div className="container mx-auto px-6 text-center">
              <div className="max-w-3xl mx-auto">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-6">Graphics House Ecosystem</p>
                  <h3 className={`text-3xl md:text-4xl font-bold text-black mb-6 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.parentCompany}</h3>
                  <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
                      {t.parentDesc}
                  </p>
                  <a 
                    href="https://3dgraphicshouse.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-black text-white font-bold py-5 px-12 text-lg hover:bg-gold hover:text-black transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                  >
                      {t.visitParent} <ArrowRightIcon className="w-6 h-6" />
                  </a>
              </div>
          </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
