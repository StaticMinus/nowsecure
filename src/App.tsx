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

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Dashboard routes - no nav/footer */}
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/deployment/:deploymentId" element={<DeploymentDetail />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />
          
          {/* Main routes - with nav and footer */}
          <Route path="/" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          <Route path="/services" element={
            <MainLayout>
              <Services />
            </MainLayout>
          } />
          <Route path="/products" element={
            <MainLayout>
              <Products />
            </MainLayout>
          } />
          <Route path="/platform" element={
            <MainLayout>
              <SecurityPlatform />
            </MainLayout>
          } />
          <Route path="/partnerships" element={
            <MainLayout>
              <Partnerships />
            </MainLayout>
          } />
          <Route path="/industries" element={
            <MainLayout>
              <Industries />
            </MainLayout>
          } />
          <Route path="/contact" element={
            <MainLayout>
              <Contact />
            </MainLayout>
          } />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
