import React, { useState } from 'react';
import { Page, User, Language } from '../types';
import { translations } from '../lib/translations';

interface LandOwnerFormPageProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
  currentUser: User;
}

const LandOwnerFormPage: React.FC<LandOwnerFormPageProps> = ({ lang, setCurrentPage, currentUser }) => {
  const t = translations[lang].landOwnerFormPage;
  
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log({
      ownerId: currentUser.id,
      city,
      neighborhood,
      area,
      description,
    });
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
      return (
        <div className="container mx-auto px-6 py-24 flex items-center justify-center min-h-[calc(100vh-72px)]">
            <div className="text-center max-w-2xl bg-white p-12 border border-zinc-200">
                 <h1 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.successMessage}</h1>
                 <button onClick={() => setCurrentPage('home')} className="mt-8 bg-black text-white font-bold py-3 px-8 text-lg hover:bg-zinc-800 transition-colors">
                    Back to Home
                 </button>
            </div>
        </div>
      )
  }

  return (
    <div className="bg-zinc-50 min-h-[calc(100vh-72px)] py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white p-10 border border-zinc-200">
          <div className="text-center mb-8">
            <h1 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
            <p className="text-lg text-zinc-600 mt-4">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-zinc-700 mb-2">{t.cityLabel}</label>
                <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.cityPlaceholder}/>
              </div>
              <div>
                <label htmlFor="neighborhood" className="block text-sm font-medium text-zinc-700 mb-2">{t.neighborhoodLabel}</label>
                <input type="text" id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.neighborhoodPlaceholder}/>
              </div>
            </div>
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-zinc-700 mb-2">{t.areaLabel}</label>
              <input type="number" id="area" value={area} onChange={(e) => setArea(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.areaPlaceholder}/>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-zinc-700 mb-2">{t.descriptionLabel}</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={5} className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.descriptionPlaceholder}></textarea>
            </div>
             <div className="pt-4">
                <button type="submit" className="w-full bg-gold text-white font-bold py-3 px-6 hover:bg-gold-dark transition-colors text-lg">
                    {t.submitButton}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandOwnerFormPage;