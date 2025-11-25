
import React from 'react';
import { Page, User, Language } from '../types';
import { translations } from '../lib/translations';
import { BuildingStorefrontIcon, DocumentCheckIcon, HandshakeIcon, HomeModernIcon, UsersIcon, WrenchScrewdriverIcon } from '../components/Icons';

interface BuildVillaPageProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
  openAuthModal: () => void;
  currentUser: User | null;
}

interface Service {
  icon: React.ReactElement;
  title: string;
  desc: string;
  buttonText: string;
  page: Page;
}

const BuildVillaPage: React.FC<BuildVillaPageProps> = ({ lang, setCurrentPage, openAuthModal, currentUser }) => {
  const t = translations[lang].buildVillaPage;

  const handleStart = (page: Page) => {
    // The original logic for checking currentUser is correct
    if (page === 'directory' || page === 'full-service') {
        setCurrentPage(page);
    } else if (currentUser) {
      setCurrentPage(page);
    } else {
      openAuthModal();
    }
  };

  const services: Service[] = [
    {
      icon: <DocumentCheckIcon className="w-10 h-10 text-gold" />,
      title: t.service1Title,
      desc: t.service1Desc,
      buttonText: t.service1Button,
      page: 'directory' // Changed from 'list-land-landing'
    },
    {
      icon: <UsersIcon className="w-10 h-10 text-gold" />,
      title: t.service2Title,
      desc: t.service2Desc,
      buttonText: t.service2Button,
      page: 'directory'
    },
    {
      icon: <WrenchScrewdriverIcon className="w-10 h-10 text-gold" />,
      title: t.service3Title,
      desc: t.service3Desc,
      buttonText: t.service3Button,
      page: 'full-service'
    },
  ];

  const whyPoints = [
    { title: t.why1Title, desc: t.why1Desc },
    { title: t.why2Title, desc: t.why2Desc },
    { title: t.why3Title, desc: t.why3Desc },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-6">
          <h1 className={`text-5xl md:text-7xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.title}</h1>
          <p className="text-xl md:text-2xl mt-4 max-w-4xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Choose Path Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.choosePath}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Land Owner */}
            <div className="bg-white border-2 border-gold p-8 text-center flex flex-col items-center">
                <HomeModernIcon className="w-16 h-16 text-gold mb-4" />
                <h3 className={`text-3xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.landOwner}</h3>
                <p className="text-zinc-600 my-4 flex-grow">{t.landOwnerSubtitle}</p>
                <div className="mt-4 flex flex-col gap-3 w-full">
                    <button onClick={() => handleStart('directory')} className="bg-gold text-white font-bold py-3 px-8 hover:bg-gold-dark transition-colors">
                        {t.listYourLandButton}
                    </button>
                    <button onClick={() => document.getElementById('landowner-services')?.scrollIntoView({ behavior: 'smooth' })} className="text-zinc-600 font-medium hover:text-black transition-colors text-sm">
                        {t.orViewServices}
                    </button>
                </div>
            </div>
            {/* Developer */}
            <div className="bg-white border border-zinc-200 p-8 text-center flex flex-col items-center">
                <BuildingStorefrontIcon className="w-16 h-16 text-zinc-800 mb-4" />
                <h3 className={`text-3xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.developer}</h3>
                <p className="text-zinc-600 my-4 flex-grow">{t.developerSubtitle}</p>
                <button onClick={() => handleStart('directory')} className="bg-black text-white font-bold py-3 px-8 mt-4 hover:bg-zinc-800 transition-colors">
                    {t.developerButton}
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Landowners */}
      <section id="landowner-services" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.servicesTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <div key={index} className="bg-zinc-50 border border-zinc-200 p-8 text-center flex flex-col items-center">
                    {service.icon}
                    <h3 className="text-2xl font-bold text-zinc-900 my-4">{service.title}</h3>
                    <p className="text-zinc-600 mb-6 flex-grow">{service.desc}</p>
                    <button onClick={() => handleStart(service.page)} className="w-full bg-black text-white font-bold py-3 px-6 hover:bg-gold hover:text-black transition-colors">
                        {service.buttonText}
                    </button>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Turriva Section */}
      <section className="py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.whyTurriva}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {whyPoints.map((point, index) => (
                <div key={index}>
                    <h3 className="text-2xl font-bold text-gold mb-3">{point.title}</h3>
                    <p className="text-zinc-300">{point.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuildVillaPage;
