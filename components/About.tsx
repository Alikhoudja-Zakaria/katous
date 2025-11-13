import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://res.cloudinary.com/dof5da1cj/image/upload/v1763063237/get_ais3n0.jpg" 
                alt="Artists' showcase piece"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 font-serif-display">About the Artists</h2>
              <p className="text-slate-600 text-lg mb-4 leading-relaxed">
                Ar_.tem._iz is the creative collaboration of two passionate artists who bring characters and stories to life through vibrant and dynamic illustrations. With a shared love for anime, manga, and gaming culture, they blend their unique styles to create art that is both visually stunning and emotionally resonant.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Every piece is a labor of love, crafted with meticulous attention to detail and a deep understanding of color, light, and composition. Their goal is to not just draw characters, but to capture their essence and energy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;