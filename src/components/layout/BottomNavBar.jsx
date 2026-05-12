import { Link } from 'react-router-dom';

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-3 bg-surface dark:bg-inverse-surface md:hidden rounded-t-xl border-t border-outline-variant/30 shadow-[0_-4px_20px_rgba(77,2,26,0.05)]">
      <Link className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed-dim font-bold font-label-md text-label-md hover:scale-95 duration-150 p-2 rounded-lg hover:bg-surface-container-low transition-all" to="/">
        <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
        <span>Home</span>
      </Link>
      <Link className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim font-label-md text-label-md p-2 rounded-lg hover:bg-surface-container-low transition-all" to="/shop">
        <span className="material-symbols-outlined mb-1">grid_view</span>
        <span>Shop</span>
      </Link>

    </nav>
  );
}
