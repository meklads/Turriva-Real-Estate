import React, { useState, useMemo } from 'react';
import { FeaturedProject, Language } from '../types';
import { mockData } from '../data/mockData';
import { SearchIcon, StarIcon } from '../components/Icons';
import { translations } from '../lib/translations';

// Re-using the FeaturedProjectCard from DirectoryPage for consistency
const OpportunityCard: React.FC<{ project: FeaturedProject, lang: Language, isFeatured?: boolean }> = ({ project, lang, isFeatured = false }) => {
    const t = translations[lang].opportunitiesPage;
    return (
        <div className={`bg-white border group transition-all duration-300 hover:shadow-lg ${isFeatured ? 'border-2 border-gold ring-4 ring-gold/20' : 'border-zinc-200 hover:border-gold'}`}>
             {isFeatured && (
                <div className="bg-gold text-white text-sm font-bold uppercase tracking-wider py-1 px-4">
                    {t.featured}
                </div>
            )}
            <div className="relative overflow-hidden h-56">
                <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-5 text-white">
                    <h3 className={`text-xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{project.name}</h3>
                    <p className="text-zinc-300 text-sm">{project.developer}</p>
                </div>
            </div>
             <div className="p-5">
                <p className="text-zinc-700">{project.description}</p>
            </div>
        </div>
    );
};

interface OpportunitiesPageProps {
  lang: Language;
}

const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({ lang }) => {
    const t = translations[lang].opportunitiesPage;
    
    const [searchTerm, setSearchTerm] = useState('');
    
    const { featured, others } = useMemo(() => {
        const opportunities = mockData[lang].directoryItems.filter(item => item.category === 'فرص عقارية') as FeaturedProject[];
        
        const filtered = opportunities.filter(item => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                   item.developer.toLowerCase().includes(lowerCaseSearchTerm) ||
                   item.description.toLowerCase().includes(lowerCaseSearchTerm);
        });

        // For demonstration, let's assume the first item is featured
        return {
            featured: filtered.length > 0 ? filtered[0] : null,
            others: filtered.slice(1)
        };

    }, [searchTerm, lang]);

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
                <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">{t.subtitle}</p>
            </div>

            {/* Search Bar */}
            <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm py-6 mb-8 border-b border-zinc-200">
                <div className="relative max-w-2xl mx-auto">
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
            </div>

            {/* Featured Opportunity */}
            {featured && (
                <div className="mb-12">
                    <OpportunityCard project={featured} lang={lang} isFeatured={true} />
                </div>
            )}
            
            {/* Ad Banner Placeholder */}
             <div className="bg-zinc-100 border border-zinc-200 text-center py-8 px-4 my-12">
                <p className="text-zinc-600">{t.adBanner}</p>
            </div>


            {/* Other Opportunities */}
            {others.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {others.map(item => <OpportunityCard key={item.id} project={item} lang={lang} />)}
                </div>
            ) : (
                !featured && (
                    <div className="text-center py-16">
                        <h2 className="text-2xl text-zinc-600">{t.noResults}</h2>
                        <p className="text-zinc-500 mt-2">{t.noResultsSubtitle}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default OpportunitiesPage;