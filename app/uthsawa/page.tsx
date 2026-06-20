'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  image: string;
  youtubeId?: string;
  photos: string[];
}

export default function UthsawaPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: 1,
      name: 'වෙසක් උත්සවය',
      date: 'මැයි 2026',
      description: 'බුදුරජාණන් වහන්සේගේ උපත, බුද්ධත්වය සහ පිරිනිවන් පෑම සිහිපත් කරමින් පැවැත්වෙන වාර්ෂික උත්සවය.',
      image: '/images/vesak.jpg',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      photos: ['/images/vesak-1.jpg', '/images/vesak-2.jpg']
    },
    {
      id: 2,
      name: 'පොසොන් උත්සවය',
      date: 'ජූනි 2026',
      description: 'ශ්‍රී ලංකාවට බුදු දහම පැමිණීම සිහිපත් කරමින් පැවැත්වෙන උත්සවය.',
      image: '/images/poson.jpg',
      youtubeId: 'dQw4w9WgXcQ',
      photos: ['/images/poson-1.jpg', '/images/poson-2.jpg']
    },
    {
      id: 3,
      name: 'ඇසළ පෙරහර',
      date: 'ජූලි 2026',
      description: 'දළදා මාලිගාවේ පෙරහර අනුව පැවැත්වෙන සම්ප්‍රදායික පෙරහර.',
      image: '/images/esala.jpg',
      youtubeId: 'dQw4w9WgXcQ',
      photos: ['/images/esala-1.jpg', '/images/esala-2.jpg']
    },
    {
      id: 4,
      name: 'කඨින පිංකම',
      date: 'ඔක්තෝබර් 2026',
      description: 'වස් කාලය අවසානයේ පැවැත්වෙන කඨින පිංකම.',
      image: '/images/kathina.jpg',
      youtubeId: 'dQw4w9WgXcQ',
      photos: ['/images/kathina-1.jpg', '/images/kathina-2.jpg']
    },
    {
      id: 5,
      name: 'අලුත් අවුරුදු උත්සවය',
      date: 'අප්‍රේල් 2026',
      description: 'සිංහල හා දෙමළ අලුත් අවුරුද්ද සැමරීම.',
      image: '/images/newyear.jpg',
      youtubeId: 'dQw4w9WgXcQ',
      photos: ['/images/newyear-1.jpg', '/images/newyear-2.jpg']
    },
    {
      id: 6,
      name: 'ධර්ම දේශනා',
      date: 'සෑම පෝය දිනකම',
      description: 'පෝය දිනවල පැවැත්වෙන විශේෂ ර්ම දේශනා.',
      image: '/images/dhamma-talk.jpg',
      youtubeId: 'dQw4w9WgXcQ',
      photos: ['/images/dhamma-1.jpg', '/images/dhamma-2.jpg']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-temple-green mb-4">උත්සව</h1>
        <p className="text-xl text-gray-600">හරිතගිරි විහාරයේ පැවැත්වෙන විශේෂ උත්සව සහ අවස්ථා</p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="card-hover bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="relative h-64">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover"
              />
              {event.youtubeId && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-temple-green mb-2">{event.name}</h3>
              <p className="text-temple-gold font-semibold mb-3">{event.date}</p>
              <p className="text-gray-600 line-clamp-3">{event.description}</p>
              <button className="mt-4 text-temple-green font-semibold hover:text-temple-gold transition-colors">
                තවත් දැනගන්න →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-80">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-4xl font-bold text-temple-green mb-2">{selectedEvent.name}</h2>
              <p className="text-temple-gold text-xl font-semibold mb-6">{selectedEvent.date}</p>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* YouTube Video */}
              {selectedEvent.youtubeId && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-temple-green mb-4">වීඩියෝව</h3>
                  <div className="video-container rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedEvent.youtubeId}`}
                      title={selectedEvent.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Photo Gallery */}
              {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-temple-green mb-4">ඡායාරූප</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedEvent.photos.map((photo, index) => (
                      <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                          src={photo}
                          alt={`${selectedEvent.name} - ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
