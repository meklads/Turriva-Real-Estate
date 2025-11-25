
import React, { useState, useMemo } from 'react';
import { Page, PortfolioProject, Profile, InspirationSource, GlobalProject, Language, PortfolioProjectCategory, PortfolioProjectStyle } from '../types';
import { mockData } from '../data/mockData';
import { translations } from '../lib/translations';

// === Reusable Components for this page ===

// Home Page Style Card for Curated Section
const CuratedProjectCard: React.FC<{ project: PortfolioProject, onProjectClick: () => void, lang: Language }> = ({ project, onProjectClick, lang }) => {
    return (
        <div onClick={onProjectClick} className="group cursor-pointer relative">
            <div className="overflow-hidden relative aspect-[4/5] mb-4">
                 <img src={project.coverImageUrl} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                 
                 {/* Floating Card Info */}
                 <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                    <h3 className={`text-xl font-medium text-zinc-900 leading-tight ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{project.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-zinc-500 text-xs uppercase tracking-wide">{project.category}</p>
                        <span className="text-gold text-xs font-bold uppercase">{lang === 'en' ? 'Get Inspired' : 'استلهم'}</span>
                    </div>
                 </div>
            </div>
        </div>
    )
}

const LocalProjectCard: React.FC<{ project: PortfolioProject, onProjectClick: () => void }> = ({ project, onProjectClick }) => {
  const professional = mockData.ar.directoryItems.find(p => p.id === project.professionalId && p.type === 'profile') as Profile;
  return (
    <div className="group break-inside-avoid" onClick={onProjectClick}>
      <div className="relative overflow-hidden cursor-pointer">
        <img src={project.coverImageUrl} alt={project.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      </div>
      <div className="pt-4">
        <h3 className="text-lg font-bold text-black group-hover:text-gold transition-colors">{project.title}</h3>
        <p className="text-sm text-zinc-500">{professional?.name}</p>
      </div>
    </div>
  );
};

const GlobalProjectCard: React.FC<{ project: GlobalProject; lang: Language }> = ({ project, lang }) => {
    return (
        <div className="bg-zinc-50 group border border-zinc-200 overflow-hidden">
            <div className="relative overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="p-6">
                <h3 className={`text-2xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{project.title}</h3>
                <p className="text-zinc-600 mt-1">{project.architect} | {project.location}</p>
            </div>
        </div>
    );
};

const MasterInspirationCard: React.FC<{ source: InspirationSource; lang: Language }> = ({ source, lang }) => {
    return (
        <div className="group relative overflow-hidden">
            <img src={source.imageUrl} alt={source.name} className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{source.name}</h3>
                <p className="text-zinc-300 text-lg">{source.style}</p>
                 <div className="pt-4 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-zinc-200 text-sm">{source.bio}</p>
                </div>
            </div>
        </div>
    );
};


// === Main Page Component ===

interface InspirationsPageProps {
  lang: Language;
  viewProject: (id: string) => void;
}

const InspirationsPage: React.FC<InspirationsPageProps> = ({ lang, viewProject }) => {
    const t = translations[lang].inspirationsPage;
    const t_projects = translations[lang].projectsPage;

    const [selectedCategory, setSelectedCategory] = useState<PortfolioProjectCategory | 'الكل'>('الكل');
    const [selectedStyle, setSelectedStyle] = useState<PortfolioProjectStyle | 'الكل'>('الكل');

    const saudiProjects = mockData[lang].portfolioProjects;
    const curatedProjects = saudiProjects.slice(0, 3); // Same as home page preview
    const globalProjects = mockData[lang].globalProjects;
    const designMasters = mockData[lang].inspirationSources;

    const categories: { key: PortfolioProjectCategory, label: string }[] = [
        { key: 'سكني', label: t_projects.category.residential },
        { key: 'تجاري', label: t_projects.category.commercial },
        { key: 'ضيافة', label: t_projects.category.hospitality },
    ];
     const styles: { key: PortfolioProjectStyle, label: string }[] = [
        { key: 'مودرن', label: t_projects.style.modern },
        { key: 'نيوكلاسيك', label: t_projects.style.neoclassical },
        { key: 'صناعي', label: t_projects.style.industrial },
        { key: 'بوهيمي', label: t_projects.style.bohemian },
    ];

    const filteredSaudiProjects = useMemo(() => {
        return saudiProjects.filter(project => {
            const projectInArabic = mockData.ar.portfolioProjects.find(p => p.id === project.id);
            if (!projectInArabic) return false;

            const matchesCategory = selectedCategory === 'الكل' || projectInArabic.category === selectedCategory;
            const matchesStyle = selectedStyle === 'الكل' || projectInArabic.style === selectedStyle;
            
            return matchesCategory && matchesStyle;
        });
    }, [selectedCategory, selectedStyle, saudiProjects]);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section 
                className="relative h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 px-6">
                    <h1 className={`text-5xl md:text-7xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.title}</h1>
                    <p className="text-xl md:text-2xl mt-4 max-w-4xl mx-auto">{t.subtitle}</p>
                </div>
            </section>

            {/* Section 0: Curated Inspirations (Home Page Style) */}
            <section className="container mx-auto px-6 py-20 border-b border-zinc-100">
                <div className="text-center mb-12">
                    <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">{lang === 'en' ? 'Editor\'s Pick' : 'اختيارات المحرر'}</span>
                    <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.curatedTitle}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                    {curatedProjects.map((project, idx) => (
                        <div key={project.id} className={idx === 1 ? 'md:translate-y-16' : ''}>
                            <CuratedProjectCard project={project} onProjectClick={() => viewProject(project.id)} lang={lang} />
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Section 1: Saudi Gems */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.saudiGemsTitle}</h2>
                    <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">{t.saudiGemsSubtitle}</p>
                </div>
                 {/* Filters */}
                <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm py-6 mb-12 border-b border-zinc-200">
                    <div className="flex justify-center items-center gap-x-2 sm:gap-x-4 mb-4">
                        <button onClick={() => setSelectedCategory('الكل')} className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${selectedCategory === 'الكل' ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'}`}>{t_projects.allCategories}</button>
                        {categories.map(category => (
                            <button key={category.key} onClick={() => setSelectedCategory(category.key)} className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${selectedCategory === category.key ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'}`}>{category.label}</button>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-x-2 sm:gap-x-4">
                        <button onClick={() => setSelectedStyle('الكل')} className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${selectedStyle === 'الكل' ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'}`}>{t_projects.allStyles}</button>
                        {styles.map(style => (
                            <button key={style.key} onClick={() => setSelectedStyle(style.key)} className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${selectedStyle === style.key ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'}`}>{style.label}</button>
                        ))}
                    </div>
                </div>
                {filteredSaudiProjects.length > 0 ? (
                    <div className="md:columns-3 sm:columns-2 columns-1 gap-8">
                        {filteredSaudiProjects.map(project => (
                            <div key={project.id} className="mb-8">
                                <LocalProjectCard project={project} onProjectClick={() => viewProject(project.id)} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl text-zinc-600">{t_projects.noResults}</h2>
                    </div>
                )}
            </section>
            
            {/* Section 2: Global Icons */}
            <section className="bg-zinc-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.globalIconsTitle}</h2>
                        <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">{t.globalIconsSubtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {globalProjects.map(project => <GlobalProjectCard key={project.id} project={project} lang={lang} />)}
                    </div>
                </div>
            </section>

            {/* Section 3: Design Masters */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.designMastersTitle}</h2>
                        <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">{t.designMastersSubtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {designMasters.map(source => <MasterInspirationCard key={source.id} source={source} lang={lang} />)}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InspirationsPage;
