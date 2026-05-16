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
        <Link to="/" className="flex flex-col group">
          <div className="flex items-center gap-3 md:gap-4">
            <img alt="Shona's Collection Logo" className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" src="/logo.png" />
            <span className="font-display-lg text-[18px] md:text-headline-lg tracking-widest text-primary dark:text-primary-fixed-dim">SHONA'S COLLECTION</span>
          </div>
          <span className="text-[9px] md:text-[11px] font-label-md text-secondary tracking-[0.15em] md:tracking-[0.25em] uppercase mt-0.5 opacity-80">Your One-Stop Destination for Timeless Tradition</span>
        </Link>
        
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
          <li><Link className={`${getClassName("/shop?category=navratri-specials")} flex items-center gap-1`} to="/shop?category=navratri-specials"><span>✨</span>Navratri Specials</Link></li>
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
            <li><Link onClick={() => setIsMobileMenuOpen(false)} className={`inline-flex items-center gap-1 ${getClassName("/shop?category=navratri-specials")}`} to="/shop?category=navratri-specials"><span>✨</span>Navratri Specials</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
