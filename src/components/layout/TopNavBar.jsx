import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function TopNavBar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPath = location.pathname + location.search;

  const isActive = (path) => currentPath === path || (path === '/' && currentPath === '/');
  
  const getClassName = (path) => 
    isActive(path) 
      ? "text-primary dark:text-primary-fixed-dim border-b-2 border-primary pb-1 hover:opacity-80 transition-all duration-300"
      : "text-on-surface-variant dark:text-surface-variant hover:text-primary hover:opacity-80 transition-all duration-300";

  return (
    <nav className="w-full px-margin-mobile md:px-margin-desktop py-4 sticky top-0 backdrop-blur-md border-b-0 shadow-sm bg-surface/90 dark:bg-inverse-surface/90 z-40 transition-all duration-300">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <img alt="SHONA'S COLLECTION" className="h-10 md:h-12 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTlk-Hr2ofmtOx-fz-Xuu_fORrGdntGwuDcsW-rCMsO0pt1TQOGL93EBhW9FqJAe6pSZ-IRudvNRUUd2e3AKLp3vom5D6tP0nT0K7znm-37SSS49kLj0zjwsGSNNlZi3IEg0Kt73D4rrSI19xz3h2zycD_D-9mMLgg3DQVnS8HyLePnqWdRJQSw56_CI5WFrKCv1WE-f7hPPDd-zQzl31ZB0tCzB39usWkZj-OYXcs8cuICeXHt1cEcbTAAfl1HLUJ4jQcKaZZxxO_" />
          <span className="font-display-lg text-[20px] md:text-headline-lg tracking-widest text-primary dark:text-primary-fixed-dim">SHONA'S COLLECTION</span>
        </div>
        
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <ul className="hidden md:flex gap-8 items-center font-label-lg text-label-lg">
          <li><Link className={getClassName("/")} to="/">Home</Link></li>
          <li><Link className={getClassName("/shop?category=madisars")} to="/shop?category=madisars">Madisars</Link></li>
          <li><Link className={getClassName("/shop?category=ladies")} to="/shop?category=ladies">Ladies</Link></li>
          <li><Link className={getClassName("/shop?category=mens")} to="/shop?category=mens">Mens</Link></li>
          <li><Link className={getClassName("/shop?category=kids")} to="/shop?category=kids">Kids</Link></li>
          <li><Link className={getClassName("/shop?category=jewellery")} to="/shop?category=jewellery">Jewellery</Link></li>
          <li><Link className={getClassName("/shop?category=home-decor")} to="/shop?category=home-decor">Home Decor</Link></li>
        </ul>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-outline-variant/30 mt-4 animate-fade-in-up">
          <ul className="flex flex-col gap-4 font-label-lg text-label-lg">
            <li><Link onClick={() => setIsMobileMenuOpen(false)} className={`inline-block ${getClassName("/")}`} to="/">Home</Link></li>
            <li><Link onClick={() => setIsMobileMenuOpen(false)} className={`inline-block ${getClassName("/shop?category=madisars")}`} to="/shop?category=madisars">Madisars</Link></li>
            <li><Link onClick={() => setIsMobileMenuOpen(false)} className={`inline-block ${getClassName("/shop?category=ladies")}`} to="/shop?category=ladies">Ladies</Link></li>
            <li><Link onClick={() => setIsMobileMenuOpen(false)} className={`inline-block ${getClassName("/shop?category=mens")}`} to="/shop?category=mens">Mens</Link></li>
            <li><Link onClick={() => setIsMobileMenuOpen(false)} className={`inline-block ${getClassName("/shop?category=kids")}`} to="/shop?category=kids">Kids</Link></li>
            <li><Link onClick={() => setIsMobileMenuOpen(false)} className={`inline-block ${getClassName("/shop?category=jewellery")}`} to="/shop?category=jewellery">Jewellery</Link></li>
            <li><Link onClick={() => setIsMobileMenuOpen(false)} className={`inline-block ${getClassName("/shop?category=home-decor")}`} to="/shop?category=home-decor">Home Decor</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
