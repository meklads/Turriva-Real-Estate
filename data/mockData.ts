
import { User, DirectoryCategory, PortfolioProject, Project, CommunityPost, BlogPost, Store, Review, GlobalProject, InspirationSource, LandListing, PropertyListing, Product } from '../types';

export const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password', role: 'professional', membership: 'Pro' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password', role: 'client', membership: 'Free' },
    { id: 3, name: 'Vendor Shop', email: 'vendor@example.com', password: 'password', role: 'vendor', membership: 'Business', storeId: 'store-1' },
];

const commonData = {
    portfolioProjects: [
        { id: 'proj-1', professionalId: 101, coverImageUrl: 'https://images.pexels.com/photos/2089696/pexels-photo-2089696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', location: 'الرياض', year: 2023, category: 'سكني', style: 'مودرن', title: 'فيلا الياسمين', images: ['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'], modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb' },
        { id: 'proj-2', professionalId: 102, coverImageUrl: 'https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', location: 'جدة', year: 2022, category: 'تجاري', style: 'صناعي', title: 'كافيه روست', images: [] },
        { id: 'proj-3', professionalId: 103, coverImageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', location: 'الدمام', year: 2024, category: 'مكتبي', style: 'معاصر', title: 'مقر شركة التقنية', images: [] },
        { id: 'proj-4', professionalId: 101, coverImageUrl: 'https://images.pexels.com/photos/6438762/pexels-photo-6438762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', location: 'الرياض', year: 2021, category: 'سكني', style: 'نيوكلاسيك', title: 'قصر حطين', images: [] },
        { id: 'proj-5', professionalId: 137, coverImageUrl: 'https://images.adsttc.com/media/images/5014/1f15/28ba/0d37/0200/0c4c/large_jpg/stringio.jpg?1414578028', location: 'الظهران', year: 2017, category: 'تجاري', style: 'مودرن', title: 'إثراء', images: [] },
        { id: 'proj-6', professionalId: 136, coverImageUrl: 'https://images.pexels.com/photos/17061329/pexels-photo-17061329/free-photo-of-king-abdullah-financial-district-in-riyadh.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', location: 'الرياض', year: 2020, category: 'مكتبي', style: 'مودرن', title: 'كافد', images: [] },
        { id: 'proj-7', professionalId: 138, coverImageUrl: 'https://images.pexels.com/photos/16013348/pexels-photo-16013348/free-photo-of-maraya-concert-hall-in-al-ula.jpeg', location: 'العلا', year: 2019, category: 'ترفيهي', style: 'معاصر', title: 'مسرح مرايا', images: [] },
        { id: 'proj-8', professionalId: 139, coverImageUrl: 'https://images.pexels.com/photos/17698246/pexels-photo-17698246/free-photo-of-diriyah.jpeg', location: 'الدرعية', year: 2022, category: 'ضيافة', style: 'نيوكلاسيك', title: 'فندق الدرعية', images: [] },
    ] as PortfolioProject[],
    projects: [
        { id: 1, title: 'تصميم فيلا سكنية مودرن', client: 'محمد العتيبي', budget: '50,000 - 80,000 ريال', deadline: '2024-12-01', category: 'تصميم معماري', description: 'مطلوب تصميم فيلا مساحة 400م على الطراز المودرن مع واجهات زجاجية.', city: 'الرياض', postedDate: '2024-10-20' },
        { id: 2, title: 'تشطيب شقة فاخرة', client: 'شركة العقارية', budget: '150,000 ريال', deadline: '2024-11-15', category: 'مقاولات عامة', description: 'تشطيب شقة بنتهاوس 250م، رخام وبورسلان.', city: 'جدة', postedDate: '2024-10-22' },
        { id: 3, title: 'توريد مواد سباكة لمجمع سكني', client: 'مؤسسة البناء', budget: '200,000 ريال', deadline: '2024-12-30', category: 'توريد مواد', description: 'توريد أنابيب ومحابس لمشروع 20 فيلا.', city: 'الدمام', postedDate: '2024-10-25' },
    ] as Project[],
    reviews: [
        { id: 1, profileId: 101, authorName: 'أحمد', authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 5, comment: 'عمل رائع وتصميم فريد!', date: '2024-05-10' },
        { id: 2, profileId: 101, authorName: 'سارة', authorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg', rating: 4.5, comment: 'احترافية عالية والتزام بالمواعيد.', date: '2024-04-22' },
    ] as Review[],
    stores: [
        { id: 'store-1', name: 'تسوق منزل زوي ديشانيل وجوناثان سكوت', imageUrl: 'https://images.pexels.com/photos/6489107/pexels-photo-6489107.jpeg?auto=compress&cs=tinysrgb&w=800', mainImageUrl: 'https://images.pexels.com/photos/6489107/pexels-photo-6489107.jpeg', collectionTitle: 'احصل على المظهر: جوهرة على الطراز الجورجي' },
        { id: 'store-2', name: 'تسوق منزل ميشيل دوكري', imageUrl: 'https://images.pexels.com/photos/6585626/pexels-photo-6585626.jpeg?auto=compress&cs=tinysrgb&w=800', mainImageUrl: 'https://images.pexels.com/photos/6585626/pexels-photo-6585626.jpeg', collectionTitle: 'سكينة المطبخ الإنجليزي' },
    ] as Store[],
    landListings: [
        { id: 1, ownerName: 'عبدالله', city: 'الرياض', neighborhood: 'حي الياسمين', area: 600, description: 'أرض سكنية على شارعين، موقع مميز وقريبة من الخدمات.', postedDate: '2024-06-01', imageUrl: 'https://images.pexels.com/photos/1018049/pexels-photo-1018049.jpeg' },
        { id: 2, ownerName: 'محمد', city: 'جدة', neighborhood: 'أبحر الشمالية', area: 800, description: 'أرض تجارية على طريق رئيسي، مناسبة لمشروع تجاري.', postedDate: '2024-05-25', imageUrl: 'https://images.pexels.com/photos/8431713/pexels-photo-8431713.jpeg' },
    ] as LandListing[],
    propertyListings: [
       { id: 'prop-1', title: 'فيلا فاخرة في حي النرجس', location: 'الرياض', price: 4500000, type: 'villa', bedrooms: 5, bathrooms: 6, area: 550, coverImageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'], description: 'فيلا بتصميم مودرن وتشطيبات عالية الجودة.', amenities: ['مسبح', 'حديقة', 'موقف خاص'], developerId: 104 },
       { id: 'prop-2', title: 'شقة بإطلالة بحرية', location: 'جدة', price: 1800000, type: 'apartment', bedrooms: 3, bathrooms: 3, area: 220, coverImageUrl: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', images: ['https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg'], description: 'شقة في برج سكني فاخر مع إطلالة مباشرة على البحر.', amenities: ['نادي صحي', 'أمن 24 ساعة'], developerId: 104 },
    ] as PropertyListing[],
    products: [
        { id: 1, name: 'ثريا زجاجية عتيقة', price: '3,200 ريال', imageUrl: 'https://images.pexels.com/photos/7534223/pexels-photo-7534223.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'ديكور', productType: 'physical', subcategory: 'إضاءة', storeId: 'store-1', storeName: 'تسوق منزل زوي ديشانيل', retailer: '1stDibs', externalUrl: '#' },
        { id: 2, name: 'طاولة قهوة خشبية', price: '1,800 ريال', originalPrice: '2,200 ريال', imageUrl: 'https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'ديكور', productType: 'physical', subcategory: 'أثاث', storeId: 'store-1', storeName: 'تسوق منزل زوي ديشانيل', retailer: 'Pottery Barn', externalUrl: '#' },
        { id: 101, name: 'مخطط فيلا مودرن (الرياض)', price: '499 ريال', imageUrl: 'https://images.pexels.com/photos/1029611/pexels-photo-1029611.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'مخططات', productType: 'digital', subcategory: 'فيلا', storeId: 'store-132', storeName: 'جرافيكس هاوس', retailer: 'Graphics House', externalUrl: '#', fileFormats: ['DWG', 'PDF'] },
    ] as Product[],
    communityPosts: [
        { id: 1, author: { name: 'علي العبدالله', title: 'مهندس معماري', avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg' }, timestamp: 'منذ 3 ساعات', content: 'ما رأيكم في استخدام الحجر الطبيعي في الواجهات المودرن؟', likes: 12, comments: 4 },
    ] as CommunityPost[],
    posts: [
        { id: 1, title: 'مستقبل التصميم بالذكاء الاصطناعي', excerpt: 'كيف يغير الذكاء الاصطناعي ملامح العمارة والتصميم الداخلي.', imageUrl: 'https://images.pexels.com/photos/30436054/pexels-photo-30436054.jpeg', author: 'سارة محمد', date: '2024-05-15' },
    ] as BlogPost[],
    globalProjects: [
        { id: 1, title: 'متحف اللوفر أبوظبي', architect: 'جان نوفيل', location: 'أبوظبي', imageUrl: 'https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg', description: 'تحفة معمارية تجمع بين الحداثة والتراث.' }
    ] as GlobalProject[],
    inspirationSources: [
        { id: 1, name: 'زها حديد', style: 'تفكيكية', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Zaha_Hadid_in_Heydar_Aliyev_Center_baku_nov_2013.jpg', bio: 'ملكة المنحنيات.' }
    ] as InspirationSource[],
}

export const mockData = {
    ar: {
        ...commonData,
        directoryItems: [
            { id: 101, type: 'profile', name: 'شركة البناء الحديث', specialty: 'مقاولات عامة', location: 'الرياض', rating: 4.8, imageUrl: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isVerified: true, category: 'شركات مقاولات' as DirectoryCategory, portfolioProjectIds: ['proj-1', 'proj-4'], bio: 'رواد في مجال المقاولات العامة...', services: ['بناء فلل', 'تشطيبات', 'ترميم'] },
            { id: 102, type: 'profile', name: 'استوديو التصميم المبدع', specialty: 'تصميم داخلي', location: 'جدة', rating: 4.9, imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isVerified: true, category: 'مكاتب ديكور' as DirectoryCategory, portfolioProjectIds: ['proj-2'], bio: 'نخلق مساحات تعكس شخصيتك...', services: ['تصميم سكني', 'تصميم تجاري'] },
            { id: 103, type: 'profile', name: 'مكتب الرؤية الهندسية', specialty: 'استشارات هندسية', location: 'الدمام', rating: 4.7, imageUrl: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isVerified: false, category: 'مكاتب هندسية' as DirectoryCategory, portfolioProjectIds: ['proj-3'], bio: 'حلول هندسية متكاملة...', services: ['إشراف هندسي', 'تصاميم معمارية'] },
            { id: 104, type: 'profile', name: 'شركة التطوير العقاري المتحدة', specialty: 'تطوير عقاري', location: 'الرياض', rating: 4.9, imageUrl: 'https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isVerified: true, category: 'شركات تطوير عقاري' as DirectoryCategory, portfolioProjectIds: [], bio: 'نبني المستقبل.', services: ['تطوير أراضي', 'مشاريع سكنية'] },
            { id: 201, type: 'project', name: 'مشروع أبراج الرياض', developer: 'شركة التطوير العقاري المتحدة', description: 'مجمع سكني فاخر في قلب الرياض.', imageUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg', category: 'فرص عقارية' as DirectoryCategory },
        ],
    },
    en: {
        ...commonData,
        portfolioProjects: [
            { id: 'proj-1', professionalId: 101, coverImageUrl: 'https://images.pexels.com/photos/2089696/pexels-photo-2089696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', location: 'Riyadh', year: 2023, category: 'سكني', style: 'مودرن', title: 'Al Yasmin Villa', images: ['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'], modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb' },
            { id: 'proj-2', professionalId: 102, coverImageUrl: 'https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', location: 'Jeddah', year: 2022, category: 'تجاري', style: 'صناعي', title: 'Roast Cafe', images: [] },
            { id: 'proj-3', professionalId: 103, coverImageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', location: 'Dammam', year: 2024, category: 'مكتبي', style: 'معاصر', title: 'Tech HQ', images: [] },
            { id: 'proj-4', professionalId: 101, coverImageUrl: 'https://images.pexels.com/photos/6438762/pexels-photo-6438762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', location: 'Riyadh', year: 2021, category: 'سكني', style: 'نيوكلاسيك', title: 'Hittin Palace', images: [] },
            { id: 'proj-5', professionalId: 137, coverImageUrl: 'https://images.adsttc.com/media/images/5014/1f15/28ba/0d37/0200/0c4c/large_jpg/stringio.jpg?1414578028', location: 'Dhahran', year: 2017, category: 'تجاري', style: 'مودرن', title: 'Ithra', images: [] },
            { id: 'proj-6', professionalId: 136, coverImageUrl: 'https://images.pexels.com/photos/17061329/pexels-photo-17061329/free-photo-of-king-abdullah-financial-district-in-riyadh.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', location: 'Riyadh', year: 2020, category: 'مكتبي', style: 'مودرن', title: 'KAFD', images: [] },
            { id: 'proj-7', professionalId: 138, coverImageUrl: 'https://images.pexels.com/photos/16013348/pexels-photo-16013348/free-photo-of-maraya-concert-hall-in-al-ula.jpeg', location: 'AlUla', year: 2019, category: 'ترفيهي', style: 'معاصر', title: 'Maraya Hall', images: [] },
            { id: 'proj-8', professionalId: 139, coverImageUrl: 'https://images.pexels.com/photos/17698246/pexels-photo-17698246/free-photo-of-diriyah.jpeg', location: 'Diriyah', year: 2022, category: 'ضيافة', style: 'نيوكلاسيك', title: 'Diriyah Hotel', images: [] },
        ] as PortfolioProject[],
        directoryItems: [
            { id: 101, type: 'profile', name: 'Modern Construction Co.', specialty: 'General Contracting', location: 'Riyadh', rating: 4.8, imageUrl: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isVerified: true, category: 'شركات مقاولات' as DirectoryCategory, portfolioProjectIds: ['proj-1', 'proj-4'], bio: 'Pioneers in general contracting...', services: ['Villa Construction', 'Finishing', 'Renovation'] },
            { id: 102, type: 'profile', name: 'Creative Design Studio', specialty: 'Interior Design', location: 'Jeddah', rating: 4.9, imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isVerified: true, category: 'مكاتب ديكور' as DirectoryCategory, portfolioProjectIds: ['proj-2'], bio: 'We create spaces that reflect your personality...', services: ['Residential Design', 'Commercial Design'] },
            { id: 103, type: 'profile', name: 'Vision Engineering', specialty: 'Engineering Consulting', location: 'Dammam', rating: 4.7, imageUrl: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isVerified: false, category: 'مكاتب هندسية' as DirectoryCategory, portfolioProjectIds: ['proj-3'], bio: 'Integrated engineering solutions...', services: ['Construction Supervision', 'Architectural Design'] },
            { id: 104, type: 'profile', name: 'United Real Estate Dev', specialty: 'Real Estate Development', location: 'Riyadh', rating: 4.9, imageUrl: 'https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', isVerified: true, category: 'شركات تطوير عقاري' as DirectoryCategory, portfolioProjectIds: [], bio: 'Building the future.', services: ['Land Development', 'Residential Projects'] },
            { id: 201, type: 'project', name: 'Riyadh Towers Project', developer: 'United Real Estate Development', description: 'A luxury residential complex in the heart of Riyadh.', imageUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg', category: 'فرص عقارية' as DirectoryCategory },
        ],
        products: commonData.products.map(p => {
            let englishName = p.name;
            // Simple manual mapping for physical products
            if (p.id === 1) englishName = 'Antique Glass Chandelier';
            if (p.id === 2) englishName = 'Wooden Coffee Table';
            if (p.productType === 'digital') englishName = 'Modern Villa Plan (Riyadh)';

            return {
                ...p,
                name: englishName,
                price: p.price.replace('ريال', 'SAR')
            };
        }),
        projects: commonData.projects.map(p => ({
            ...p,
            title: 'Modern Residential Villa Design', // Simplified localization
            description: 'Seeking a 400sqm modern villa design with glass facades.',
            budget: p.budget?.replace('ريال', 'SAR')
        })) as Project[],
        reviews: [
            { id: 1, profileId: 101, authorName: 'Ahmed', authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 5, comment: 'Great work and unique design!', date: '2024-05-10' },
            { id: 2, profileId: 101, authorName: 'Sara', authorAvatar: 'https://randomuser.me/api/portraits/women/1.jpg', rating: 4.5, comment: 'High professionalism and punctuality.', date: '2024-04-22' },
        ] as Review[],
        stores: [
            { id: 'store-1', name: 'Shop Zooey Deschanel & Jonathan Scott\'s Home', imageUrl: 'https://images.pexels.com/photos/6489107/pexels-photo-6489107.jpeg?auto=compress&cs=tinysrgb&w=800', mainImageUrl: 'https://images.pexels.com/photos/6489107/pexels-photo-6489107.jpeg', collectionTitle: 'Get the Look: Georgian Gem' },
            { id: 'store-2', name: 'Shop Michelle Dockery\'s Home', imageUrl: 'https://images.pexels.com/photos/6585626/pexels-photo-6585626.jpeg?auto=compress&cs=tinysrgb&w=800', mainImageUrl: 'https://images.pexels.com/photos/6585626/pexels-photo-6585626.jpeg', collectionTitle: 'English Kitchen Vibe' },
        ] as Store[],
        landListings: [
            { id: 1, ownerName: 'Abdullah', city: 'Riyadh', neighborhood: 'Al Yasmin', area: 600, description: 'Residential land on two streets, prime location near services.', postedDate: '2024-06-01', imageUrl: 'https://images.pexels.com/photos/1018049/pexels-photo-1018049.jpeg' },
            { id: 2, ownerName: 'Mohammed', city: 'Jeddah', neighborhood: 'Obhur Al Shamaliyah', area: 800, description: 'Commercial land on main road, suitable for commercial project.', postedDate: '2024-05-25', imageUrl: 'https://images.pexels.com/photos/8431713/pexels-photo-8431713.jpeg' },
        ] as LandListing[],
        propertyListings: [
           { id: 'prop-1', title: 'Luxury Villa in Al Narjis', location: 'Riyadh', price: 4500000, type: 'villa', bedrooms: 5, bathrooms: 6, area: 550, coverImageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'], description: 'Modern design villa with high-end finishes.', amenities: ['Pool', 'Garden', 'Private Parking'], developerId: 104 },
           { id: 'prop-2', title: 'Sea View Apartment', location: 'Jeddah', price: 1800000, type: 'apartment', bedrooms: 3, bathrooms: 3, area: 220, coverImageUrl: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', images: ['https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg'], description: 'Apartment in luxury tower with direct sea view.', amenities: ['Health Club', '24/7 Security'], developerId: 104 },
        ] as PropertyListing[],
        communityPosts: [
            { id: 1, author: { name: 'Ali Alabdullah', title: 'Architect', avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg' }, timestamp: '3 hours ago', content: 'What do you think about using natural stone in modern facades?', likes: 12, comments: 4 },
        ] as CommunityPost[],
        posts: [
            { id: 1, title: 'Future of AI in Design', excerpt: 'How AI is changing the face of architecture and interior design.', imageUrl: 'https://images.pexels.com/photos/30436054/pexels-photo-30436054.jpeg', author: 'Sarah Mohammed', date: '2024-05-15' },
        ] as BlogPost[],
        globalProjects: [
            { id: 1, title: 'Louvre Abu Dhabi', architect: 'Jean Nouvel', location: 'Abu Dhabi', imageUrl: 'https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg', description: 'An architectural masterpiece combining modernity and heritage.' }
        ] as GlobalProject[],
        inspirationSources: [
            { id: 1, name: 'Zaha Hadid', style: 'Deconstructivism', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Zaha_Hadid_in_Heydar_Aliyev_Center_baku_nov_2013.jpg', bio: 'Queen of the curve.' }
        ] as InspirationSource[],
    },
};
