
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Page, PortfolioProjectStyle, Language } from '../types';
import { translations } from '../lib/translations';
import { 
    SparklesIcon, UploadIcon, DownloadIcon, 
    PaletteIcon, CheckIcon, BoltIcon, ImageTransformIcon,
    ChevronDownIcon, ChevronRightIcon, ArrowRightIcon
} from '../components/Icons';
import ImageComparisonSlider from '../components/ImageComparisonSlider';
import ExecutionBridge from '../components/ExecutionBridge';

interface AIDesignStudioPageProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
  handleNavigateToDirectory: (filters: { style?: PortfolioProjectStyle }) => void;
  openEmailCaptureModal: (onSubmit: (name: string, email: string) => void) => void;
  viewProfile: (id: number) => void;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            } else {
                reject(new Error('Failed to convert blob to base64'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

const FAQItem: React.FC<{ q: string, a: string, lang: Language }> = ({ q, a, lang }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-zinc-200">
            <button 
                className="w-full flex justify-between items-center py-4 text-left rtl:text-right hover:text-gold transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold text-lg">{q}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-zinc-600 leading-relaxed">{a}</p>
            </div>
        </div>
    )
}

// New Component: Flipping Image Carousel for Hero
const HeroFlippingImages: React.FC = () => {
    const images = [
        "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Original/Living
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Modern
        "https://images.pexels.com/photos/6489107/pexels-photo-6489107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Minimalist
        "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Industrial
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Flip every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            {images.map((src, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src={src} alt={`Style ${index}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <span className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                            {index === 0 ? 'Original' : `Variation ${index}`}
                        </span>
                    </div>
                </div>
            ))}
            
            {/* Progress Indicators */}
            <div className="absolute bottom-6 right-6 flex gap-2">
                {images.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-gold w-6' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const AIDesignStudioPage: React.FC<AIDesignStudioPageProps> = ({ lang, openEmailCaptureModal, viewProfile }) => {
    const t = translations[lang].aiDesignStudioPage;
    
    // State
    const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Controls
    const [roomType, setRoomType] = useState('living_room');
    const [designStyle, setDesignStyle] = useState('modern');
    const [customPrompt, setCustomPrompt] = useState('');
    const [mode, setMode] = useState('redesign');
    
    // History
    const [history, setHistory] = useState<Array<{
        id: number,
        before: string,
        after: string,
        style: string,
        prompt: string
    }>>([]);
    
    // PRO Mode
    const [isProMode, setIsProMode] = useState(false);
    const [hasApiKey, setHasApiKey] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if ((window as any).aistudio?.hasSelectedApiKey) {
             (window as any).aistudio.hasSelectedApiKey().then((hasKey: boolean) => {
                 setHasApiKey(hasKey);
                 if(hasKey) setIsProMode(true);
             });
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setOriginalImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target?.result as string);
                setGeneratedImage(null);
            };
            reader.readAsDataURL(file);
            // Scroll to tool if file is selected via button in hero
            setTimeout(() => {
                document.getElementById('studio-app')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };
    
    const handleProToggle = async () => {
        if (!isProMode) {
            if (!hasApiKey && (window as any).aistudio) {
                try {
                    const success = await (window as any).aistudio.openSelectKey();
                    if (success) {
                        setHasApiKey(true);
                        setIsProMode(true);
                    }
                } catch (err) {
                    console.error("Failed to select API Key", err);
                }
            } else {
                setIsProMode(true);
            }
        } else {
            setIsProMode(false);
        }
    };

    const restoreFromHistory = (item: typeof history[0]) => {
        setPreviewImage(item.before);
        setGeneratedImage(item.after);
        setDesignStyle(item.style);
        setCustomPrompt(item.prompt);
        // Scroll to result
        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    const executeGeneration = async () => {
        if (!originalImageFile) return;

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const base64Data = await blobToBase64(originalImageFile);
            const mimeType = originalImageFile.type || 'image/jpeg';
            
            const roomTypeName = roomType.replace('_', ' ');
            const styleName = designStyle;
            
            const promptText = `Professional interior design. Redesign this room.
            Room Type: ${roomTypeName}.
            Style: ${styleName}.
            Mode: ${mode}.
            Additional Instructions: ${customPrompt}.
            Requirements: High photorealism, architectural detail, 8k resolution, cinematic lighting. Maintain structural integrity of walls/windows. Replace furniture and decor to match style exactly.`;

            const modelName = isProMode ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

            const response = await ai.models.generateContent({
                model: modelName,
                contents: { 
                    parts: [
                        { inlineData: { data: base64Data, mimeType: mimeType } }, 
                        { text: promptText }
                    ] 
                },
            });

            let foundImage = false;
            let generatedImageUrl = '';
            if (response.candidates?.[0]?.content?.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        generatedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                        setGeneratedImage(generatedImageUrl);
                        foundImage = true;
                        break;
                    }
                }
            }
            
            if (!foundImage) throw new Error("No image generated.");

            // Add to history
            const newEntry = {
                id: Date.now(),
                before: previewImage!,
                after: generatedImageUrl,
                style: designStyle,
                prompt: customPrompt
            };
            setHistory(prev => [newEntry, ...prev]);

            // Auto scroll to result on mobile/desktop after generation
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

        } catch (e: any) {
            console.error("Generation failed:", e);
            if (e.message.includes("403")) {
                 setError("Permission Denied. Try disabling PRO mode or selecting a valid API Key.");
                 setIsProMode(false); 
            } else {
                 setError(t.error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white text-zinc-900 font-sans min-h-screen flex flex-col">
            
            {/* 1. Updated Hero Header (Two Columns + Flipping Images) */}
            <div className="container mx-auto px-6 pt-12 md:pt-16 pb-8 md:pb-12">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    
                    {/* Left Column: Side Title & CTA */}
                    <div className="text-center lg:text-left rtl:lg:text-right order-2 lg:order-1">
                        <h1 className={`text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight text-zinc-900 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                            {t.heroTitle}
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-500 mb-6 md:mb-8 font-light leading-relaxed">
                            {t.heroSubtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button 
                                onClick={() => document.getElementById('studio-app')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-black text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full text-base md:text-lg hover:bg-gold hover:text-black transition-all shadow-xl flex items-center justify-center gap-2 group"
                            >
                                <SparklesIcon className="w-5 h-5 group-hover:animate-spin" />
                                {t.finalCta.button}
                            </button>
                            {/* Secondary Upload Button acting as a shortcut */}
                            <label className="cursor-pointer bg-zinc-100 text-zinc-800 font-bold py-3 md:py-4 px-8 md:px-10 rounded-full text-base md:text-lg hover:bg-zinc-200 transition-all border border-zinc-200 flex items-center justify-center gap-2">
                                <UploadIcon className="w-5 h-5" />
                                {t.tool.uploadTitle}
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                        
                        {/* Trust Badges */}
                        <div className="mt-8 md:mt-10 flex items-center justify-center lg:justify-start gap-4 md:gap-6 text-zinc-400 text-xs md:text-sm font-bold grayscale opacity-70">
                            <span>TRUSTED BY</span>
                            <div className="h-1 w-1 rounded-full bg-zinc-300"></div>
                            <span>5000+ DESIGNERS</span>
                            <div className="h-1 w-1 rounded-full bg-zinc-300"></div>
                            <span>AI POWERED</span>
                        </div>
                    </div>

                    {/* Right Column: Flipping Images Carousel */}
                    <div className="order-1 lg:order-2">
                        <HeroFlippingImages />
                    </div>
                </div>
            </div>

            {/* 2. The "App" Widget Container */}
            <div className="container mx-auto px-4 lg:px-8 pb-20" id="studio-app">
                <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] border border-zinc-100 overflow-hidden min-h-[600px] md:min-h-[750px] flex flex-col lg:flex-row items-stretch">
                    
                    {/* Left Sidebar: Controls (Width approx 400px) */}
                    {/* Sticky logic added for desktop so controls follow while scrolling results */}
                    <div className="lg:w-[400px] bg-white border-r border-zinc-100 flex flex-col p-5 md:p-8 z-10 relative lg:sticky lg:top-0 lg:h-auto lg:max-h-screen lg:overflow-y-auto">
                        
                        {/* Header / PRO Switch */}
                        <div className="flex justify-between items-center mb-6 md:mb-8">
                            <h2 className={`text-xl font-bold ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.tool.title}</h2>
                            <button onClick={handleProToggle} className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${isProMode ? 'bg-black text-gold border-black' : 'bg-zinc-100 text-zinc-400 border-transparent'}`}>
                                {isProMode ? t.tool.proLabel : t.tool.freeLabel}
                            </button>
                        </div>

                        {/* Upload Box */}
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl h-32 md:h-40 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 mb-6 group ${originalImageFile ? 'border-gold bg-gold/5' : 'border-zinc-200 hover:border-black hover:bg-zinc-50'}`}
                        >
                            {originalImageFile ? (
                                <div className="relative w-full h-full overflow-hidden rounded-lg">
                                    <img src={previewImage!} className="w-full h-full object-cover opacity-60" alt="Uploaded" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded shadow-sm">{t.tool.changeImage}</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <UploadIcon className="w-8 h-8 text-zinc-400 mb-2 group-hover:text-black transition-colors" />
                                    <span className="text-sm font-bold text-zinc-600 group-hover:text-black">{t.tool.uploadTitle}</span>
                                    <span className="text-xs text-zinc-400 mt-1">{t.tool.uploadDesc}</span>
                                </>
                            )}
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </div>

                        {/* Form Controls */}
                        <div className="space-y-5 flex-grow">
                            {/* Room Type */}
                            <div>
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">{t.tool.roomType}</label>
                                <select 
                                    value={roomType} 
                                    onChange={(e) => setRoomType(e.target.value)}
                                    className="w-full bg-zinc-50 border-none rounded-lg p-3 text-sm font-bold focus:ring-2 focus:ring-black cursor-pointer"
                                >
                                    {Object.entries(t.roomTypes).map(([k, v]: any) => (
                                        <option key={k} value={k}>{v}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Design Style */}
                            <div>
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">{t.tool.designStyle}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(t.styles).slice(0, 6).map(([k, v]: any) => (
                                        <button 
                                            key={k}
                                            onClick={() => setDesignStyle(k)}
                                            className={`text-xs py-2 px-3 rounded-lg border transition-all ${designStyle === k ? 'border-black bg-black text-white shadow-md' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'}`}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Prompt */}
                            <div>
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">{t.tool.additionalReq}</label>
                                <textarea 
                                    value={customPrompt}
                                    onChange={(e) => setCustomPrompt(e.target.value)}
                                    placeholder={t.tool.additionalReqPlaceholder}
                                    rows={3}
                                    className="w-full bg-zinc-50 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Mode */}
                            <div>
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">{t.tool.mode}</label>
                                <div className="flex bg-zinc-100 p-1 rounded-lg">
                                    {['redesign', 'staging'].map((m) => (
                                        <button 
                                            key={m}
                                            onClick={() => setMode(m)}
                                            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${mode === m ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-zinc-700'}`}
                                        >
                                            {t.tool.modes[m as keyof typeof t.tool.modes]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-8 pt-6 border-t border-zinc-100">
                            <button 
                                onClick={executeGeneration}
                                disabled={isLoading || !originalImageFile}
                                className={`w-full py-3 md:py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 ${isLoading || !originalImageFile ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' : 'bg-gold text-white hover:bg-black hover:text-gold'}`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        {t.loading}
                                    </>
                                ) : (
                                    <>
                                        <SparklesIcon className="w-5 h-5" /> {t.tool.generateBtn}
                                    </>
                                )}
                            </button>
                            {error && <p className="text-red-500 text-sm text-center mt-2 font-bold bg-red-50 p-2 rounded-md border border-red-100">{error}</p>}
                        </div>

                    </div>

                    {/* Right Area: Viewport (Flex grow) */}
                    <div className="flex-1 bg-zinc-50 relative flex flex-col min-h-[400px]">
                        <div className="flex-1 relative flex flex-col justify-center items-center p-4 md:p-10" ref={resultRef}>
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>

                            {generatedImage ? (
                                <div className="relative w-full flex flex-col animate-fadeIn items-center justify-center">
                                    <div className="flex justify-center w-full">
                                        <ImageComparisonSlider 
                                            beforeImage={previewImage!} 
                                            afterImage={generatedImage} 
                                            beforeLabel={t.before} 
                                            afterLabel={t.after} 
                                        />
                                    </div>
                                    <div className="mt-6 flex flex-wrap justify-center gap-4 w-full">
                                        <a href={generatedImage} download="turriva-design.png" className="bg-white border border-zinc-200 text-black font-bold py-3 px-8 rounded-full hover:bg-zinc-50 flex items-center gap-2 shadow-sm text-sm md:text-base">
                                            <DownloadIcon className="w-4 h-4" /> {t.tool.downloadBtn}
                                        </a>
                                        <button onClick={() => setGeneratedImage(null)} className="text-zinc-500 hover:text-black text-sm underline px-4">{t.tool.resetBtn}</button>
                                    </div>
                                </div>
                            ) : previewImage ? (
                                <div className="relative w-full flex justify-center animate-fadeIn">
                                    <div className="relative rounded-xl overflow-hidden shadow-lg border border-white inline-block">
                                        <img src={previewImage} className="max-w-full max-h-[60vh] w-auto h-auto bg-zinc-200 block" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center max-w-sm opacity-60">
                                    <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ImageTransformIcon className="w-8 h-8 md:w-10 md:h-10 text-zinc-400" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-zinc-800">{t.tool.uploadTitle}</h3>
                                    <p className="text-sm md:text-base text-zinc-500 mt-2">{t.tool.uploadDesc}</p>
                                </div>
                            )}
                        </div>

                        {/* History Strip */}
                        {history.length > 0 && (
                            <div className="border-t border-zinc-200 bg-white p-4">
                                <div className="flex items-center justify-between mb-2 px-2">
                                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{t.tool.history}</span>
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-2 px-2 no-scrollbar">
                                    {history.map((item) => (
                                        <div 
                                            key={item.id} 
                                            onClick={() => restoreFromHistory(item)}
                                            className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-gold transition-all"
                                        >
                                            <img src={item.after} className="w-full h-full object-cover" alt="History" />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-1 truncate text-center">
                                                {item.style}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. Execution Bridge (Always below tool) */}
            {generatedImage && (
                <div className="bg-white py-12 border-b border-zinc-100">
                    <div className="container mx-auto px-6">
                        <ExecutionBridge lang={lang} style={designStyle} category={roomType} viewProfile={viewProfile} />
                    </div>
                </div>
            )}

            {/* 4. Styles Carousel / Grid */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-10 md:mb-12">
                        <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.stylesSectionTitle}</h2>
                        <p className="text-zinc-500">{t.stylesSectionSubtitle}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { name: t.styles.modern, img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: t.styles.neoclassical, img: 'https://images.pexels.com/photos/3773575/pexels-photo-3773575.png?auto=compress&cs=tinysrgb&w=400' },
                            { name: t.styles.bohemian, img: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: t.styles.industrial, img: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: t.styles.minimalist, img: 'https://images.pexels.com/photos/6489107/pexels-photo-6489107.jpeg?auto=compress&cs=tinysrgb&w=400' },
                        ].map((style, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => { 
                                    setDesignStyle(Object.keys(t.styles)[idx]); 
                                    document.getElementById('studio-app')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                            >
                                <img src={style.img} alt={style.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                                <div className="absolute bottom-3 left-3 right-3">
                                    <p className="text-white font-bold text-sm drop-shadow-md">{style.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. How it works */}
            <section className="py-16 md:py-20 bg-zinc-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-12 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.stepsTitle}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {t.steps.map((step: any, idx: number) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-zinc-900 text-gold rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-zinc-500">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. FAQ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.faqTitle}</h2>
                    <div className="space-y-2">
                        {t.faqs.map((faq: any, idx: number) => (
                            <FAQItem key={idx} q={faq.q} a={faq.a} lang={lang} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Final CTA Form */}
            <section className="py-24 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
                    <SparklesIcon className="w-12 h-12 text-gold mx-auto mb-6 animate-pulse" />
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.finalCta.title}</h2>
                    <p className="text-xl text-zinc-400 mb-10">{t.finalCta.subtitle}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder={t.finalCta.placeholder} 
                            className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                        />
                        <button className="bg-gold text-black font-bold py-4 px-8 rounded-full hover:bg-white transition-colors whitespace-nowrap">
                            {t.finalCta.button}
                        </button>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default AIDesignStudioPage;
