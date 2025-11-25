

import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';
import { AuthModalView, Language } from '../types';
import { translations } from '../lib/translations';

interface AuthModalProps {
  initialView: AuthModalView;
  onClose: () => void;
  onLogin: (email: string, pass: string) => boolean;
  onSignup: (
    name: string, 
    email: string, 
    pass: string,
    userType: 'professional' | 'vendor', 
    storeData?: { name: string, description: string, imageUrl: string }
) => boolean;
  lang: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ initialView, onClose, onLogin, onSignup, lang }) => {
  const t = translations[lang].authModal;
  const t_vendor = translations[lang].authModal.signupAsVendor;
  
  const [view, setView] = useState<AuthModalView>(initialView);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Signup specific state
  const [userType, setUserType] = useState<'professional' | 'vendor'>('professional');
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [storeImageUrl, setStoreImageUrl] = useState('');


  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (view === 'login') {
      const success = onLogin(email, password);
      if (!success) setError(t.errorLogin);
    } else {
      let success = false;
      if (userType === 'vendor') {
          success = onSignup(name, email, password, 'vendor', {
              name: storeName,
              description: storeDescription,
              imageUrl: storeImageUrl
          });
      } else {
          success = onSignup(name, email, password, 'professional');
      }
      if (!success) setError(t.errorSignup);
    }
  };

  const switchView = (newView: AuthModalView) => {
    setView(newView);
    setError(null);
    setName('');
    setEmail('');
    setPassword('');
    setUserType('professional');
    setStoreName('');
    setStoreDescription('');
    setStoreImageUrl('');
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-zinc-200 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fade-in-scale 0.3s forwards' }}
      >
        <div className="flex justify-between items-center p-6 border-b border-zinc-200 flex-shrink-0">
          <h2 className={`text-2xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>
            {view === 'login' ? t.loginTitle : t.signupTitle}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-black transition-colors">
            <XIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
          {view === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">{t.nameLabel}</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">{t.emailLabel}</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-2">{t.passwordLabel}</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" />
          </div>
          
          {view === 'signup' && (
            <>
              <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">{t_vendor.accountType}</label>
                  <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => setUserType('professional')} className={`p-4 border text-center transition-colors ${userType === 'professional' ? 'bg-gold/10 border-gold text-gold font-bold' : 'bg-white border-zinc-300 hover:border-zinc-500'}`}>
                          {t_vendor.professional}
                      </button>
                      <button type="button" onClick={() => setUserType('vendor')} className={`p-4 border text-center transition-colors ${userType === 'vendor' ? 'bg-gold/10 border-gold text-gold font-bold' : 'bg-white border-zinc-300 hover:border-zinc-500'}`}>
                          {t_vendor.vendor}
                      </button>
                  </div>
              </div>

              {userType === 'vendor' && (
                  <div className="space-y-6 animate-fadeInUp">
                      <div>
                          <label htmlFor="storeName" className="block text-sm font-medium text-zinc-700 mb-2">{t_vendor.storeName}</label>
                          <input type="text" id="storeName" value={storeName} onChange={(e) => setStoreName(e.target.value)} required={userType === 'vendor'} className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t_vendor.storeNamePlaceholder} />
                      </div>
                      <div>
                          <label htmlFor="storeDescription" className="block text-sm font-medium text-zinc-700 mb-2">{t_vendor.storeDescription}</label>
                          <textarea id="storeDescription" value={storeDescription} onChange={(e) => setStoreDescription(e.target.value)} required={userType === 'vendor'} rows={3} className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t_vendor.storeDescriptionPlaceholder}></textarea>
                      </div>
                      <div>
                          <label htmlFor="storeImageUrl" className="block text-sm font-medium text-zinc-700 mb-2">{t_vendor.storeImageUrl}</label>
                          <input type="url" id="storeImageUrl" value={storeImageUrl} onChange={(e) => setStoreImageUrl(e.target.value)} required={userType === 'vendor'} className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t_vendor.storeImageUrlPlaceholder} />
                      </div>
                  </div>
              )}
            </>
          )}

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <div>
            <button type="submit" className="w-full bg-black text-white font-bold py-3 px-6 hover:bg-zinc-800 transition-colors text-lg">
              {view === 'login' ? t.loginButton : t.signupButton}
            </button>
          </div>
          <p className="text-center text-sm text-zinc-600">
            {view === 'login' ? t.switchSignup : t.switchLogin}{' '}
            <button type="button" onClick={() => switchView(view === 'login' ? 'signup' : 'login')} className="font-bold text-gold hover:underline">
              {view === 'login' ? t.switchSignupLink : t.switchLoginLink}
            </button>
          </p>
        </form>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
            animation: fade-in-scale 0.3s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;