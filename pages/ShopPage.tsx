
import React, { useState, useMemo } from 'react';
import { Page, Store, Product, Language, ProductType } from '../types';
import { mockData } from '../data/mockData';
import { translations } from '../lib/translations';
import { SearchIcon, CubeIcon, SparklesIcon, BuildingStorefrontIcon, DownloadIcon, ArrowRightIcon } from '../components/Icons';

interface ShopPageProps {
  lang: Language;
  viewStore: (id: string) => void;
}

// --- Sub-Components ---

const DigitalProductCard: React.FC<{ product: Product, lang: Language }> = ({ product, lang }) => {
    const t = translations[lang].shopPage;
    return (
        <div className="group bg-zinc-900 border border-zinc-800 hover:border-gold/50 transition-all duration-300 relative overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider border border-white/10">
                    {t.digitalBadge}
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1">
                    {product.fileFormats?.map(fmt => (
                        <span key={fmt} className="bg-gold text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm">{fmt}</span>
                    ))}
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold text-lg leading-tight">{product.name}</h3>
                    <span className="text-gold font-en-sans font-bold">{product.price}</span>
                </div>
                <p className="text-zinc-500 text-xs mb-4">{product.storeName}</p>
                <button className="w-full bg-white/10 hover:bg-gold hover:text-black text-white font-bold py-2 text-sm transition-colors flex items-center justify-center gap-2">
                    <DownloadIcon className="w-4 h-4" /> {t.download}
                </button>
            </div>
        </div>
    )
}

const PhysicalProductCard: React.FC<{ product: Product, lang: Language }> = ({ product, lang }) => {
    const t = translations[lang].shopPage;
    return (
        <div className="bg-white border border-zinc-200 group hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-zinc-50">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                {product.originalPrice && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1">{t.discountOff}</span>
                )}
            </div>
            <div className="p-4">
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">{product.retailer}</p>
                <h3 className="font-bold text-black text-base mb-1 truncate">{product.name}</h3>
                <p className="text-lg font-bold text-zinc-900 font-en-sans">{product.price}</p>
                <button className="w-full mt-3 border border-black text-black font-bold py-2 text-sm hover:bg-black hover:text-white transition-colors">
                    {t.addToCart}
                </button>
            </div>
        </div>
    )
}

const ExclusiveProductCard: React.FC<{ product: Product, lang: Language }> = ({ product, lang }) => {
    const t = translations[lang].shopPage;
    return (
        <div className="bg-black border border-gold/30 p-1 group cursor-pointer">
            <div className="bg-zinc-900 h-full p-6 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="mb-6 relative z-10">
                    <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-2">{t.exclusiveBadge}</span>
                    <h3 className="text-white text-2xl font-serif leading-tight">{product.name}</h3>
                </div>
                <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-700" />
                </div>
                <div className="mt-auto flex justify-between items-center">
                    <span className="text-white text-xl font-en-serif">{product.price}</span>
                    <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all">
                        <ArrowRightIcon className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </div>
    )
}

// --- Main Page ---

const ShopPage: React.FC<ShopPageProps> = ({ lang, viewStore }) => {
    const t = translations[lang].shopPage;
    
    const [activeTab, setActiveTab] = useState<ProductType>('physical');
    const [searchTerm, setSearchTerm] = useState('');

    const products = mockData[lang].products;

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            // 1. Filter by Type (Digital / Physical / Exclusive)
            // Note: If data doesn't have 'productType', default to 'physical'
            const pType = p.productType || 'physical';
            if (pType !== activeTab) return false;

            // 2. Filter by Search
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                return p.name.toLowerCase().includes(term) || 
                       p.category.toLowerCase().includes(term);
            }
            return true;
        });
    }, [products, activeTab, searchTerm]);

    // Distinct Layouts based on Active Tab
    const renderContent = () => {
        if (filteredProducts.length === 0) {
            return (
                <div className="py-20 text-center border border-dashed border-zinc-300 m-6">
                    <p className="text-zinc-500">No products found in this section.</p>
                </div>
            );
        }

        if (activeTab === 'digital') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                    {filteredProducts.map(p => <DigitalProductCard key={p.id} product={p} lang={lang} />)}
                </div>
            );
        } else if (activeTab === 'exclusive') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                    {filteredProducts.map(p => <ExclusiveProductCard key={p.id} product={p} lang={lang} />)}
                </div>
            );
        } else {
            // Physical
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
                    {filteredProducts.map(p => <PhysicalProductCard key={p.id} product={p} lang={lang} />)}
                </div>
            );
        }
    };

    return (
        <div className={`min-h-screen ${activeTab === 'digital' ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'} transition-colors duration-500`}>
            
            {/* Hero Section */}
            <section className={`py-20 px-6 border-b ${activeTab === 'digital' ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div className="container mx-auto text-center">
                    <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                        {t.title}
                    </h1>
                    <p className={`text-xl max-w-3xl mx-auto ${activeTab === 'digital' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {t.subtitle}
                    </p>
                </div>
            </section>

            {/* Navigation Tabs */}
            <div className={`sticky top-[72px] z-30 ${activeTab === 'digital' ? 'bg-black/90 border-zinc-800' : 'bg-white/90 border-zinc-200'} border-b backdrop-blur-md`}>
                <div className="container mx-auto px-6">
                    <div className="flex justify-center space-x-8 rtl:space-x-reverse overflow-x-auto">
                        <button 
                            onClick={() => setActiveTab('physical')}
                            className={`py-6 px-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'physical' ? 'border-black text-black' : 'border-transparent text-zinc-500 hover:text-black'}`}
                        >
                            <div className="flex items-center gap-2">
                                <BuildingStorefrontIcon className="w-5 h-5" />
                                {t.tabs.physical}
                            </div>
                        </button>
                        <button 
                            onClick={() => setActiveTab('digital')}
                            className={`py-6 px-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'digital' ? 'border-gold text-gold' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                        >
                            <div className="flex items-center gap-2">
                                <CubeIcon className="w-5 h-5" />
                                {t.tabs.digital}
                            </div>
                        </button>
                        <button 
                            onClick={() => setActiveTab('exclusive')}
                            className={`py-6 px-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'exclusive' ? 'border-black text-black' : 'border-transparent text-zinc-500 hover:text-black'} ${activeTab === 'digital' && 'text-zinc-600 hover:text-zinc-400'}`}
                        >
                            <div className="flex items-center gap-2">
                                <SparklesIcon className="w-5 h-5" />
                                {t.tabs.exclusive}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-6 py-16">
                
                {/* Search Bar */}
                <div className="mb-12 max-w-md mx-auto relative">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full py-3 px-12 border ${activeTab === 'digital' ? 'bg-zinc-900 border-zinc-700 text-white focus:border-gold' : 'bg-white border-zinc-300 text-black focus:border-black'} rounded-full focus:outline-none transition-colors`}
                    />
                    <SearchIcon className={`absolute top-1/2 -translate-y-1/2 ${lang === 'en' ? 'left-4' : 'right-4'} w-5 h-5 text-zinc-500`} />
                </div>

                {renderContent()}

            </div>
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ShopPage;
