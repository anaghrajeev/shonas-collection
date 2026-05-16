import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { to: '/admin/products',  icon: 'inventory_2',  label: 'Products'  },
  { to: '/admin/orders',    icon: 'receipt_long', label: 'Orders'    },
  { to: '/admin/customers', icon: 'group',        label: 'Customers' },
  { to: '/admin/reviews',   icon: 'star',         label: 'Reviews'   },
];

export default function AdminLayout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('adminToken') !== 'true') navigate('/admin/login');
  }, [navigate]);

  // Close sidebar whenever route changes (mobile)
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const Sidebar = () => (
    <aside className="w-64 bg-surface border-r border-outline-variant/30 flex flex-col h-full">
      {/* Brand */}
      <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <h2 className="font-display-lg text-[18px] text-primary tracking-wide">SHONA'S ADMIN</h2>
        </div>
        {/* Close button — only visible on mobile */}
        <button
          className="md:hidden text-on-surface-variant hover:text-primary p-1 rounded-lg"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon, label }) => {
          const active = location.pathname === to || (to === '/admin/products' && location.pathname === '/admin');
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-label-md uppercase tracking-wider ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-on-surface-variant hover:bg-primary-container/10 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-outline-variant/30">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-secondary hover:bg-surface-container-high rounded-lg transition-colors font-label-md uppercase tracking-wider"
        >
          <span className="material-symbols-outlined">logout</span>
          Exit Admin
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-surface-container-low font-body-md text-on-background overflow-hidden">

      {/* ── Desktop sidebar (always visible ≥ md) ── */}
      <div className="hidden md:flex flex-col w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* ── Mobile sidebar (slide-in drawer) ── */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col md:hidden animate-slide-in-left">
            <Sidebar />
          </div>
        </>
      )}

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-surface h-14 md:h-16 border-b border-outline-variant/30 flex items-center px-4 md:px-8 gap-3 flex-shrink-0">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-on-surface-variant hover:text-primary p-1 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-headline-md text-on-surface">Admin Portal</h1>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
