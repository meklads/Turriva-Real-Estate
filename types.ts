
// types.ts

export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark'; // Added Theme type
export type AuthModalView = 'login' | 'signup';

export type Page = 
  | 'home'
  | 'directory'
  | 'ai-design-studio'
  | 'shop'
  | 'upgrade'
  | 'blog'
  | 'newsletter'
  | 'projectDetail'
  | 'profileDetail'
  | 'storeDetail'
  | 'hub'
  | 'vendorDashboard'
  | 'join-pro'
  | 'join-pro-success'
  | 'ad-offer'
  | 'beesmotion'
  | 'inspirations'
  | 'about-us'
  | 'graphics-house'
  | 'full-service'
  | 'list-land-landing'
  | 'land-owner-form'
  | 'land-market'
  | 'opportunities'
  | 'real-estate-market'
  | 'propertyDetail'
  | 'real-estate-landing';


export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: 'professional' | 'client' | 'vendor';
  membership: 'Free' | 'Pro' | 'Business' | 'Corporate';
  storeId?: string;
}

export type ProjectCategory = 'تصميم معماري' | 'تصميم داخلي' | 'مقاولات عامة' | 'توريد مواد' | 'استشارات هندسة';
export type PortfolioProjectCategory = 'سكني' | 'تجاري' | 'ضيافة' | 'مكتبي' | 'ترفيهي';
export type PortfolioProjectStyle = 'مودرن' | 'نيوكلاسيك' | 'صناعي' | 'بوهيمي' | 'معاصر';
export type DirectoryCategory = 'شركات تطوير عقاري' | 'شركات مقاولات' | 'مكاتب هندسية' | 'مكاتب ديكور' | 'مواد البناء والعلامات التجارية' | 'لاندسكيب' | 'خدمات فنية وتسويقية' | 'فرص عقارية';
export type ProductCategory = 'لاندسكيب' | 'ديكور' | 'مواد بناء' | 'تصاميم رقمية' | 'مخططات';
export type ProductType = 'physical' | 'digital' | 'exclusive';

export interface Project {
  id: number;
  title: string;
  client: string;
  budget?: string;
  deadline: string;
  category: ProjectCategory;
  description: string;
  city?: string;
  postedDate: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  professionalId: number;
  coverImageUrl: string;
  description: string;
  location: string;
  year: number;
  category: PortfolioProjectCategory;
  style: PortfolioProjectStyle;
  images: string[];
  modelUrl?: string; // Added for 3D model integration
}

export interface Product {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    imageUrl: string;
    category: ProductCategory;
    productType: ProductType; // Added field
    subcategory: string;
    storeId: string;
    storeName: string;
    retailer: string;
    externalUrl: string;
    fileFormats?: string[]; // For digital products (e.g., MAX, OBJ, PDF)
}

export interface DirectoryItem {
    id: number;
    type: 'profile' | 'project';
}

export interface Profile extends DirectoryItem {
    type: 'profile';
    name: string;
    specialty: string;
    location: string;
    rating: number;
    imageUrl: string;
    isVerified: boolean;
    category: DirectoryCategory;
    portfolioProjectIds?: string[];
    bio: string;
    services: string[];
}

export interface FeaturedProject extends DirectoryItem {
    type: 'project';
    name: string;
    developer: string;
    description: string;
    imageUrl: string;
    category: DirectoryCategory;
}

export interface CommunityPost {
    id: number;
    author: {
        name: string;
        title: string;
        avatarUrl: string;
    };
    timestamp: string;
    content: string;
    imageUrl?: string;
    likes: number;
    comments: number;
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    imageUrl: string;
    author: string;
    date: string;
}

export interface Store {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    mainImageUrl: string;
    collectionTitle: string;
}

export interface Review {
    id: number;
    profileId: number;
    authorName: string;
    authorAvatar: string;
    rating: number;
    comment: string;
    date: string;
}

export interface GlobalProject {
    id: number;
    title: string;
    architect: string;
    location: string;
    imageUrl: string;
    description: string;
}

export interface InspirationSource {
    id: number;
    name: string;
    style: string;
    imageUrl: string;
    bio: string;
}

export interface LandListing {
    id: number;
    ownerName: string;
    city: string;
    neighborhood: string;
    area: number;
    description: string;
    postedDate: string;
    imageUrl: string;
}

export type PropertyListingType = 'villa' | 'apartment' | 'land' | 'commercial';

export interface PropertyListing {
    id: string;
    title: string;
    location: string;
    price: number;
    type: PropertyListingType;
    bedrooms?: number;
    bathrooms?: number;
    area: number;
    coverImageUrl: string;
    images: string[];
    description: string;
    amenities: string[];
    developerId: number;
}