
import React, { useState, useEffect } from 'react';
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

const DesktopNavLink: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, setCurrentPage, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`relative py-2 text-sm font-bold transition-colors duration-300 ${isActive ? 'text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white'}`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-gold"></span>
      )}
    </button>
  );
};


const MenuNavLink: React.FC<{
  page: Page;
  setCurrentPage: (page: Page) => void;
  closeMenu: () => void;
  children: React.ReactNode;
}> = ({ page, setCurrentPage, closeMenu, children }) => {
  const handleClick = () => {
    setCurrentPage(page);
    closeMenu();
  };
  return (
    <button
      onClick={handleClick}
      className="py-3 text-3xl font-bold text-zinc-800 dark:text-zinc-100 transition-colors duration-300 hover:text-gold"
    >
      {children}
    </button>
  );
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

  const navLinks: { page: Page; label: string }[] = [
    { page: 'home', label: t.home },
    { page: 'ai-design-studio', label: t.aiStudio },
    { page: 'directory', label: t.directory },
    { page: 'inspirations', label: t.inspirations },
    { page: 'shop', label: t.shop },
    { page: 'about-us', label: t.about },
  ];

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

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => setCurrentPage('home')} aria-label="Go to homepage">
            <LogoDisplay variant="header" className="dark:text-white" />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-x-8 h-full">
            {navLinks.map(link => (
              <DesktopNavLink key={link.page} page={link.page} currentPage={currentPage} setCurrentPage={setCurrentPage}>{link.label}</DesktopNavLink>
            ))}
          </nav>
          
          {/* Right side controls */}
          <div className="flex items-center gap-4">
            
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-gold dark:hover:text-gold transition-all duration-300"
                title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
                {theme === 'dark' ? (
                    <SunIcon className="w-5 h-5 animate-spin-slow" />
                ) : (
                    <MoonIcon className="w-5 h-5" />
                )}
            </button>

            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} 
              className="hidden sm:flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white font-medium transition-colors"
            >
              <GlobeIcon className="w-5 h-5" />
              <span className="text-sm font-bold uppercase">{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              <span className="h-6 w-px bg-zinc-200 dark:bg-zinc-700"></span>
              {currentUser ? (
                <div className="relative group">
                    <button onClick={() => setCurrentPage('hub')} className="flex items-center gap-2 px-3 py-2">
                         <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-black dark:text-white text-sm font-bold hover:ring-2 hover:ring-offset-2 hover:ring-gold transition-all" title={t.hub}>
                            {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <ChevronDownIcon className="w-4 h-4 text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors"/>
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                        <button onClick={() => setCurrentPage('hub')} className="block w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800">{t.hub}</button>
                        {currentUser.role === 'vendor' && (
                            <button onClick={() => setCurrentPage('vendorDashboard')} className="block w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800">{t.vendorDashboard}</button>
                        )}
                        <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-50 dark:hover:bg-zinc-800">{t.logout}</button>
                    </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                    <button onClick={() => { openAuthModal('login'); }} className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white font-medium text-sm px-3 py-2">{t.login}</button>
                    <button onClick={() => { openAuthModal('signup', 'directory'); }} className="bg-black dark:bg-white text-white dark:text-black font-bold px-4 py-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-sm">{t.signup}</button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="md:hidden group flex flex-col justify-center items-center h-8 w-8"
              aria-label="Open menu"
            >
              <span className={`h-0.5 w-6 bg-black dark:bg-white transition-transform duration-300`}></span>
              <span className={`h-0.5 w-6 bg-black dark:bg-white my-1.5 transition-opacity duration-300`}></span>
              <span className={`h-0.5 w-6 bg-black dark:bg-white transition-transform duration-300`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black z-50 animate-fadeIn overflow-y-auto">
          <div className="container mx-auto px-6 h-16 flex justify-between items-center">
            <button onClick={() => setCurrentPage('home')} aria-label="Go to homepage">
              <LogoDisplay variant="header" className="dark:text-white" />
            </button>
            <button 
                onClick={() => setIsMenuOpen(false)} 
                className="text-zinc-800 dark:text-white hover:text-black"
                aria-label="Close menu"
            >
                <XIcon className="w-8 h-8"/>
            </button>
          </div>
          
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] pb-16">
            <nav className="flex flex-col items-center gap-4">
              {navLinks.map(link => (
                <MenuNavLink key={link.page} page={link.page} setCurrentPage={setCurrentPage} closeMenu={() => setIsMenuOpen(false)}>{link.label}</MenuNavLink>
              ))}
            </nav>
            
            <div className="mt-8 flex items-center gap-6">
                 {/* Mobile Theme Toggle */}
                <button 
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 font-medium text-lg"
                >
                    {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                 <button 
                  onClick={() => {setLang(lang === 'ar' ? 'en' : 'ar'); setIsMenuOpen(false);}} 
                  className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-black font-medium transition-colors"
                >
                  <GlobeIcon className="w-6 h-6" />
                  <span className="text-lg font-bold uppercase">{lang === 'ar' ? 'English' : 'العربية'}</span>
                </button>
            </div>

            <div className="mt-12 text-center">
              {currentUser ? (
                <div className="flex flex-col items-center gap-4">
                  <button onClick={() => { setCurrentPage('hub'); setIsMenuOpen(false); }} className="w-16 h-16 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-black dark:text-white text-2xl font-bold hover:ring-2 hover:ring-offset-2 hover:ring-gold transition-all" title={t.hub}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </button>
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="text-zinc-600 dark:text-zinc-400 hover:text-black font-medium">{t.logout}</button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button onClick={() => { openAuthModal('login'); setIsMenuOpen(false); }} className="text-zinc-600 dark:text-zinc-300 hover:text-black font-medium text-lg px-6 py-2">{t.login}</button>
                  <button onClick={() => { openAuthModal('signup', 'directory'); setIsMenuOpen(false); }} className="bg-zinc-800 dark:bg-white text-white dark:text-black font-bold px-8 py-3 hover:bg-black dark:hover:bg-zinc-200 transition-colors text-lg">{t.signup}</button>
                </div>
              )}
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
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-spin-slow {
            animation: spin 3s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Header;
