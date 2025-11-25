import React from 'react';
import { GlobalProject, Language } from '../types';
import { mockData } from '../data/mockData';
import { translations } from '../lib/translations';

const ProjectCard: React.FC<{ project: GlobalProject; lang: Language }> = ({ project, lang }) => {
    return (
        <div className="bg-white group border border-zinc-200 overflow-hidden">
            <div className="relative overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="p-6">
                <h3 className={`text-2xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{project.title}</h3>
                <p className="text-zinc-600 mt-1">{project.architect} | {project.location}</p>
                <p className="text-zinc-700 mt-4 text-sm">{project.description}</p>
            </div>
        </div>
    );
};

interface GlobalProjectsPageProps {
  lang: Language;
}

const GlobalProjectsPage: React.FC<GlobalProjectsPageProps> = ({ lang }) => {
  const t = translations[lang].globalProjectsPage;
  const projects = mockData[lang].globalProjects;

  return (
    <div className="bg-zinc-50">
        <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
            <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
            <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">
            {t.subtitle}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
            <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
        </div>
        </div>
    </div>
  );
};

export default GlobalProjectsPage;