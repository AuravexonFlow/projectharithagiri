'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

// Gallery categories with image mappings
const galleryCategories = [
  {
    id: 'stupa',
    name: 'ස්තූපය',
    nameEn: 'Stupa',
    icon: '🏛️',
    images: [
      { src: '/images/IMG_20260611_093651.jpg', title: 'ප්‍රධාන ස්තූපය' },
      { src: '/images/IMG_20260611_093557.jpg', title: 'ස්තූපය - නිකටින්' },
      { src: '/images/IMG_20260611_093558.jpg', title: 'ස්තූප දර්ශනය' },
      { src: '/images/IMG_20260611_093652.jpg', title: 'ස්තූප පරිසරය' },
      { src: '/images/IMG_20260611_093703.jpg', title: 'ස්තූප පූජාව' },
      { src: '/images/stupa-main.jpg', title: 'ස්තූපය - ප්‍රධාන' },
      { src: '/images/stupa-close.jpg', title: 'ස්තූපය - සමීප' },
    ]
  },
  {
    id: 'angiris',
    name: 'ආංගීරස මහා සෑය',
    nameEn: 'Angiris Maha Seya',
    icon: '🕌',
    images: [
      { src: '/images/sthana/angiris-maha-saya/IMG_20260611_093712_1.jpg', title: 'ආංගීරස මහා සෑය - ප්‍රධාන' },
      { src: '/images/sthana/angiris-maha-saya/IMG_20260617_130130.jpg', title: 'ආංගීරස සෑය - දර්ශනය' },
      { src: '/images/sthana/angiris-maha-saya/IMG_20260617_130140.jpg', title: 'ආංගීරස සෑය - පරිසරය' },
      { src: '/images/sthana/angiris-maha-saya/IMG_20260617_130217.jpg', title: 'ආංගීරස සෑය - සවස' },
      { src: '/images/sthana/angiris-maha-saya/IMG_20260617_130222.jpg', title: 'ආංගීරස සෑය - විස්තර' },
      { src: '/images/sthana/angiris-maha-saya/IMG_20260617_130258.jpg', title: 'ආංගීරස සෑය - පූජාව' },
      { src: '/images/sthana/angiris-maha-saya/IMG_20260617_130302.jpg', title: 'ආංගීරස සෑය - ශාන්ත' },
    ]
  },
  {
    id: 'dhatu',
    name: 'ධාතු මන්දිරය',
    nameEn: 'Dhatu Mandiraya',
    icon: '⚱️',
    images: [
      { src: '/images/sthana/dhatu-mandiraya/IMG_20260617_130541.jpg', title: 'ධාතු මන්දිරය - ප්‍රවේශය' },
      { src: '/images/sthana/dhatu-mandiraya/IMG_20260617_130547.jpg', title: 'ධාතු මන්දිරය - ප්‍රධාන' },
      { src: '/images/sthana/dhatu-mandiraya/IMG_20260617_130555.jpg', title: 'ධාතු මන්දිරය - දර්ශනය' },
      { src: '/images/sthana/dhatu-mandiraya/IMG_20260617_130605.jpg', title: 'ධාතු මන්දිරය - අභ්‍යන්තර' },
      { src: '/images/sthana/dhatu-mandiraya/IMG_20260617_130611.jpg', title: 'ධාතු මන්දිරය - විස්තර' },
      { src: '/images/sthana/dhatu-mandiraya/IMG_20260617_130624.jpg', title: 'ධාතු මන්දිරය - පරිසරය' },
    ]
  },
  {
    id: 'buddha-mandira',
    name: 'බුද්ධ මන්දිර',
    nameEn: 'Buddha Mandira',
    icon: '🙏',
    images: [
      { src: '/images/sthana/buddha-mandira/IMG_20260617_130735.jpg', title: 'බුද්ධ මන්දිරය - ප්‍රධාන' },
      { src: '/images/sthana/buddha-mandira/IMG_20260617_131620.jpg', title: 'බුද්ධ මන්දිරය - දර්ශනය' },
      { src: '/images/sthana/buddha-mandira/IMG_20260617_131628.jpg', title: 'බුද්ධ මන්දිරය - පරිසරය' },
    ]
  },
  {
    id: 'bodhiya',
    name: 'බෝධීන් වහන්සේ',
    nameEn: 'Sacred Bodhi Trees',
    icon: '',
    images: [
      { src: '/images/IMG_20260611_094048.jpg', title: 'ශ්‍රී මහා බෝධිය' },
      { src: '/images/IMG_20260611_094054.jpg', title: 'බෝධි පරිසරය' },
      { src: '/images/IMG_20260611_094104.jpg', title: 'බෝධි පූජාව' },
      { src: '/images/sthana/ananda-bodhi/IMG_20260617_125800.jpg', title: 'ආනන්ද බෝධිය - ප්‍රධාන' },
      { src: '/images/sthana/ananda-bodhi/IMG_20260617_125821.jpg', title: 'ආනන්ද බෝධිය - දර්ශනය' },
      { src: '/images/sthana/ananda-bodhi/IMG_20260617_125830.jpg', title: 'ආනන්ද බෝධිය - පරිසරය' },
      { src: '/images/sthana/ananda-bodhi/IMG_20260617_125907.jpg', title: 'ආනන්ද බෝධිය - සවස' },
      { src: '/images/sthana/ananda-bodhi/IMG_20260617_125958.jpg', title: 'ආනන්ද බෝධිය - ශාන්ත' },
      { src: '/images/sthana/parani-bodhi/IMG_20260611_102757.jpg', title: 'පැරණි බෝධිය - ප්‍රධාන' },
      { src: '/images/sthana/parani-bodhi/IMG_20260611_102809.jpg', title: 'පැරණි බෝධිය - දර්ශනය' },
      { src: '/images/sthana/parani-bodhi/IMG_20260611_102811.jpg', title: 'පැරණි බෝධිය - පරිසරය' },
      { src: '/images/sthana/parani-bodhi/IMG_20260617_130912.jpg', title: 'පැරණි බෝධිය - නව' },
      { src: '/images/sthana/parani-bodhi/IMG_20260617_130917.jpg', title: 'පැරණි බෝධිය - සවස' },
      { src: '/images/sthana/parani-bodhi/IMG_20260617_130933.jpg', title: 'පැරණි බෝධිය - ශාන්ත' },
      { src: '/images/sthana/prarthana-bodhi/IMG_20260617_130748.jpg', title: 'ප්‍රාර්ථනා සුදු බෝධිය - ප්‍රධාන' },
      { src: '/images/sthana/prarthana-bodhi/IMG_20260617_130755.jpg', title: 'ප්‍රාර්ථනා සුදු බෝධිය - දර්ශනය' },
      { src: '/images/sthana/dolosmahe-pahan/IMG_20260617_130021.jpg', title: 'දොලොස්මහේ පහන - ප්‍රධාන' },
      { src: '/images/sthana/dolosmahe-pahan/IMG_20260617_130041.jpg', title: 'දොලොස්මහේ පහන - දර්ශනය' },
    ]
  },
  {
    id: 'statues',
    name: 'ප්‍රතිමා',
    nameEn: 'Statues',
    icon: '🕉️',
    images: [
      { src: '/images/IMG_20260611_094034.jpg', title: 'ඇතුන් පිළිමය' },
      { src: '/images/IMG_20260611_094043.jpg', title: 'බුදු පිළිමය' },
      { src: '/images/IMG_20260611_094124.jpg', title: 'ප්‍රතිමා ගෙය' },
      { src: '/images/IMG_20260611_094126.jpg', title: 'ප්රතිමා දර්ශනය' },
      { src: '/images/IMG_20260611_094149.jpg', title: 'බුද්ධ ප්‍රතිමාව' },
      { src: '/images/IMG_20260611_094213.jpg', title: 'ධර්ම ප්‍රතිමාව' },
      { src: '/images/IMG_20260611_094217.jpg', title: 'සංඝ ප්‍රතිමාව' },
      { src: '/images/IMG_20260611_094218.jpg', title: 'ප්‍රතිමා සංකීර්ණය' },
    ]
  },
  {
    id: 'buildings',
    name: 'ගොඩනැගිලි',
    nameEn: 'Buildings',
    icon: '🏢',
    images: [
      { src: '/images/IMG_20260611_094513.jpg', title: 'ධර්ම ශාලාව' },
      { src: '/images/IMG_20260611_094522.jpg', title: 'ප්‍රතිමා ගෙය' },
      { src: '/images/IMG_20260611_093710.jpg', title: 'විහාර භූමිය' },
      { src: '/images/IMG_20260611_093719.jpg', title: 'විහාර පරිසරය' },
      { src: '/images/sthana/dharma-salawa/IMG_20260617_131519.jpg', title: 'ධර්ම ශාලාව - ප්‍රධාන' },
      { src: '/images/sthana/dharma-salawa/IMG_20260617_131528.jpg', title: 'ධර්ම ශාලාව - අභ්‍යන්තර' },
      { src: '/images/sthana/dharma-salawa/IMG_20260617_131540.jpg', title: 'ධර්ම ශාලාව - දර්ශනය' },
      { src: '/images/sthana/avasa-geya/IMG_20260617_131432.jpg', title: 'ආවාස ගෙය - ප්‍රධාන' },
      { src: '/images/sthana/avasa-geya/IMG_20260617_131454.jpg', title: 'ආවාස ගෙය - දර්ශනය' },
      { src: '/images/sthana/mani-akkhitha/IMG_20260617_131702.jpg', title: 'මණිඅක්ඛිත අංග රාජ ප්‍රතිමාව - ප්‍රධාන' },
      { src: '/images/sthana/mani-akkhitha/IMG_20260617_131710.jpg', title: 'මණිඅක්ඛිත අංග රාජ ප්‍රතිමාව - දර්ශනය' },
    ]
  },
  {
    id: 'entrances',
    name: 'ප්‍රවේශ',
    nameEn: 'Entrances',
    icon: '🚪',
    images: [
      { src: '/images/sthana/praweshamarga-01/IMG_20260617_131552.jpg', title: 'ප්‍රවේශ මාර්ග 01 - ප්‍රධාන' },
      { src: '/images/sthana/praweshamarga-01/IMG_20260617_131607.jpg', title: 'ප්‍රවේශ මාර්ග 01 - දර්ශනය' },
      { src: '/images/sthana/praweshamarga-01/IMG_20260617_131610.jpg', title: 'ප්‍රවේශ මාර්ග 01 - පරිසරය' },
      { src: '/images/sthana/praweshamarga-02/IMG_20260617_131432.jpg', title: 'ප්‍රවේශ මාර්ග 02' },
      { src: '/images/temple-entrance.jpg', title: 'විහාර ප්‍රවේශය' },
    ]
  },
  {
    id: 'nature',
    name: 'ස්වාභාවික පරිසරය',
    nameEn: 'Natural Surroundings',
    icon: '',
    images: [
      { src: '/images/IMG_20260611_093543.jpg', title: 'විහාර පරිසරය' },
      { src: '/images/IMG_20260611_093600.jpg', title: 'හරිත පරිසරය' },
      { src: '/images/IMG_20260611_093603.jpg', title: 'ස්වාභාවික දර්ශනය' },
      { src: '/images/IMG_20260611_093604.jpg', title: 'වන පරිසරය' },
      { src: '/images/IMG_20260611_093606.jpg', title: 'හරිතගිරි දර්ශනය' },
      { src: '/images/IMG_20260611_093623.jpg', title: 'කඳු මුදුන' },
      { src: '/images/IMG_20260611_093625.jpg', title: 'ස්වභාව සෞන්දර්ය' },
      { src: '/images/IMG_20260611_093641.jpg', title: 'හරිත බිම' },
    ]
  },
  {
    id: 'events',
    name: 'උත්සව',
    nameEn: 'Festivals & Events',
    icon: '🎉',
    images: []
  },
  {
    id: 'ceremonies',
    name: 'පූජා කටයුතු',
    nameEn: 'Ceremonies',
    icon: '🕯️',
    images: []
  },
  {
    id: 'community',
    name: 'ප්‍රජා ක්‍රියාකාරකම්',
    nameEn: 'Community Activities',
    icon: '',
    images: []
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(16);
  const [dbCategories, setDbCategories] = useState<typeof galleryCategories>([]);

  useEffect(() => {
    async function fetchFromDb() {
      const { data: cats } = await supabase.from('gallery_categories').select('*').order('display_order');
      if (!cats || cats.length === 0) return;
      const result: typeof galleryCategories = [];
      for (const cat of cats) {
        const { data: imgs } = await supabase.from('gallery_images').select('*').eq('category_id', cat.id).order('display_order');
        result.push({
          id: cat.slug,
          name: cat.name_si || cat.name,
          nameEn: cat.name,
          icon: cat.icon || '📷',
          images: (imgs || []).map((img: Record<string, unknown>) => ({ src: img.image_url as string, title: (img.title_si as string) || (img.title as string) || '' })),
        });
      }
      setDbCategories(result);
    }
    fetchFromDb();
  }, []);

  const activeCategories = dbCategories.length > 0 ? dbCategories : galleryCategories;

  const allImages = activeCategories.flatMap(cat => 
    cat.images.map(img => ({ ...img, category: cat.name, categoryEn: cat.nameEn }))
  );

  const filteredImages = selectedCategory === 'all' 
    ? allImages 
    : activeCategories.find(cat => cat.id === selectedCategory)?.images.map(img => ({
        ...img,
        category: activeCategories.find(cat => cat.id === selectedCategory)!.name,
        categoryEn: activeCategories.find(cat => cat.id === selectedCategory)!.nameEn
      })) || [];

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-temple-cream via-white to-temple-cream">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-temple-green to-temple-green-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/IMG_20260611_093651.jpg"
            alt="Gallery Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="text-white space-y-4">
            <div className="inline-block px-6 py-3 bg-temple-gold/20 backdrop-blur-md rounded-full border-2 border-temple-gold mb-4 animate-pulse-glow">
              <span className="text-temple-gold font-bold text-lg"> ඡායාරූප ගැලරිය</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold drop-shadow-2xl">
              හරිතගිරි විහාරයේ ඡායාරූප
            </h1>
            <p className="text-2xl opacity-95 font-light">
              Photo Gallery - Our Temple in Pictures
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-temple-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => { setSelectedCategory('all'); setVisibleCount(16); }}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-temple-green text-white shadow-lg scale-105'
                  : 'bg-temple-cream text-temple-green hover:bg-temple-green hover:text-white'
              }`}
            >
              🌟 සියල්ල / All
            </button>
            {activeCategories.filter(cat => cat.images.length > 0).map((category) => (
              <button
                key={category.id}
                onClick={() => { setSelectedCategory(category.id); setVisibleCount(16); }}
                className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-temple-green text-white shadow-lg scale-105'
                    : 'bg-temple-cream text-temple-green hover:bg-temple-green hover:text-white'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer card-hover bg-white shadow-md"
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {image.title}
                </h3>
                <p className="text-temple-gold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {image.category} • {image.categoryEn}
                </p>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-temple-gold/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {activeCategories.find(cat => cat.images.some(img => img.src === image.src))?.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount(prev => prev + 16)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-temple-green text-white rounded-full font-semibold hover:bg-temple-green-dark shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <span>තවත් පෙන්වන්න</span>
              <span className="text-sm opacity-80">({filteredImages.length - visibleCount} remaining)</span>
            </button>
          </div>
        )}

        {/* Image Count */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {visibleImages.length} of {filteredImages.length} photos
        </p>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📷</div>
            <p className="text-2xl text-gray-600">No images in this category yet</p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain bg-black"
              />
            </div>

            {/* Info */}
            <div className="mt-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">{selectedImage.title}</h2>
              <p className="text-temple-gold text-lg">{selectedImage.category} • {selectedImage.categoryEn}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
