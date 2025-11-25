import React from 'react';
import { Profile, PortfolioProject, Review, Language } from '../types';
import { mockData } from '../data/mockData';
import { translations } from '../lib/translations';
import { ShieldCheckIcon, StarIcon } from '../components/Icons';

interface ProfilePageProps {
  lang: Language;
  profileId: number;
  viewProject: (id: string) => void;
}

const ProjectCard: React.FC<{ project: PortfolioProject, onProjectClick: () => void }> = ({ project, onProjectClick }) => {
    return (
        <div className="group cursor-pointer" onClick={onProjectClick}>
            <div className="relative overflow-hidden">
                <img src={project.coverImageUrl} alt={project.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <h3 className="text-xl font-bold text-black mt-4 group-hover:text-gold transition-colors">{project.title}</h3>
            <p className="text-zinc-500">{project.location}</p>
        </div>
    );
};

const ReviewCard: React.FC<{review: Review, lang: Language}> = ({ review, lang }) => {
    return (
        <div className="bg-zinc-50 border-l-4 border-gold p-6">
            <div className="flex items-start">
                <img src={review.authorAvatar} alt={review.authorName} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                <div className="mx-4 flex-grow">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-black">{review.authorName}</p>
                            <p className="text-sm text-zinc-500">{review.date}</p>
                        </div>
                        <div className="flex items-center bg-white border border-zinc-200 px-2 py-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="ml-1 rtl:mr-1 font-bold text-sm text-zinc-800">{review.rating}</span>
                        </div>
                    </div>
                     <p className="text-zinc-700 mt-3">{review.comment}</p>
                </div>
            </div>
        </div>
    )
}

const ProfilePage: React.FC<ProfilePageProps> = ({ lang, profileId, viewProject }) => {
  const t = translations[lang].profilePage;

  const profile = mockData[lang].directoryItems.find(p => p.id === profileId && p.type === 'profile') as Profile | undefined;
  
  if (!profile) {
    return <div>Profile not found.</div>;
  }
  
  const portfolioProjects = mockData[lang].portfolioProjects.filter(p => profile.portfolioProjectIds?.includes(p.id));
  const reviews = mockData[lang].reviews.filter(r => r.profileId === profile.id);


  return (
    <div className="bg-white">
      {/* Profile Header */}
      <section className="bg-zinc-50 py-20">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left rtl:md:text-right">
                <img src={profile.imageUrl} alt={profile.name} className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0"/>
                <div className="mt-6 md:mt-0 md:mx-8 rtl:md:mr-8">
                    <div className="flex items-center justify-center md:justify-start">
                        <h1 className={`text-4xl md:text-6xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{profile.name}</h1>
                        {profile.isVerified && <ShieldCheckIcon title="Verified Member" className="w-10 h-10 text-gold flex-shrink-0 mr-4 rtl:ml-4" />}
                    </div>
                    <p className="text-xl text-zinc-600 mt-2">{profile.specialty} | {profile.location}</p>
                    <div className="mt-6">
                        <button className="bg-black text-white font-bold py-3 px-8 hover:bg-zinc-800 transition-colors">{t.contact}</button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Profile Body */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left Column (About & Services) */}
            <div className="lg:col-span-1 space-y-10">
                <div>
                    <h2 className="text-2xl font-bold border-b-2 border-gold pb-2 mb-4">{t.about}</h2>
                    <p className="text-zinc-700 leading-relaxed">{profile.bio}</p>
                </div>
                 <div>
                    <h2 className="text-2xl font-bold border-b-2 border-gold pb-2 mb-4">{t.services}</h2>
                    <ul className="space-y-2">
                        {profile.services.map((service, index) => (
                            <li key={index} className="text-zinc-700">&raquo; {service}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Column (Portfolio & Reviews) */}
            <div className="lg:col-span-2 space-y-16">
                <div>
                    <h2 className="text-2xl font-bold border-b-2 border-gold pb-2 mb-8">{t.portfolio}</h2>
                    {portfolioProjects.length > 0 ? (
                        <div className="grid sm:grid-cols-2 gap-8">
                            {portfolioProjects.map(project => (
                                <ProjectCard key={project.id} project={project} onProjectClick={() => viewProject(project.id)} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border border-dashed border-zinc-300">
                            <p className="text-zinc-500">{t.noProjects}</p>
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold border-b-2 border-gold pb-2 mb-8">{t.reviews}</h2>
                    {reviews.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map(review => (
                                <ReviewCard key={review.id} review={review} lang={lang} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-16 border border-dashed border-zinc-300">
                            <p className="text-zinc-500">{t.noReviews}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;