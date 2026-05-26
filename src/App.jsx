import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import StoreLayout from './components/layout/StoreLayout';
import AdminLayout from './components/layout/AdminLayout';
import ScrollToTop from './components/ui/ScrollToTop';

// Storefront Pages
import Countdown from './pages/storefront/Countdown';
import Home from './pages/storefront/Home';
import Shop from './pages/storefront/Shop';

// Admin Pages
import Login from './pages/admin/Login';
import Products from './pages/admin/Products';
import Reviews from './pages/admin/Reviews';

import Shipping from './pages/storefront/Shipping';
import Wholesale from './pages/storefront/Wholesale';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Countdown Landing Page */}
        <Route path="/" element={<Countdown />} />

        {/* Storefront Routes */}
        <Route element={<StoreLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/wholesale" element={<Wholesale />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<div className="font-display-lg text-primary text-2xl">Orders feature coming soon...</div>} />
          <Route path="customers" element={<div className="font-display-lg text-primary text-2xl">Customers feature coming soon...</div>} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Router>
  );
}
