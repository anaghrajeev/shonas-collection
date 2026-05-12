import { Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import BottomNavBar from './BottomNavBar';
import Footer from './Footer';
import WhatsAppFAB from '../ui/WhatsAppFAB';

export default function StoreLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <BottomNavBar />
      <WhatsAppFAB />
    </div>
  );
}
