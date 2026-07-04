import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

export default function TopNavBar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const currentPath = location.pathname + location.search;

  const isActive = (path) => currentPath === path;
  
  const getClassName = (path) => 
    isActive(path) 
      ? "text-primary border-b-2 border-primary pb-1 hover:opacity-80 transition-all duration-300"
      : "text-on-surface-variant hover:text-primary hover:opacity-80 transition-all duration-300";

  const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/shop?category=madisars", label: "Madisar & Panchagacham" },
    { to: "/shop?category=ladies", label: "Ladies" },
    { to: "/shop?category=mens", label: "Mens" },
    { to: "/shop?category=kids", label: "Kids" },
    { to: "/shop?category=jewellery", label: "Jewellery" },
    { to: "/shop?category=home-decor", label: "Home Decor" },
    { to: "/shop?category=navratri-specials", label: "✨ Navratri" },
  ];

  return (
    <nav className="w-full px-4 md:px-8 lg:px-16 py-3 sticky top-0 backdrop-blur-md shadow-sm bg-surface/95 z-40 transition-all duration-300 border-b border-outline-variant/20">
      <div className="flex justify-between items-center w-full gap-3 max-w-[1400px] mx-auto">
        
        {/* Brand */}
        <Link to="/" className="flex flex-col group flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <img
              alt="Shona's Collection Logo"
              className="h-8 md:h-10 w-auto object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              src="/logo.png"
            />
            <div className="flex flex-col">
              <span className="font-display-lg text-[13px] sm:text-[15px] md:text-[18px] tracking-widest text-primary leading-tight whitespace-nowrap">
                SHONA'S COLLECTION
              </span>
              <span className="hidden md:block text-[9px] font-label-md text-secondary tracking-[0.15em] uppercase opacity-70 mt-0.5 whitespace-nowrap">
                YOUR ONE-STOP DESTINATION FOR TIMELESS TRADITION
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop nav — only visible at xl+ */}
        <div className="hidden xl:flex items-center gap-6">
          <ul className="flex items-center gap-5 font-label-lg text-[12px] tracking-wide flex-shrink-0">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link className={getClassName(to)} to={to}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="w-px h-5 bg-outline-variant/50"></div>
          
          <Link to="/cart" className="relative flex items-center text-on-surface-variant hover:text-primary transition-colors group">
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-error text-white text-[10px] font-label-sm font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile controls — visible below xl breakpoint */}
        <div className="flex xl:hidden items-center gap-3">
          <Link to="/cart" className="relative flex items-center text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[26px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-error text-white text-[10px] font-label-sm font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="text-primary flex-shrink-0 p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-[28px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / tablet dropdown menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden pt-4 pb-3 border-t border-outline-variant/30 mt-3 animate-fade-in-up max-w-[1400px] mx-auto">
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 font-label-lg text-label-lg">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`inline-block ${getClassName(to)}`}
                  to={to}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
