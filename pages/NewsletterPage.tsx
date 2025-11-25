import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../lib/translations';
import { BellIconFilled } from '../components/Icons';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
}

const NewsCard: React.FC<{ article: NewsArticle, lang: Language }> = ({ article, lang }) => {
    const t = translations[lang].newsletterPage;
    return (
        <div className="bg-white group overflow-hidden border border-zinc-200 transition-shadow duration-300 hover:shadow-lg">
            <div className="overflow-hidden">
                <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
                <p className="text-sm font-semibold text-gold mb-2">{article.category}</p>
                <h3 className={`text-2xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black mb-3`}>{article.title}</h3>
                <p className="text-zinc-600 mb-4">{article.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-zinc-500">
                    <span>{article.date}</span>
                    <a href="#" className="font-semibold text-black hover:text-gold transition-colors">
                        {t.readMore} &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
};

interface NewsletterPageProps {
  lang: Language;
}

const NewsletterPage: React.FC<NewsletterPageProps> = ({ lang }) => {
  const t = translations[lang].newsletterPage;
  const news = translations[lang].newsletterPage.news;
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setIsSubmitted(true);
  };

  return (
    <>
      <section 
        className="relative min-h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          
          <div className="flex justify-center mb-6">
              <BellIconFilled className="w-16 h-16 text-gold" />
          </div>
          
          {!isSubmitted ? (
            <>
              <h1 className={`text-5xl md:text-6xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.title}</h1>
              <p className="text-xl md:text-2xl mt-4 text-zinc-300">{t.subtitle}</p>
              <form onSubmit={handleSubmit} className="mt-10 max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    required
                    className={`w-full bg-white/10 backdrop-blur-sm border border-white/30 py-4 text-white placeholder-zinc-400 text-lg text-center sm:text-left rtl:sm:text-right ${lang === 'en' ? 'px-6' : 'px-6'} focus:outline-none focus:border-gold transition-colors`}
                  />
                  <button type="submit" className="bg-gold text-white font-bold py-4 px-10 text-lg hover:bg-gold-dark transition-colors flex-shrink-0">
                    {t.button}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div>
               <h1 className={`text-5xl md:text-6xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold`}>{t.successMessage}</h1>
               <p className="text-xl md:text-2xl mt-4 text-zinc-300">{t.successSubtitle}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-zinc-50 py-20">
        <div className="container mx-auto px-6">
            <h2 className={`text-4xl text-center ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black mb-12`}>{t.latestNews}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map(article => (
                    <NewsCard key={article.id} article={article} lang={lang} />
                ))}
            </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterPage;