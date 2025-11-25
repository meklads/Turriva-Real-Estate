import React, { useState, useMemo } from 'react';
import { PortfolioProject, PortfolioProjectCategory, PortfolioProjectStyle, Profile, Language } from '../types';
import { mockData } from '../data/mockData';
import { translations } from '../lib/translations';
import { SearchIcon } from '../components/Icons';

interface ProjectsPageProps {
  lang: Language;
  viewProject: (id: string) => void;
}

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

const ProjectsPage: React.FC<ProjectsPageProps> = ({ lang, viewProject }) => {
    const t = translations[lang].projectsPage;

    const categories: { key: PortfolioProjectCategory, label: string }[] = [
        { key: 'سكني', label: t.category.residential },
        { key: 'تجاري', label: t.category.commercial },
        { key: 'ضيافة', label: t.category.hospitality },
    ];
     const styles: { key: PortfolioProjectStyle, label: string }[] = [
        { key: 'مودرن', label: t.style.modern },
        { key: 'نيوكلاسيك', label: t.style.neoclassical },
        { key: 'صناعي', label: t.style.industrial },
        { key: 'بوهيمي', label: t.style.bohemian },
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

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
                <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">{t.subtitle}</p>
            </div>

            {/* Filters */}
            <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm py-6 mb-12 border-b border-zinc-200">
                <div className="flex justify-center items-center gap-x-2 sm:gap-x-4 mb-4">
                     <button onClick={() => setSelectedCategory('الكل')} className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${selectedCategory === 'الكل' ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'}`}>{t.allCategories}</button>
                    {categories.map(category => (
                        <button key={category.key} onClick={() => setSelectedCategory(category.key)} className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${selectedCategory === category.key ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'}`}>{category.label}</button>
                    ))}
                </div>
                 <div className="flex justify-center items-center gap-x-2 sm:gap-x-4">
                    <button onClick={() => setSelectedStyle('الكل')} className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${selectedStyle === 'الكل' ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'}`}>{t.allStyles}</button>
                    {styles.map(style => (
                        <button key={style.key} onClick={() => setSelectedStyle(style.key)} className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${selectedStyle === style.key ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'}`}>{style.label}</button>
                    ))}
                </div>
            </div>

            {/* Projects Masonry Grid */}
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
                    <h2 className="text-2xl text-zinc-600">{t.noResults}</h2>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;