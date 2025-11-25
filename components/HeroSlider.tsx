
import React, { useState } from 'react';
import { Page, Language } from '../types';
import { translations } from '../lib/translations';
import { SparklesIcon, UsersIcon, ArrowRightIcon, SearchIcon } from './Icons';

interface HeroSliderProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ lang, setCurrentPage }) => {
  const [activeSide, setActiveSide] = useState<'ai' | 'pros' | null>(null);

  // Image for AI Side (Modern Palace Interior)
  const aiImage = 'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=1600';
  // Image for Pros Side (Architects working on a model)
  const proImage = 'https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg?auto=compress&cs=tinysrgb&w=1600';

  return (
    <section className="relative h-[calc(100vh-64px)] min-h-[600px] w-full overflow-hidden flex flex-col md:flex-row bg-black">
        
        {/* AI Design Studio Side */}
        <div 
            className={`relative h-1/2 md:h-full transition-all duration-700 ease-out overflow-hidden cursor-pointer group
                ${activeSide === 'ai' ? 'md:w-[65%]' : activeSide === 'pros' ? 'md:w-[35%]' : 'md:w-1/2'}
                w-full border-b md:border-b-0 md:border-r border-zinc-800
            `}
            onMouseEnter={() => setActiveSide('ai')}
            onMouseLeave={() => setActiveSide(null)}
            onClick={() => setCurrentPage('ai-design-studio')}
        >
            {/* Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
                style={{ backgroundImage: `url(${aiImage})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
                {/* New Feature Badge */}
                <div className="mb-6 px-4 py-1.5 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-widest animate-bounce">
                    {lang === 'en' ? 'New Feature' : 'ميزة جديدة'}
                </div>

                <div className="mb-6 p-4 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/50 shadow-[0_0_30px_rgba(192,160,98,0.3)] group-hover:scale-110 transition-transform duration-500">
                    <SparklesIcon className="w-10 h-10 text-gold animate-pulse" />
                </div>
                
                <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                    {lang === 'en' ? 'AI Design Studio' : 'استوديو الذكاء الاصطناعي'}
                </h2>
                
                <p className="text-zinc-300 text-lg md:text-xl max-w-md mb-10 opacity-90 group-hover:opacity-100 transition-opacity leading-relaxed">
                    {lang === 'en' ? 'Reimagine your space instantly. Upload a photo and watch the magic happen.' : 'أعد تخيل مساحتك في لحظات. ارفع صورة وشاهد السحر.'}
                </p>
                
                <button className="bg-gold text-black font-bold py-4 px-10 rounded-full flex items-center gap-3 hover:bg-white transition-all duration-300 shadow-lg transform translate-y-4 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 animate-pulse">
                    {lang === 'en' ? 'Try AI Now' : 'جرب الآن'} <ArrowRightIcon className="w-5 h-5" />
                </button>
                
                {/* Floating tag */}
                <div className="absolute bottom-8 text-gold text-xs font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {lang === 'en' ? 'Powered by Turriva AI' : 'مدعوم من توريڤا AI'}
                </div>
            </div>
        </div>

        {/* Professionals Directory Side */}
        <div 
            className={`relative h-1/2 md:h-full transition-all duration-700 ease-out overflow-hidden cursor-pointer group
                ${activeSide === 'pros' ? 'md:w-[65%]' : activeSide === 'ai' ? 'md:w-[35%]' : 'md:w-1/2'}
                w-full
            `}
            onMouseEnter={() => setActiveSide('pros')}
            onMouseLeave={() => setActiveSide(null)}
            onClick={() => setCurrentPage('directory')}
        >
            {/* Background */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
                style={{ backgroundImage: `url(${proImage})` }}
            ></div>
            <div className="absolute inset-0 bg-zinc-900/80 group-hover:bg-zinc-900/60 transition-colors duration-500"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
                <div className="mb-6 p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-500">
                    <UsersIcon className="w-10 h-10 text-white" />
                </div>
                
                <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                    {lang === 'en' ? 'Elite Professionals' : 'نخبة المحترفين'}
                </h2>
                
                <p className="text-zinc-300 text-lg md:text-xl max-w-md mb-10 opacity-90 group-hover:opacity-100 transition-opacity leading-relaxed">
                    {lang === 'en' ? 'Connect with verified architects and contractors to build your legacy.' : 'تواصل مع معماريين ومقاولين معتمدين لبناء إرثك.'}
                </p>
                
                <button className="bg-white text-black font-bold py-4 px-10 rounded-full flex items-center gap-3 hover:bg-gold hover:text-black transition-all duration-300 shadow-lg transform translate-y-4 group-hover:translate-y-0 opacity-80 group-hover:opacity-100">
                    {lang === 'en' ? 'Find Experts' : 'تصفح الدليل'} <SearchIcon className="w-5 h-5" />
                </button>

                 {/* Floating tag */}
                 <div className="absolute bottom-8 text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {lang === 'en' ? 'Verified Partners' : 'شركاء معتمدون'}
                </div>
            </div>
        </div>

    </section>
  );
};

export default HeroSlider;
