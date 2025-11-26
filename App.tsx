
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Page, User, AuthModalView, Project, PortfolioProjectStyle, Product, Store, Language, Theme } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DirectoryPage from './pages/DirectoryPage';
import AIDesignStudioPage from './pages/AIDesignStudioPage';
import ShopPage from './pages/ShopPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import NewsletterPage from './pages/NewsletterPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProfilePage from './pages/ProfilePage';
import StoreDetailPage from './pages/StoreDetailPage';
import CommunityPage from './pages/CommunityPage';
import VendorDashboardPage from './pages/VendorDashboardPage';
import JoinProPage from './pages/JoinProPage';
import JoinProSuccessPage from './pages/JoinProSuccessPage';
import ADOfferPage from './pages/ADOfferPage';
import GraphicsHousePage from './pages/GraphicsHousePage';
import BeesmotionPage from './pages/BeesmotionPage';
import GlobalProjectsPage from './pages/GlobalProjectsPage';
import InspirationsPage from './pages/InspirationsPage';
import AboutUsPage from './pages/AboutUsPage';

import AuthModal from './components/AuthModal';
import AddProjectModal from './components/AddProjectModal';
import EmailCaptureModal from './components/EmailCaptureModal';
import StyleQuizModal from './components/StyleQuizModal'; 
import { mockData, mockUsers } from './data/mockData';

