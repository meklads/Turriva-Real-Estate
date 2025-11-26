
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
    icon?: React.ElementType;
    description?: string;
};

type NavGroupType = {
    label: string;
    items: NavItemType[];
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
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [expandedGroupMobile, setExpandedGroupMobile] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navigation Data Structure - Strictly flattened as requested
  const navStructure: (NavItemType | NavGroupType)[] = [
      { page: 'ai-design-studio', label: t.aiStudio },
      { page: 'directory', label: t.directory },
      { page: 'inspirations', label: t.inspirations },
      { page: 'shop', label: t.shop },
      { page: 'blog', label: t.blog },
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

  // Desktop Dropdown Handlers
  const handleMouseEnter = (label: string) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setHoveredGroup(label);
  };

  const handleMouseLeave = () => {
      hoverTimeoutRef.current = setTimeout(() => {
          setHoveredGroup(null);
      }, 150); // Small delay for smoother interaction
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300 shadow-sm">
        <div className="container mx-auto px-6 h-16 md:h-20 flex justify-between items-center">
          {/* Logo (Acts as Home Link) */}
          <button onClick={() => setCurrentPage('home')} aria-label="Go to homepage" className="relative z-50">
            <LogoDisplay variant="header" className="dark:text-white" />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-x-6 h-full">
            {navStructure.map((item, index) => {
                // Check if it's a group (Dropdown)
                if ('items' in item) {
                    const isHovered = hoveredGroup === item.label;
                    return (
                        <div 
                            key={index} 
                            className="relative h-full flex items-center"
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button 
                                className={`flex items-center gap-1 text-sm font-bold transition-colors duration-300 ${isHovered ? 'text-gold' : 'text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white'}`}
                            >
                                {item.label}
                                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute top-full ${lang === 'ar' ? 'right-0' : 'left-0'} pt-2 w-80 transition-all duration-300 origin-top ${isHovered ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                                <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-700 shadow-xl rounded-2xl p-2 overflow-hidden">
                                    {item.items.map((subItem, subIndex) => (
                                        <button
                                            key={subIndex}
                                            onClick={() => { setCurrentPage(subItem.page); setHoveredGroup(null); }}
                                            className="flex items-start gap-4 w-full p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left rtl:text-right group"
                                        >
                                            {subItem.icon && (
                                                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-gold group-hover:bg-gold/10 transition-colors flex-shrink-0">
                                                    <subItem.icon className="w-5 h-5" />
                                                </div>
                                            )}
                                            <div>
                                                <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-gold transition-colors">
                                                    {subItem.label}
                                                </span>
                                                {subItem.description && (
                                                    <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                                                        {subItem.description}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                } 
                
                // Regular Link
                else {
                    const isActive = currentPage === item.page;
                    return (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(item.page)}
                            className={`relative py-2 text-sm font-bold transition-colors duration-300 flex items-center gap-2
                                ${isActive ? 'text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white'}
                            `}
                        >
                            {item.icon && <item.icon className="w-4 h-4" />}
                            {item.label}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full"></span>
                            )}
                        </button>
                    );
                }
            })}
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
              <span className="h-6 w-px bg-zinc-200 dark:bg-zinc-700 mx-2"></span>
              {currentUser ? (
                <div className="relative group h-full flex items-center" onMouseEnter={() => handleMouseEnter('auth')} onMouseLeave={handleMouseLeave}>
                    <button onClick={() => setCurrentPage('hub')} className="flex items-center gap-3 py-2 focus:outline-none">
                         <div className="w-9 h-9 bg-gold/10 dark:bg-zinc-700 rounded-full flex items-center justify-center text-gold dark:text-gold text-sm font-bold border border-gold/20 transition-all">
                            {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-left rtl:text-right hidden lg:block">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-none mb-1">{t.welcome}</p>
                            <p className="text-sm font-bold text-zinc-900 dark:text-white leading-none">{currentUser.name.split(' ')[0]}</p>
                        </div>
                        <ChevronDownIcon className="w-4 h-4 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors"/>
                    </button>
                    
                    {/* Auth Dropdown */}
                    <div className={`absolute top-full right-0 pt-2 w-56 transition-all duration-300 ${hoveredGroup === 'auth' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-700 shadow-xl rounded-xl p-1 overflow-hidden">
                            <button onClick={() => setCurrentPage('hub')} className="block w-full text-left rtl:text-right px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg mb-1">{t.hub}</button>
                            {currentUser.role === 'vendor' && (
                                <button onClick={() => setCurrentPage('vendorDashboard')} className="block w-full text-left rtl:text-right px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg mb-1">{t.vendorDashboard}</button>
                            )}
                            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1"></div>
                            <button onClick={onLogout} className="block w-full text-left rtl:text-right px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">{t.logout}</button>
                        </div>
                    </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                    <button onClick={() => { openAuthModal('login'); }} className="text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white font-bold text-sm px-2 py-2 transition-colors">{t.login}</button>
                    <button onClick={() => { openAuthModal('signup', 'directory'); }} className="bg-black dark:bg-white text-white dark:text-black font-bold px-5 py-2.5 rounded-full hover:bg-gold hover:text-black dark:hover:bg-zinc-200 transition-all text-sm shadow-sm">
                        {t.signup}
                    </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="md:hidden group flex flex-col justify-center items-center h-10 w-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Open menu"
            >
              <span className={`h-0.5 w-5 bg-black dark:bg-white transition-transform duration-300`}></span>
              <span className={`h-0.5 w-5 bg-black dark:bg-white my-1.5 transition-opacity duration-300`}></span>
              <span className={`h-0.5 w-5 bg-black dark:bg-white transition-transform duration-300`}></span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Spacer div to prevent content from being hidden under the fixed header */}
      <div className="h-16 md:h-20" aria-hidden="true"></div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black z-50 animate-fadeIn overflow-y-auto">
          <div className="container mx-auto px-6 h-16 md:h-20 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800">
            <button onClick={() => setCurrentPage('home')} aria-label="Go to homepage">
              <LogoDisplay variant="header" className="dark:text-white" />
            </button>
            <button 
                onClick={() => setIsMenuOpen(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-white transition-colors"
                aria-label="Close menu"
            >
                <XIcon className="w-6 h-6"/>
            </button>
          </div>
          
          <div className="flex flex-col p-6 pb-20">
            <nav className="flex flex-col gap-2">
              {navStructure.map((item, index) => {
                  if ('items' in item) {
                      const isExpanded = expandedGroupMobile === item.label;
                      return (
                          <div key={index} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                              <button 
                                  onClick={() => setExpandedGroupMobile(isExpanded ? null : item.label)}
                                  className="flex items-center justify-between w-full py-4 text-xl font-bold text-zinc-800 dark:text-zinc-100"
                              >
                                  {item.label}
                                  <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                              <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="flex flex-col gap-2 pb-4 pl-4 rtl:pr-4">
                                      {item.items.map((subItem, subIndex) => (
                                          <button
                                              key={subIndex}
                                              onClick={() => { setCurrentPage(subItem.page); setIsMenuOpen(false); }}
                                              className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 text-left rtl:text-right"
                                          >
                                              {subItem.icon && <subItem.icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />}
                                              <div>
                                                  <span className="block text-base font-medium text-zinc-700 dark:text-zinc-300">{subItem.label}</span>
                                                  {subItem.description && (
                                                      <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{subItem.description}</span>
                                                  )}
                                              </div>
                                          </button>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      )
                  } else {
                      return (
                        <button
                            key={index}
                            onClick={() => { setCurrentPage(item.page); setIsMenuOpen(false); }}
                            className="py-4 text-xl font-bold text-zinc-800 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3"
                        >
                            {item.label}
                        </button>
                      );
                  }
              })}
            </nav>
            
            <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                 {/* Mobile Theme Toggle */}
                <button 
                    onClick={toggleTheme}
                    className="flex items-center gap-3 w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-bold text-lg mb-4"
                >
                    {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                 <button 
                  onClick={() => {setLang(lang === 'ar' ? 'en' : 'ar'); setIsMenuOpen(false);}} 
                  className="flex items-center gap-3 w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-bold text-lg"
                >
                  <GlobeIcon className="w-6 h-6" />
                  <span className="uppercase">{lang === 'ar' ? 'English' : 'العربية'}</span>
                </button>
            </div>

            <div className="mt-8">
              {currentUser ? (
                <div className="flex flex-col gap-4">
                  <button onClick={() => { setCurrentPage('hub'); setIsMenuOpen(false); }} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl text-lg">
                    {t.hub}
                  </button>
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full text-red-600 font-bold py-2 text-lg">{t.logout}</button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button onClick={() => { openAuthModal('login'); setIsMenuOpen(false); }} className="w-full border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-bold py-4 rounded-xl text-lg">{t.login}</button>
                  <button onClick={() => { openAuthModal('signup', 'directory'); setIsMenuOpen(false); }} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl text-lg">{t.signup}</button>
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
          animation: fadeIn 0.2s ease-out forwards;
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
