import React from 'react';
import { InstagramIcon } from './IconComponents';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-gray-500 mb-4 md:mb-0">
          &copy; {currentYear} Ar_.tem._iz. All Rights Reserved.
        </p>
        <div className="flex items-center space-x-4">
          <p className="text-gray-500">Follow us:</p>
          <a
            href="https://www.instagram.com/ar_.tem._iz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;