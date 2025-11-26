
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Language, Page } from '../types';
import { translations } from '../lib/translations';
import { SparklesIcon, ArrowRightIcon, DownloadIcon, ChevronLeftIcon, CheckIcon, UploadIcon } from '../components/Icons';

interface DesignWizardPageProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
}

const DesignWizardPage: React.FC<DesignWizardPageProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang].designWizardPage;
  const [step, setStep] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [room, setRoom] = useState('');
  const [style, setStyle] = useState('');
  const [vibe, setVibe] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Options
  const rooms = [
      { id: 'living_room', label: 'Living Room', icon: '🛋️' },
      { id: 'bedroom', label: 'Bedroom', icon: '🛏️' },
      { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
      { id: 'bathroom', label: 'Bathroom', icon: '🚿' },
      { id: 'office', label: 'Office', icon: '💼' },
      { id: 'dining_room', label: 'Dining', icon: '🍽️' },
  ];

  const styles = [
      { id: 'modern', label: 'Modern', img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300' },
      { id: 'neoclassical', label: 'Neoclassical', img: 'https://images.pexels.com/photos/3773575/pexels-photo-3773575.png?auto=compress&cs=tinysrgb&w=300' },
      { id: 'bohemian', label: 'Bohemian', img: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=300' },
      { id: 'industrial', label: 'Industrial', img: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=300' },
      { id: 'minimalist', label: 'Minimalist', img: 'https://images.pexels.com/photos/6489107/pexels-photo-6489107.jpeg?auto=compress&cs=tinysrgb&w=300' },
      { id: 'scandinavian', label: 'Scandinavian', img: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];

  const vibes = [
      { id: 'cozy', label: t.vibes.cozy, color: 'bg-amber-100' },
      { id: 'luxury', label: t.vibes.luxury, color: 'bg-zinc-800 text-white' },
      { id: 'energetic', label: t.vibes.energetic, color: 'bg-orange-100' },
      { id: 'calm', label: t.vibes.calm, color: 'bg-blue-50' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setImageFile(e.target.files[0]);
          const reader = new FileReader();
          reader.onload = (ev) => setPreviewUrl(ev.target?.result as string);
          reader.readAsDataURL(e.target.files[0]);
          setStep(1);
      }
  };

  const handleGenerate = async () => {
      setStep(4); // Loading step
      setIsLoading(true);
      
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const blobToBase64 = (blob: Blob): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') resolve(reader.result.split(',')[1]);
                    else reject(new Error('Failed'));
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        };

        const base64Data = await blobToBase64(imageFile!);
        const prompt = `Professional interior design. Redesign this room.
        Room Type: ${room}.
        Style: ${style}.
        Vibe: ${vibe}.
        Requirements: High photorealism, maintain structure, luxury finish.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType: imageFile!.type } },
                    { text: prompt }
                ]
            }
        });

        if (response.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
            const img = response.candidates[0].content.parts[0].inlineData;
            setGeneratedImage(`data:${img.mimeType};base64,${img.data}`);
            setIsLoading(false);
            setStep(5); // Result step
        } else {
            throw new Error('No image');
        }

      } catch (error) {
          console.error(error);
          setIsLoading(false);
          setStep(3); // Go back
          alert('Error generating design. Please try again.');
      }
  };

  // Steps Renderers
  const renderStep0 = () => (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn">
          <h1 className={`text-4xl md:text-6xl font-bold text-center mb-6 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
              {t.uploadTitle}
          </h1>
          <p className="text-xl text-zinc-500 mb-12 max-w-lg text-center">{t.uploadDesc}</p>
          
          <label className="group relative w-full max-w-lg aspect-video border-2 border-dashed border-zinc-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-gold hover:bg-gold/5 transition-all duration-300 bg-white">
              <div className="p-4 bg-zinc-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <UploadIcon className="w-8 h-8 text-zinc-500" />
              </div>
              <span className="font-bold text-lg">{t.steps.upload}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
      </div>
  );

  const renderStep1 = () => (
      <div className="animate-fadeIn">
          <h2 className={`text-3xl md:text-5xl font-bold text-center mb-12 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.roomTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {rooms.map(r => (
                  <button 
                    key={r.id}
                    onClick={() => { setRoom(r.id); setStep(2); }}
                    className="bg-white border border-zinc-200 p-8 rounded-2xl hover:border-gold hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4 group"
                  >
                      <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{r.icon}</span>
                      <span className="font-bold text-lg">{r.label}</span>
                  </button>
              ))}
          </div>
      </div>
  );

  const renderStep2 = () => (
      <div className="animate-fadeIn">
          <h2 className={`text-3xl md:text-5xl font-bold text-center mb-12 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.styleTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
              {styles.map(s => (
                  <div 
                    key={s.id}
                    onClick={() => { setStyle(s.id); setStep(3); }}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                  >
                      <img src={s.img} alt={s.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-bold text-xl md:text-2xl tracking-wide drop-shadow-lg">{s.label}</span>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  const renderStep3 = () => (
      <div className="animate-fadeIn flex flex-col items-center">
          <h2 className={`text-3xl md:text-5xl font-bold text-center mb-12 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.vibeTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full px-4 mb-12">
              {vibes.map(v => (
                  <button 
                    key={v.id}
                    onClick={() => { setVibe(v.id); handleGenerate(); }} // Generate on click
                    className={`${v.color} p-8 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-sm`}
                  >
                      {v.label}
                  </button>
              ))}
          </div>
      </div>
  );

  const renderStep4 = () => (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fadeIn text-center">
          <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-gold rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                  <SparklesIcon className="w-10 h-10 text-gold animate-pulse" />
              </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">{t.generatingTitle}</h2>
          <p className="text-zinc-500">{t.generatingDesc}</p>
      </div>
  );

  const renderStep5 = () => (
      <div className="animate-fadeIn w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
              <h2 className={`text-4xl font-bold ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.resultTitle}</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Result Image */}
              <div className="bg-zinc-100 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 relative group">
                  <img src={generatedImage!} alt="Result" className="w-full h-auto object-cover" />
                  <a 
                    href={generatedImage!} 
                    download="turriva-design.png"
                    className="absolute bottom-4 right-4 bg-white text-black font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                      <DownloadIcon className="w-4 h-4" /> {t.actions.download}
                  </a>
              </div>

              {/* Actions Panel */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold mb-6">What's Next?</h3>
                  <div className="space-y-4">
                      <button onClick={() => setStep(0)} className="w-full py-4 bg-zinc-100 hover:bg-zinc-200 rounded-xl font-bold text-zinc-800 transition-colors">
                          {t.actions.regenerate}
                      </button>
                      <button onClick={() => setCurrentPage('shop')} className="w-full py-4 bg-black hover:bg-zinc-800 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                          {t.actions.shop} <ArrowRightIcon className="w-4 h-4" />
                      </button>
                      <button onClick={() => setCurrentPage('directory')} className="w-full py-4 border-2 border-gold text-gold hover:bg-gold hover:text-white rounded-xl font-bold transition-colors">
                          {t.actions.hire}
                      </button>
                  </div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="bg-zinc-50 min-h-screen pt-24 pb-20">
        
        {/* Progress Bar */}
        {step > 0 && step < 5 && (
            <div className="fixed top-[72px] left-0 w-full h-1 bg-zinc-200 z-40">
                <div className="h-full bg-gold transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>
        )}

        {/* Back Button */}
        {step > 0 && step < 4 && (
            <button 
                onClick={() => setStep(step - 1)} 
                className="fixed top-24 left-6 z-40 p-2 bg-white rounded-full shadow-md text-zinc-600 hover:text-black"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
        )}

        <div className="container mx-auto">
            {step === 0 && renderStep0()}
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
        </div>

        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.6s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default DesignWizardPage;
