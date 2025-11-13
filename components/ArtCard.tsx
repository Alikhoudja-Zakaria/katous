import React from 'react';
import type { Artwork } from '../types';

interface ArtCardProps {
  artwork: Artwork;
  onClick: () => void;
}

const ArtCard: React.FC<ArtCardProps> = ({ artwork, onClick }) => {
  return (
    <div
      className="group relative block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-xl shadow-md bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-gray-300"
      onClick={onClick}
    >
      <img
        src={artwork.src}
        alt={artwork.title}
        className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        <h3 className="text-white text-xl font-bold text-center drop-shadow-md">{artwork.title}</h3>
      </div>
    </div>
  );
};

export default ArtCard;