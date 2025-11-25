
import React, { useState, useMemo, useEffect } from 'react';
import { DirectoryCategory, Profile, FeaturedProject, Page, User, PortfolioProjectStyle, Language, AuthModalView } from '../types';
import { mockData } from '../data/mockData';
import { SearchIcon, StarIcon, BadgeCheckIcon, ShieldCheckIcon } from '../components/Icons';
import { translations } from '../lib/translations';

// Profile Card Component
const ProfileCard: React.FC<{ profile: Profile, lang: Language, onProfileClick: () => void }> = ({ profile, lang, onProfileClick }) => {
    return (
        <div onClick={onProfileClick} className="bg-white border border-zinc-200 group transition-all duration-300 hover:border-gold hover:shadow-lg cursor-pointer">
            <div className="relative overflow-hidden h-56">
                <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-5">
                <div className="flex items-center">
                    <h3 className={`text-xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black truncate`}>{profile.name}</h3>
                    {profile.isVerified && <ShieldCheckIcon title="Verified Member" className="w-5 h-5 text-gold flex-shrink-0 mr-2 rtl:ml-2" />}
                </div>
                <p className="text-zinc-500 text-sm">{profile.specialty}</p>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-zinc-500">{profile.location}</p>
                    <div className="flex items-center">
                        <StarIcon />
                        <span className={`font-bold text-zinc-800 ${lang === 'en' ? 'ml-1' : 'mr-1'}`}>{profile.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface DirectoryPageProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
  currentUser: User | null;
  openAuthModal: (view: AuthModalView, redirectPage?: Page) => void;
  viewProfile: (id: number) => void;
  initialFilters: { style?: PortfolioProjectStyle | null };
  clearInitialFilters: () => void;
}

const DirectoryPage: React.FC<DirectoryPageProps> = ({ lang, setCurrentPage, currentUser, openAuthModal, viewProfile, initialFilters, clearInitialFilters }) => {
    const t = translations[lang].directoryPage;
    const dirCatT = translations[lang].directoryCategories;
    const projectsT = translations[lang].projectsPage;

    const categories: { key: DirectoryCategory, label: string }[] = [
        { key: 'شركات تطوير عقاري', label: dirCatT.realEstate },
        { key: 'شركات مقاولات', label: dirCatT.contracting },
        { key: 'مكاتب هندسية', label: dirCatT.engineering },
        { key: 'مكاتب ديكور', label: dirCatT.decor },
        { key: 'مواد البناء والعلامات التجارية', label: dirCatT.materials },
        // Removed Landscape as requested
        { key: 'خدمات فنية وتسويقية', label: dirCatT.services },
    ];
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<DirectoryCategory | 'الكل'>('الكل');
    
    // Effect to handle clearing filters if any exist (simplified since style filter is removed)
    useEffect(() => {
        if (initialFilters?.style) {
            clearInitialFilters();
        }
    }, [initialFilters, clearInitialFilters]);

    const filteredItems = useMemo(() => {
        const directoryProfiles = mockData[lang].directoryItems.filter(item => item.type === 'profile') as Profile[];

        return directoryProfiles.filter(item => {
            const itemInArabic = mockData.ar.directoryItems.find(i => i.id === item.id) as Profile | undefined;
            if (!itemInArabic) return false;

            const matchesCategory = selectedCategory === 'الكل' || itemInArabic.category === selectedCategory;
            
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const matchesSearch = item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                                  item.specialty.toLowerCase().includes(lowerCaseSearchTerm) ||
                                  item.location.toLowerCase().includes(lowerCaseSearchTerm);

            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory, lang]);

    const handleExclusiveAccessClick = () => {
        if (currentUser) {
            setCurrentPage('hub');
        } else {
            openAuthModal('signup', 'hub');
        }
    };

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
                <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">{t.subtitle}</p>
            </div>

            {/* Search and Filters */}
            <div className="sticky top-16 z-30 bg-white py-6 mb-8 border-b border-zinc-200">
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
                <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 px-2 mb-4">
                    <button onClick={() => setSelectedCategory('الكل')} className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${selectedCategory === 'الكل' ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'}`}>{t.all}</button>
                    {categories.map(category => (
                        <button key={category.key} onClick={() => setSelectedCategory(category.key)} className={`px-3 py-1 text-sm font-medium transition-colors duration-300 ${selectedCategory === category.key ? 'text-gold border-b-2 border-gold' : 'text-zinc-500 hover:text-gold'}`}>{category.label}</button>
                    ))}
                </div>
            </div>

            {/* Items List */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredItems.map(item => <ProfileCard key={item.id} profile={item} lang={lang} onProfileClick={() => viewProfile(item.id)} />)}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl text-zinc-600">{t.noResults}</h2>
                    <p className="text-zinc-500 mt-2">{t.noResultsSubtitle}</p>
                </div>
            )}
        </div>
    );
};

export default DirectoryPage;
