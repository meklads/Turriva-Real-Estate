import React, { useState, useMemo } from 'react';
import { LandListing, Language } from '../types';
import { mockData } from '../data/mockData';
import { SearchIcon, MapPinIcon } from '../components/Icons';
import { translations } from '../lib/translations';

const LandCard: React.FC<{ listing: LandListing, lang: Language }> = ({ listing, lang }) => {
    const t = translations[lang].landMarketPage;
    
    return (
        <div className="bg-white border border-zinc-200 flex flex-col md:flex-row items-start p-6 group transition-all duration-300 hover:border-gold hover:shadow-lg">
            <img src={listing.imageUrl} alt={`Land in ${listing.neighborhood}`} className="w-full md:w-56 h-48 md:h-full object-cover mb-4 md:mb-0"/>
            <div className={`flex-grow ${lang === 'en' ? 'md:ml-6' : 'md:mr-6'}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={`text-2xl mt-1 ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{listing.neighborhood}, {listing.city}</h3>
                        <p className="text-zinc-500 text-sm mt-1">{t.owner}: {listing.ownerName}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-zinc-900">{listing.area} {t.areaUnit}</p>
                    </div>
                </div>
                <p className="text-zinc-700 mt-4 text-sm">{listing.description}</p>
                <div className="flex justify-between items-center mt-6 border-t border-zinc-200 pt-4">
                    <p className="text-sm text-zinc-500">{t.posted}: {listing.postedDate}</p>
                    <button className="bg-black text-white font-bold py-2 px-5 hover:bg-gold hover:text-black transition-colors">
                        {t.contactOwner}
                    </button>
                </div>
            </div>
        </div>
    );
};

interface LandMarketPageProps {
  lang: Language;
}

const LandMarketPage: React.FC<LandMarketPageProps> = ({ lang }) => {
    const t = translations[lang].landMarketPage;
    
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredListings = useMemo(() => {
        return mockData[lang].landListings.filter(listing => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return listing.city.toLowerCase().includes(lowerCaseSearchTerm) ||
                   listing.neighborhood.toLowerCase().includes(lowerCaseSearchTerm);
        });
    }, [searchTerm, lang]);

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
                <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">
                    {t.subtitle}
                </p>
            </div>

            {/* Search and Filters */}
            <div className="sticky top-[73px] z-30 bg-white/90 backdrop-blur-sm py-6 mb-8 border-b border-zinc-200">
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
            </div>

            {/* Land Listings */}
            {filteredListings.length > 0 ? (
                <div className="space-y-8">
                    {filteredListings.map(listing => <LandCard key={listing.id} listing={listing} lang={lang} />)}
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

export default LandMarketPage;