
import React from 'react';
import { Language } from '../types';
import { translations } from '../lib/translations';

interface PartnersTickerProps {
  lang: Language;
}

const PartnersTicker: React.FC<PartnersTickerProps> = ({ lang }) => {
  const t = translations[lang].homePage;
  
  // Mock logos - in a real app these would be real URLs
  const logos = [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png", // Placeholder
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png", 
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
  ];

  // Duplicate list for seamless loop
  const seamlessLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-12 bg-white border-b border-zinc-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">{t.partnersTitle}</p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll w-max items-center">
            {seamlessLogos.map((logo, idx) => (
                <div key={idx} className="mx-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                    {/* Using text as placeholder if images break, normally img tag */}
                    <span className="text-2xl font-bold font-en-serif text-zinc-800">BRAND {idx % 5 + 1}</span>
                </div>
            ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersTicker;
