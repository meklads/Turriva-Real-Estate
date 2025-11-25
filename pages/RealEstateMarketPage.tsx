import React, { useState, useMemo } from 'react';
import { Page, Profile, PropertyListing, PropertyListingType, User, Language } from '../types';
import { translations } from '../lib/translations';
import { mockData } from '../data/mockData';
import { SearchIcon, BedIcon, BathIcon, RulerIcon, MapPinIcon } from '../components/Icons';


interface RealEstateMarketPageProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
  viewProfile: (id: number) => void;
  viewProperty: (id: string) => void;
}

const PropertyCard: React.FC<{ listing: PropertyListing, lang: Language, onClick: () => void }> = ({ listing, lang, onClick }) => {
    const t = translations[lang].realEstateMarketPage;
    
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US').format(price);
    };

    return (
        <div onClick={onClick} className="bg-white border border-zinc-200 group transition-all duration-300 hover:border-gold hover:shadow-lg cursor-pointer flex flex-col">
            <div className="relative overflow-hidden">
                <img src={listing.coverImageUrl} alt={listing.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute top-3 left-3 rtl:right-3 bg-black/50 text-white text-xs font-bold py-1 px-2">{t.types[listing.type]}</span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className={`text-xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black truncate`}>{listing.title}</h3>
                <p className="text-zinc-500 text-sm mt-1 flex items-center"><MapPinIcon className="w-4 h-4 mr-1 rtl:ml-1"/>{listing.location}</p>
                <p className="text-2xl font-bold text-black my-4">{formatPrice(listing.price)} <span className="text-base font-normal text-zinc-600">{t.currency}</span></p>
                
                <div className="mt-auto border-t border-zinc-200 pt-4 flex justify-around text-sm text-zinc-600">
                    {listing.bedrooms && (
                        <span className="flex items-center"><BedIcon className="w-5 h-5 mr-2 rtl:ml-2"/> {listing.bedrooms}</span>
                    )}
                     {listing.bathrooms && (
                        <span className="flex items-center"><BathIcon className="w-5 h-5 mr-2 rtl:ml-2"/> {listing.bathrooms}</span>
                    )}
                     <span className="flex items-center"><RulerIcon className="w-5 h-5 mr-2 rtl:ml-2"/> {listing.area} {t.sqm}</span>
                </div>
            </div>
        </div>
    );
};

const RealEstateMarketPage: React.FC<RealEstateMarketPageProps> = ({ lang, setCurrentPage, viewProfile, viewProperty }) => {
    const t = translations[lang].realEstateMarketPage;
    
    const [searchTerm, setSearchTerm] = useState('');
    const [propertyType, setPropertyType] = useState<PropertyListingType | 'all'>('all');
    const [priceRange, setPriceRange] = useState<string>('any');
    const [bedrooms, setBedrooms] = useState<string>('any');

    const filteredListings = useMemo(() => {
        return mockData[lang].propertyListings.filter(listing => {
            const listingInArabic = mockData.ar.propertyListings.find(p => p.id === listing.id);
            if (!listingInArabic) return false;
            
            // Search term filter
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const matchesSearch = listing.title.toLowerCase().includes(lowerCaseSearchTerm) || listing.location.toLowerCase().includes(lowerCaseSearchTerm);
            
            // Property type filter
            const matchesType = propertyType === 'all' || listingInArabic.type === propertyType;

            // Price range filter
            const matchesPrice = priceRange === 'any' || 
                (priceRange === '1m' && listing.price < 1000000) ||
                (priceRange === '1-3m' && listing.price >= 1000000 && listing.price <= 3000000) ||
                (priceRange === '3m+' && listing.price > 3000000);

            // Bedrooms filter
            const matchesBedrooms = bedrooms === 'any' ||
                (bedrooms === '1-2' && listing.bedrooms && listing.bedrooms >= 1 && listing.bedrooms <= 2) ||
                (bedrooms === '3-4' && listing.bedrooms && listing.bedrooms >= 3 && listing.bedrooms <= 4) ||
                (bedrooms === '5+' && listing.bedrooms && listing.bedrooms >= 5);

            return matchesSearch && matchesType && matchesPrice && matchesBedrooms;
        });
    }, [searchTerm, propertyType, priceRange, bedrooms, lang]);

    return (
         <div className="bg-zinc-50">
            <div className="container mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
                    <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>
                
                {/* Search and Filters */}
                <div className="sticky top-[72px] z-30 mb-8">
                    <div className="bg-white py-6 border-b border-zinc-200">
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                            <div>
                                <label className="text-sm font-medium text-zinc-700">{t.filters.type}</label>
                                <select value={propertyType} onChange={e => setPropertyType(e.target.value as any)} className="w-full mt-1 bg-white border border-zinc-300 h-12 px-3 text-black focus:outline-none focus:border-black">
                                    <option value="all">{t.filters.all}</option>
                                    <option value="apartment">{t.types.apartment}</option>
                                    <option value="villa">{t.types.villa}</option>
                                    <option value="land">{t.types.land}</option>
                                    <option value="commercial">{t.types.commercial}</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-zinc-700">{t.filters.price}</label>
                                <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="w-full mt-1 bg-white border border-zinc-300 h-12 px-3 text-black focus:outline-none focus:border-black">
                                    <option value="any">{t.filters.any}</option>
                                    <option value="1m">{t.filters.price1}</option>
                                    <option value="1-3m">{t.filters.price2}</option>
                                    <option value="3m+">{t.filters.price3}</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-zinc-700">{t.filters.bedrooms}</label>
                                <select value={bedrooms} onChange={e => setBedrooms(e.target.value)} className="w-full mt-1 bg-white border border-zinc-300 h-12 px-3 text-black focus:outline-none focus:border-black">
                                    <option value="any">{t.filters.any}</option>
                                    <option value="1-2">{t.filters.beds1}</option>
                                    <option value="3-4">{t.filters.beds2}</option>
                                    <option value="5+">{t.filters.beds3}</option>
                                </select>
                            </div>
                            <div className="col-span-2 md:col-span-1 flex items-end">
                                 <button className="w-full h-12 bg-black text-white font-bold hover:bg-zinc-800 transition-colors">{t.filters.apply}</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Listings */}
                {filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredListings.map(listing => <PropertyCard key={listing.id} listing={listing} lang={lang} onClick={() => viewProperty(listing.id)}/>)}
                    </div>
                ) : (
                     <div className="text-center py-16">
                        <h2 className="text-2xl text-zinc-600">{t.noResults}</h2>
                        <p className="text-zinc-500 mt-2">{t.noResultsSubtitle}</p>
                    </div>
                )}
            </div>
         </div>
    );
};

export default RealEstateMarketPage;