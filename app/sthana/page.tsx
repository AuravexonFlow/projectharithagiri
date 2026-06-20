'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageGallery from '@/components/ImageGallery';

// ── Place data ──
interface Place {
  id: string;
  title: string;
  shortDesc: string;
  description: string[];
  images: string[];
  alt: string;
  subHeading?: string;
}

const angirisImages = [
  '/images/sthana/angiris-maha-saya/IMG_20260611_093712_1.jpg',
  '/images/sthana/angiris-maha-saya/IMG_20260617_130130.jpg',
  '/images/sthana/angiris-maha-saya/IMG_20260617_130140.jpg',
  '/images/sthana/angiris-maha-saya/IMG_20260617_130217.jpg',
  '/images/sthana/angiris-maha-saya/IMG_20260617_130222.jpg',
  '/images/sthana/angiris-maha-saya/IMG_20260617_130258.jpg',
  '/images/sthana/angiris-maha-saya/IMG_20260617_130302.jpg',
];

const dhatuImages = [
  '/images/sthana/dhatu-mandiraya/IMG_20260617_130541.jpg',
  '/images/sthana/dhatu-mandiraya/IMG_20260617_130547.jpg',
  '/images/sthana/dhatu-mandiraya/IMG_20260617_130555.jpg',
  '/images/sthana/dhatu-mandiraya/IMG_20260617_130605.jpg',
  '/images/sthana/dhatu-mandiraya/IMG_20260617_130611.jpg',
  '/images/sthana/dhatu-mandiraya/IMG_20260617_130624.jpg',
];

const maniImages = [
  '/images/sthana/mani-akkhitha/IMG_20260617_131702.jpg',
  '/images/sthana/mani-akkhitha/IMG_20260617_131710.jpg',
];

const buddhaMandiraImages = [
  '/images/sthana/buddha-mandira/IMG_20260617_130735.jpg',
  '/images/sthana/buddha-mandira/IMG_20260617_131620.jpg',
  '/images/sthana/buddha-mandira/IMG_20260617_131628.jpg',
];

const dolosmaheImages = [
  '/images/sthana/dolosmahe-pahan/IMG_20260617_130021.jpg',
  '/images/sthana/dolosmahe-pahan/IMG_20260617_130041.jpg',
];

const anandaImages = [
  '/images/sthana/ananda-bodhi/IMG_20260617_125800.jpg',
  '/images/sthana/ananda-bodhi/IMG_20260617_125821.jpg',
  '/images/sthana/ananda-bodhi/IMG_20260617_125830.jpg',
  '/images/sthana/ananda-bodhi/IMG_20260617_125907.jpg',
  '/images/sthana/ananda-bodhi/IMG_20260617_125958.jpg',
];

const paraniImages = [
  '/images/sthana/parani-bodhi/IMG_20260611_102757.jpg',
  '/images/sthana/parani-bodhi/IMG_20260611_102809.jpg',
  '/images/sthana/parani-bodhi/IMG_20260611_102811.jpg',
  '/images/sthana/parani-bodhi/IMG_20260611_102815.jpg',
  '/images/sthana/parani-bodhi/IMG_20260611_102846.jpg',
  '/images/sthana/parani-bodhi/IMG_20260611_102851.jpg',
  '/images/sthana/parani-bodhi/IMG_20260611_102852.jpg',
  '/images/sthana/parani-bodhi/IMG_20260611_102903.jpg',
  '/images/sthana/parani-bodhi/IMG_20260611_102906.jpg',
  '/images/sthana/parani-bodhi/IMG_20260617_130912.jpg',
  '/images/sthana/parani-bodhi/IMG_20260617_130917.jpg',
  '/images/sthana/parani-bodhi/IMG_20260617_130933.jpg',
  '/images/sthana/parani-bodhi/IMG_20260617_130942.jpg',
  '/images/sthana/parani-bodhi/IMG_20260617_130948.jpg',
  '/images/sthana/parani-bodhi/IMG_20260617_131005.jpg',
  '/images/sthana/parani-bodhi/IMG_20260617_131011.jpg',
  '/images/sthana/parani-bodhi/IMG_20260617_131019.jpg',
  '/images/sthana/parani-bodhi/IMG_20260617_131027.jpg',
  '/images/sthana/parani-bodhi/IMG_20260617_131031.jpg',
];

