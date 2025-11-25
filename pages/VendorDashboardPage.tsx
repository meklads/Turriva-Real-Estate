import React, { useState, useMemo } from 'react';
import { User, Page, Product, AuthModalView, Language } from '../types';
import { mockData } from '../data/mockData';
import AddProductModal from '../components/AddProductModal';
import { translations } from '../lib/translations';

interface VendorDashboardPageProps {
  lang: Language;
  currentUser: User | null;
  openAuthModal: (view: AuthModalView) => void;
  onAddProduct: (product: Product) => void;
}

const VendorDashboardPage: React.FC<VendorDashboardPageProps> = ({ lang, currentUser, openAuthModal, onAddProduct }) => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const t = translations[lang].vendorDashboard;

  const vendorProducts = useMemo(() => {
    if (currentUser?.role !== 'vendor' || !currentUser.storeId) {
      return [];
    }
    return mockData[lang].products.filter(p => p.storeId === currentUser.storeId);
  }, [lang, currentUser, mockData[lang].products]);
  
  if (!currentUser || currentUser.role !== 'vendor') {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className={`text-4xl font-bold ${lang === 'en' ? 'font-en-serif' : 'font-serif'}`}>{t.accessDenied}</h1>
        <p className="text-lg text-zinc-600 mt-4">{t.loginPrompt}</p>
        <button onClick={() => openAuthModal('login')} className="mt-8 bg-black text-white font-bold py-3 px-8 text-lg hover:bg-zinc-800 transition-colors">
          {t.login}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-zinc-50 min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <div>
              <h1 className={`text-4xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
              <p className="text-zinc-600 mt-2">{t.welcome} {currentUser.name}. {t.description}</p>
            </div>
            <button onClick={() => setIsAddProductModalOpen(true)} className="bg-gold text-white font-bold py-3 px-6 hover:bg-gold-dark transition-colors self-start md:self-center">
              {t.addProduct}
            </button>
          </div>
          
          <div className="bg-white border border-zinc-200">
            <div className="p-4 border-b font-semibold grid grid-cols-5 gap-4 text-sm text-zinc-600">
              <div className="col-span-1">{t.image}</div>
              <div className="col-span-2">{t.productName}</div>
              <div>{t.price}</div>
              <div>{t.category}</div>
            </div>
            {vendorProducts.length > 0 ? (
                vendorProducts.map(product => (
                    <div key={product.id} className="p-4 border-b grid grid-cols-5 gap-4 items-center">
                        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover"/>
                        <p className="col-span-2 font-semibold text-zinc-800">{product.name}</p>
                        <p className="text-zinc-600">{product.price}</p>
                        <p className="text-zinc-600">{product.category}</p>
                    </div>
                ))
            ) : (
                <p className="p-8 text-center text-zinc-500">{t.noProducts}</p>
            )}
          </div>
        </div>
      </div>
      <AddProductModal 
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={onAddProduct}
        lang={lang}
        currentUser={currentUser}
      />
    </>
  );
};

export default VendorDashboardPage;