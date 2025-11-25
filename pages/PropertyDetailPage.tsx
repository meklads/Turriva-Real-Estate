import React from 'react';
import { PropertyListing, Profile, Language } from '../types';
import { mockData } from '../data/mockData';
import { translations } from '../lib/translations';
import { BedIcon, BathIcon, RulerIcon, MapPinIcon } from '../components/Icons';

interface PropertyDetailPageProps {
  lang: Language;
  propertyId: string;
  viewProfile: (id: number) => void;
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ lang, propertyId, viewProfile }) => {
    const t = translations[lang].propertyDetailPage;
    const t_rem = translations[lang].realEstateMarketPage;

    const property = mockData[lang].propertyListings.find(p => p.id === propertyId);
    if (!property) {
        return <div>Property not found.</div>;
    }

    const developer = mockData[lang].directoryItems.find(d => d.id === property.developerId && d.type === 'profile') as Profile | undefined;
    if (!developer) {
        return <div>Developer not found.</div>;
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US', {
            style: 'currency',
            currency: 'SAR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${property.coverImageUrl})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-16 relative z-10">
                    <span className="bg-gold/80 text-white text-sm font-bold py-1 px-3 self-start mb-4">{t_rem.types[property.type]}</span>
                    <h1 className={`text-5xl md:text-7xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-white`}>{property.title}</h1>
                    <p className="text-xl text-zinc-200 mt-4 flex items-center"><MapPinIcon className="w-6 h-6 mr-2 rtl:ml-2" />{property.location}</p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left/Main Column */}
                    <div className="lg:col-span-2">
                        {/* Price and Specs */}
                        <div className="bg-zinc-50 border border-zinc-200 p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                            <div>
                                <p className="text-4xl font-bold text-black">{formatPrice(property.price)}</p>
                                <p className="text-zinc-600">{t.startingPrice}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-6 text-center mt-6 sm:mt-0">
                                {property.bedrooms && (
                                    <div>
                                        <BedIcon className="w-8 h-8 mx-auto text-zinc-500"/>
                                        <p className="font-bold mt-2">{property.bedrooms} <span className="text-sm font-normal">{t.beds}</span></p>
                                    </div>
                                )}
                                {property.bathrooms && (
                                     <div>
                                        <BathIcon className="w-8 h-8 mx-auto text-zinc-500"/>
                                        <p className="font-bold mt-2">{property.bathrooms} <span className="text-sm font-normal">{t.baths}</span></p>
                                    </div>
                                )}
                                <div>
                                    <RulerIcon className="w-8 h-8 mx-auto text-zinc-500"/>
                                    <p className="font-bold mt-2">{property.area} <span className="text-sm font-normal">{t.sqm}</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold border-b-2 border-gold pb-2 mb-4">{t.description}</h2>
                            <p className="text-zinc-700 leading-relaxed whitespace-pre-line">{property.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold border-b-2 border-gold pb-2 mb-4">{t.amenities}</h2>
                            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {property.amenities.map(amenity => (
                                    <li key={amenity} className="flex items-center text-zinc-800">
                                        <svg className="w-5 h-5 mr-3 rtl:ml-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        {amenity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Gallery */}
                        <div>
                            <h2 className="text-3xl font-bold border-b-2 border-gold pb-2 mb-4">{t.gallery}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {property.images.map((img, index) => (
                                    <img key={index} src={img} alt={`${property.title} gallery image ${index + 1}`} className="w-full h-64 object-cover" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right/Sidebar Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white border border-zinc-200 p-8">
                            <h3 className="text-2xl font-bold text-black mb-4">{t.aboutDeveloper}</h3>
                            <div className="flex items-center mb-6">
                                <img src={developer.imageUrl} alt={developer.name} className="w-16 h-16 rounded-full object-cover" />
                                <div className="mx-4">
                                    <p className="font-bold text-lg">{developer.name}</p>
                                    <p className="text-sm text-zinc-500">{developer.specialty}</p>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-600 mb-6">{developer.bio}</p>
                            <button onClick={() => viewProfile(developer.id)} className="w-full bg-black text-white font-bold py-3 hover:bg-zinc-800 transition-colors">{t.viewProfile}</button>
                            <hr className="my-6" />
                            <button className="w-full bg-gold text-white font-bold py-3 hover:bg-gold-dark transition-colors">{t.contactDeveloper}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailPage;