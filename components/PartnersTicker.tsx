
import React from 'react';
import { Language } from '../types';

interface PartnersTickerProps {
  lang: Language;
}

const PartnersTicker: React.FC<PartnersTickerProps> = ({ lang }) => {
  // Specific brands as requested
  const brands = [
      "ABYAT",
      "AL MUTLAQ",
      "WEST ELM",
      "POTTERY BARN",
      "HABITAT",
      "IKEA",
      "BO CONCEPT",
      "MARINA HOME"
  ];

  // Duplicate list for seamless loop
  const seamlessBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-8 bg-white border-b border-zinc-100 overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll w-max items-center gap-16">
            {seamlessBrands.map((brand, idx) => (
                <div key={idx} className="opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default select-none">
                    <span className="text-xl md:text-2xl font-bold font-en-serif text-zinc-500 tracking-widest whitespace-nowrap grayscale hover:grayscale-0 transition-all">
                        {brand}
                    </span>
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
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersTicker;
