import React, { useState, useCallback, useEffect } from 'react';
import type { Artwork } from '../types';
import { generateArtDescription } from '../services/geminiService';
import { CloseIcon, SparklesIcon } from './IconComponents';

interface ArtModalProps {
  artwork: Artwork;
  onClose: () => void;
}

const ArtModal: React.FC<ArtModalProps> = ({ artwork, onClose }) => {
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateDescription = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedText = await generateArtDescription(artwork.src);
      setDescription(generatedText);
    } catch (err) {
      console.error(err);
      setError('Failed to generate interpretation. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [artwork.src]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors z-20"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="w-full md:w-1/2 lg:w-3/5 h-64 md:h-auto bg-gray-100 flex items-center justify-center">
            <img src={artwork.src} alt={artwork.title} className="w-full h-full object-contain" />
        </div>

        <div className="w-full md:w-1/2 lg:w-2/5 p-6 sm:p-8 flex flex-col overflow-y-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif-display">{artwork.title}</h2>
          <p className="text-slate-600 mb-6">{artwork.description}</p>
          
          <div className="flex-grow space-y-4 flex flex-col">
             <button
                onClick={handleGenerateDescription}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <SparklesIcon />
                    <span className="ml-2">Generate Artistic Interpretation</span>
                  </>
                )}
              </button>
            
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            {description && (
              <div className="text-slate-700 bg-gray-100 p-4 rounded-lg animate-fade-in mt-4">
                <p>{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtModal;