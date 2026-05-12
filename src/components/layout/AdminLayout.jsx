import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-surface-container-low font-body-md text-on-background">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-outline-variant/30 flex flex-col">
        <div className="p-6 border-b border-outline-variant/30">
          <h2 className="font-display-lg text-[24px] text-primary tracking-wide">SHONA'S ADMIN</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {/* Dashboard removed */}
          <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-primary-container/10 hover:text-primary rounded-lg transition-colors">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-label-md uppercase tracking-wider">Products</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-primary-container/10 hover:text-primary rounded-lg transition-colors">
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="font-label-md uppercase tracking-wider">Orders</span>
          </Link>
          <Link to="/admin/customers" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-primary-container/10 hover:text-primary rounded-lg transition-colors">
            <span className="material-symbols-outlined">group</span>
            <span className="font-label-md uppercase tracking-wider">Customers</span>
          </Link>
          <Link to="/admin/reviews" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-primary-container/10 hover:text-primary rounded-lg transition-colors">
            <span className="material-symbols-outlined">star</span>
            <span className="font-label-md uppercase tracking-wider">Reviews</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-outline-variant/30">
          <button 
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-secondary hover:bg-surface-container-high rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md uppercase tracking-wider">Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-surface h-16 border-b border-outline-variant/30 flex items-center justify-between px-8">
          <h1 className="font-headline-md text-on-surface">Admin Portal</h1>

        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
