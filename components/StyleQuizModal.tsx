
import React, { useState } from 'react';
import { XIcon, ArrowRightIcon, SparklesIcon, CheckIcon } from './Icons';
import { Language, PortfolioProjectStyle } from '../types';
import { translations } from '../lib/translations';

interface StyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: (style: PortfolioProjectStyle, action: 'ai' | 'directory') => void;
  lang: Language;
}

const StyleQuizModal: React.FC<StyleQuizModalProps> = ({ isOpen, onClose, onFinish, lang }) => {
  const t = translations[lang].styleQuiz;
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<{room?: string, vibe?: string, style?: PortfolioProjectStyle}>({});

  if (!isOpen) return null;

  const questions = [
    {
      id: 'room',
      question: t.q1,
      options: [
        { id: 'living', label: t.options.living, icon: '🛋️' },
        { id: 'bedroom', label: t.options.bedroom, icon: '🛏️' },
        { id: 'kitchen', label: t.options.kitchen, icon: '🍳' },
        { id: 'office', label: t.options.office, icon: '💼' },
      ]
    },
    {
      id: 'vibe',
      question: t.q2,
      options: [
        { id: 'cozy', label: t.options.cozy, image: 'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'luxury', label: t.options.luxury, image: 'https://images.pexels.com/photos/6585626/pexels-photo-6585626.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'minimal', label: t.options.minimal, image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=400' },
      ]
    },
    {
      id: 'style',
      question: t.q3,
      options: [
        { id: 'مودرن', label: t.styles.modern, image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'نيوكلاسيك', label: t.styles.neoclassical, image: 'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'صناعي', label: t.styles.industrial, image: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'بوهيمي', label: t.styles.bohemian, image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=400' },
      ]
    }
  ];

  const handleSelect = (key: string, value: any) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    setTimeout(() => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(step + 1); // Go to result view
        }
    }, 400);
  };

  const resultStyle = selections.style || 'مودرن';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[60] p-4">
      <div className="bg-white w-full max-w-2xl relative overflow-hidden shadow-2xl animate-fadeInUp">
        
        {/* Header / Progress */}
        {step < questions.length && (
            <div className="bg-zinc-50 p-6 border-b border-zinc-100 flex justify-between items-center">
                <div>
                    <span className="text-xs font-bold text-gold uppercase tracking-widest">{t.step} {step + 1} / {questions.length}</span>
                    <div className="w-32 h-1 bg-zinc-200 mt-2 rounded-full overflow-hidden">
                        <div className="h-full bg-gold transition-all duration-500" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
                    </div>
                </div>
                <button onClick={onClose} className="text-zinc-400 hover:text-black"><XIcon /></button>
            </div>
        )}

        {/* Content */}
        <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
            
            {/* Questions Steps */}
            {step < questions.length && (
                <div className="animate-fadeIn">
                    <h2 className={`text-3xl md:text-4xl font-bold text-center mb-10 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                        {questions[step].question}
                    </h2>
                    
                    <div className={`grid gap-6 ${questions[step].id === 'room' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
                        {questions[step].options.map((opt: any) => (
                            <button 
                                key={opt.id}
                                onClick={() => handleSelect(questions[step].id, opt.id)}
                                className="group relative flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
                            >
                                {opt.image ? (
                                    <div className="w-full aspect-square overflow-hidden rounded-lg mb-4 border-2 border-transparent group-hover:border-gold relative">
                                        <img src={opt.image} alt={opt.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                        {selections[questions[step].id as keyof typeof selections] === opt.id && (
                                            <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                                                <div className="bg-white rounded-full p-2 text-gold"><CheckIcon /></div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className={`w-20 h-20 rounded-full bg-zinc-50 flex items-center justify-center text-4xl mb-4 border-2 group-hover:border-gold group-hover:bg-white transition-all ${selections[questions[step].id as keyof typeof selections] === opt.id ? 'border-gold bg-gold/10' : 'border-transparent'}`}>
                                        {opt.icon}
                                    </div>
                                )}
                                <span className="font-bold text-zinc-800 group-hover:text-gold transition-colors">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Result Step */}
            {step === questions.length && (
                <div className="text-center animate-fadeIn">
                    <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <SparklesIcon className="w-10 h-10" />
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                        {t.resultTitle} <span className="text-gold">{t.styles[resultStyle as keyof typeof t.styles]}</span>
                    </h2>
                    <p className="text-xl text-zinc-500 max-w-lg mx-auto mb-10">
                        {t.resultDesc}
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => onFinish(resultStyle, 'ai')}
                            className="bg-black text-white font-bold py-4 px-8 flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all"
                        >
                            <SparklesIcon className="w-5 h-5" />
                            {t.actionAI}
                        </button>
                        <button 
                            onClick={() => onFinish(resultStyle, 'directory')}
                            className="bg-white border-2 border-black text-black font-bold py-4 px-8 flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all"
                        >
                            {t.actionDirectory}
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

        </div>
      </div>
      
      {/* Icons specific for this component */}
      <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StyleQuizModal;
