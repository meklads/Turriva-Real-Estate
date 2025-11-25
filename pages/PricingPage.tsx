

import React from 'react';
import { Page, User, Language, AuthModalView } from '../types';
import { translations } from '../lib/translations';
import { 
    VisaIcon, 
    MastercardIcon, 
    ApplePayIcon, 
    ShieldCheckIcon
} from '../components/Icons';

export interface PricingPlansProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
  currentUser?: User | null;
  openAuthModal?: (view: AuthModalView, redirectPage?: Page) => void;
}

const Checkmark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start">
        <ShieldCheckIcon className="w-5 h-5 text-gold flex-shrink-0 mt-1 mr-3 rtl:ml-3" />
        <span className="text-zinc-700">{children}</span>
    </li>
);

const PlanCard: React.FC<{
    title: string;
    description: string;
    price: string;
    originalPrice?: string;
    features: (string | React.ReactNode)[];
    isPopular?: boolean;
    isOffer?: boolean;
    lang: Language;
    currentUser?: User | null;
    onClick: () => void;
}> = ({ title, description, price, originalPrice, features, isPopular = false, isOffer = false, lang, currentUser, onClick }) => {
    const t = translations[lang].pricingPage;
    const t_currency = translations[lang].shopPage.currency;

    const cardClasses = `border p-8 flex flex-col h-full transition-all duration-300 ${isPopular ? 'bg-zinc-50 border-gold shadow-lg' : 'bg-white border-zinc-200'}`;
    const buttonClasses = `w-full font-bold py-3 px-6 text-lg transition-colors ${isPopular ? 'bg-gold text-white hover:bg-gold-dark' : 'bg-zinc-800 text-white hover:bg-black'}`;

    return (
        <div className={cardClasses}>
            {/* Top part of the card */}
            <div>
                {isPopular && <div className="text-center mb-4 font-bold text-gold">{t.mostPopular}</div>}
                <h2 className="text-3xl font-bold text-black">{title}</h2>
                <p className="text-zinc-600 mt-2">{description}</p>
                
                {isOffer ? (
                     <div className="my-6">
                        <span className="text-5xl font-bold text-black font-en-sans">0</span>
                        <span className="text-zinc-500"> {t_currency} / {t.monthly}</span>
                        <p className="text-zinc-500 line-through mt-1">{t.originalPrice} {originalPrice} {t_currency}</p>
                     </div>
                ) : (
                    <div className="my-6">
                        <span className="text-5xl font-bold text-black font-en-sans">{price}</span>
                        <span className="text-zinc-500"> {t_currency} / {t.monthly}</span>
                    </div>
                )}
                
                {isOffer && (
                    <div className="bg-green-100 text-green-800 text-sm font-bold p-3 text-center -mt-2">
                        <p>{t.proPlanOffer}</p>
                        <p>{t.proPlanOfferDuration}</p>
                    </div>
                )}
            </div>

            {/* Bottom part of the card - pushes to the bottom */}
            <div className="mt-auto pt-6">
                <button onClick={onClick} className={buttonClasses}>
                    {currentUser ? t.upgrade : t.choosePlan}
                </button>
                <hr className="my-8 border-zinc-200" />
                <ul className="space-y-4 text-left rtl:text-right">
                    {features.map((feature, index) => (
                        <Checkmark key={index}>{feature}</Checkmark>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export const PricingPlans: React.FC<PricingPlansProps> = ({ lang, setCurrentPage, currentUser, openAuthModal }) => {
    const t = translations[lang].pricingPage;
    
    const handlePlanClick = () => {
        if (openAuthModal && !currentUser) {
            openAuthModal('signup', 'hub');
        } else {
            // Handle upgrade logic for logged-in users
            alert("Redirecting to payment page...");
        }
    };

    const plans = [
        {
            title: t.proPlanTitle,
            description: t.proPlanDesc,
            price: t.proPlanPrice,
            originalPrice: "149",
            isOffer: true,
            features: [
                t.feature_portfolio,
                t.feature_directory,
                t.feature_public_projects,
                t.feature_community,
            ],
            isPopular: false,
        },
        {
            title: t.businessPlanTitle,
            description: t.businessPlanDesc,
            price: t.businessPlanPrice,
            features: [
                t.feature_portfolio,
                t.feature_directory,
                t.feature_public_projects,
                t.feature_community,
                t.feature_verified_badge,
                t.feature_ad_design,
                <span>
                    {t.feature_landing_page}
                    <button onClick={() => setCurrentPage('real-estate-landing')} className={`text-sm text-gold hover:underline ${lang === 'en' ? 'ml-2' : 'mr-2'}`}>
                        ({lang === 'ar' ? 'مثال' : 'Example'})
                    </button>
                </span>
            ],
            isPopular: true,
        },
        {
            title: t.corporatePlanTitle,
            description: t.corporatePlanDesc,
            price: t.corporatePlanPrice,
            features: [
                t.feature_guaranteed_leads,
                t.feature_account_manager,
                t.feature_ad_design,
                 <span>
                    {t.feature_landing_page}
                     <button onClick={() => setCurrentPage('real-estate-landing')} className={`text-sm text-gold hover:underline ${lang === 'en' ? 'ml-2' : 'mr-2'}`}>
                        ({lang === 'ar' ? 'مثال' : 'Example'})
                    </button>
                </span>,
                t.feature_verified_badge,
                t.feature_portfolio,
                t.feature_directory,
                t.feature_public_projects,
            ],
            isPopular: false,
        }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {plans.map((plan, index) => (
                <PlanCard 
                    key={index}
                    {...plan}
                    lang={lang}
                    currentUser={currentUser}
                    onClick={handlePlanClick}
                />
            ))}
        </div>
    );
};

const PricingPage: React.FC<PricingPlansProps> = ({ lang, setCurrentPage, currentUser, openAuthModal }) => {
  const t = translations[lang].pricingPage;
  
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
          <p className="text-xl text-zinc-600 mt-4">
            {t.subtitle}
          </p>
        </div>
        
        <PricingPlans
            lang={lang}
            setCurrentPage={setCurrentPage}
            currentUser={currentUser}
            openAuthModal={openAuthModal}
        />

        <div className="text-center mt-20 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-zinc-800">{t.paymentMethods}</h3>
            <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse mt-4">
                <VisaIcon className="h-8" />
                <MastercardIcon className="h-8" />
                <ApplePayIcon className="h-8" />
            </div>
        </div>

      </div>
    </div>
  );
};

export default PricingPage;