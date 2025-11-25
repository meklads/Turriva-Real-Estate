
import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from './Icons';
// FIX: Changed import of Language from ../App to ../types
import { Page, Language } from '../types';
import { translations } from '../lib/translations';
import LogoDisplay from './Logo';

interface FooterProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang].footer;
  const t_header = translations[lang].header;

  return (
    <footer className="bg-white border-t border-zinc-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <LogoDisplay variant="footer" />
            </div>
            <p className="text-zinc-600 text-sm mb-4">
              {t.description}
            </p>
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">
              Part of <button onClick={() => setCurrentPage('graphics-house')} className="hover:text-gold underline">Graphics House Group</button>
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-zinc-900 mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('about-us')} className="text-zinc-600 hover:text-black transition-colors">{t_header.about}</button></li>
              <li><button onClick={() => setCurrentPage('directory')} className="text-zinc-600 hover:text-black transition-colors">{t_header.directory}</button></li>
              <li><button onClick={() => setCurrentPage('ai-design-studio')} className="text-zinc-600 hover:text-black transition-colors">{t_header.aiStudio}</button></li>
              <li><button onClick={() => setCurrentPage('beesmotion')} className="text-zinc-600 hover:text-black transition-colors">{t_header.beesmotion}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-zinc-900 mb-4">{t.followUs}</h4>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-zinc-500 hover:text-black transition-transform hover:scale-110"><FacebookIcon /></a>
              <a href="#" className="text-zinc-500 hover:text-black transition-transform hover:scale-110"><TwitterIcon /></a>
              <a href="#" className="text-zinc-500 hover:text-black transition-transform hover:scale-110"><InstagramIcon /></a>
              <a href="#" className="text-zinc-500 hover:text-black transition-transform hover:scale-110"><LinkedInIcon /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-zinc-900 mb-4">{t.newsletter}</h4>
            <p className="text-zinc-600 mb-3">{t.newsletterText}</p>
            <form className="flex">
              <input type="email" placeholder={t.emailPlaceholder} className="w-full px-4 py-2 bg-white border border-zinc-300 focus:outline-none focus:ring-0 focus:border-black"/>
              <button className="bg-zinc-800 text-white font-bold px-4 py-2 hover:bg-black transition-colors">
                {t.submit}
              </button>
            </form>
          </div>
        </div>
        <div className="text-center text-zinc-500 pt-8 mt-8 border-t border-zinc-200 text-sm">
          <p>&copy; {new Date().getFullYear()} Turriva. {t.copyright} <span className="mx-2">|</span> A <button onClick={() => setCurrentPage('graphics-house')} className="font-bold text-zinc-700 hover:text-gold">Graphics House</button> Company.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
