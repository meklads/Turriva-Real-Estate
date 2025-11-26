
import React, { useState, useEffect, useRef } from 'react';
import { Page, User, AuthModalView, Language, Theme } from '../types';
import { translations } from '../lib/translations';
import { GlobeIcon, XIcon, ChevronDownIcon, SunIcon, MoonIcon } from './Icons';
import LogoDisplay from './Logo';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  currentUser: User | null;
  onLogout: () => void;
  openAuthModal: (view: AuthModalView, redirectPage?: Page) => void;
}

type NavItemType = {
    page: Page;
    label: string;
};

const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  lang,
  setLang,
  theme,
  toggleTheme,
  currentUser,
  onLogout,
  openAuthModal,
}) => {
  const t = translations[lang].header;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation Data Structure - Minimal & Flattened
  const navStructure: NavItemType[] = [
      { page: 'design-wizard', label: t.designWizard },
      { page: 'ai-design-studio', label: t.aiStudio },
      { page: 'directory', label: t.directory },
      { page: 'inspirations', label: t.inspirations },
      { page: 'shop', label: t.shop },
      { page: 'blog', label: t.blog },
      { page: 'about-us', label: t.about },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleNavClick = (page: Page) => {
      setCurrentPage(page);
      setIsMenuOpen(false);
      window.scrollTo(0, 0);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
            scrolled 
            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-zinc-200/50 dark:border-zinc-800/50 py-3 shadow-sm' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* 1. Logo Area */}
          <button onClick={() => handleNavClick('home')} className="relative z-50 transition-transform hover:scale-105 duration-300">
            <LogoDisplay variant="header" className={`${scrolled ? 'text-black dark:text-white' : 'text-black dark:text-white'}`} />
          </button>
          
          {/* 2. Center Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {navStructure.map((item) => (
                <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`text-sm font-medium transition-all duration-300 relative group ${
                        currentPage === item.page 
                        ? 'text-black dark:text-white font-bold' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                >
                    {item.label}
                    {/* Minimal Hover Dot */}
                    <span className={`absolute -bottom-2 left-1/2 w-1 h-1 bg-gold rounded-full transform -translate-x-1/2 transition-all duration-300 ${currentPage === item.page ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`}></span>
                </button>
            ))}
          </nav>
          
          {/* 3. Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Theme */}
            <button 
                onClick={toggleTheme}
                className="hidden md:flex w-9 h-9 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
                {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            {/* Language */}
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} 
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-en-sans font-bold text-xs"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>

            {/* Divider */}
            <div className="hidden md:block h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1"></div>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-3">
              {currentUser ? (
                <button 
                    onClick={() => handleNavClick('hub')}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-gold transition-colors bg-white dark:bg-black"
                >
                    <div className="w-7 h-7 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold">
                        {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
                </button>
              ) : (
                <>
                    <button 
                        onClick={() => openAuthModal('login')} 
                        className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors px-2"
                    >
                        {t.login}
                    </button>
                    <button 
                        onClick={() => openAuthModal('signup', 'directory')} 
                        className="bg-black dark:bg-white text-white dark:text-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm hover:shadow-md"
                    >
                        {t.signup}
                    </button>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="lg:hidden p-2 text-black dark:text-white"
            >
              <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
              <span className="block w-4 h-0.5 bg-current ml-auto rtl:mr-auto mb-1.5"></span>
              <span className="block w-6 h-0.5 bg-current"></span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Spacer to prevent content jump */}
      {/* Removed spacer if header is transparent/overlay on home, but kept for general consistency */}
      {currentPage !== 'home' && <div className="h-20"></div>}

      {/* Mobile Menu Overlay (Minimal) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white dark:bg-black animate-fadeIn">
            <div className="container mx-auto px-6 py-5 flex justify-between items-center">
                <LogoDisplay variant="header" className="dark:text-white" />
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-zinc-500 hover:text-black dark:hover:text-white">
                    <XIcon className="w-8 h-8" />
                </button>
            </div>
            
            <div className="container mx-auto px-6 py-10 flex flex-col items-center text-center gap-8">
                <nav className="flex flex-col gap-6 w-full max-w-sm">
                    {navStructure.map((item) => (
                        <button
                            key={item.page}
                            onClick={() => handleNavClick(item.page)}
                            className={`text-2xl font-bold transition-colors ${currentPage === item.page ? 'text-gold' : 'text-black dark:text-white hover:text-zinc-600'}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-800 my-2"></div>

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    {currentUser ? (
                        <>
                            <button onClick={() => handleNavClick('hub')} className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-lg">
                                {t.hub}
                            </button>
                            <button onClick={onLogout} className="text-red-500 font-medium">{t.logout}</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => { openAuthModal('signup', 'directory'); setIsMenuOpen(false); }} className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-lg">
                                {t.signup}
                            </button>
                            <button onClick={() => { openAuthModal('login'); setIsMenuOpen(false); }} className="text-zinc-600 dark:text-zinc-400 font-medium">
                                {t.login}
                            </button>
                        </>
                    )}
                </div>

                <div className="flex gap-6 mt-8">
                    <button onClick={toggleTheme} className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-600 dark:text-white">
                        {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                    </button>
                    <button onClick={() => { setLang(lang === 'ar' ? 'en' : 'ar'); setIsMenuOpen(false); }} className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-600 dark:text-white font-bold font-en-sans">
                        {lang === 'ar' ? 'EN' : 'AR'}
                    </button>
                </div>
            </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Header;
