import React from 'react';
import { InstagramIcon } from './IconComponents';

const Commissions: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-8 text-center bg-white rounded-xl shadow-md py-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif-display">Bring Your Vision to Life</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
          Have a character or an idea you'd love to see illustrated? The artists at Ar_.tem._iz are available for custom commissions. Get a personalized piece of art tailored to your specifications.
        </p>
        <a 
          href="https://www.instagram.com/ar_.tem._iz" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
        >
          <InstagramIcon />
          <span className="ml-3">Order via Instagram</span>
        </a>
      </div>
    </section>
  );
};

export default Commissions;