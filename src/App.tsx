import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Products } from './pages/Products';
import { SecurityPlatform } from './pages/SecurityPlatform';
import { Partnerships } from './pages/Partnerships';
import { Industries } from './pages/Industries';
import { Contact } from './pages/Contact';
import { PaymentCallback } from './pages/PaymentCallback';
import { UserDashboard } from './pages/UserDashboard';
import { DeploymentDetail } from './pages/DeploymentDetail';
import { Toaster } from '@/components/ui/sonner';

// Layout wrapper for pages with Navigation and Footer
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
      <Footer />
    </>
  );
}

// Routes that use the main layout (with nav and footer)
function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/products" element={<Products />} />
      <Route path="/platform" element={<SecurityPlatform />} />
      <Route path="/partnerships" element={<Partnerships />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

function App() {
  const location = useLocation();
  
  // Check if current route is a dashboard route (no nav/footer)
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || 
                           location.pathname.startsWith('/deployment') ||
                           location.pathname === '/payment/callback';

  return (
    <div className="min-h-screen bg-white">
      {isDashboardRoute ? (
        // Dashboard routes - no nav/footer
        <Routes>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/deployment/:deploymentId" element={<DeploymentDetail />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />
        </Routes>
      ) : (
        // Main routes - with nav and footer
        <MainLayout>
          <MainRoutes />
        </MainLayout>
      )}
      <Toaster />
    </div>
  );
}

// Wrap with Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
