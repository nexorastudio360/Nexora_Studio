import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Services } from './components/Services';
import { WhyNexora } from './components/WhyNexora';
import { FeaturedWork } from './components/FeaturedWork';
import { OurProcess } from './components/OurProcess';
import { TechStack } from './components/TechStack';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LeadsPortal } from './components/LeadsPortal';
import { Lead } from './types';

// Structured seed leads to pre-populate the interactive mock CRM on first load
const SEED_LEADS: Lead[] = [
  {
    id: 'seed-1',
    name: 'Dr. Alan Mercer',
    email: 'mercer@auradental.com',
    company: 'Aura Dental & Wellness',
    industry: 'Dental Clinics',
    budget: '$10,000 – $25,000 (Custom Web App)',
    message: 'We want to replace our legacy appointment scheduler. We have high drop-offs on our current intake funnel and need a modern, high-converting React application with automatic calendar updates.',
    timestamp: '2026-07-08, 09:42 AM',
    status: 'qualified',
  },
  {
    id: 'seed-2',
    name: 'Eleanor Vance',
    email: 'vance@vanguardlegal.com',
    company: 'Vanguard Legal Group',
    industry: 'Law Firms',
    budget: '$25,000+ (Enterprise System / AI Setup)',
    message: 'Looking for a high-authority brand asset with search authority keywords built into semantic HTML. Need an automated smart lead filter intake to capture premium corporate clients and save lawyers time.',
    timestamp: '2026-07-08, 11:15 AM',
    status: 'contacted',
  },
  {
    id: 'seed-3',
    name: 'Maximilian Sterling',
    email: 'sterling@solasresort.com',
    company: 'Solas Beach Resort',
    industry: 'Hotels',
    budget: '$25,000+ (Enterprise System / AI Setup)',
    message: 'Our resort is seeking a direct direct booking booking page to avoid excessive Online Travel Agency commissions. Integrated Stripe payment setup, ancillary booking up-sells, and fully responsive layout required.',
    timestamp: '2026-07-08, 02:30 PM',
    status: 'new',
  },
  {
    id: 'seed-4',
    name: 'Sarah Jenkins',
    email: 'jenkins@elysianestates.com',
    company: 'Elysian Estate Holdings',
    industry: 'Real Estate',
    budget: '$10,000 – $25,000 (Custom Web App)',
    message: 'We want to build a virtual walkthrough listing portal for our luxury property listings. High-speed fluid asset gallery, clean Space Grotesk design typography, and direct broker hotlines needed.',
    timestamp: '2026-07-09, 08:24 AM',
    status: 'new',
  },
  {
    id: 'seed-5',
    name: 'Chef Gia Capretti',
    email: 'capretti@giarestaurant.com',
    company: 'Gia Ristorante',
    industry: 'Restaurants',
    budget: '$5,000 – $10,000 (Premium Website)',
    message: 'Need a beautiful digital menu layout on mobile. Guests should be able to view details, filter dietary categories, and reserve dinner spots inline without looking at standard slow PDFs.',
    timestamp: '2026-07-09, 09:12 AM',
    status: 'new',
  },
  {
    id: 'seed-6',
    name: 'Damon Kross',
    email: 'kross@ascentathletic.com',
    company: 'Ascent Athletic Clubs',
    industry: 'Gyms',
    budget: '$10,000 – $25,000 (Custom Web App)',
    message: 'Seeking a streamlined online membership signup flow with automatic digital contract signature steps and Stripe subscription setups to cut physical onboarding times.',
    timestamp: '2026-07-09, 10:05 AM',
    status: 'qualified',
  },
];

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLeadsPortalOpen, setIsLeadsPortalOpen] = useState(false);

  // Initialize and load local storage records
  useEffect(() => {
    const stored = localStorage.getItem('nexora_leads_db');
    if (stored) {
      try {
        setLeads(JSON.parse(stored));
      } catch (err) {
        // Fallback to seeds if corrupt
        setLeads(SEED_LEADS);
        localStorage.setItem('nexora_leads_db', JSON.stringify(SEED_LEADS));
      }
    } else {
      // Seed initial mock data for demo
      setLeads(SEED_LEADS);
      localStorage.setItem('nexora_leads_db', JSON.stringify(SEED_LEADS));
    }
  }, []);

  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('nexora_leads_db', JSON.stringify(updatedLeads));
  };

  const handleAddLead = (newLead: Lead) => {
    const updated = [newLead, ...leads];
    saveLeadsToStorage(updated);
  };

  const handleUpdateLeadStatus = (id: string, status: Lead['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    saveLeadsToStorage(updated);
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    saveLeadsToStorage(updated);
  };

  const handleResetLeads = () => {
    if (window.confirm('Are you sure you want to restore the demo database? This will reload the 6 standard industry seed inquiries.')) {
      saveLeadsToStorage(SEED_LEADS);
    }
  };

  const handleCtas = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-primary text-brand-text-primary font-sans selection:bg-brand-premium/25 selection:text-white" id="nexora-web-root">
      {/* Navbar navigation Header */}
      <Navbar />

      {/* Hero section */}
      <Hero onCtas={handleCtas} />

      {/* Trust standards */}
      <TrustBar />

      {/* Service offerings */}
      <Services />

      {/* Strategic competitive advantages */}
      <WhyNexora />

      {/* Portfolio showcased work */}
      <FeaturedWork />

      {/* Process implementation phases */}
      <OurProcess />

      {/* Technology standards */}
      <TechStack />

      {/* Testimonial proofs */}
      <Testimonials />

      {/* Common FAQ accordion */}
      <FAQ />

      {/* Client inquiry intake Form */}
      <Contact onAddLead={handleAddLead} />

      {/* Luxury Footer */}
      <Footer />

      {/* CRM Interactive Leads Monitor Modal Portal */}
      <LeadsPortal
        isOpen={isLeadsPortalOpen}
        onClose={() => setIsLeadsPortalOpen(false)}
        leads={leads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onDeleteLead={handleDeleteLead}
        onResetLeads={handleResetLeads}
      />
    </div>
  );
}