const prarthanaImages = [
  '/images/sthana/prarthana-bodhi/IMG_20260617_130748.jpg',
  '/images/sthana/prarthana-bodhi/IMG_20260617_130755.jpg',
];

const avasaImages = [
  '/images/sthana/avasa-geya/IMG_20260617_131432.jpg',
  '/images/sthana/avasa-geya/IMG_20260617_131454.jpg',
];

const dharmaImages = [
  '/images/sthana/dharma-salawa/IMG_20260617_131519.jpg',
  '/images/sthana/dharma-salawa/IMG_20260617_131528.jpg',
  '/images/sthana/dharma-salawa/IMG_20260617_131540.jpg',
];

const pravesha01Images = [
  '/images/sthana/praweshamarga-01/IMG_20260617_131552.jpg',
  '/images/sthana/praweshamarga-01/IMG_20260617_131607.jpg',
  '/images/sthana/praweshamarga-01/IMG_20260617_131610.jpg',
];

const pravesha02Images = [
  '/images/sthana/praweshamarga-02/IMG_20260617_131432.jpg',
];

// ── Place definitions ──
const places: Place[] = [
  {
    id: 'angiris',
    title: 'මුනි උත්තම ආංගීරස මහා සෑය',
    shortDesc: 'විහාරස්ථානයේ ප්‍රධාන ස්තූපය. බුදුරජාණන් වහන්සේගේ ධාතු නිධන් කර ඇති පූජනීය ස්ථානය.',
    description: [
      'විහාරස්ථාන පරිශ්‍රයේ මනරම් ලෙස නිමවා ඇති මෙම පූජනීය චෛත්‍ය රාජයාණන් වහන්සේ "මුණි උත්තම අංගීරස මහා සෑය" නම් වේ. ශාක්‍යමුණි බුදුරජාණන් වහන්සේගේ අනන්ත වූ බුදුගුණ ලක්දෙරණ මත සදාකාලිකව රඳවා තැබීමේ උදාර අරමුණින් යුතුව මෙම මහා සෑ රදුන් නිර්මාණය කර ඇත.',
      'මෙම පින්කම හරිතගම හරිතගිරි විහාරාධිපති, කුරුඳුවත්ත සුමංගල විද්‍යාලයේ ආචාර්ය පූජ්‍ය ලේල්වල විපිතදේව නාහිමියන්ගේ උතුම් යෝජනාවකට අනුව සහ අක්මීමන නල්ගස්යාය බන්දුල ගමගේ, මාපලගම වසන්ත, හරිතගම ඉසුරු යන හිතවතුන්ගේ ඉල්ලීම පරිදි ක්‍රියාත්මක විය. මාලබේ තලාහේන පදිංචි <strong>ගමගේ සුනිල් ශාන්ත රත්නසිරි සහ නයනා හේමන්ති රත්නසිරි යන දෙපළගේ</strong> ප්‍රධාන ධන පරිත්‍යාගයෙන්ද, ප්‍රබුද්ධ රත්නසිරි, රුවන්තිකා පියුමාලි රත්නසිරි, දූ දරුවන්, ලේලිය මෙන්ම පවුලේ සොහොයුරු සොහොයුරියන් සහ ඥාති පිරිසකගේ සාමූහික දායකත්වයෙන් සෑ රදුන් ඉදිකරවා ඇත.',
      'මියගිය දෙමාපියන්, සංසාරගත ඥාතීන් මෙන්ම මියගිය නීතිඥ අනිල් ජේ. බබේසේකර මහතාට පින් පැමිණවීම පිණිස සිදුකළ මෙම මහා පුණ්‍යකර්මයේ කොත්වහන්සේ නිරාවරණය කර සඟසතු කර පූජා කරන ලද්දේ <strong>2021 පෙබරවාරි මස 27</strong> වන දිනයි.',
    ],
    images: angirisImages,
    alt: 'මුනි උත්තම ආංගීරස මහා සෑය',
  },
  {
    id: 'dhatu',
    title: 'ධාතු මන්දිරය',
    shortDesc: 'බුදුරජාණන් වහන්සේගේ ශරීර ධාතු තැන්පත් කර ඇති පූජනීය මන්දිරය.',
    description: [
      '"මුණි උත්තම අංගීරස මහා සෑය" තුළ නිමවා ඇති මෙම පූජනීය ධාතු මන්දිරය බුදුරජාණන් වහන්සේගේ ශරීර ධාතු තැන්පත් කර ඇති උතුම් ස්ථානයයි. ශාක්‍යමුණි බුදුරජාණන් වහන්සේගේ අනන්ත වූ බුදුගුණ ලක්දෙරණ මත සදාකාලිකව රඳවා තැබීමේ උදාර අරමුණින් යුතුව මෙම ධාතු මන්දිරය නිර්මාණය කර ඇත.',
      'මෙම පින්කම හරිතගම හරිතගිරි විහාරාධිපති, කුරුඳුවත්ත සුමංගල විද්‍යාලයේ ආචාර්ය පූජ්‍ය ලේල්වල විපිතදේව නාහිමියන්ගේ උතුම් යෝජනාවකට අනුව සහ අක්මීමන නල්ගස්යාය බන්දුල ගමගේ, මාපලගම වසන්ත, හරිතගම ඉසුරු යන හිතවතුන්ගේ ඉල්ලීම පරිදි ක්‍රියාත්මක විය. මාලබේ තලාහේන පදිංචි <strong>ගමගේ සුනිල් ශාන්ත රත්නසිරි සහ නයනා හේමන්ති රත්නසිරි යන දෙපළගේ</strong> ප්‍රධාන ධන පරිත්‍යාගයෙන්ද, ප්‍රබුද්ධ රත්නසිරි, රුවන්තිකා පියුමාලි රත්නසිරි, දූ දරුවන්, ලේලිය මෙන්ම පවුලේ සොහොයුරු සොහොයුරියන් සහ ඥාති පිරිසකගේ සාමූහික දායකත්වයෙන් ධාතු මන්දිරය ඉදිකරවා ඇත.',
      'මියගිය දෙමාපියන්, සංසාරගත ඥාතීන් මෙන්ම මියගිය නීතිඥ අනිල් ජේ. බබේසේකර මහතාට පින් පැමිණවීම පිණිස සිදුකළ මෙම මහා පුණ්‍යකර්මය <strong>2021 පෙබරවාරි මස 27</strong> වන දින සඟසතු කර පූජා කරන ලද්දේය.',
    ],
    images: dhatuImages,
    alt: 'ධාතු මන්දිරය',
  },
  {
    id: 'buddha-mandira',
    title: 'බුද්ධ මන්දිර 02',
    shortDesc: 'දෙවන බුද්ධ මන්දිරය - බුදු පිළිම වහන්සේලා සහ පූජා භාණ්ඩ තැන්පත් කිරීම සඳහා.',
    description: [
      'හරිතගම හරිතගිරි විහාරස්ථානයේ ප්‍රදේශවාසීන්ගේ අරමුදල් මගින් ඉදිකරන ලදී.',
    ],
    images: buddhaMandiraImages,
    alt: 'බුද්ධ මන්දිර 02',
  },
  {
    id: 'mani',
    title: 'මණිඅක්ඛිත අංග රාජ ප්‍රතිමාව',
    shortDesc: 'බුදු සසුනේ චිරස්ථිතිය උදෙසාත්, ලක්දිව සම්බුද්ධ ශාසන ඉතිහාසය උදෙසාත් සුවිශේෂී මෙහෙවරක් ඉටුකළ මණිඅක්ඛිත නාග රාජයාණන් වෙනුවෙන් ඉදිකළ ස්මාරකයකි.',
    description: [
      'විහාරස්ථාන පරිශ්‍රයේ ඉදිකර ඇති මෙම පූජනීය ස්මාරකයෙන් නිරූපණය වන්නේ බුදු සසුනේ චිරස්ථිතිය උදෙසාත්, ලක්දිව සම්බුද්ධ ශාසන ඉතිහාසය උදෙසාත් සුවිශේෂී මෙහෙවරක් ඉටුකළ මණිඅක්ඛිත නාග රාජයාණන්ය. කැලණි නදිය අසබඩ සිය රාජධානිය ගොඩනඟා ගනිමින්, භාග්‍යවතුන් වහන්සේ වැඩසිටි උතුම් මැණික් ආසනය නිදන් කර කැලණි චෛත්‍ය රාජයාණන් වහන්සේ නිර්මාණය කිරීමට මූලික වූ මණිඅක්ඛිත නා රජුන්ට පුණ්‍යානුමෝදනා කරනු වස් මෙම ප්‍රතිමාව නිර්මාණය කර ඇත.',
      'ශාසනාලයකින් සහ මහත් වූ බුද්ධ භක්තියකින් යුතුව <strong>ඔස්ට්‍රේලියාවේ පදිංචි ශ්‍යාමලී සහ හර්ෂ සුගතපාල යන දෙපළගේ</strong> ධන පරිත්‍යාගයෙන් මෙම ප්‍රතිමා වහන්සේ සාදවා <strong>2025 පෙබරවාරි මස 14</strong> වන දින සම්බුද්ධ සසුන වෙත පූජා කරමින් ශිලා ලේඛනගත කර තිබේ.',
    ],
    images: maniImages,
    alt: 'මණිඅක්ඛිත අංග රාජ ප්‍රතිමාව',
  },
  {
    id: 'dolosmahe',
    title: 'දොලොස්මහේ පහන',
    shortDesc: 'භාග්‍ය සම්බුද්ධ මිත්‍රරත්න මහත්මයා විසින් ලොව්තුරා බුදු පියාණන් වහන්සේගේ අනන්ත ගුණයන්ට උපහාර පිණිස කරවන ලද ආලෝක ස්මාරකයකි.',
    description: [
      'හරිතගම හරිතගිරි විහාරාධිපති පූජ්‍ය ලේල්වල විපිතදේව නාහිමියන්ගේ අනුශාසනා පරිදි, බත්තරමුල්ල පැලවත්තේ පදිංචි <strong>භාග්‍ය සම්බුද්ධ මිත්‍රරත්න මහත්මයා</strong> විසින් ලොව්තුරා බුදු පියාණන් වහන්සේගේ අනන්ත ගුණයන්ට උපහාර පිණිස මෙම පහන් කුළුණ/ආලෝක ස්මාරකය කරවා <strong>2021 පෙබරවාරි මස 27</strong> වන දින (බෝධිඝරය සහ රන්වැට පූජා කළ දිනම) සාසනයට පූජා කර ඇත.',
      '"<em>දීපදෝ හෝති චක්ඛුදෝ</em>" (පහන් පිදීමෙන් නෙත් ඇස් ලැබේ) යන උතුම් බුදු වදන පෙරදැරිව සිදුකළ මෙම ආලෝක පූජාවෙන් ජනිත වන සියලු කුසල්, තමන්ගේ ආදරණීය මෑණියන් වන ශ්‍යාමා විතාරණ මහත්මියට නිරෝගී සුවය හා උතුම් නිවන් සුව අත්වීම පිණිසත්, මියගිය සීයා වන එච්.පී. ප්‍රේමරත්න මහතාට පින් පැමිණවීම පිණිසත් මෙලෙස ශිලා ලේඛනගත කර කැප කර තිබේ.',
    ],
    images: dolosmaheImages,
    alt: 'දොලොස්මහේ පහන',
  },
  {
    id: 'ananda',
    title: 'ආනන්ද බෝධි ප්‍රාකාරය, බෝධිඝරය සහ සම්බුද්ධ මන්දිරය',
    shortDesc: 'පූජ්‍ය ලේල්වල විපිතදේව නාහිමියන්ගේ මඟපෙන්වීම පරිදි සැදැහැවත් දායක පිරිසකගේ පරිත්‍යාගයෙන් ඉදිකරවන ලද පූජනීය ස්ථානයකි.',
    subHeading: 'බෝධිඝරය සහ සම්බුද්ධ මන්දිරය',
    description: [
      'හරිතගම හරිතගිරි විහාරාධිපති, කුරුඳුවත්ත සුමංගල විද්‍යාලයේ ආචාර්ය පූජ්‍ය ලේල්වල විපිතදේව නාහිමියන්ගේ අනුශාසනා හා මඟපෙන්වීම පරිදි විහාරස්ථානයේ සැදැහැවත් දායක පිරිසකගේ ශ්‍රම හා ධන පරිත්‍යාගයෙන් මෙම පූජනීය බෝධි ප්‍රාකාරය, බෝධිඝරය සහ සම්බුද්ධ මන්දිරය ප්‍රතිසංස්කරණය කර ඉදිකරවා ඇත.',
      'මෙහි පළමු අදියර යටතේ ආනන්ද බෝධි ප්‍රාකාරය තුළ සම්බුද්ධ මන්දිරය ඉදිකරවා <strong>2020 අගෝස්තු මස 16</strong> වන දින සඟසතු කර පූජා කරන ලදී. ඉන්පසුව දෙවැනි අදියර යටතේ බෝධීන් වහන්සේ වටා ඇති බෝධිඝරය සහ වටිනා රන්වැට නිර්මාණය කරවා <strong>2021 පෙබරවාරි මස 27</strong> වන දින සාසනයට පූජා කරන ලදී.',
      'තමන්ගෙන් වෙන්ව ගිය ආදරණීය මවුපියන්, සීයා සහ ආච්චි ඇතුළු පවුල්වල ඥාතීන්ට පින් පැමිණවීම පිණිසත්, ලොව්තුරා බුදු පියාණන් වහන්සේගේ උතුම් බුදුගුණයන්ට උපහාරයක් පිණිසත් මෙම උදාර පින්කම් මාලාව සිදුකර ඇත.',
    ],
    images: anandaImages,
    alt: 'ආනන්ද බෝධිය',
  },
  {
    id: 'parani',
    title: 'පැරණි බෝධිය',
    shortDesc: 'විහාරස්ථානයේ පැරණිතම බෝධිය - ඓතිහාසික වටිනාකමක් ඇති.',
    description: [
      'හරිතගම හරිතගිරි විහාරස්ථානයේ ප්‍රදේශවාසීන්ගේ අරමුදල් මගින් ඉදිකරන ලදී.',
    ],
    images: paraniImages,
    alt: 'පැරණි බෝධිය',
  },
  {
    id: 'prarthana',
    title: 'ප්‍රාර්ථනා සුදු බෝධිය',
    shortDesc: 'ප්‍රාර්ථනා සඳහා පූජා කෙරෙන සුදු බෝධිය.',
    description: [
      'හරිතගම හරිතගිරි විහාරස්ථානයේ ප්‍රදේශවාසීන්ගේ අරමුදල් මගින් ඉදිකරන ලදී.',
    ],
    images: prarthanaImages,
    alt: 'ප්‍රාර්ථනා සුදු බෝධිය',
  },
  {
    id: 'avasa',
    title: 'ආවාස ගෙය',
    shortDesc: 'භික්ෂූන් වහන්සේලා වාසය කරන සංඝාවාසය.',
    description: [
      'හරිතගම හරිතගිරි විහාරස්ථානයේ ප්‍රදේශවාසීන්ගේ අරමුදල් මගින් ඉදිකරන ලදී.',
    ],
    images: avasaImages,
    alt: 'ආවාස ගෙය',
  },
  {
    id: 'dharma',
    title: 'ධර්ම ශාලාව',
    shortDesc: 'ධර්ම දේශනා, භාවනා වැඩසටහන් සහ ආගමික කටයුතු සඳහා භාවිතා වේ.',
    description: [
      'හරිතගම හරිතගිරි විහාරස්ථානයේ ප්‍රදේශවාසීන්ගේ අරමුදල් මගින් ඉදිකරන ලදී.',
    ],
    images: dharmaImages,
    alt: 'ධර්ම ශාලාව',
  },
  {
    id: 'pravesha01',
    title: 'ප්‍රවේශ මාර්ග 01',
    shortDesc: 'විහාරස්ථානයට ප්‍රධාන ප්‍රවේශ මාර්ගය.',
    description: [
      'හරිතගම හරිතගිරි විහාරස්ථානයේ ප්‍රදේශවාසීන්ගේ අරමුදල් මගින් ඉදිකරන ලදී.',
    ],
    images: pravesha01Images,
    alt: 'ප්‍රවේශ මාර්ග 01',
  },
  {
    id: 'pravesha02',
    title: 'ප්‍රවේශ මාර්ග 02',
    shortDesc: 'විහාරස්ථානයට දෙවන ප්‍රවේශ මාර්ගය.',
    description: [
      'හරිතගම හරිතගිරි විහාරස්ථානයේ ප්‍රදේශවාසීන්ගේ අරමුදල් මගින් ඉදිකරන ලදී.',
    ],
    images: pravesha02Images,
    alt: 'ප්‍රවේශ මාර්ග 02',
  },
];

// ── Helper ──
const getPlaces = (ids: string[]) => places.filter(p => ids.includes(p.id));
const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function SthanaPage() {
  const [activePlace, setActivePlace] = useState<Place | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const currentImages = activePlace?.images ?? [];

  // ── Card component ──
  const PlaceCard = ({ place, borderColor }: { place: Place; borderColor: string }) => (
    <div className={`card-hover bg-white rounded-2xl overflow-hidden shadow-lg border-l-4 ${borderColor} flex flex-col`}
      onClick={() => setActivePlace(place)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') setActivePlace(place); }}
    >
      <ImageGallery images={place.images} alt={place.alt} />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-bold text-temple-green mb-2">{place.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{place.shortDesc}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-temple-gold font-semibold group/btn">
          වැඩි විස්තර කියවන්න
          <span className="group-hover/btn:translate-x-1 transition-transform"><ArrowIcon /></span>
        </span>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-black text-gradient-green mb-4">විහාරස්ථානයේ ස්ථාන</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          හරිතගිරි විහාරයේ පූජනීය වස්තූන්, බෝධීන් වහන්සේලා, ගොඩනැගිලි සහ ප්‍රවේශ මාර්ග
        </p>
      </div>

      {/* Section: Sacred Objects and Statues */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-temple-gold/20 to-white rounded-3xl p-8 shadow-xl border-2 border-temple-gold/30">
          <h2 className="text-4xl font-bold text-temple-green mb-8 flex items-center gap-4">
            <span className="text-5xl"></span>
            පූජනීය වස්තූන්, ප්රතිමා සහ මන්දිර
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getPlaces(['angiris', 'dhatu', 'buddha-mandira', 'mani', 'dolosmahe']).map(p => (
              <PlaceCard key={p.id} place={p} borderColor="border-temple-gold" />
            ))}
          </div>
        </div>
      </section>

      {/* Section: Three Bodhi Trees */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-temple-green/10 to-white rounded-3xl p-8 shadow-xl border-2 border-temple-green/30">
          <h2 className="text-4xl font-bold text-temple-green mb-8 flex items-center gap-4">
            <span className="text-5xl"></span>
            ත්‍රිවිධ බෝධීන් වහන්සේලා
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getPlaces(['ananda', 'parani', 'prarthana']).map(p => (
              <PlaceCard key={p.id} place={p} borderColor="border-temple-green" />
            ))}
          </div>
        </div>
      </section>

      {/* Section: Monastery and Public Buildings */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-8 shadow-xl border-2 border-amber-400/30">
          <h2 className="text-4xl font-bold text-temple-green mb-8 flex items-center gap-4">
            <span className="text-5xl"></span>
            සංඝාවාස සහ පොදු ගොඩනැගිලි
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getPlaces(['avasa', 'dharma']).map(p => (
              <PlaceCard key={p.id} place={p} borderColor="border-amber-500" />
            ))}
            {/* Dana Salawa - under construction */}
            <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-lg border-l-4 border-amber-500 relative">
              <div className="relative h-64 w-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                <div className="text-center p-6">
                  <span className="text-6xl block mb-4">🏗️</span>
                  <p className="text-lg font-semibold text-temple-green">ඉදිකිරීම් යටතේ</p>
                  <p className="text-sm text-gray-500 mt-1">Under Construction</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-temple-green mb-3">දැනට ඉදිකරමින් පවතින දාන ශාලාව</h3>
                <p className="text-gray-700 leading-relaxed">
                  දානමය පිංකම් සහ ප්‍රජා උත්සව සඳහා ඉදිකරමින් පවතින නව දාන ශාලාව.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Entrances */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-xl border-2 border-blue-400/30">
          <h2 className="text-4xl font-bold text-temple-green mb-8 flex items-center gap-4">
            <span className="text-5xl"></span>
            ප්‍රවේශයන්
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getPlaces(['pravesha01', 'pravesha02']).map(p => (
              <PlaceCard key={p.id} place={p} borderColor="border-blue-500" />
            ))}
          </div>
        </div>
      </section>

      {/* Summary Card */}
      <section className="mt-12">
        <div className="bg-gradient-to-br from-temple-green to-temple-green-dark rounded-3xl p-12 text-white text-center shadow-2xl sacred-glow">
          <h2 className="text-4xl font-bold text-temple-gold mb-6">සාරාංශය</h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            හරිතගිරි විහාරය පූජනීය වස්තන්, ත්‍රිවිධ බෝධීන් වහන්සේලා, සංඝාවාස සහ පොදු 
            පහසුකම්වලින් යුත් සම්පූර්ණ බෞද්ධ විහාරස්ථානයකි. විහාරස්ථානයට ප්‍රවේශ වීම සඳහා 
            ප්‍රවේශ මාර්ග දෙකක් ඇත.
          </p>
        </div>
      </section>

      {/* Dynamic Detail Modal */}
      {activePlace && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)' }}
          onClick={() => setActivePlace(null)}
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-temple-green to-temple-green-dark rounded-t-3xl p-6 flex items-center justify-between z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight pr-4">{activePlace.title}</h2>
              <button
                onClick={() => setActivePlace(null)}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Images */}
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {activePlace.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer group/img hover:ring-2 hover:ring-temple-gold transition-all"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <Image src={img} alt={`${activePlace.alt} ${i + 1}`} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover group-hover/img:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-0 group-hover/img:opacity-100 transition-opacity drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                {activePlace.subHeading && (
                  <h3 className="text-xl font-bold text-temple-green">{activePlace.subHeading}</h3>
                )}
                {activePlace.description.map((para, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-0">
              <button
                onClick={() => setActivePlace(null)}
                className="w-full py-3 bg-temple-green text-white font-semibold rounded-xl hover:bg-temple-green-dark transition-colors cursor-pointer"
              >
                වසන්න
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && activePlace && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center animate-fade-in"
          onClick={() => setLightboxIndex(null)}
          style={{ background: 'rgba(0,0,0,0.85)' }}
        >
          {/* Blurred image background */}
          <img
            src={currentImages[lightboxIndex]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(40px) brightness(0.45)', transform: 'scale(1.2)' }}
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)' }} />

          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-white text-2xl z-50 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + currentImages.length) % currentImages.length); }}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-3xl z-50 w-14 h-14 rounded-2xl flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            ‹
          </button>

          {/* Image Container */}
          <div
            className="relative w-[88vw] h-[82vh] rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 0 60px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.15)',
            }}
          >
            <Image
              src={currentImages[lightboxIndex]}
              alt={`${activePlace.alt} ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="88vw"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % currentImages.length); }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white text-3xl z-50 w-14 h-14 rounded-2xl flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            ›
          </button>

          {/* Counter & Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="px-5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-md">
              <span className="text-white text-sm font-semibold tracking-wider">
                {lightboxIndex + 1} <span className="text-temple-gold">/</span> {currentImages.length}
              </span>
            </div>
            <div className="flex gap-2.5 max-w-[80vw] overflow-x-auto px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
              {currentImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                    idx === lightboxIndex
                      ? 'ring-2 ring-temple-gold ring-offset-2 ring-offset-black/50 scale-110 shadow-lg shadow-temple-gold/30'
                      : 'opacity-60 hover:opacity-100 hover:scale-105 border border-white/20 shadow-sm'
                  }`}
                >
                  <Image src={img} alt={`thumb ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
