import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Commissions from './components/Commissions';
import Footer from './components/Footer';
import ArtModal from './components/ArtModal';
import { ARTWORKS } from './constants';
import type { Artwork } from './types';

const App: React.FC = () => {
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);

  const galleryRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const commissionsRef = useRef<HTMLDivElement>(null);

  const handleArtClick = (art: Artwork) => {
    setSelectedArt(art);
  };

  const closeModal = () => {
    setSelectedArt(null);
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const navItems = [
    { name: 'Gallery', ref: galleryRef },
    { name: 'About', ref: aboutRef },
    { name: 'Commissions', ref: commissionsRef },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header navItems={navItems} scrollToRef={scrollToRef} />
      <main>
        <Hero scrollToGallery={() => scrollToRef(galleryRef)} />
        <div ref={galleryRef}>
          <Gallery artworks={ARTWORKS} onArtClick={handleArtClick} />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={commissionsRef}>
          <Commissions />
        </div>
      </main>
      <Footer />
      {selectedArt && <ArtModal artwork={selectedArt} onClose={closeModal} />}
    </div>
  );
};

export default App;