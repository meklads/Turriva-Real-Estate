
import React, { useRef } from 'react';
import { Language, Page } from '../types';
import { translations } from '../lib/translations';
import { ShieldCheckIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface EliteProsCarouselProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
}

const EliteProsCarousel: React.FC<EliteProsCarouselProps> = ({ lang, setCurrentPage }) => {
  const sectionTitleClass = `text-3xl md:text-5xl font-bold text-center mb-12 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? (lang === 'ar' ? scrollAmount : -scrollAmount) : (lang === 'ar' ? -scrollAmount : scrollAmount),
        behavior: 'smooth',
      });
    }
  };
  
  const pros = [
      { name: 'United Contracting', role: 'Contractor', img: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { name: 'Horizon Architects', role: 'Architecture Firm', img: 'https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { name: 'Luxury Interiors', role: 'Design Studio', img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { name: 'Build Tech', role: 'Engineering', img: 'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { name: 'Urban Planners', role: 'Consultants', img: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { name: 'Skyline Developers', role: 'Development', img: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];

  return (
    <section className="py-24 bg-zinc-50 overflow-hidden relative">
        <div className="container mx-auto px-6 relative">
            <h2 className={`${sectionTitleClass} text-zinc-900`}>
                {lang === 'en' ? 'Elite Professionals' : 'نخبة المحترفين'}
            </h2>
            
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 z-10 hidden md:block">
                <button onClick={() => scroll('left')} className="w-12 h-12 bg-white/80 backdrop-blur border border-zinc-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-lg">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10 hidden md:block">
                <button onClick={() => scroll('right')} className="w-12 h-12 bg-white/80 backdrop-blur border border-zinc-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-lg">
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Horizontal Scroll Container */}
            <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 px-4 no-scrollbar snap-x"
            >
                {pros.map((pro, i) => (
                    <div 
                        key={i} 
                        onClick={() => setCurrentPage('directory')}
                        className="snap-center shrink-0 w-[280px] md:w-[320px] aspect-[9/16] relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        <img src={pro.img} alt={pro.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
                        
                        <div className="absolute top-4 left-4">
                            <div className="bg-gold/90 backdrop-blur text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {lang === 'en' ? 'Verified' : 'موثوق'}
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                            <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">{pro.role}</p>
                            <h3 className={`text-2xl font-bold leading-tight mb-2 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{pro.name}</h3>
                            <button className="text-gold text-sm font-bold border-b border-gold pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                {lang === 'en' ? 'View Profile' : 'عرض الملف'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default EliteProsCarousel;
