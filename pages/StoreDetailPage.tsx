

import React from 'react';
import { Page, Product, Store, Language } from '../types';
import { translations } from '../lib/translations';
import { mockData } from '../data/mockData';

interface StoreDetailPageProps {
  lang: Language;
  storeId: string;
}

const ProductCard: React.FC<{ product: Product, lang: Language }> = ({ product, lang }) => {
    const t_shop = translations[lang].shopPage;
    const hasDiscount = product.originalPrice && product.originalPrice !== product.price;
    const discountValue = hasDiscount ? Math.round(((parseFloat(product.originalPrice!.replace(/[^0-9.-]+/g,"")) - parseFloat(product.price.replace(/[^0-9.-]+/g,""))) / parseFloat(product.originalPrice!.replace(/[^0-9.-]+/g,""))) * 100) : 0;


    return (
        <a href={product.externalUrl} target="_blank" rel="noopener noreferrer" className="bg-white group border border-zinc-200 transition-shadow duration-300 hover:shadow-md flex flex-col">
            <div className="relative overflow-hidden h-64 bg-zinc-100 flex items-center justify-center">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-500" 
                />
                {hasDiscount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2">
                        {discountValue}% {t_shop.discountOff}
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs text-zinc-500">{product.retailer}</p>
                <h3 className="text-base font-bold text-black truncate my-1">{product.name}</h3>
                <div className="mt-auto pt-2 flex items-baseline gap-2">
                    <p className="text-lg font-bold text-zinc-900">{product.price}</p>
                    {hasDiscount && (
                         <p className="text-sm text-zinc-500 line-through">{product.originalPrice}</p>
                    )}
                </div>
            </div>
        </a>
    )
}

const StoreDetailPage: React.FC<StoreDetailPageProps> = ({ lang, storeId }) => {
  const store = mockData[lang].stores.find(s => s.id === storeId);
  const products = mockData[lang].products.filter(p => p.storeId === storeId);

  if (!store) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold">Store Not Found</h1>
        <p className="text-lg text-zinc-600 mt-4">The store you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="grid lg:grid-cols-2">
          {/* Main Image */}
          <div className="lg:sticky top-[72px] h-[50vh] lg:h-[calc(100vh-72px)] bg-cover bg-center" style={{ backgroundImage: `url(${store.mainImageUrl})` }}></div>
          
          {/* Products */}
          <div className="container mx-auto px-6 py-16">
              <h1 className={`text-4xl md:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{store.collectionTitle}</h1>
              <p className="text-lg text-zinc-600 mt-4">{store.description}</p>
            
              {products.length > 0 ? (
                 <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} lang={lang} />
                    ))}
                </div>
              ) : (
                <p className="text-center text-zinc-500 py-16 mt-8 border border-dashed">This store has not added any products yet.</p>
              )}
          </div>
      </div>
    </div>
  );
};

export default StoreDetailPage;