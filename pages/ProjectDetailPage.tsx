
import React from 'react';
import { PortfolioProject, Profile, PortfolioProjectCategory, PortfolioProjectStyle, Language } from '../types';
import { mockData } from '../data/mockData';
import { translations } from '../lib/translations';
import { CubeIcon } from '../components/Icons';
import ExecutionBridge from '../components/ExecutionBridge';

interface ProjectDetailPageProps {
  lang: Language;
  projectId: string;
  viewProfile: (id: number) => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ lang, projectId, viewProfile }) => {
  const t = translations[lang].projectDetailPage;
  const projectsT = translations[lang].projectsPage;

  const project = mockData[lang].portfolioProjects.find(p => p.id === projectId);
  if (!project) return <div>Project not found.</div>;

  const professional = mockData[lang].directoryItems.find(prof => prof.id === project.professionalId && prof.type === 'profile') as Profile | undefined || 
                       mockData.ar.directoryItems.find(prof => prof.id === project.professionalId && prof.type === 'profile') as Profile;

  if (!professional) return <div>Professional not found.</div>;
  
  const categoryMap: Record<PortfolioProjectCategory, string> = {
    'سكني': projectsT.category.residential,
    'تجاري': projectsT.category.commercial,
    'ضيافة': projectsT.category.hospitality,
    'مكتبي': projectsT.category.office,
    'ترفيهي': projectsT.category.entertainment,
  };
  
   const styleMap: Record<PortfolioProjectStyle, string> = {
    'مودرن': projectsT.style.modern,
    'نيوكلاسيك': projectsT.style.neoclassical,
    'صناعي': projectsT.style.industrial,
    'بوهيمي': projectsT.style.bohemian,
    'معاصر': projectsT.style.contemporary,
  };

  return (
    <div className="bg-white">
      {/* Full Viewport Hero - Immersive */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0">
            <img src={project.coverImageUrl} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 text-white">
            <div className="container mx-auto">
                <div className="max-w-4xl animate-fadeInUp">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">{categoryMap[project.category]}</span>
                        <span className="h-px w-10 bg-white/50"></span>
                        <span className="text-zinc-300 text-sm uppercase tracking-widest">{project.year}</span>
                    </div>
                    <h1 className={`text-5xl md:text-7xl lg:text-8xl font-medium leading-none mb-6 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{project.title}</h1>
                    <p className="text-xl text-zinc-300 font-light flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {project.location}
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Editorial Content Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Sticky Sidebar (Credits & Specs) */}
            <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-32">
                    <div className="mb-12">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 border-b border-zinc-100 pb-2">{t.fromTheCreator}</h3>
                        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => viewProfile(professional.id)}>
                            <img src={professional.imageUrl} alt={professional.name} className="w-16 h-16 rounded-full object-cover border border-zinc-200 group-hover:border-gold transition-colors" />
                            <div>
                                <p className={`font-bold text-lg text-black group-hover:text-gold transition-colors ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{professional.name}</p>
                                <p className="text-xs text-zinc-500 uppercase tracking-wider">{professional.specialty}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 border-b border-zinc-100 pb-2">{t.details}</h3>
                        <dl className="space-y-6">
                            <div>
                                <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t.style}</dt>
                                <dd className="text-lg font-medium text-zinc-900">{styleMap[project.style]}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t.location}</dt>
                                <dd className="text-lg font-medium text-zinc-900">{project.location}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t.year}</dt>
                                <dd className="text-lg font-medium text-zinc-900 font-en-sans">{project.year}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Main Text & Narrative */}
            <div className="lg:col-span-8 lg:col-start-5">
                <h2 className={`text-3xl md:text-4xl font-medium mb-10 leading-tight text-zinc-900 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.aboutProject}</h2>
                <div className="prose prose-lg prose-zinc max-w-none font-light leading-loose text-lg md:text-xl text-zinc-600">
                    {/* Simulating paragraphs if description is short */}
                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-black first-letter:float-left first-letter:mr-3">
                        {project.description}
                    </p>
                    <p>
                        The design philosophy centers around integrating natural light with structural integrity, creating a space that feels both expansive and intimate. Every material was chosen to reflect the local environment while maintaining a modern aesthetic.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Model Viewer */}
      {project.modelUrl && (
        <section className="py-20 bg-zinc-50 border-t border-zinc-200">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Interactive Experience</span>
                    <h2 className={`text-3xl md:text-4xl font-medium text-zinc-900 ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>
                        {lang === 'en' ? 'Explore the 3D Model' : 'استكشف النموذج ثلاثي الأبعاد'}
                    </h2>
                </div>
                <div className="w-full h-[500px] bg-white rounded-xl shadow-xl overflow-hidden border border-zinc-200 relative">
                    {/* @ts-ignore */}
                    <model-viewer
                        src={project.modelUrl}
                        ios-src=""
                        alt={`3D model of ${project.title}`}
                        shadow-intensity="1"
                        camera-controls
                        auto-rotate
                        ar
                        style={{ width: '100%', height: '100%' }}
                    >
                        <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-zinc-100 text-zinc-400">
                            Loading 3D Model...
                        </div>
                    </model-viewer>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-zinc-600 flex items-center gap-2 shadow-sm pointer-events-none">
                        <CubeIcon className="w-4 h-4 text-gold" />
                        {lang === 'en' ? 'Drag to Rotate • Scroll to Zoom' : 'اسحب للتدوير • تمرير للتكبير'}
                    </div>
                </div>
            </div>
        </section>
      )}

       {/* Full Width Gallery Grid */}
      <section className="pb-24 bg-white pt-24">
        <div className="container mx-auto px-6">
            <h3 className="text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-16">{t.gallery}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {project.images.map((img, index) => (
                    <div key={index} className={`relative overflow-hidden group cursor-zoom-in ${index % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/5]'}`}>
                        <img 
                            src={img} 
                            alt={`${project.title} ${index + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* The Bridge: From Inspiration to Execution */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
          <div className="container mx-auto px-6 text-center mb-10">
              <ExecutionBridge lang={lang} style={project.style} category={project.category} viewProfile={viewProfile} />
          </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
