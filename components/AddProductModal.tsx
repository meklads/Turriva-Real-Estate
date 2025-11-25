
import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';
import { Product, ProductCategory, User, Language } from '../types';
import { translations } from '../lib/translations';
import { mockData } from '../data/mockData';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  lang: Language;
  currentUser: User;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct, lang, currentUser }) => {
  const t = translations[lang].addProductModal;
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<ProductCategory>('ديكور');
  const [subcategory, setSubcategory] = useState('');
  const [retailer, setRetailer] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  
  const categories: {value: ProductCategory, label: string}[] = [
    { value: 'لاندسكيب', label: t.categories.landscape },
    { value: 'ديكور', label: t.categories.decor },
    { value: 'مواد بناء', label: t.categories.buildingMaterials },
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
    if (!currentUser.storeId) {
        alert("Error: Current user is not associated with a store.");
        return;
    }

    const store = mockData[lang].stores.find(s => s.id === currentUser.storeId);
    if (!store) {
        alert("Error: Store not found for the current user.");
        return;
    }

    const newProduct: Product = {
        id: Date.now(),
        name,
        price,
        imageUrl,
        category,
        productType: 'physical', // Default to physical for vendor dashboard
        subcategory,
        storeId: currentUser.storeId,
        storeName: store.name,
        retailer,
        externalUrl,
    };
    onAddProduct(newProduct);
    onClose();
    // Reset form
    setName('');
    setPrice('');
    setImageUrl('');
    setCategory('ديكور');
    setSubcategory('');
    setRetailer('');
    setExternalUrl('');
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
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">{t.nameLabel}</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.namePlaceholder}/>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-zinc-700 mb-2">{t.priceLabel}</label>
              <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.pricePlaceholder}/>
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-zinc-700 mb-2">{t.imageUrlLabel}</label>
              <input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.imageUrlPlaceholder}/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-zinc-700 mb-2">{t.categoryLabel}</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value as ProductCategory)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors appearance-none">
                    {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                </select>
            </div>
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-zinc-700 mb-2">{t.subcategoryLabel}</label>
              <input type="text" id="subcategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.subcategoryPlaceholder}/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="retailer" className="block text-sm font-medium text-zinc-700 mb-2">{t.retailerLabel}</label>
              <input type="text" id="retailer" value={retailer} onChange={(e) => setRetailer(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.retailerPlaceholder}/>
            </div>
            <div>
              <label htmlFor="externalUrl" className="block text-sm font-medium text-zinc-700 mb-2">{t.externalUrlLabel}</label>
              <input type="url" id="externalUrl" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} required className="w-full bg-white border border-zinc-300 py-2 px-4 text-zinc-900 focus:outline-none focus:border-black transition-colors" placeholder={t.externalUrlPlaceholder}/>
            </div>
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

export default AddProductModal;
