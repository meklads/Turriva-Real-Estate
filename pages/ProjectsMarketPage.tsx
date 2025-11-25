

import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory, User, Page, Language, AuthModalView } from '../types';
import { mockData } from '../data/mockData';
import { SearchIcon } from '../components/Icons';
import { translations } from '../lib/translations';

const ProjectCard: React.FC<{ 
    project: Project, 
    lang: Language, 
    currentUser: User | null,
    setCurrentPage: (page: Page) => void,
    openAuthModal: (view: AuthModalView) => void 
}> = ({ project, lang, currentUser, setCurrentPage, openAuthModal }) => {
    const t = translations[lang].projectsMarketPage;
    const catT = translations[lang].projectCategories;

    const categoryMap: Record<ProjectCategory, string> = {
        'تصميم معماري': catT.architectural,
        'تصميم داخلي': catT.interior,
        'مقاولات عامة': catT.contracting,
        'توريد مواد': catT.supply,
        'استشارات هندسة': catT.consulting,
    };

    const handleApplyClick = () => {
        if (!currentUser) {
            openAuthModal('login');
        } else if (currentUser.membership === 'Free') {
            setCurrentPage('upgrade');
        } else {
            // In a real app, this would open an application form or similar
            alert('Your application has been submitted!');
        }
    };
    
    return (
        <div className="bg-white border border-zinc-200 p-6 group transition-all duration-300 hover:border-gold hover:shadow-md">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gold font-bold">{categoryMap[project.category]}</p>
                    <h3 className={`text-2xl mt-1 ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{project.title}</h3>
                    <p className="text-zinc-500 text-sm mt-1">{project.client} {project.city && `• ${project.city}`}</p>
                </div>
                {project.budget ? (
                    <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-zinc-900">{project.budget}</p>
                        <p className="text-sm text-zinc-500">{t.budget}</p>
                    </div>
                ) : (
                    <div className="text-right flex-shrink-0">
                        <p className="text-base font-semibold text-zinc-700">{t.budgetNotSpecified}</p>
                         <p className="text-sm text-zinc-500">{t.budget}</p>
                    </div>
                )}
            </div>
            <p className="text-zinc-700 mt-4 leading-relaxed">{project.description}</p>
            <div className="flex justify-between items-center mt-6 border-t border-zinc-200 pt-4">
                <p className="text-sm text-zinc-500">{t.posted} {project.postedDate} &bull; {t.deadline}: {project.deadline}</p>
                <button onClick={handleApplyClick} className="bg-zinc-800 text-white font-bold py-2 px-5 hover:bg-gold hover:text-white transition-colors">
                    {t.applyNow}
                </button>
            </div>
        </div>
    );
};


interface ProjectsMarketPageProps {
  lang: Language;
  projects: Project[];
  currentUser: User | null;
  setCurrentPage: (page: Page) => void;
  openAuthModal: (view: AuthModalView) => void;
}

type SortOption = 'newest' | 'deadline-asc' | 'deadline-desc' | 'budget-asc' | 'budget-desc';

const ProjectsMarketPage: React.FC<ProjectsMarketPageProps> = ({ lang, projects, currentUser, setCurrentPage, openAuthModal }) => {
    const t = translations[lang].projectsMarketPage;
    const catT = translations[lang].projectCategories;

    const categories: { key: ProjectCategory, label: string }[] = [
        { key: 'تصميم معماري', label: catT.architectural },
        { key: 'تصميم داخلي', label: catT.interior },
        { key: 'مقاولات عامة', label: catT.contracting },
        { key: 'توريد مواد', label: catT.supply },
        { key: 'استشارات هندسة', label: catT.consulting },
    ];
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'الكل'>('الكل');
    const [sortOption, setSortOption] = useState<SortOption>('newest');

    const allProjects = useMemo(() => [...projects, ...mockData[lang].projects], [projects, lang]);

    const filteredProjects = useMemo(() => {
        const filtered = allProjects.filter(project => {
            const projectCategoryInArabic = mockData.ar.projects.find(p => p.id === project.id)?.category || project.category;
            const matchesCategory = selectedCategory === 'الكل' || projectCategoryInArabic === selectedCategory;
            
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const matchesSearch = project.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                                  project.client.toLowerCase().includes(lowerCaseSearchTerm) ||
                                  (project.city && project.city.toLowerCase().includes(lowerCaseSearchTerm)) ||
                                  project.description.toLowerCase().includes(lowerCaseSearchTerm);

            return matchesCategory && matchesSearch;
        });

        // Sorting logic
        return filtered.sort((a, b) => {
            switch (sortOption) {
                case 'deadline-asc':
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                case 'deadline-desc':
                    return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
                case 'budget-asc': {
                    const budgetA = parseInt(a.budget?.replace(/[^0-9]/g, '') || '0', 10);
                    const budgetB = parseInt(b.budget?.replace(/[^0-9]/g, '') || '0', 10);
                    return budgetA - budgetB;
                }
                case 'budget-desc': {
                    const budgetA = parseInt(a.budget?.replace(/[^0-9]/g, '') || '0', 10);
                    const budgetB = parseInt(b.budget?.replace(/[^0-9]/g, '') || '0', 10);
                    return budgetB - budgetA;
                }
                case 'newest':
                default:
                    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
            }
        });

    }, [searchTerm, selectedCategory, allProjects, sortOption]);

    const renderProjectList = () => {
        if (allProjects.length === 0) {
            return (
                <div className="text-center py-16">
                    <h2 className="text-3xl text-zinc-800">{t.noProjectsYetTitle}</h2>
                    <p className="text-zinc-500 mt-2">{t.noProjectsYetSubtitle}</p>
                </div>
            );
        }
        if (filteredProjects.length === 0) {
            return (
                 <div className="text-center py-16">
                    <h2 className="text-2xl text-zinc-600">{t.noResults}</h2>
                    <p className="text-zinc-500 mt-2">{t.noResultsSubtitle}</p>
                </div>
            );
        }
        return (
            <div className="space-y-8">
                {filteredProjects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        lang={lang} 
                        currentUser={currentUser}
                        setCurrentPage={setCurrentPage}
                        openAuthModal={openAuthModal}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
                <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">
                    {t.subtitle}
                </p>
            </div>

            {/* Search and Filters - Show if there are projects */}
            {allProjects.length > 0 && (
                <div className="sticky top-[72px] z-30 bg-white py-6 mb-8 border-b border-zinc-200">
                    <div className="relative mb-6 max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            className={`w-full bg-white border border-zinc-300 py-3 ${lang === 'en' ? 'pl-4 pr-12' : 'pl-12 pr-4'} text-zinc-900 focus:outline-none focus:border-black transition-colors`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className={`absolute top-1/2 -translate-y-1/2 ${lang === 'en' ? 'right-4' : 'left-4'}`}>
                            <SearchIcon />
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 px-2">
                        <button
                            onClick={() => setSelectedCategory('الكل')}
                            className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${
                                selectedCategory === 'الكل' ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'
                            }`}
                        >
                            {t.all}
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.key}
                                onClick={() => setSelectedCategory(category.key)}
                                className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${
                                    selectedCategory === category.key ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-center items-center">
                        <label htmlFor="sort-options" className="text-sm font-medium text-zinc-600 mr-2 rtl:ml-2">{t.sorting.label}:</label>
                        <select
                            id="sort-options"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="bg-white border border-zinc-300 py-1 px-2 text-sm text-black focus:outline-none focus:border-black transition-colors"
                        >
                            <option value="newest">{t.sorting.newest}</option>
                            <option value="deadline-asc">{t.sorting.deadlineAsc}</option>
                            <option value="deadline-desc">{t.sorting.deadlineDesc}</option>
                            <option value="budget-asc">{t.sorting.budgetAsc}</option>
                            <option value="budget-desc">{t.sorting.budgetDesc}</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Projects List */}
            {renderProjectList()}
        </div>
    );
};

export default ProjectsMarketPage;