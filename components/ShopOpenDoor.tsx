
import React, { useRef } from 'react';
import { Page, Language } from '../types';
import { translations } from '../lib/translations';
import { mockData } from '../data/mockData';
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from './Icons';

interface ShopOpenDoorProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
  viewStore: (id: string) => void;
}

const ShopOpenDoor: React.FC<ShopOpenDoorProps> = ({ lang, setCurrentPage, viewStore }) => {
  const t = translations[lang].homePage.shopCta;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stores = mockData[lang].stores;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 bg-zinc-50 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
            <h2 className={`text-4xl md:text-5xl font-bold text-black mb-4 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                {t.title}
            </h2>
            <p className="text-zinc-500 max-w-md">
                {t.subtitle}
            </p>
        </div>
        <div className="flex gap-4">
            <button onClick={() => scroll(lang === 'ar' ? 'right' : 'left')} className="w-12 h-12 border border-zinc-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all">
                <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button onClick={() => scroll(lang === 'ar' ? 'left' : 'right')} className="w-12 h-12 border border-zinc-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all">
                <ChevronRightIcon className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto pb-12 px-6 md:px-24 no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {stores.map((store, index) => (
            <div 
                key={store.id}
                onClick={() => viewStore(store.id)}
                className="min-w-[280px] md:min-w-[350px] group cursor-pointer snap-start"
            >
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <img src={store.imageUrl} alt={store.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="bg-white text-black text-xs font-bold px-4 py-2 uppercase tracking-widest">
                            {lang === 'en' ? 'View Inspiration' : 'عرض التفاصيل'}
                        </span>
                    </div>
                </div>
                <h3 className={`text-xl font-bold text-black group-hover:text-gold transition-colors ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{store.name}</h3>
                <p className="text-sm text-zinc-500 mt-1">{store.collectionTitle}</p>
            </div>
        ))}
        
        {/* View All Card */}
        <div 
            onClick={() => setCurrentPage('inspirations')}
            className="min-w-[280px] md:min-w-[350px] bg-zinc-900 flex flex-col items-center justify-center text-white cursor-pointer group snap-start border border-zinc-800 hover:border-gold/50 transition-colors"
        >
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-300">
                <ArrowRightIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest">{t.viewAll}</h3>
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ShopOpenDoor;
