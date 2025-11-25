
import React, { useMemo } from 'react';
import { Profile, Product, Language } from '../types';
import { mockData } from '../data/mockData';
import { ShieldCheckIcon, StarIcon } from './Icons';
import { translations } from '../lib/translations';

interface ExecutionBridgeProps {
    lang: Language;
    style?: string;
    category?: string;
    viewProfile: (id: number) => void;
}

const ProfessionalRecommendationCard: React.FC<{ 
    profile: Profile, 
    role: string, 
    lang: Language,
    viewProfile: (id: number) => void;
}> = ({ profile, role, lang, viewProfile }) => {
    const t = translations[lang].aiDesignStudioPage;
    return (
        <div className="bg-white border border-zinc-200 p-4 flex items-start gap-4 hover:border-gold transition-colors group cursor-pointer" onClick={() => viewProfile(profile.id)}>
            <img src={profile.imageUrl} alt={profile.name} className="w-16 h-16 object-cover flex-shrink-0" />
            <div className="flex-grow">
                <p className="text-xs text-gold font-bold uppercase tracking-wider mb-1">{role}</p>
                <h4 className="font-bold text-black text-sm group-hover:text-gold transition-colors">{profile.name}</h4>
                <div className="flex items-center mt-1 text-xs text-zinc-500">
                    <StarIcon className="w-3 h-3 text-yellow-400 mr-1 rtl:ml-1" />
                    <span className="font-bold text-black mr-1 rtl:ml-1">{profile.rating}</span>
                    <span>({profile.location})</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); viewProfile(profile.id); }} className="mt-3 w-full bg-zinc-900 text-white text-xs font-bold py-2 hover:bg-gold hover:text-black transition-colors">
                    {t.hireButton}
                </button>
            </div>
        </div>
    );
};

const ProductRecommendationCard: React.FC<{ product: Product, lang: Language }> = ({ product, lang }) => {
    const t = translations[lang].aiDesignStudioPage;
    return (
        <div className="bg-white border border-zinc-200 p-4 flex flex-col hover:border-gold transition-colors group">
            <div className="h-24 w-full bg-zinc-50 flex items-center justify-center mb-3 overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="font-bold text-black text-xs truncate">{product.name}</h4>
            <p className="text-zinc-500 text-xs mt-1">{product.price}</p>
            <a href={product.externalUrl} target="_blank" rel="noreferrer" className="mt-3 w-full bg-white border border-zinc-300 text-black text-xs font-bold py-2 text-center hover:bg-black hover:text-white hover:border-black transition-colors block">
                {t.buyButton}
            </a>
        </div>
    );
};

const ExecutionBridge: React.FC<ExecutionBridgeProps> = ({ lang, style, category, viewProfile }) => {
    const t = translations[lang].aiDesignStudioPage;
    const t_bridge = translations[lang].projectDetailPage;

    // Simulated "AI" Logic to find people based on props
    const { designer, contractor, products } = useMemo(() => {
        const directory = mockData[lang].directoryItems.filter(i => i.type === 'profile') as Profile[];
        const allProducts = mockData[lang].products;

        // 1. Find Designer: Filter by "decor" or "design"
        // In a real app, check if profile.specialty matches `style` (e.g. Modern)
        let des = directory.find(p => 
            (p.category.includes('ديكور') || p.specialty.toLowerCase().includes('design')) && 
            (style ? p.bio.toLowerCase().includes(style.toLowerCase()) : true)
        );
        // Fallback
        if (!des) des = directory.find(p => p.category.includes('ديكور'));
        if (!des) des = directory[0];

        // 2. Find Contractor: Filter by "contracting"
        let con = directory.find(p => p.category.includes('مقاولات'));
        if (!con) con = directory[1];

        // 3. Find Products: Just grab 2 random ones for now or filter by category
        const prod = allProducts.slice(0, 2);

        return { designer: des, contractor: con, products: prod };
    }, [lang, style]);

    return (
        <div className="bg-zinc-50 border-t border-zinc-200 p-8 animate-fadeIn">
            <div className="container mx-auto">
                <div className="mb-8 flex flex-col items-start">
                    <h3 className="text-2xl font-bold text-black flex items-center gap-2 mb-2">
                        <ShieldCheckIcon className="w-6 h-6 text-gold" />
                        {t_bridge.bridgeTitle || t.recommendationsTitle}
                    </h3>
                    <p className="text-zinc-600">{t_bridge.bridgeSubtitle || t.recommendationsSubtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Recommended Designer */}
                    {designer && (
                        <ProfessionalRecommendationCard 
                            profile={designer} 
                            role={t.recDesigner}
                            lang={lang}
                            viewProfile={viewProfile}
                        />
                    )}
                    
                    {/* Recommended Contractor */}
                    {contractor && (
                        <ProfessionalRecommendationCard 
                            profile={contractor} 
                            role={t.recContractor}
                            lang={lang}
                            viewProfile={viewProfile}
                        />
                    )}

                    {/* Recommended Products */}
                    {products.map(product => (
                        <ProductRecommendationCard 
                            key={product.id} 
                            product={product} 
                            lang={lang} 
                        />
                    ))}
                </div>
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

export default ExecutionBridge;
