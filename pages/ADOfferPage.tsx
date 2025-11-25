import React, { useState } from 'react';
import { Page, Language } from '../types';
import { translations } from '../lib/translations';
import { BadgeCheckIcon, VisaIcon, MastercardIcon, ApplePayIcon } from '../components/Icons';
import LogoDisplay from '../components/Logo';

interface ADOfferPageProps {
  lang: Language;
  onSignup: (name: string, email: string, password: string) => boolean;
  setCurrentPage: (page: Page) => void;
}

const ADOfferPage: React.FC<ADOfferPageProps> = ({ lang, onSignup, setCurrentPage }) => {
  const t = translations[lang].adOfferPage;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onSignup(name, email, password);
    if(success) {
      setIsSubmitted(true);
    } else {
      setError(translations[lang].authModal.errorSignup);
    }
  };
  
  const Checkmark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start">
        <BadgeCheckIcon className="w-6 h-6 text-white flex-shrink-0 mt-1 mr-3 rtl:ml-3" />
        <span className="text-zinc-100 text-lg">{children}</span>
    </li>
  );

  if (isSubmitted) {
      return (
          <div className="flex items-center justify-center min-h-[calc(100vh-72px)] bg-zinc-100 p-4">
              <div className="text-center bg-white p-12 max-w-xl">
                  <h1 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.successTitle}</h1>
                  <p className="text-lg text-zinc-600 mt-4 mb-8">{t.successSubtitle}</p>
                  <button onClick={() => setCurrentPage('home')} className="bg-black text-white font-bold py-3 px-8 text-lg hover:bg-zinc-800 transition-colors">
                      {t.backToHome}
                  </button>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-[calc(100vh-72px)] grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Offer Details */}
      <div className="relative p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-white">
          <LogoDisplay />
        </div>
        <div className="relative z-10 text-white">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.title}</h1>
          <p className="text-2xl mt-4 max-w-lg">{t.subtitle}</p>
          <hr className="my-10 border-white/20" />
          <h2 className="text-2xl font-bold mb-4">{t.offerTitle}</h2>
          <ul className="space-y-4">
            <Checkmark>{t.feature1}</Checkmark>
            <Checkmark>{t.feature2}</Checkmark>
            <Checkmark>{t.feature3}</Checkmark>
            <Checkmark>{t.feature4}</Checkmark>
          </ul>
          <p className="mt-8 text-xl font-semibold">{t.valueText}</p>
        </div>
        <div className="relative z-10"></div>
      </div>

      {/* Right Side - Form */}
      <div className="bg-white p-8 sm:p-12 lg:p-16 flex items-center justify-center">
        <div className="max-w-md w-full">
            <h2 className={`text-3xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.formTitle}</h2>
            <p className="text-2xl text-gold font-bold mt-2">{t.offerPrice}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                 <div>
                    <label htmlFor="ad-name" className="block text-sm font-medium text-zinc-700">{t.nameLabel}</label>
                    <input type="text" id="ad-name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full border-0 border-b-2 border-zinc-200 focus:border-black focus:ring-0 p-2" />
                </div>
                 <div>
                    <label htmlFor="ad-email" className="block text-sm font-medium text-zinc-700">{t.emailLabel}</label>
                    <input type="email" id="ad-email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full border-0 border-b-2 border-zinc-200 focus:border-black focus:ring-0 p-2" />
                </div>
                 <div>
                    <label htmlFor="ad-password" className="block text-sm font-medium text-zinc-700">{t.passwordLabel}</label>
                    <input type="password" id="ad-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full border-0 border-b-2 border-zinc-200 focus:border-black focus:ring-0 p-2" />
                </div>

                <div className="pt-4">
                  <p className="block text-sm font-medium text-zinc-700 mb-2">{t.paymentLabel}</p>
                   <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                        <VisaIcon className="h-6 w-auto text-blue-900" />
                        <MastercardIcon className="h-6 w-auto" />
                        <ApplePayIcon className="h-8 w-auto -mt-1"/>
                    </div>
                  <div className="border border-zinc-300 p-3">
                    <input type="text" placeholder={t.cardNumPlaceholder} className="w-full border-none focus:ring-0 text-sm" />
                    <div className="flex mt-2">
                        <input type="text" placeholder={t.expiryPlaceholder} className="w-1/2 border-none border-t border-zinc-200 focus:ring-0 text-sm" />
                        <input type="text" placeholder={t.cvvPlaceholder} className="w-1/2 border-none border-t border-l border-zinc-200 focus:ring-0 text-sm" />
                    </div>
                  </div>
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <div>
                    <button type="submit" className="w-full bg-black text-white font-bold py-4 px-6 hover:bg-zinc-800 transition-colors text-lg">
                        {t.submitButton}
                    </button>
                </div>

                 <p className="text-xs text-zinc-500 text-center">{t.termsText}</p>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ADOfferPage;