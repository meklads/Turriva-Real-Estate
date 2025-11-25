

import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';
import { Project, ProjectCategory, Language } from '../types';
import { translations } from '../lib/translations';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Project) => void;
  lang: Language;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onAddProject, lang }) => {
  const t = translations[lang].addProjectModal;
  
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('تصميم معماري');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  
  const categories: {value: ProjectCategory, label: string}[] = [
    { value: 'تصميم معماري', label: t.categories.architectural },
    { value: 'تصميم داخلي', label: t.categories.interior },
    { value: 'مقاولات عامة', label: t.categories.contracting },
    { value: 'توريد مواد', label: t.categories.supply },
    { value: 'استشارات هندسة', label: t.categories.consulting },
  ];

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
        id: Date.now(),
        title,
        client,
        budget: budget || undefined,
        deadline,
        category,
        description,
        city,
        postedDate: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD format
    };
    onAddProject(newProject);
    onClose();
    // Reset form
    setTitle('');
    setClient('');
    setBudget('');
    setDeadline('');
    setCategory('تصميم معماري');
    setDescription('');
    setCity('');
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
      <div 
        className="bg-white border border-zinc-200 w-full max-w-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fade-in-scale 0.3s forwards' }}
      >
        <div className="flex justify-between items-center p-6 border-b border-zinc-200 flex-shrink-0">
          <h2 className={`text-2xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-black transition-colors">
            <XIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-zinc-700 mb-2">{t.projectTitleLabel}</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.projectTitlePlaceholder}/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-zinc-700 mb-2">{t.clientLabel}</label>
              <input type="text" id="client" value={client} onChange={(e) => setClient(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.clientPlaceholder}/>
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-zinc-700 mb-2">{t.cityLabel}</label>
              <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.cityPlaceholder}/>
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-zinc-700 mb-2">{t.categoryLabel}</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value as ProjectCategory)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors appearance-none">
                {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
            </select>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-zinc-700 mb-2">{t.budgetLabel}</label>
              <input type="text" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.budgetPlaceholder}/>
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-zinc-700 mb-2">{t.deadlineLabel}</label>
              <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-zinc-700 mb-2">{t.descriptionLabel}</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={5} className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.descriptionPlaceholder}></textarea>
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full bg-black text-white font-bold py-3 px-6 hover:bg-zinc-800 transition-colors text-lg">
                {t.submitButton}
            </button>
          </div>
        </form>
      </div>
       <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
            animation: fade-in-scale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddProjectModal;