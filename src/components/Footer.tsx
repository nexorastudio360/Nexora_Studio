import React from 'react';
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <footer className="bg-brand-bg-secondary text-brand-text-secondary border-t border-brand-border" id="luxury-footer">
      
      {/* Top Banner: Brand Summary */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-b border-brand-border text-left">
        {/* Brand visual column */}
        <div className="max-w-xl">
          <Logo theme="blue" variant="horizontal" iconSize={42} className="mb-6" />
          <p className="font-sans text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
            Empowering modern businesses through bespoke design systems, high-speed static compilation, strategic SEO, and intelligent automation pipelines.
          </p>
        </div>
      </div>

      {/* Main Grid Columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-left" id="footer-links-grid">
        
        {/* Core Services Column */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[9px] tracking-widest font-extrabold text-brand-text-muted uppercase">
            SERVICES OFFERED
          </span>
          <div className="flex flex-col gap-2.5 text-xs">
            <a href="#services" onClick={(e) => { e.preventDefault(); handleScrollTo('services'); }} className="hover:text-white transition-colors">Premium Web Design</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); handleScrollTo('services'); }} className="hover:text-white transition-colors">Business Websites</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); handleScrollTo('services'); }} className="hover:text-white transition-colors">High-Conversion Landings</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); handleScrollTo('services'); }} className="hover:text-white transition-colors">Elite UI/UX Product Design</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); handleScrollTo('services'); }} className="hover:text-white transition-colors">Strategic Redesigns</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); handleScrollTo('services'); }} className="hover:text-white transition-colors">Semantic SEO Audits</a>
          </div>
        </div>

        {/* Quick links navigation */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[9px] tracking-widest font-extrabold text-brand-text-muted uppercase">
            QUICK NAVIGATION
          </span>
          <div className="flex flex-col gap-2.5 text-xs">
            <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Home Page</a>
            <a href="#why-nexora" onClick={(e) => { e.preventDefault(); handleScrollTo('why-nexora'); }} className="hover:text-white transition-colors">Why Nexora Standard</a>
            <a href="#featured-work" onClick={(e) => { e.preventDefault(); handleScrollTo('featured-work'); }} className="hover:text-white transition-colors">Portfolio Case Studies</a>
            <a href="#process" onClick={(e) => { e.preventDefault(); handleScrollTo('process'); }} className="hover:text-white transition-colors">Operational Process</a>
            <a href="#tech-stack" onClick={(e) => { e.preventDefault(); handleScrollTo('tech-stack'); }} className="hover:text-white transition-colors">Technology Standards</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); handleScrollTo('faq'); }} className="hover:text-white transition-colors">Frequently Asked FAQs</a>
          </div>
        </div>

        {/* Legal disclosures */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[9px] tracking-widest font-extrabold text-brand-text-muted uppercase">
            TRUST & SECURITY
          </span>
          <div className="flex flex-col gap-2.5 text-xs">
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }} className="hover:text-white transition-colors">NDA Double Guarantee</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }} className="hover:text-white transition-colors">Privacy Audits Policy</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }} className="hover:text-white transition-colors">Terms & Service Rules</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }} className="hover:text-white transition-colors">HIPAA Compliance Guides</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollTo('contact'); }} className="hover:text-white transition-colors">ISO 27001 Security Standard</a>
          </div>
        </div>

        {/* Contact Quick overview */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[9px] tracking-widest font-extrabold text-brand-text-muted uppercase">
            CONNECT PARTNER
          </span>
          <div className="flex flex-col gap-2.5 text-xs">
            <span className="block text-white font-semibold">Nexora Studio</span>
            <span className="block text-brand-text-secondary">Serving Clients Worldwide<br />Remote Digital Studio</span>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nexorastudio360@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">nexorastudio360@gmail.com</a>
            <a href="https://wa.me/923096432755?text=Hello%20Nexora%20Studio!%20I%20am%20interested%20in%20your%20web%20design%20services.%20I%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              WhatsApp: +92 309 6432755
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Social Icons Row */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-6" id="footer-bottom-bar">
        
        {/* Left side copyright */}
        <div className="text-left flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-brand-text-muted">
          <span>© 2026 Nexora Studio. Designing the Future. All Rights Reserved.</span>
          <span className="hidden sm:inline h-1.5 w-1.5 bg-brand-border rounded-full"></span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-success" />
            <span>SOC2 TYPE II CERTIFIED</span>
          </span>
        </div>

        {/* Right side social links */}
        <div className="flex items-center gap-4" id="footer-social-links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-brand-slate-400 hover:text-white transition-colors"
            aria-label="Nexora Studio on Github"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-brand-slate-400 hover:text-white transition-colors"
            aria-label="Nexora Studio on Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-brand-slate-400 hover:text-white transition-colors"
            aria-label="Nexora Studio on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-brand-slate-400 hover:text-white transition-colors"
            aria-label="Nexora Studio on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>

      </div>

    </footer>
  );
};
