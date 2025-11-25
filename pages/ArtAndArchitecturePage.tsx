import React, { useState, useMemo } from 'react';
import { Page, PortfolioProject, PortfolioProjectCategory, PortfolioProjectStyle, Profile, InspirationSource, GlobalProject, Language } from '../types';
import { mockData } from '../data/mockData';
import { translations } from '../lib/translations';

// === Reusable Components for this page ===

const ProjectCard: React.FC<{ project: PortfolioProject, onProjectClick: () => void }> = ({ project, onProjectClick }) => {
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
        <div className="bg-white group border border-zinc-200 overflow-hidden">
            <div className="relative overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="p-6">
                <h3 className={`text-2xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{project.title}</h3>
                <p className="text-zinc-600 mt-1">{project.architect} | {project.location}</p>
                <p className="text-zinc-700 mt-4 text-sm">{project.description}</p>
            </div>
        </div>
    );
};

const InspirationCard: React.FC<{ source: InspirationSource; lang: Language }> = ({ source, lang }) => {
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

interface ArtAndArchitecturePageProps {
  lang: Language;
  viewProject: (id: string) => void;
}

const ArtAndArchitecturePage: React.FC<ArtAndArchitecturePageProps> = ({ lang, viewProject }) => {
    const t_projects = translations[lang].projectsPage;
    const t_global = translations[lang].globalProjectsPage;
    const t_inspire = translations[lang].inspirationsPage;

    // State and logic from former ProjectsPage
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
    const [selectedCategory, setSelectedCategory] = useState<PortfolioProjectCategory | 'الكل'>('الكل');
    const [selectedStyle, setSelectedStyle] = useState<PortfolioProjectStyle | 'الكل'>('الكل');
    
    const filteredProjects = useMemo(() => {
        return mockData[lang].portfolioProjects.filter(project => {
            const projectInArabic = mockData.ar.portfolioProjects.find(p => p.id === project.id);
            if (!projectInArabic) return false;
            const matchesCategory = selectedCategory === 'الكل' || projectInArabic.category === selectedCategory;
            const matchesStyle = selectedStyle === 'الكل' || projectInArabic.style === selectedStyle;
            return matchesCategory && matchesStyle;
        });
    }, [selectedCategory, selectedStyle, lang]);

    // Data for other sections
    const globalProjects = mockData[lang].globalProjects;
    const inspirationSources = mockData[lang].inspirationSources;

    return (
        <div className="bg-white">
            {/* Section 1: Local Projects */}
            <section className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t_projects.title}</h1>
                    <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">{t_projects.subtitle}</p>
                </div>

                <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm py-6 mb-12 border-b border-zinc-200">
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

                {filteredProjects.length > 0 ? (
                    <div className="md:columns-3 sm:columns-2 columns-1 gap-8">
                        {filteredProjects.map(project => (
                            <div key={project.id} className="mb-8">
                                 <ProjectCard project={project} onProjectClick={() => viewProject(project.id)} />
                            </div>
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-16">
                        <h2 className="text-2xl text-zinc-600">{t_projects.noResults}</h2>
                    </div>
                )}
            </section>
            
            {/* Section 2: Global Projects */}
            <section className="bg-zinc-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t_global.title}</h2>
                        <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">{t_global.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {globalProjects.map(project => <GlobalProjectCard key={project.id} project={project} lang={lang} />)}
                    </div>
                </div>
            </section>

            {/* Section 3: Design Giants */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t_inspire.title}</h2>
                        <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">{t_inspire.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {inspirationSources.map(source => <InspirationCard key={source.id} source={source} lang={lang} />)}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArtAndArchitecturePage;