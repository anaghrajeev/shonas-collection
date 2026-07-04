import { Link, useLocation } from 'react-router-dom';

export default function BottomNavBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname + location.search === path;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-2 bg-surface xl:hidden rounded-t-2xl border-t border-outline-variant/30 shadow-[0_-4px_20px_rgba(77,2,26,0.08)]">
      <Link
        to="/"
        className={`flex flex-col items-center justify-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
          isActive('/') ? 'text-primary' : 'text-secondary'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: isActive('/') ? "'FILL' 1" : "'FILL' 0" }}>home</span>
        <span className="font-label-md text-[10px] tracking-wide">Home</span>
      </Link>
      <Link
        to="/shop"
        className={`flex flex-col items-center justify-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
          location.pathname === '/shop' ? 'text-primary' : 'text-secondary'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: location.pathname === '/shop' ? "'FILL' 1" : "'FILL' 0" }}>grid_view</span>
        <span className="font-label-md text-[10px] tracking-wide">Shop</span>
      </Link>
    </nav>
  );
}
