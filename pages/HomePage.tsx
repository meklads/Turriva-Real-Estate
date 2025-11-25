
import React, { useState, useEffect } from 'react';
import { Page, Language, AuthModalView, PortfolioProject } from '../types';
import { translations } from '../lib/translations';
import { mockData } from '../data/mockData';
import { 
    SparklesIcon, UsersIcon, LayoutIcon, ArrowRightIcon, 
    SearchIcon, BuildingStorefrontIcon, KeyIcon, MapPinIcon,
    BoltIcon, HandshakeIcon
} from '../components/Icons';
import HeroSlider from '../components/HeroSlider';

interface HomePageProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
  openAuthModal: (view: AuthModalView, redirectPage?: Page) => void;
  viewProject: (id: string) => void;
  viewProfile: (id: number) => void;
  openEmailCaptureModal: () => void;
  openQuiz: () => void;
}

// --- Sub-Components ---

const LuxuryBentoTile: React.FC<{ 
    colSpan?: string; 
    bgImage: string; 
    title: string; 
    subtitle: string;
    onClick: () => void;
}> = ({ colSpan = "col-span-1", bgImage, title, subtitle, onClick }) => (
    <div 
        onClick={onClick}
        className={`${colSpan} relative group cursor-pointer overflow-hidden h-[400px] border border-white/10 dark:border-zinc-800/50`}
    >
        <div className="absolute inset-0">
            <img src={bgImage} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale-[30%] group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 z-10">
            <span className="inline-block h-0.5 w-10 bg-gold mb-4 transition-all duration-500 group-hover:w-20"></span>
            <h3 className="text-3xl font-serif text-white mb-2 uppercase tracking-wider">{title}</h3>
            <p className="text-zinc-400 text-sm tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">{subtitle}</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-[0.2em] opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                Explore <ArrowRightIcon className="w-4 h-4" />
            </div>
        </div>
    </div>
);

const FeaturedProjectCard: React.FC<{ project: PortfolioProject; lang: Language; onClick: () => void }> = ({ project, lang, onClick }) => (
    <div onClick={onClick} className="min-w-[300px] sm:min-w-[400px] relative group cursor-pointer snap-start">
        <div className="aspect-[4/5] overflow-hidden relative mb-4">
            <img src={project.coverImageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1">
                <span className="text-gold text-xs font-bold uppercase tracking-widest">{project.category}</span>
            </div>
        </div>
        <h3 className={`text-2xl text-zinc-900 dark:text-white mt-4 leading-tight group-hover:text-gold transition-colors ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
            {project.title}
        </h3>
        <p className="text-zinc-500 text-sm mt-2 uppercase tracking-wider flex items-center gap-2">
             <span className="w-2 h-px bg-zinc-500"></span> {project.location}
        </p>
    </div>
);

// --- Main Page ---

const HomePage: React.FC<HomePageProps> = ({ lang, setCurrentPage, openAuthModal, viewProject, openEmailCaptureModal, openQuiz }) => {
  const t = translations[lang].homePage;
  const featuredProjects = mockData[lang].portfolioProjects.slice(0, 6);

  return (
    <div className="bg-white dark:bg-black w-full overflow-x-hidden transition-colors duration-500">
      
      {/* 1. Hero Slider with Suspense Teasers */}
      <HeroSlider lang={lang} setCurrentPage={setCurrentPage} />

      {/* 2. The Luxury Ecosystem Grid */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-900 relative transition-colors duration-500">
        <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
                <h2 className={`text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>THE TURRIVA WORLD</h2>
                <div className="h-px w-24 bg-gold mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
                
                {/* Row 1: AI Studio (Full Width) */}
                <LuxuryBentoTile 
                    colSpan="md:col-span-12"
                    title={t.bento.aiTitle}
                    subtitle={t.bento.aiSubtitle}
                    bgImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    onClick={() => setCurrentPage('ai-design-studio')}
                />

                {/* Row 2: Professionals (Elite), Inspiration, Store */}
                
                {/* Professionals / Elite */}
                <LuxuryBentoTile 
                    colSpan="md:col-span-4"
                    title={t.bento.directoryTitle}
                    subtitle={t.bento.directorySubtitle}
                    bgImage="https://images.pexels.com/photos/1106476/pexels-photo-1106476.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    onClick={() => setCurrentPage('directory')}
                />

                {/* Inspirations */}
                <LuxuryBentoTile 
                    colSpan="md:col-span-4"
                    title={t.bento.inspirationTitle}
                    subtitle={t.bento.inspirationSubtitle}
                    bgImage="https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    onClick={() => setCurrentPage('inspirations')}
                />

                {/* Store */}
                <LuxuryBentoTile 
                    colSpan="md:col-span-4"
                    title={t.bento.marketTitle}
                    subtitle={t.bento.marketSubtitle}
                    bgImage="https://images.pexels.com/photos/4450334/pexels-photo-4450334.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    onClick={() => setCurrentPage('shop')}
                />

            </div>
        </div>
      </section>

      {/* 3. Curated Collection (Dark Theme Slider) */}
      <section className="py-32 bg-white dark:bg-black border-t border-zinc-200 dark:border-white/10 overflow-hidden transition-colors duration-500">
        <div className="container mx-auto px-6 mb-16 flex justify-between items-end">
            <div>
                <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Turriva Select</span>
                <h2 className={`text-4xl md:text-6xl font-medium text-zinc-900 dark:text-white ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.featured.title}</h2>
            </div>
            <button onClick={() => setCurrentPage('inspirations')} className="hidden md:flex items-center gap-2 text-zinc-900 dark:text-white border-b border-zinc-400 dark:border-white/50 pb-1 text-sm font-bold uppercase tracking-widest hover:text-gold hover:border-gold transition-colors">
                {t.featured.subtitle} <ArrowRightIcon className="w-4 h-4" />
            </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="pl-6 md:pl-24 overflow-x-auto pb-12 flex gap-8 no-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
            {featuredProjects.map(project => (
                <FeaturedProjectCard 
                    key={project.id} 
                    project={project} 
                    lang={lang} 
                    onClick={() => viewProject(project.id)} 
                />
            ))}
        </div>
      </section>

      {/* 4. Minimalist Gold CTA */}
      <section className="py-40 bg-zinc-950 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #C0A062 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
              <h2 className={`text-5xl md:text-8xl text-white mb-10 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.cta.title}</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-8">
                  <button onClick={() => openAuthModal('signup', 'join-pro-success')} className="bg-gold text-black font-bold py-5 px-12 text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors min-w-[260px]">
                      {t.cta.btnPro}
                  </button>
                  <button onClick={() => setCurrentPage('inspirations')} className="border border-white/30 text-white font-bold py-5 px-12 text-sm tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors min-w-[260px]">
                      {t.cta.btnUser}
                  </button>
              </div>
          </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
