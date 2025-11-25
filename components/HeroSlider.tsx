
import React, { useState, useEffect } from 'react';
import { Page, Language } from '../types';
import { translations } from '../lib/translations';

interface HeroSliderProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang];
  const hero = t.homePage.hero;
  
  const slides = [
    {
      id: 1,
      // Updated: Grand Modern Palace Interior - Dazzling and High Class
      image: 'https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: hero.title,
      subtitle: hero.subtitle,
      primaryBtn: hero.btnPrimary,
      secondaryBtn: hero.btnSecondary,
      // FIX: Navigate to page instead of scrolling to non-existent ID on home
      primaryAction: () => setCurrentPage('ai-design-studio'),
      secondaryAction: () => setCurrentPage('directory'),
    },
    {
      id: 2, 
      // Updated: Luxury Modern Villa suitable for Dubai/Qatar/Saudi aesthetics
      image: 'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: lang === 'en' ? 'Design Mastery' : 'روعة التصميم',
      subtitle: lang === 'en' ? 'Architectural masterpieces crafted for the elite.' : 'تحف معمارية صُممت خصيصاً للنخبة، حيث تلتقي الفخامة بالبساطة.',
      primaryBtn: lang === 'en' ? 'View Designs' : 'شاهد التصاميم',
      secondaryBtn: lang === 'en' ? 'Start Project' : 'ابدأ مشروعك',
      primaryAction: () => setCurrentPage('inspirations'),
      // FIX: Navigate to page instead of scrolling
      secondaryAction: () => setCurrentPage('ai-design-studio'),
    },
    {
      id: 3,
      // Sophisticated Gold/Dark Decor Detail
      image: 'https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: lang === 'en' ? 'Execution You Can Trust' : 'الثقة في التنفيذ',
      subtitle: lang === 'en' ? 'From design to key handover, we connect you with the best.' : 'من التصميم وحتى تسليم المفتاح، نربطك بأفضل المقاولين.',
      primaryBtn: lang === 'en' ? 'Find Pros' : 'ابحث عن محترف',
      secondaryBtn: lang === 'en' ? 'Discover Inspirations' : 'اكتشف الإلهام',
      primaryAction: () => setCurrentPage('directory'),
      secondaryAction: () => setCurrentPage('inspirations'),
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-zinc-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
           {/* Image with Ken Burns Effect */}
           <div className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
                style={{ backgroundImage: `url(${slide.image})` }}>
           </div>
           
           {/* Overlay */}
           <div className="absolute inset-0 bg-black/40"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
           
           {/* Content */}
           <div className="absolute inset-0 flex items-start justify-center text-center px-6 pt-32 md:pt-48">
             <div className={`max-w-5xl transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                
                {/* Main Title - Gold */}
                <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold text-gold mb-8 leading-tight drop-shadow-xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                    {slide.title}
                </h1>

                {/* Teaser - INCREASED SIZE as requested */}
                {hero.teasers && hero.teasers[index] && (
                    <p className="text-white text-xl md:text-3xl font-bold tracking-wide mb-6 drop-shadow-md leading-normal">
                        {hero.teasers[index]}
                    </p>
                )}

                {/* Subtitle - RESTORED SIZE (Larger) */}
                <p className="text-zinc-100 text-lg md:text-xl font-light mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                    {slide.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={slide.primaryAction} className="bg-white text-black font-bold py-4 px-10 text-sm tracking-widest uppercase hover:bg-gold transition-colors duration-300 shadow-lg">
                        {slide.primaryBtn}
                    </button>
                    <button onClick={slide.secondaryAction} className="border border-white text-white font-bold py-4 px-10 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300 drop-shadow-md">
                        {slide.secondaryBtn}
                    </button>
                </div>
             </div>
           </div>
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
            <button 
                key={index} 
                onClick={() => setCurrentSlide(index)}
                className={`h-1 transition-all duration-300 shadow-sm ${index === currentSlide ? 'w-12 bg-gold' : 'w-4 bg-white/50 hover:bg-white'}`}
            />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
