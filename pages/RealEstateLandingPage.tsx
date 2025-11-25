import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../lib/translations';
import { WaterIcon, SunIcon, DumbbellIcon, ShipIcon, MapPinIcon, PlayIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, PhoneIcon } from '../components/Icons';
import LogoDisplay from '../components/Logo';

interface RealEstateLandingPageProps {
  lang: Language;
}

const RealEstateLandingPage: React.FC<RealEstateLandingPageProps> = ({ lang }) => {
  const t = translations[lang].realEstateLandingPage;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isGalleryOpen) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen, selectedImageIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, phone });
    setIsSubmitted(true);
  };

  const highlights = [
    { icon: <WaterIcon className="w-12 h-12 text-gold"/>, title: t.highlight1Title, desc: t.highlight1Desc },
    { icon: <SunIcon className="w-12 h-12 text-gold"/>, title: t.highlight2Title, desc: t.highlight2Desc },
    { icon: <DumbbellIcon className="w-12 h-12 text-gold"/>, title: t.highlight3Title, desc: t.highlight3Desc },
    { icon: <ShipIcon className="w-12 h-12 text-gold"/>, title: t.highlight4Title, desc: t.highlight4Desc },
  ];

  const galleryImages = [
      "https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3288102/pexels-photo-3288102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/5998138/pexels-photo-5998138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => setIsGalleryOpen(false);
  const nextImage = () => setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  const LeadForm = () => (
    <div className="bg-black/80 backdrop-blur-sm p-8">
        {isSubmitted ? (
             <div className="text-center py-10">
                <h3 className={`text-2xl font-bold text-gold ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.form.thankYou}</h3>
                <p className="text-zinc-300 mt-2">{t.form.thankYouSub}</p>
            </div>
        ) : (
            <>
                <h3 className={`text-3xl font-bold text-white text-center ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.form.title}</h3>
                <p className="text-zinc-400 mt-2 mb-6 text-center">{t.form.subtitle}</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input type="text" placeholder={t.form.name} value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-transparent border-0 border-b border-zinc-500 p-3 text-white focus:border-gold focus:ring-0 transition-colors" />
                    </div>
                    <div>
                        <input type="email" placeholder={t.form.email} value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-transparent border-0 border-b border-zinc-500 p-3 text-white focus:border-gold focus:ring-0 transition-colors" />
                    </div>
                     <div>
                        <input type="tel" placeholder={t.form.phone} value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full bg-transparent border-0 border-b border-zinc-500 p-3 text-white focus:border-gold focus:ring-0 transition-colors" />
                    </div>
                    <button type="submit" className="w-full bg-gold text-black font-bold py-4 text-lg hover:bg-gold-dark transition-colors">{t.form.button}</button>
                </form>
            </>
        )}
    </div>
  )

  return (
    <div className={`bg-zinc-900 text-white ${lang === 'en' ? 'font-en-sans' : 'font-sans'}`}>
      
      {/* Custom Header for Landing Page */}
      <header className="absolute top-0 left-0 right-0 z-20">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <LogoDisplay variant="header" className="text-white"/>
              <button className="hidden sm:flex items-center gap-2 border border-white/50 text-white font-bold py-2 px-5 hover:bg-white hover:text-black transition-colors">
                  <PhoneIcon className="w-4 h-4" />
                  {t.headerContact}
              </button>
          </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/17693959/pexels-photo-17693959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 relative z-10 pt-24 pb-12">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 text-white text-center lg:text-left rtl:lg:text-right">
              <span className="font-bold py-2 px-4 uppercase tracking-widest border border-gold text-gold">{t.projectName}</span>
              <h1 className={`text-5xl md:text-7xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold mt-4 leading-tight`}>{t.heroTitle}</h1>
              <p className="text-xl md:text-2xl mt-6 max-w-xl mx-auto lg:mx-0">{t.heroSubtitle}</p>
            </div>
            <div className="lg:col-span-2">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                {item.icon}
                <h3 className={`text-2xl font-bold mt-4 mb-2 text-white ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{item.title}</h3>
                <p className="text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-gold`}>{t.amenitiesTitle}</h2>
                <p className="text-lg text-zinc-300 mt-4">{t.amenitiesSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-8">
                    <div className="flex items-start">
                        <WaterIcon className="w-8 h-8 text-gold flex-shrink-0 mt-1 mr-4 rtl:ml-4"/>
                        <div>
                            <h4 className={`font-bold text-xl text-white ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.amenity1Title}</h4>
                            <p className="text-zinc-400">{t.amenity1Desc}</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <SunIcon className="w-8 h-8 text-gold flex-shrink-0 mt-1 mr-4 rtl:ml-4"/>
                        <div>
                            <h4 className={`font-bold text-xl text-white ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.amenity2Title}</h4>
                            <p className="text-zinc-400">{t.amenity2Desc}</p>
                        </div>
                    </div>
                </div>
                 <div>
                    <img src="https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt={t.amenitiesTitle} className="w-full h-auto" />
                </div>
            </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-black">
          <div className="container mx-auto px-6 text-center text-white">
              <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-gold`}>{t.videoSectionTitle}</h2>
              <p className="text-lg text-zinc-300 mt-4 max-w-3xl mx-auto">{t.videoSectionSubtitle}</p>
              <div className="relative aspect-video w-full max-w-4xl mx-auto mt-10 shadow-2xl bg-black">
                  {isVideoPlaying ? (
                      <iframe 
                          src="https://www.youtube.com/embed/yLp_T_PA-b8?autoplay=1&rel=0&showinfo=0" 
                          title="Azure Residences 3D Tour" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          className="w-full h-full"
                      ></iframe>
                  ) : (
                      <div 
                          className="absolute inset-0 bg-cover bg-center cursor-pointer group"
                          style={{backgroundImage: "url('https://images.pexels.com/photos/7031608/pexels-photo-7031608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')>"}}
                          onClick={() => setIsVideoPlaying(true)}
                      >
                          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-black/70">
                              <div className="w-24 h-24 bg-gold/80 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <PlayIcon className="w-12 h-12 text-white" />
                              </div>
                              <span className="mt-4 font-bold text-xl">{t.watchVideo}</span>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </section>


      {/* Gallery Section */}
       <section className="py-20 bg-zinc-900">
            <div className="container mx-auto px-6">
                 <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-gold`}>{t.galleryTitle}</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                    {galleryImages.slice(0, 8).map((src, index) => (
                        <div key={index} className="overflow-hidden aspect-square cursor-pointer" onClick={() => openGallery(index)}>
                            <img src={src} alt={`${t.galleryTitle} ${index + 1}`} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Location Section */}
        <section className="py-20 bg-black bg-cover bg-center" style={{backgroundImage: "url('https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}>
            <div className="container mx-auto px-6">
                 <div className="bg-black/80 backdrop-blur-sm p-10 max-w-lg">
                    <h2 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-gold`}>{t.locationTitle}</h2>
                    <p className="text-zinc-300 mt-4 mb-6">{t.locationDesc}</p>
                    <div className="space-y-3">
                        <p className="flex items-center"><MapPinIcon className="w-5 h-5 text-gold mr-3 rtl:ml-3" />{t.locationPoint1}</p>
                        <p className="flex items-center"><MapPinIcon className="w-5 h-5 text-gold mr-3 rtl:ml-3" />{t.locationPoint2}</p>
                        <p className="flex items-center"><MapPinIcon className="w-5 h-5 text-gold mr-3 rtl:ml-3" />{t.locationPoint3}</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 bg-zinc-900 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.ctaTitle}</h2>
                <p className="text-lg text-zinc-300 mt-4 mb-8 max-w-xl mx-auto">{t.ctaSubtitle}</p>
                <div className="max-w-md mx-auto">
                    <LeadForm />
                </div>
            </div>
        </section>

        {/* Custom Footer */}
        <footer className="bg-black text-zinc-400 py-6 border-t border-zinc-800">
            <div className="container mx-auto px-6 text-center text-sm">
                <LogoDisplay variant="footer" className="text-white mb-2" />
                <p>&copy; {new Date().getFullYear()} {t.projectName}. {t.footer.copyright}</p>
            </div>
        </footer>

        {/* Gallery Modal */}
        {isGalleryOpen && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
                <button onClick={closeGallery} className="absolute top-4 right-4 text-white hover:text-gold transition-colors z-50">
                    <XIcon className="w-10 h-10" />
                </button>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors p-3 bg-white/10 rounded-full">
                    <ChevronLeftIcon className="w-8 h-8"/>
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors p-3 bg-white/10 rounded-full">
                    <ChevronRightIcon className="w-8 h-8"/>
                </button>
                <div className="max-w-screen-lg max-h-screen-md">
                     <img src={galleryImages[selectedImageIndex]} alt="Enlarged view" className="max-w-full max-h-[85vh] object-contain"/>
                </div>
            </div>
        )}
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in {
                animation: fade-in 0.3s ease-out forwards;
            }
        `}</style>

    </div>
  );
};

export default RealEstateLandingPage;