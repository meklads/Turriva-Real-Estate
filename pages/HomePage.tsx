
import React, { useState, useEffect } from 'react';
import { Page, Language, AuthModalView, PortfolioProject, Product } from '../types';
import { translations } from '../lib/translations';
import { mockData } from '../data/mockData';
import { 
    SparklesIcon, ArrowRightIcon, 
    CubeIcon, BuildingStorefrontIcon
} from '../components/Icons';
import HeroSlider from '../components/HeroSlider';
import PartnersTicker from '../components/PartnersTicker';

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

const StyleAccordionItem: React.FC<{
    title: string;
    subtitle: string;
    image: string;
    isActive: boolean;
    onMouseEnter: () => void;
    onClick: () => void;
    lang: Language;
}> = ({ title, subtitle, image, isActive, onMouseEnter, onClick, lang }) => (
    <div 
        className={`relative h-[500px] transition-all duration-700 ease-in-out cursor-pointer overflow-hidden group border-r border-white/10 last:border-r-0
        ${isActive ? 'flex-[3]' : 'flex-[1] grayscale hover:grayscale-0'}`}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
    >
        <div className="absolute inset-0">
            <img src={image} alt={title} className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-125'}`} />
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isActive ? 'opacity-20' : 'opacity-60'}`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
        </div>

        <div className={`absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full transition-all duration-500 ${isActive ? 'translate-y-0' : 'translate-y-4'}`}>
            {/* Vertical Text for inactive state */}
            <div className={`absolute top-8 ${lang === 'ar' ? 'right-8' : 'left-8'} transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                <span className="text-white/80 text-lg font-bold uppercase tracking-widest [writing-mode:vertical-lr]">{title}</span>
            </div>

            {/* Content for active state */}
            <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute bottom-8 left-8 right-8'}`}>
                <h3 className={`text-3xl md:text-4xl text-white mb-2 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{title}</h3>
                <p className="text-zinc-300 text-sm md:text-base mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-500 hidden md:block">
                    {subtitle}
                </p>
                <div className="flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-widest">
                    {lang === 'en' ? 'Explore Projects' : 'استعرض المشاريع'} <ArrowRightIcon className="w-4 h-4" />
                </div>
            </div>
        </div>
    </div>
);

const FeaturedProjectCard: React.FC<{ project: PortfolioProject, viewProject: (id: string) => void, lang: Language }> = ({ project, viewProject, lang }) => (
    <div 
        onClick={() => viewProject(project.id)}
        className="group cursor-pointer flex flex-col gap-4"
    >
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
            <img 
                src={project.coverImageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
        </div>
        <div>
            <div className="flex justify-between items-start">
                <h3 className={`text-xl font-bold text-zinc-900 group-hover:text-gold transition-colors ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                    {project.title}
                </h3>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">{project.year}</span>
            </div>
            <p className="text-sm text-zinc-500 mt-1">{project.location} • {project.category}</p>
        </div>
    </div>
);

// --- Main Page ---

