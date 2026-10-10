import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ShoppingProvider } from './context/ShoppingContext';

import { SkipLink } from './components/common/SkipLink';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { Toast } from './components/common/Toast';
import { BackToTop } from './components/common/BackToTop';
import { QuoteBasketModal } from './components/common/QuoteBasketModal';
import { DesignDetailModal } from './components/common/DesignDetailModal';
import { GeminiCraftAdvisorModal } from './components/common/GeminiCraftAdvisorModal';
import { FloatingAIButton } from './components/common/FloatingAIButton';

import { HomePage } from './pages/HomePage';
import { DesignsPage } from './pages/DesignsPage';
import { PricingPage } from './pages/PricingPage';
import { CustomDesignPage } from './pages/CustomDesignPage';
import { MembershipPage } from './pages/MembershipPage';
import { FreeResourcesPage } from './pages/FreeResourcesPage';
import { AccountPage } from './pages/AccountPage';
import { ContactPage } from './pages/ContactPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { SavedDesignsPage } from './pages/SavedDesignsPage';

/**
 * ScrollToTop helper on route change
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <ThemeProvider>
      <ShoppingProvider>
        <Router>
          <ScrollToTop />
          <SkipLink />
          <CustomCursor />
          <Toast />

          <div className="min-h-screen flex flex-col bg-[#FFF1F2] dark:bg-[#121013] text-slate-800 dark:text-slate-100 transition-colors">
            <Header />

            <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/designs" element={<DesignsPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/custom-design" element={<CustomDesignPage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/free-resources" element={<FreeResourcesPage />} />
                <Route path="/track-order" element={<TrackOrderPage />} />
                <Route path="/saved-designs" element={<SavedDesignsPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>

            <Footer />
            <BackToTop />
            <FloatingAIButton />

            {/* Global Overlays & Modals */}
            <QuoteBasketModal />
            <DesignDetailModal />
            <GeminiCraftAdvisorModal />
          </div>
        </Router>
      </ShoppingProvider>
    </ThemeProvider>
  );
}
