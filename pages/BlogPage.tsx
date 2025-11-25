import React from 'react';
import { BlogPost, Language } from '../types';
import { mockData } from '../data/mockData';
import { translations } from '../lib/translations';

const FeaturedPostCard: React.FC<{ post: BlogPost; lang: Language }> = ({ post, lang }) => {
    const t = translations[lang].blogPage;
    return (
        <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12 group">
            <div className="overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div>
                 <p className="text-sm font-semibold text-gold mb-2">{t.featuredPost}</p>
                <h2 className={`text-4xl lg:text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black mb-4`}>{post.title}</h2>
                <p className="text-lg text-zinc-700 mb-6">{post.excerpt}</p>
                <p className="text-zinc-500 mb-6">{post.author} &bull; {post.date}</p>
                <a href="#" className="font-bold text-black hover:text-gold transition-colors text-lg">
                    {t.readMore} &rarr;
                </a>
            </div>
        </div>
    );
};


const BlogPostCard: React.FC<{ post: BlogPost; lang: Language }> = ({ post, lang }) => {
    const t = translations[lang].blogPage;
    return (
        <div className="bg-white group">
            <div className="overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="pt-5">
                <p className="text-sm text-zinc-500 mb-2">{post.author} &bull; {post.date}</p>
                <h3 className={`text-2xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black mb-3 group-hover:text-gold transition-colors`}>{post.title}</h3>
                <a href="#" className="font-semibold text-black hover:underline">
                    {t.readMore} &rarr;
                </a>
            </div>
        </div>
    );
};

interface BlogPageProps {
  lang: Language;
}

const BlogPage: React.FC<BlogPageProps> = ({ lang }) => {
  const t = translations[lang].blogPage;
  const allPosts = mockData[lang].posts;
  const featuredPost = allPosts[0];
  const otherPosts = allPosts.slice(1);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className={`text-5xl ${lang === 'en' ? 'font-en-serif' : 'font-serif'} font-bold text-black`}>{t.title}</h1>
        <p className="text-xl text-zinc-600 mt-4 max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
          <div className="mb-16 pb-16 border-b border-zinc-200">
              <FeaturedPostCard post={featuredPost} lang={lang} />
          </div>
      )}

      {/* Other Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {otherPosts.map(post => (
          <BlogPostCard key={post.id} post={post} lang={lang} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;