import React, { useState } from 'react';
import { CommunityPost, User, Page, Project, PortfolioProject, Language, AuthModalView } from '../types';
import { mockData } from '../data/mockData';
import { translations } from '../lib/translations';
import { HeartIcon, ChatBubbleLeftRightIcon, ShareIcon, CalendarIcon, CashIcon, LockIcon } from '../components/Icons';

// --- Reusable Components for Hub ---

const DiscussionCard: React.FC<{ post: CommunityPost, lang:Language }> = ({ post, lang }) => {
    const t = translations[lang].communityPage;
    return (
        <div className="bg-white border border-zinc-200 p-6">
            <div className="flex items-start mb-4">
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="mx-4">
                    <p className="font-bold text-black">{post.author.name}</p>
                    <p className="text-sm text-zinc-500">{post.author.title} &bull; {post.timestamp}</p>
                </div>
            </div>
            <p className="text-zinc-800 leading-relaxed mb-4">{post.content}</p>
            {post.imageUrl && (
                <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-96 object-cover my-4" />
            )}
            <div className="flex items-center text-zinc-600 border-t border-zinc-200 pt-3 mt-4 space-x-6 rtl:space-x-reverse">
                <button className="flex items-center space-x-2 rtl:space-x-reverse hover:text-gold transition-colors">
                    <HeartIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.likes} {t.likes}</span>
                </button>
                 <button className="flex items-center space-x-2 rtl:space-x-reverse hover:text-gold transition-colors">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments} {t.comments}</span>
                </button>
                 <button className="flex items-center space-x-2 rtl:space-x-reverse hover:text-gold transition-colors">
                    <ShareIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{t.share}</span>
                </button>
            </div>
        </div>
    );
};

const ProjectOpportunityCard: React.FC<{ project: Project, lang: Language }> = ({ project, lang }) => {
    const t = translations[lang].communityPage;
    return (
        <div className="bg-white border border-zinc-200 p-6 transition-shadow hover:shadow-md">
            <h4 className={`text-xl font-bold text-black truncate ${lang==='en' ? 'font-en-serif' : 'font-serif'}`}>{project.title}</h4>
            <p className="text-sm text-zinc-500 mt-1">{project.client}</p>
            <p className="text-zinc-700 my-4 text-sm leading-relaxed">{project.description}</p>
            <div className="flex flex-col sm:flex-row justify-between text-sm space-y-3 sm:space-y-0 border-t border-zinc-200 pt-4 mt-4">
                <div className="flex items-center text-zinc-600">
                    <CashIcon className="w-4 h-4 mr-2 rtl:ml-2 text-zinc-400"/>
                    <span className="font-medium">{t.budget}:</span>
                    <span className="mx-1">{project.budget}</span>
                </div>
                 <div className="flex items-center text-zinc-600">
                    <CalendarIcon className="w-4 h-4 mr-2 rtl:ml-2 text-zinc-400"/>
                    <span className="font-medium">{t.deadline}:</span>
                    <span className="mx-1">{project.deadline}</span>
                </div>
            </div>
        </div>
    );
}

// --- Tab Content Components ---

const ProfileTab: React.FC<{ currentUser: User, lang: Language, setCurrentPage: (page: Page) => void, onLogout: () => void }> = ({ currentUser, lang, setCurrentPage, onLogout }) => {
    const t = translations[lang].communityPage;
    const t_header = translations[lang].header;
    return (
        <div className="bg-white border border-zinc-200 p-8">
            <h2 className="text-2xl font-bold text-black">{t.welcomeMessage} {currentUser.name}</h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center">
                    <p className="font-semibold text-zinc-600 w-32">{t.membershipStatus}</p>
                    <span className="bg-gold/10 text-gold font-bold py-1 px-3 text-sm">{currentUser.membership}</span>
                </div>
                 <div className="flex items-center">
                    <p className="font-semibold text-zinc-600 w-32">Email:</p>
                    <span className="text-zinc-800">{currentUser.email}</span>
                </div>
            </div>
            <div className="mt-8 border-t border-zinc-200 pt-6 flex flex-wrap gap-4">
                <button onClick={() => setCurrentPage('profileDetail')} className="bg-black text-white font-bold py-2 px-5 hover:bg-zinc-800 transition-colors">{t.viewPublicProfile}</button>
                <button className="bg-zinc-100 text-zinc-800 font-bold py-2 px-5 hover:bg-zinc-200 transition-colors">{t.editProfile}</button>
                <button onClick={onLogout} className="bg-red-50 text-red-700 font-bold py-2 px-5 hover:bg-red-100 transition-colors">{t_header.logout}</button>
            </div>
        </div>
    );
};

