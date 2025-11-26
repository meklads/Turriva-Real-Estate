
import React from 'react';
import { Page, Language } from '../types';
import { translations } from '../lib/translations';
import { SparklesIcon, ArrowRightIcon } from './Icons';

interface HeroSliderProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang].homePage.hero;

  return (
    <section className="relative min-h-[calc(100vh-80px)] w-full bg-zinc-950 text-white overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Content Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 w-fit backdrop-blur-md">
                <SparklesIcon className="w-4 h-4 text-gold animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                    {lang === 'en' ? 'New AI Features' : 'ميزات الذكاء الاصطناعي الجديدة'}
                </span>
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold leading-tight mb-6 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                {t.title}
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed">
                {t.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={() => setCurrentPage('ai-design-studio')}
                    className="bg-gold text-black font-bold py-4 px-10 rounded-full text-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(192,160,98,0.3)] flex items-center justify-center gap-2"
                >
                    {t.btnPrimary} <ArrowRightIcon className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => setCurrentPage('directory')}
                    className="bg-transparent border border-zinc-700 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                    {t.btnSecondary}
                </button>
            </div>

            <div className="mt-16 flex items-center gap-8 text-sm font-medium text-zinc-500">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 overflow-hidden">
                            <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`} alt="User" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <p>{lang === 'en' ? 'Trusted by 10,000+ homeowners' : 'موثوق من قبل +10,000 مالك'}</p>
            </div>
        </div>

        {/* Right Visual Side (Collage) */}
        <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-auto bg-zinc-900 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-purple-900/20 to-black z-0"></div>
            
            {/* Floating Cards Animation */}
            <div className="absolute inset-0 flex items-center justify-center perspective-1000">
                <div className="grid grid-cols-2 gap-4 p-4 transform rotate-[-5deg] scale-110 opacity-80">
                    {/* Card 1 */}
                    <div className="w-48 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform translate-y-12">
                        <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover" alt="Modern" />
                    </div>
                    {/* Card 2 */}
                    <div className="w-48 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform -translate-y-8">
                        <img src="https://images.pexels.com/photos/3773575/pexels-photo-3773575.png?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover" alt="Neoclassical" />
                    </div>
                    {/* Card 3 */}
                    <div className="w-48 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform translate-y-8">
                        <img src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover" alt="Industrial" />
                    </div>
                    {/* Card 4 */}
                    <div className="w-48 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform -translate-y-12">
                        <img src="https://images.pexels.com/photos/6489107/pexels-photo-6489107.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover" alt="Minimal" />
                    </div>
                </div>
            </div>
            
            {/* Overlay Gradient for smooth edge */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent lg:via-transparent lg:to-transparent pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:hidden pointer-events-none"></div>
        </div>

    </section>
  );
};

export default HeroSlider;