const App = () => {
    const [lang, setLang] = useState<Language>('ar');
    const [theme, setTheme] = useState<Theme>('light'); // Default to light for consistency with initial request, or 'dark' if preferred
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [authModal, setAuthModal] = useState<{ isOpen: boolean, view: AuthModalView, redirectPage?: Page }>({ isOpen: false, view: 'login' });
    const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);
    
    const [emailCaptureProps, setEmailCaptureProps] = useState<{ isOpen: boolean, onSubmit?: (name: string, email: string) => void }>({ isOpen: false });
    
    const [isQuizOpen, setIsQuizOpen] = useState(false);

    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const [activeProfileId, setActiveProfileId] = useState<number | null>(null);
    const [activeStoreId, setActiveStoreId] = useState<string | null>(null);
    
    const [products, setProducts] = useState<Product[]>(mockData[lang].products);

    const [initialDirectoryFilters, setInitialDirectoryFilters] = useState<{ style?: PortfolioProjectStyle | null }>({});


    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage, activeProjectId, activeProfileId, activeStoreId]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const openAuthModal = (view: AuthModalView, redirectPage?: Page) => {
        setAuthModal({ isOpen: true, view, redirectPage });
    };

    const closeAuthModal = () => {
        setAuthModal({ isOpen: false, view: 'login' });
    };
    
    const openEmailCaptureModal = (onSubmit?: (name: string, email: string) => void) => {
        setEmailCaptureProps({ isOpen: true, onSubmit });
    };

    const closeEmailCaptureModal = () => {
        setEmailCaptureProps({ isOpen: false });
    };

    const handleEmailCapture = (name: string, email: string) => {
        if (emailCaptureProps.onSubmit) {
            emailCaptureProps.onSubmit(name, email);
        } else {
            setCurrentPage('ai-design-studio');
        }
        closeEmailCaptureModal();
    };
    
    const openQuiz = () => {
        setIsQuizOpen(true);
    };

    const handleQuizFinish = (style: PortfolioProjectStyle, action: 'ai' | 'directory') => {
        setIsQuizOpen(false);
        if (action === 'directory') {
            handleNavigateToDirectory({ style });
        } else {
            setCurrentPage('ai-design-studio');
        }
    };

    const handleLogin = (email: string, pass: string): boolean => {
        const user = mockUsers.find(u => u.email === email && u.password === pass);
        if (user) {
            setCurrentUser(user);
            const redirect = authModal.redirectPage;
            closeAuthModal();
            if(redirect) setCurrentPage(redirect);
            return true;
        }
        return false;
    };
    
    const handleSignup = (
        name: string, 
        email: string, 
        pass: string, 
        userType: 'professional' | 'vendor', 
        storeData?: { name: string, description: string, imageUrl: string }
    ): boolean => {
        if (mockUsers.some(u => u.email === email)) {
            return false;
        }

        let newUser: User;

        if (userType === 'vendor' && storeData) {
            const storeId = `store-${Date.now()}`;
            
            newUser = { 
                id: Date.now(), 
                name, 
                email, 
                password: pass, 
                role: 'vendor', 
                membership: 'Business', 
                storeId: storeId 
            };

            const newStoreAr: Store = {
                id: storeId,
                name: storeData.name,
                description: storeData.description,
                imageUrl: storeData.imageUrl,
                mainImageUrl: storeData.imageUrl,
                collectionTitle: `مجموعة ${storeData.name}`
            };
            const newStoreEn: Store = {
                id: storeId,
                name: storeData.name,
                description: storeData.description,
                imageUrl: storeData.imageUrl,
                mainImageUrl: storeData.imageUrl,
                collectionTitle: `${storeData.name} Collection`
            };

            mockData.ar.stores.unshift(newStoreAr);
            mockData.en.stores.unshift(newStoreEn);

        } else {
            newUser = { 
                id: Date.now(), 
                name, 
                email, 
                password: pass, 
                role: 'professional', 
                membership: 'Pro' 
            };
        }

        mockUsers.push(newUser);
        setCurrentUser(newUser);
        const redirect = authModal.redirectPage;
        closeAuthModal();
        if(redirect) setCurrentPage(redirect);
        return true;
    };


    const handleLogout = () => {
        setCurrentUser(null);
        setCurrentPage('home');
    };
    
    const viewProject = (id: string) => {
        setActiveProjectId(id);
        setCurrentPage('projectDetail');
    }
    
    const viewProfile = (id: number) => {
        setActiveProfileId(id);
        setCurrentPage('profileDetail');
    }
    
    const viewStore = (id: string) => {
        setActiveStoreId(id);
        setCurrentPage('storeDetail');
    }
    
    const handleAddProject = (project: Project) => {
        mockData.ar.projects.unshift(project);
        mockData.en.projects.unshift(project);
    };
    
    const handleAddProduct = (product: Product) => {
        setProducts(prev => [product, ...prev]);
        mockData[lang].products.unshift(product);
        mockData[lang === 'ar' ? 'en' : 'ar'].products.unshift(product);
    };

    const handleNavigateToDirectory = (filters: { style?: PortfolioProjectStyle | null }) => {
        setInitialDirectoryFilters(filters);
        setCurrentPage('directory');
    };

    const clearInitialFilters = () => {
        setInitialDirectoryFilters({});
    }

    const renderPage = () => {
        const homePageProps = { lang, setCurrentPage, openAuthModal, viewProject, viewProfile, openEmailCaptureModal, openQuiz };
        const directoryPageProps = { lang, setCurrentPage, currentUser, openAuthModal, viewProfile, initialFilters: initialDirectoryFilters, clearInitialFilters };
        const inspirationsPageProps = { lang, viewProject };
        const aiDesignStudioProps = { lang, setCurrentPage, handleNavigateToDirectory, openEmailCaptureModal, viewProfile };


        switch (currentPage) {
            case 'home': return <HomePage {...homePageProps} />;
            case 'about-us': return <AboutUsPage lang={lang} />;
            case 'directory': return <DirectoryPage {...directoryPageProps} />;
            case 'ai-design-studio': return <AIDesignStudioPage {...aiDesignStudioProps} />;
            case 'blog': return <BlogPage lang={lang} />;
            case 'newsletter': return <NewsletterPage lang={lang} />;
            case 'projectDetail': return activeProjectId ? <ProjectDetailPage lang={lang} projectId={activeProjectId} viewProfile={viewProfile} /> : <HomePage {...homePageProps} />;
            case 'profileDetail': return activeProfileId ? <ProfilePage lang={lang} profileId={activeProfileId} viewProject={viewProject} /> : <DirectoryPage {...directoryPageProps} />;
            case 'hub': return <CommunityPage lang={lang} currentUser={currentUser} openAuthModal={openAuthModal} setCurrentPage={setCurrentPage} projects={[]} openAddProjectModal={() => setAddProjectModalOpen(true)} onLogout={handleLogout} />;
            case 'vendorDashboard': return <VendorDashboardPage lang={lang} currentUser={currentUser} openAuthModal={openAuthModal} onAddProduct={handleAddProduct} />;
            case 'join-pro': return <JoinProPage lang={lang} setCurrentPage={setCurrentPage} openAuthModal={openAuthModal} />;
            case 'join-pro-success': return <JoinProSuccessPage lang={lang} setCurrentPage={setCurrentPage} />;
            case 'ad-offer': return <ADOfferPage lang={lang} onSignup={(name, email, pass) => handleSignup(name, email, pass, 'professional')} setCurrentPage={setCurrentPage} />;
            case 'beesmotion': return <BeesmotionPage lang={lang} />;
            case 'inspirations': return <InspirationsPage {...inspirationsPageProps} />;
            case 'upgrade': return <PricingPage lang={lang} setCurrentPage={setCurrentPage} currentUser={currentUser} openAuthModal={openAuthModal} />;
            case 'shop': return <ShopPage lang={lang} viewStore={viewStore} />;
            case 'storeDetail': return activeStoreId ? <StoreDetailPage lang={lang} storeId={activeStoreId} /> : <ShopPage lang={lang} viewStore={viewStore} />;
            case 'graphics-house': return <GraphicsHousePage lang={lang} setCurrentPage={setCurrentPage} />;
            default: return <HomePage {...homePageProps} />;
        }
    };

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div 
                className={`min-h-screen flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 ${lang === 'ar' ? 'font-sans rtl' : 'font-en-sans ltr'}`}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
                <Header
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    lang={lang}
                    setLang={setLang}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    currentUser={currentUser}
                    onLogout={handleLogout}
                    openAuthModal={openAuthModal}
                />
                <main className="flex-grow">
                    {renderPage()}
                </main>
                <Footer lang={lang} setCurrentPage={setCurrentPage} />

                {authModal.isOpen && (
                    <AuthModal
                        lang={lang}
                        initialView={authModal.view}
                        onClose={closeAuthModal}
                        onLogin={handleLogin}
                        onSignup={handleSignup}
                    />
                )}

                {emailCaptureProps.isOpen && (
                    <EmailCaptureModal
                        lang={lang}
                        onClose={closeEmailCaptureModal}
                        onSubmit={handleEmailCapture}
                    />
                )}
                
                {isQuizOpen && (
                    <StyleQuizModal
                        isOpen={isQuizOpen}
                        onClose={() => setIsQuizOpen(false)}
                        onFinish={handleQuizFinish}
                        lang={lang}
                    />
                )}
                
                {currentUser && (
                    <AddProjectModal
                        isOpen={addProjectModalOpen}
                        onClose={() => setAddProjectModalOpen(false)}
                        onAddProject={handleAddProject}
                        lang={lang}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