const MyProjectsTab: React.FC<{ currentUser: User, lang: Language, openAddProjectModal: () => void }> = ({ currentUser, lang, openAddProjectModal }) => {
    const t = translations[lang].communityPage;
    const userPortfolioProjects = mockData[lang].portfolioProjects.filter(p => p.professionalId === currentUser.id);

    return (
        <div className="space-y-6">
            <div className="bg-white border border-zinc-200 p-8">
                <h2 className="text-2xl font-bold text-black">{t.myProjectsTitle}</h2>
                <p className="text-zinc-600 mt-2">{t.myProjectsSubtitle}</p>
                <button onClick={openAddProjectModal} className="mt-4 bg-gold text-white font-bold py-2 px-5 hover:bg-gold-dark transition-colors">{t.addNewProject}</button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userPortfolioProjects.map(p => (
                    <div key={p.id} className="bg-white border border-zinc-200 p-4">
                        <img src={p.coverImageUrl} alt={p.title} className="w-full h-40 object-cover mb-4" />
                        <h3 className="font-bold text-black">{p.title}</h3>
                        <p className="text-sm text-zinc-500">{p.location} &bull; {p.year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Main Hub Page Component ---

type HubTab = 'profile' | 'my-projects' | 'discussions';

interface CommunityPageProps {
  lang: Language;
  currentUser: User | null;
  openAuthModal: (view: AuthModalView) => void;
  setCurrentPage: (page: Page) => void;
  projects: Project[]; // This seems to be for creating projects, not portfolio
  openAddProjectModal: () => void;
  onLogout: () => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ lang, currentUser, openAuthModal, setCurrentPage, projects, openAddProjectModal, onLogout }) => {
    const t = translations[lang].communityPage;
    const discussions = mockData[lang].communityPosts;
    const [newPostContent, setNewPostContent] = useState('');
    const [activeTab, setActiveTab] = useState<HubTab>('profile');

    const handlePost = () => {
        if (!newPostContent.trim()) return;
        // In a real app, this would submit the new post to a server
        console.log('New post:', newPostContent);
        setNewPostContent('');
    };

    if (!currentUser) {
        return (
             <div className="container mx-auto px-6 py-24 text-center">
                <h1 className={`text-4xl font-bold ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.loginTitle}</h1>
                <p className="text-lg text-zinc-600 mt-4">{t.loginSubtitle}</p>
                <button onClick={() => openAuthModal('login')} className="mt-8 bg-black text-white font-bold py-3 px-8 text-lg hover:bg-zinc-800 transition-colors">
                    {translations[lang].header.login}
                </button>
            </div>
        );
    }

    const tabs: { id: HubTab; label: string }[] = [
        { id: 'profile', label: t.profileTab },
        { id: 'my-projects', label: t.myProjectsTab },
        { id: 'discussions', label: t.discussionsTab },
    ];
    
    return (
        <div className="bg-zinc-50 min-h-screen">
            <div className="container mx-auto px-6 py-12">
               <h1 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black mb-8`}>{t.dashboardTitle}</h1>
               
                {/* Tabs */}
                <div className="border-b border-zinc-200 mb-8">
                    <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                        {tabs.map(tab => (
                             <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`shrink-0 py-4 px-1 border-b-2 font-medium text-base ${activeTab === tab.id ? 'border-gold text-gold' : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300'}`}
                             >
                                 {tab.label}
                             </button>
                        ))}
                    </nav>
                </div>
                
                {/* Tab Content */}
                <div>
                    {activeTab === 'profile' && <ProfileTab currentUser={currentUser} lang={lang} setCurrentPage={setCurrentPage} onLogout={onLogout} />}

                    {activeTab === 'my-projects' && <MyProjectsTab currentUser={currentUser} lang={lang} openAddProjectModal={openAddProjectModal} />}
                    
                    {activeTab === 'discussions' && (
                        <div className="space-y-6">
                            <div className="bg-white border border-zinc-200 p-6">
                                <textarea
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors"
                                    rows={3}
                                    placeholder={t.postPlaceholder}
                                />
                                <div className="text-right mt-4">
                                    <button onClick={handlePost} className="bg-black text-white font-bold py-2 px-6 hover:bg-zinc-800 transition-colors">
                                        {t.postButton}
                                    </button>
                                </div>
                            </div>
                            {discussions.map(post => <DiscussionCard key={post.id} post={post} lang={lang} />)}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CommunityPage;