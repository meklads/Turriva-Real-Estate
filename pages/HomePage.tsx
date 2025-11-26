
import React, { useState, useEffect } from 'react';
import { Page, Language, AuthModalView, PortfolioProject, Product } from '../types';
import { translations } from '../lib/translations';
import { mockData } from '../data/mockData';
import { 
    SparklesIcon, ArrowRightIcon, 
    CubeIcon, BuildingStorefrontIcon,
    ShieldCheckIcon, StarIcon
} from '../components/Icons';
import HeroSlider from '../components/HeroSlider';
import PartnersTicker from '../components/PartnersTicker';
import EliteProsCarousel from '../components/EliteProsCarousel';

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
        className="group cursor-pointer flex flex-col gap-4 min-w-[300px] md:min-w-[400px] snap-start"
    >
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 rounded-2xl">
            <img 
                src={project.coverImageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {project.category}
            </div>
        </div>
        <div>
            <div className="flex justify-between items-start">
                <h3 className={`text-2xl font-bold text-zinc-900 group-hover:text-gold transition-colors ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                    {project.title}
                </h3>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">{project.year}</span>
            </div>
            <p className="text-sm text-zinc-500 mt-1">{project.location}</p>
        </div>
    </div>
);

// --- Main Page ---

const HomePage: React.FC<HomePageProps> = ({ lang, setCurrentPage, openAuthModal, viewProject, viewProfile, openEmailCaptureModal, openQuiz }) => {
  const t = translations[lang].homePage;
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);

  // Get top 3 featured projects
  const featuredProjects = mockData[lang].portfolioProjects;

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

  // Unified title class
  const sectionTitleClass = `text-3xl md:text-5xl font-bold ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`;

  return (
    <div className="bg-white dark:bg-black w-full overflow-x-hidden transition-colors duration-500">
      
      {/* 1. Hero Section (Updated Split Layout) */}
      <HeroSlider lang={lang} setCurrentPage={setCurrentPage} />

      {/* 2. Style Explorer (Define Your Aesthetic) */}
      <section className="bg-zinc-900 text-white border-t border-zinc-800">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
            <div className="hidden lg:flex flex-col justify-center p-12 w-[300px] border-r border-zinc-800 z-10 bg-zinc-950 relative">
                <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-6">
                    {lang === 'en' ? 'The Styles' : 'الأنماط'}
                </span>
                <h2 className={`text-5xl leading-tight font-bold mb-6 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                    {lang === 'en' ? 'Define Your Aesthetic.' : 'حدد هويتك المعمارية.'}
                </h2>
                <button onClick={() => setCurrentPage('directory')} className="text-white border-b border-zinc-700 pb-1 self-start hover:text-gold hover:border-gold transition-colors">
                    {lang === 'en' ? 'Explore All' : 'عرض الكل'}
                </button>
            </div>
            
            {/* Mobile Title */}
            <div className="lg:hidden p-8 border-b border-zinc-800">
                <h2 className={sectionTitleClass}>
                    {lang === 'en' ? 'Define Your Aesthetic' : 'حدد هويتك المعمارية'}
                </h2>
            </div>

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

      {/* 3. Partners Ticker */}
      <PartnersTicker lang={lang} />

      {/* 4. Elite Professionals (NEW Stories Style) */}
      <EliteProsCarousel lang={lang} setCurrentPage={setCurrentPage} />

      {/* 5. Mid-Page CTA */}
      <div className="py-12 bg-white text-center">
          <button 
            onClick={() => setCurrentPage('ai-design-studio')}
            className="bg-black text-white font-bold py-4 px-12 rounded-full text-lg hover:bg-gold hover:text-black transition-all shadow-lg flex items-center gap-2 mx-auto"
          >
              <SparklesIcon className="w-6 h-6" />
              {lang === 'en' ? 'Try AI Design Studio' : 'جرب استوديو التصميم'}
          </button>
      </div>

      {/* 6. Join Professionals CTA */}
      <section className="py-20 bg-black text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1600")', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%)' }}></div>
          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
              <ShieldCheckIcon className="w-16 h-16 text-gold mb-6" />
              <h2 className={`${sectionTitleClass} mb-6`}>
                  {lang === 'en' ? 'Are you a Professional?' : 'هل أنت محترف؟'}
              </h2>
              <p className="text-xl text-zinc-300 max-w-2xl mb-10">
                  {lang === 'en' ? 'Join the elite network. Get verified, showcase your portfolio, and receive high-quality leads.' : 'انضم لشبكة النخبة. احصل على التوثيق، اعرض أعمالك، واستقبل طلبات عملاء جادين.'}
              </p>
              <button 
                onClick={() => openAuthModal('signup', 'join-pro-success')}
                className="bg-white text-black font-bold py-4 px-12 rounded-full text-lg hover:bg-gold hover:text-white transition-colors"
              >
                  {t.cta.btnPro}
              </button>
          </div>
      </section>

      {/* 7. Turriva Selections (Horizontal Scroll) */}
      <section className="py-24 bg-white border-t border-zinc-100">
          <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
              <div>
                  <h2 className={`${sectionTitleClass} text-zinc-900 mb-2`}>{t.featured.title}</h2>
                  <p className="text-zinc-500">{t.featured.subtitle}</p>
              </div>
              <button 
                onClick={() => setCurrentPage('inspirations')}
                className="hidden md:flex items-center gap-2 text-black font-bold border-b border-black pb-1 hover:text-gold hover:border-gold transition-colors"
              >
                  {lang === 'en' ? 'View All' : 'عرض الكل'} <ArrowRightIcon className="w-4 h-4" />
              </button>
          </div>

          <div className="w-full overflow-x-auto pb-8 no-scrollbar px-6">
              <div className="flex gap-6 w-max">
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

      {/* 8. Final CTA */}
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