const HomePage: React.FC<HomePageProps> = ({ lang, setCurrentPage, openAuthModal, viewProject, viewProfile, openEmailCaptureModal, openQuiz }) => {
  const t = translations[lang].homePage;
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);

  // Get top 3 featured projects
  const featuredProjects = mockData[lang].portfolioProjects.slice(0, 3);

  const styles = [
      {
          title: lang === 'en' ? 'Modern Living' : 'مودرن فاخر',
          subtitle: lang === 'en' ? 'Clean lines, open spaces, and natural light.' : 'خطوط نظيفة، مساحات مفتوحة، وإضاءة طبيعية.',
          image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
          title: lang === 'en' ? 'Neoclassical' : 'نيوكلاسيك',
          subtitle: lang === 'en' ? 'Timeless elegance with a modern twist.' : 'أناقة كلاسيكية بلمسة عصرية فاخرة.',
          image: 'https://images.pexels.com/photos/3773575/pexels-photo-3773575.png?auto=compress&cs=tinysrgb&w=1600'
      },
      {
          title: lang === 'en' ? 'Commercial' : 'مساحات تجارية',
          subtitle: 'Inspiring offices and retail spaces.',
          image: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
          title: lang === 'en' ? 'Landscape' : 'لاندسكيب',
          subtitle: 'Harmonious outdoor environments.',
          image: 'https://images.pexels.com/photos/872831/pexels-photo-872831.jpeg?auto=compress&cs=tinysrgb&w=1600'
      }
  ];

  // Unified title class for consistency across Shop and CTA
  const sectionTitleClass = `text-3xl md:text-4xl font-bold ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`;

  return (
    <div className="bg-white dark:bg-black w-full overflow-x-hidden transition-colors duration-500">
      
      {/* 1. Hero Slider (Split Screen: AI & Pros) */}
      <HeroSlider lang={lang} setCurrentPage={setCurrentPage} />

      {/* 2. Partners Ticker (Trust) */}
      <PartnersTicker lang={lang} />

      {/* 3. Define Your Aesthetic (Interaction) */}
      <section className="bg-zinc-900 text-white">
        <div className="flex flex-col lg:flex-row min-h-[500px]">
            {/* Title Panel */}
            <div className="lg:hidden p-8 border-b border-zinc-800">
                <h2 className={sectionTitleClass}>
                    {lang === 'en' ? 'Define Your Aesthetic' : 'حدد هويتك المعمارية'}
                </h2>
                <p className="text-zinc-400 mt-2 text-sm">
                    {lang === 'en' ? 'Explore styles to find your perfect match.' : 'استكشف الأنماط لتجد ما يعبر عنك.'}
                </p>
            </div>

            <div className="hidden lg:flex flex-col justify-center p-12 w-[300px] border-r border-zinc-800 z-10 bg-zinc-950 relative">
                <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-6">
                    {lang === 'en' ? 'The Styles' : 'الأنماط'}
                </span>
                <h2 className={`text-5xl leading-tight font-bold mb-6 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                    {lang === 'en' ? 'Define Your Aesthetic.' : 'حدد هويتك المعمارية.'}
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-8">
                    {lang === 'en' 
                        ? 'Before building, you must visualize. Explore our curated styles to find your direction.' 
                        : 'قبل البناء، عليك التخيل. استكشف الأنماط المنسقة لتحدد وجهتك.'}
                </p>
                <button onClick={() => setCurrentPage('directory')} className="text-white border-b border-zinc-700 pb-1 self-start hover:text-gold hover:border-gold transition-colors">
                    {lang === 'en' ? 'View All' : 'عرض الكل'}
                </button>
            </div>

            {/* Accordion */}
            <div className="flex-1 flex flex-col lg:flex-row h-[500px] lg:h-[600px]">
                {styles.map((style, index) => (
                    <StyleAccordionItem 
                        key={index}
                        {...style}
                        isActive={activeStyleIndex === index}
                        onMouseEnter={() => setActiveStyleIndex(index)}
                        onClick={() => setCurrentPage('directory')}
                        lang={lang}
                    />
                ))}
            </div>
        </div>
      </section>

      {/* 4. Turriva Selections (Featured Projects) - The Proof */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div>
                      <h2 className={`${sectionTitleClass} text-zinc-900 mb-3`}>{t.featured.title}</h2>
                      <p className="text-zinc-500 text-lg max-w-xl">{t.featured.subtitle}</p>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('inspirations')}
                    className="group flex items-center gap-2 text-black font-bold uppercase tracking-widest text-xs hover:text-gold transition-colors pb-1 border-b border-black hover:border-gold"
                  >
                      {lang === 'en' ? 'View All Collections' : 'عرض كل المجموعات'}
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
                  </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredProjects.map(project => (
                      <FeaturedProjectCard 
                        key={project.id} 
                        project={project} 
                        viewProject={viewProject} 
                        lang={lang} 
                      />
                  ))}
              </div>
          </div>
      </section>

      {/* 5. Final CTA - The Action */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #C0A062 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
              <h2 className={`${sectionTitleClass} text-white mb-8`}>{t.cta.title}</h2>
              <p className="text-zinc-400 text-xl mb-12 max-w-2xl mx-auto">{t.cta.subtitle}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-8">
                  <button onClick={() => openAuthModal('signup', 'join-pro-success')} className="bg-gold text-black font-bold py-4 px-12 text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors min-w-[240px]">
                      {t.cta.btnPro}
                  </button>
                  <button onClick={() => setCurrentPage('directory')} className="border border-white/30 text-white font-bold py-4 px-12 text-sm tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors min-w-[240px]">
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
