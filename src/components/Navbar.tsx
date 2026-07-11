import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Services', id: 'services' },
    { label: 'Why Nexora', id: 'why-nexora' },
    { label: 'Featured Work', id: 'featured-work' },
    { label: 'Our Process', id: 'process' },
    { label: 'Tech Stack', id: 'tech-stack' },
    { label: 'FAQ', id: 'faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section highlights
      const sections = ['home', 'services', 'why-nexora', 'featured-work', 'process', 'tech-stack', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-bg-primary/82 backdrop-blur-xl border-b border-brand-border shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Branding Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('home');
          }}
          className="focus:outline-hidden"
          id="nav-logo-link"
        >
          <Logo theme="dark" variant="horizontal" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo(item.id);
              }}
              className="relative text-[13px] font-medium tracking-wide text-brand-text-secondary hover:text-white transition-colors duration-200"
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-premium rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3.5" id="nav-actions">
          <button
            onClick={() => handleScrollTo('contact')}
            className="group flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-premium text-white text-xs font-bold tracking-wider uppercase hover:bg-brand-hover-blue transition-all duration-300 shadow-md shadow-brand-premium/15 hover:shadow-[0_0_20px_rgba(79,125,255,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            id="nav-cta-btn"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full text-brand-text-secondary hover:text-white hover:bg-white/5 transition-colors focus:outline-hidden"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-bg-secondary border-b border-brand-border shadow-2xl overflow-hidden"
            id="mobile-nav-panel"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(item.id);
                  }}
                  className={`text-sm font-medium py-2 px-1 transition-colors ${
                    activeSection === item.id ? 'text-brand-premium font-semibold' : 'text-brand-text-secondary hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-brand-border my-2" />
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleScrollTo('contact');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-premium text-white font-bold text-xs tracking-wider uppercase hover:bg-brand-hover-blue hover:shadow-[0_0_15px_rgba(79,125,255,0.3)] transition-all duration-200"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
