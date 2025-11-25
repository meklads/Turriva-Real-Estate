
import React, { useEffect, useState, useRef } from 'react';
import { Language, Page } from '../types';
import { translations } from '../lib/translations';
import { CubeIcon, PlayIcon, VrIcon, SparklesIcon, ChevronRightIcon, BadgeCheckIcon, ChartBarIcon, BoltIcon, ArrowRightIcon } from '../components/Icons';

interface GraphicsHousePageProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
}

// --- Advanced Interactive Components ---

const ROICard: React.FC<{ title: string; value: string; desc: string; delay: string }> = ({ title, value, desc, delay }) => (
    <div className={`bg-zinc-900/50 border border-zinc-800 p-8 backdrop-blur-sm hover:border-gold/50 transition-all duration-700 group animate-fadeInUp`} style={{ animationDelay: delay }}>
        <div className="text-gold mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <ChartBarIcon className="w-8 h-8" />
        </div>
        <h4 className="text-zinc-400 text-sm uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-4xl md:text-5xl font-bold text-white mb-4 font-en-sans">{value}</p>
        <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{desc}</p>
    </div>
);

// --- Main Page Component ---

const GraphicsHousePage: React.FC<GraphicsHousePageProps> = ({ lang, setCurrentPage }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect for Hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (heroRef.current) {
            const { left, top, width, height } = heroRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            setMousePos({ x, y });
        }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const t_en = {
      hero: {
          label: 'The Studio',
          title1: 'We Don\'t Just Render.',
          title2: 'We Sell The Dream.',
          subtitle: 'The premium visualization arm of Turriva. Creating unbuilt realities that drive millions in real estate revenue.',
          cta: 'Start A Project',
          reel: 'Showreel 2024'
      },
      roi: {
          title: 'The Business of Beauty',
          subtitle: 'Why top developers choose Graphics House? Because our visuals calculate.',
          card1Title: 'Presale Velocity',
          card1Value: '2.5x',
          card1Desc: 'Projects with our high-end visualization sell out twice as fast as market average.',
          card2Title: 'Price Premium',
          card2Value: '+15%',
          card2Desc: 'Perceived value increases significantly with cinematic presentation.',
          card3Title: 'Client Trust',
          card3Desc: 'Reducing hesitation by showing the exact future reality.',
      },
      ecosystem: {
          title: 'The Ecosystem',
          desc: 'Graphics House is not just a studio. We are the engine behind Turriva.',
          point1: 'Graphics House: The Creative Engine (Services)',
          point2: 'Turriva: The Digital Platform (Marketplace)',
          cta: 'Explore Platform'
      },
      contact: 'Ready to Dominate the Market?'
  };

  const t_ar = {
      hero: {
          label: 'الاستوديو',
          title1: 'نحن لا نرسم صوراً.',
          title2: 'نحن نبيع الحلم.',
          subtitle: 'الذراع الإبداعي لمنصة توريڤا. نصنع واقعاً لم يُبنَ بعد، ليحقق مبيعات عقارية بالملايين.',
          cta: 'ابدأ مشروعك',
          reel: 'شاهد العرض'
      },
      roi: {
          title: 'الجمال بلغة الأرقام',
          subtitle: 'لماذا يختار كبار المطورين جرافيكس هاوس؟ لأن تصاميمنا ترفع العوائد.',
          card1Title: 'سرعة البيع',
          card1Value: '2.5x',
          card1Desc: 'المشاريع التي تستخدم إظهارنا المعماري تُباع أسرع بمرتين من متوسط السوق.',
          card2Title: 'زيادة القيمة',
          card2Value: '+15%',
          card2Desc: 'القيمة المدركة للعقار ترتفع بشكل ملحوظ مع العرض السينمائي.',
          card3Title: 'ثقة العميل',
          card3Desc: 'نلغي التردد عند المشتري من خلال توضيح المستقبل بدقة متناهية.',
      },
      ecosystem: {
          title: 'النظام البيئي المتكامل',
          desc: 'جرافيكس هاوس ليست مجرد استوديو. نحن المحرك الرئيسي خلف منصة توريڤا.',
          point1: 'جرافيكس هاوس: المحرك الإبداعي (خدمات)',
          point2: 'توريڤا: المنصة الرقمية (سوق ومجتمع)',
          cta: 'استكشف المنصة'
      },
      contact: 'جاهز للسيطرة على السوق؟'
  };

  const txt = lang === 'en' ? t_en : t_ar;

  return (
    <div className="bg-black text-white selection:bg-gold selection:text-black overflow-x-hidden">
      
      {/* 1. Avant-Garde Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center perspective-1000">
        {/* Background Layers with Mouse Parallax */}
        <div className="absolute inset-0 z-0 scale-110" style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}>
            <img 
              src="https://images.pexels.com/photos/2089696/pexels-photo-2089696.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              className="w-full h-full object-cover opacity-40"
              alt="Background"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0"></div>
        
        {/* Floating Elements (Dust/Particles simulation) */}
        <div className="absolute inset-0 z-10 opacity-30 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto" style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}>
          <div className="flex justify-center mb-8">
             <div className="border border-gold/30 bg-gold/5 backdrop-blur-md px-6 py-2 rounded-full flex items-center gap-3 animate-pulse">
                <div className="w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_#C0A062]"></div>
                <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">{txt.hero.label}</span>
             </div>
          </div>
          
          <h1 className={`text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tighter ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
            <span className="block text-white mix-blend-difference">{txt.hero.title1}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold bg-300% animate-gradient">
              {txt.hero.title2}
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            {txt.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button 
                onClick={() => setCurrentPage('ai-design-studio')}
                className="group relative px-12 py-5 bg-white text-black font-bold text-sm tracking-[0.2em] uppercase overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">{txt.hero.cta}</span>
              <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <button className="flex items-center gap-4 text-white hover:text-gold transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all bg-white/5 backdrop-blur">
                <PlayIcon className="w-5 h-5 fill-current ml-1" />
              </div>
              <span className="text-sm font-bold tracking-widest uppercase group-hover:translate-x-2 transition-transform">{txt.hero.reel}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. ROI Section - The Business Logic */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(zinc-800 1px, transparent 1px), linear-gradient(90deg, zinc-800 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="container mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                  <div>
                      <h2 className={`text-5xl md:text-7xl mb-6 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{txt.roi.title}</h2>
                      <div className="h-1 w-20 bg-gold mb-6"></div>
                      <p className="text-xl text-zinc-400 leading-relaxed max-w-md">{txt.roi.subtitle}</p>
                  </div>
                  <div className="hidden lg:block">
                      {/* Abstract Graph Visual */}
                      <div className="flex items-end justify-between h-64 w-full border-b border-zinc-800 pb-4 px-4">
                          {[40, 65, 45, 80, 60, 90, 100].map((h, i) => (
                              <div key={i} className="w-8 bg-zinc-800 hover:bg-gold transition-colors duration-500 rounded-t-sm relative group">
                                  <div className="absolute bottom-0 w-full bg-gold transition-all duration-1000" style={{ height: `${h}%` }}></div>
                                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-gold text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                  <ROICard title={txt.roi.card1Title} value={txt.roi.card1Value} desc={txt.roi.card1Desc} delay="0s" />
                  <ROICard title={txt.roi.card2Title} value={txt.roi.card2Value} desc={txt.roi.card2Desc} delay="0.2s" />
                  <ROICard title={lang === 'en' ? 'Conversion' : 'التحويل'} value="90%" desc={txt.roi.card3Desc} delay="0.4s" />
              </div>
          </div>
      </section>

      {/* 3. The Split Comparison (Interactive) */}
      <section className="h-screen w-full relative overflow-hidden group">
          <div className="absolute inset-0 w-1/2 bg-zinc-900 z-10 border-r border-gold/50 overflow-hidden transition-all duration-500 ease-out group-hover:w-[40%]">
               <img src="https://images.pexels.com/photos/1029611/pexels-photo-1029611.jpeg" className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 mix-blend-luminosity" alt="Wireframe/Concept" />
               <div className="absolute inset-0 flex items-center justify-center">
                   <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-white/20 uppercase tracking-widest rotate-90 md:rotate-0">Concept</h3>
               </div>
          </div>
          <div className="absolute inset-0 w-full bg-black">
               <img src="https://images.pexels.com/photos/1029611/pexels-photo-1029611.jpeg" className="absolute inset-0 w-full h-full object-cover" alt="Reality" />
               <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none">
                   <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-white/20 uppercase tracking-widest rotate-90 md:rotate-0">Reality</h3>
               </div>
          </div>
          
          {/* Central Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-gold text-black font-bold rounded-full w-20 h-20 flex items-center justify-center border-4 border-black shadow-2xl">
              VS
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 text-center z-20 pointer-events-none">
              <p className="text-white text-lg font-bold uppercase tracking-[0.3em] bg-black/50 inline-block px-4 py-2 backdrop-blur">{lang === 'en' ? 'Precision Engineering' : 'هندسة دقيقة'}</p>
          </div>
      </section>

      {/* 4. The Ecosystem - Connecting Turriva */}
      <section className="py-32 bg-white text-black relative">
          <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                  <div className="md:w-1/2">
                      <span className="text-gold font-bold tracking-[0.2em] uppercase mb-4 block">Graphics House Group</span>
                      <h2 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                          {txt.ecosystem.title}
                      </h2>
                      <p className="text-xl text-zinc-600 mb-10 leading-relaxed">
                          {txt.ecosystem.desc}
                      </p>
                      <ul className="space-y-6 mb-12">
                          <li className="flex items-center text-lg font-bold">
                              <div className="w-3 h-3 bg-black rounded-full mr-4 rtl:ml-4"></div>
                              {txt.ecosystem.point1}
                          </li>
                          <li className="flex items-center text-lg font-bold text-zinc-500">
                              <div className="w-3 h-3 bg-zinc-300 rounded-full mr-4 rtl:ml-4"></div>
                              {txt.ecosystem.point2}
                          </li>
                      </ul>
                      <button 
                        onClick={() => setCurrentPage('home')}
                        className="border-b-2 border-black pb-1 text-lg font-bold hover:text-gold hover:border-gold transition-colors"
                      >
                          {txt.ecosystem.cta}
                      </button>
                  </div>
                  <div className="md:w-1/2 relative">
                      <div 
                        onClick={() => setCurrentPage('home')}
                        className="aspect-square bg-black p-8 relative overflow-hidden group cursor-pointer"
                      >
                          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg')] bg-cover opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
                          <div className="relative z-10 h-full flex flex-col justify-between">
                              <div className="text-white/50 text-9xl font-bold font-en-sans">T</div>
                              <div className="flex justify-between items-end">
                                  <span className="text-white font-bold text-2xl tracking-widest">TURRIVA</span>
                                  <ArrowRightIcon className="w-8 h-8 text-gold" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 5. Final Cinematic CTA */}
      <section className="h-[80vh] relative flex items-center justify-center bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg')" }}>
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="relative z-10 text-center px-6">
              <h2 className={`text-5xl md:text-8xl font-bold mb-8 text-white ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                  {txt.contact}
              </h2>
              <a href="mailto:info@3dgraphicshouse.com" className="inline-block bg-gold text-black font-bold py-6 px-16 text-xl tracking-widest uppercase hover:bg-white transition-colors duration-300 shadow-[0_0_30px_rgba(192,160,98,0.3)]">
                  {lang === 'en' ? 'Book Consultation' : 'احجز استشارة'}
              </a>
              <p className="mt-8 text-zinc-400 text-sm tracking-[0.2em] uppercase">
                  Graphics House Studio &copy; 2024
              </p>
          </div>
      </section>

      <style>{`
        .bg-300% { background-size: 300% 300%; }
        @keyframes gradient { 
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient { animation: gradient 6s ease infinite; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default GraphicsHousePage;
