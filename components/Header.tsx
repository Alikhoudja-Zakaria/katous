import React, { useState, useEffect } from 'react';

interface NavItem {
  name: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface HeaderProps {
  navItems: NavItem[];
  scrollToRef: (ref: React.RefObject<HTMLDivElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ navItems, scrollToRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (ref: React.RefObject<HTMLDivElement>) => {
    scrollToRef(ref);
    setIsMenuOpen(false);
  };

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold font-serif-display text-slate-900 tracking-wider">
          <a href="#" className="hover:text-indigo-600 transition-colors">ar_.tem._iz</a>
        </div>
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleLinkClick(item.ref)}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-300"
            >
              {item.name}
            </button>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="text-slate-700 hover:text-slate-900">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.ref)}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-gray-100 transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;