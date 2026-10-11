import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGallery } from './components/ProductGallery';
import { ServicesSection } from './components/ServicesSection';
import { CompanyAbout } from './components/CompanyAbout';
import { HireUsSection } from './components/HireUsSection';
import { Footer } from './components/Footer';
import { api } from './api/client';
import { Product } from './types';
import { useTheme } from './context/ThemeContext';

// Code-split heavy modals and views
const CareersPage = lazy(() => import('./components/CareersPage').then(m => ({ default: m.CareersPage })));
const ProductDetailModal = lazy(() => import('./components/ProductDetailModal').then(m => ({ default: m.ProductDetailModal })));
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));
const AdminPortal = lazy(() => import('./components/AdminPortal').then(m => ({ default: m.AdminPortal })));

export const App: React.FC = () => {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState<'home' | 'careers'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedLegalSlug, setSelectedLegalSlug] = useState<string | null>(null);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();

  // Route & Hash Listener
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = new URLSearchParams(window.location.search);

      // Check admin trigger
      if (hash === '#admin' || hash === '#/admin' || path === '/admin' || search.get('admin') === 'true') {
        setIsAdminPortalOpen(true);
      }

      // Check page route
      if (hash === '#careers' || hash === '#/careers' || path === '/careers') {
        setCurrentPage('careers');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#releases' ||
        hash === '#services' ||
        hash === '#about' ||
        hash === '#hire' ||
        hash === '' ||
        hash === '#' ||
        hash === '#/'
      ) {
        setCurrentPage('home');
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleNavigate = (page: 'home' | 'careers', sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'careers') {
      window.history.pushState(null, '', '#careers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (sectionId) {
        window.history.pushState(null, '', `#${sectionId}`);
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.history.pushState(null, '', window.location.pathname);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Fetch Company Info
  const { data: company, isLoading: loadingCompany } = useQuery({
    queryKey: ['company'],
    queryFn: () => api.getCompanyInfo(),
    staleTime: 1000 * 60 * 5,
  });

  // Fetch Products
  const { data: products = [], isLoading: loadingProducts, refetch: refetchProducts } = useQuery({
    queryKey: ['products', isAdminPortalOpen],
    queryFn: () => api.getProducts(isAdminPortalOpen),
    staleTime: 1000 * 30,
  });

  // Fetch Services
  const { data: services = [], isLoading: loadingServices, refetch: refetchServices } = useQuery({
    queryKey: ['services'],
    queryFn: () => api.getServices(),
    staleTime: 1000 * 60 * 5,
  });

  // Fetch Jobs (Loaded only when user navigates to careers or admin portal)
  const { data: jobs = [], isLoading: loadingJobs, refetch: refetchJobs } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => api.getJobs(false),
    enabled: currentPage === 'careers' || isAdminPortalOpen,
    staleTime: 1000 * 60 * 5,
  });

  // Toggle Visibility Mutation
  const visibilityMutation = useMutation({
    mutationFn: ({ id, is_visible }: { id: string; is_visible: boolean }) =>
      api.toggleProductVisibility(id, is_visible),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleToggleVisibility = async (id: string, is_visible: boolean) => {
    await visibilityMutation.mutateAsync({ id, is_visible });
  };

  const handleSelectServiceForLead = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    handleNavigate('home', 'hire');
  };

  const handleDataChanged = () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
    queryClient.invalidateQueries({ queryKey: ['company'] });
    queryClient.invalidateQueries({ queryKey: ['services'] });
    queryClient.invalidateQueries({ queryKey: ['jobs'] });
  };

  const handleCloseAdmin = () => {
    setIsAdminPortalOpen(false);
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      window.history.replaceState(null, '', currentPage === 'careers' ? '#careers' : '#');
    }
  };

  const handleOpenAdmin = () => {
    window.location.hash = 'admin';
    setIsAdminPortalOpen(true);
  };

  const isInitialLoading = loadingCompany || loadingProducts || loadingServices;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-sans selection:bg-indigo-600 selection:text-white relative transition-colors duration-300">
      {/* Dynamic Navigation Header - Always Intact */}
      <Navbar
        company={company || null}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
        onOpenLegal={(slug) => setSelectedLegalSlug(slug)}
      />

      {isInitialLoading ? (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-indigo-600/20 border-t-indigo-600 animate-spin" />
            <span className="absolute font-black text-xs bypatel-logo-gradient">bP</span>
          </div>
          <p className="text-zinc-500 text-xs font-medium tracking-wide">
            Initializing byPatel Engine...
          </p>
        </div>
      ) : currentPage === 'careers' ? (
        /* Dedicated Careers Page View (Lazy Loaded) */
        <main>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-500 text-xs">Loading Careers...</div>}>
            <CareersPage
              jobs={jobs}
              onRefreshJobs={refetchJobs}
              onBackToHome={() => handleNavigate('home')}
            />
          </Suspense>
        </main>
      ) : (
        /* Home Studio & Product Showcase View */
        <main>
          {/* 1. Hero Section */}
          <Hero company={company || null} />

          {/* 2. Apple-Inspired Product Gallery */}
          <ProductGallery
            products={products}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onToggleVisibility={handleToggleVisibility}
            isAdmin={isAdminPortalOpen}
          />

          {/* 3. Agency Services Offerings */}
          <ServicesSection
            services={services}
            onSelectServiceForLead={handleSelectServiceForLead}
          />

          {/* 4. Company Philosophy & Core Craftsmanship */}
          <CompanyAbout company={company || null} />

          {/* 5. Client Connect & Service Request Hub */}
          <HireUsSection preselectedService={preselectedService} />
        </main>
      )}

      {/* Dynamic Footer - Always Intact */}
      <Footer
        company={company || null}
        onNavigate={handleNavigate}
        onOpenLegal={(slug) => setSelectedLegalSlug(slug)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Modals & Portals (Lazy Loaded on Demand) */}
      <Suspense fallback={null}>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        {selectedLegalSlug && (
          <LegalModal
            slug={selectedLegalSlug}
            onClose={() => setSelectedLegalSlug(null)}
          />
        )}

        {isAdminPortalOpen && (
          <AdminPortal
            isOpen={isAdminPortalOpen}
            onClose={handleCloseAdmin}
            products={products}
            company={company || null}
            services={services}
            onDataChanged={handleDataChanged}
          />
        )}
      </Suspense>
    </div>
  );
};
