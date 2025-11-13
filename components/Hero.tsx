import React from 'react';
import { ARTWORKS } from '../constants';

interface HeroProps {
  scrollToGallery: () => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToGallery }) => {
  const heroArtwork = ARTWORKS[0]; // The main artwork is now the first in the array

  return (
    <section className="relative h-screen flex items-center justify-center pt-20 px-4 text-center bg-white">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        <div className="lg:w-1/2 max-w-lg w-full">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
                 <img
                    src={heroArtwork.src}
                    alt={heroArtwork.title}
                    className="w-full h-auto object-cover"
                />
            </div>
        </div>
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 font-serif-display leading-tight">
            Art that Tells a Story
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-xl">
            Welcome to the digital gallery of Ar_.tem._iz, a creative duo passionate about bringing characters to life through illustration.
          </p>
          <button
            onClick={scrollToGallery}
            className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30"
          >
            Explore the Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
