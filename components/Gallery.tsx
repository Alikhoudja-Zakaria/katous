import React, { useState, useRef } from 'react';
import ArtCard from './ArtCard';
import type { Artwork } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './IconComponents';

interface GalleryProps {
  artworks: Artwork[];
  onArtClick: (artwork: Artwork) => void;
}

const Gallery: React.FC<GalleryProps> = ({ artworks, onArtClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;
  const wasSwipedRef = useRef(false);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? artworks.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === artworks.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    wasSwipedRef.current = false;
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    // If the finger moves more than a small threshold, consider it a swipe
    if (touchStartX.current && Math.abs(e.targetTouches[0].clientX - touchStartX.current) > 10) {
      wasSwipedRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-slate-900 font-serif-display">
          Gallery
        </h2>
        
        {isExpanded ? (
          <>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {artworks.map((art) => (
                <ArtCard key={art.id} artwork={art} onClick={() => onArtClick(art)} />
              ))}
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="mt-12 bg-white text-slate-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 shadow-md border border-gray-200"
            >
              Show Less
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center">
               <button onClick={goToPrevious} className="absolute left-2 md:left-0 md:-translate-x-full top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors z-10" aria-label="Previous image">
                <ChevronLeftIcon />
              </button>
              <div 
                className="w-full max-w-md overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {artworks.map((art) => (
                    <div key={art.id} className="w-full flex-shrink-0 px-1">
                      <ArtCard 
                        artwork={art} 
                        onClick={() => {
                          if (!wasSwipedRef.current) {
                            onArtClick(art);
                          }
                        }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={goToNext} className="absolute right-2 md:right-0 md:translate-x-full top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors z-10" aria-label="Next image">
                <ChevronRightIcon />
              </button>
            </div>
            <p className="text-slate-500 mt-4">{currentIndex + 1} / {artworks.length}</p>
             <button
              onClick={() => setIsExpanded(true)}
              className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30"
            >
              Show All
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;