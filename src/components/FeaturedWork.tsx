import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowUpRight, Filter, MessageSquare, Star, Database, Layers } from 'lucide-react';
import { CaseStudy } from '../types';

// Importing generated premium website preview images
import auraDentalImg from '../assets/images/aura_dental_preview_1783591150172.jpg';
import vanguardLegalImg from '../assets/images/vanguard_legal_preview_1783591167633.jpg';
import solasResortImg from '../assets/images/solas_resort_preview_1783591184672.jpg';
import elysianEstateImg from '../assets/images/elysian_estate_preview_1783591200310.jpg';
import veritasStructuralImg from '../assets/images/veritas_structural_preview_1783591216491.jpg';
import luminarySpaImg from '../assets/images/luminary_spa_preview_1783591235000.jpg';
import giaRistoranteImg from '../assets/images/gia_ristorante_preview_1783591251565.jpg';
import ascentAthleticImg from '../assets/images/ascent_athletic_preview_1783591270930.jpg';

export const FeaturedWork: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const caseStudies: CaseStudy[] = [
    {
      id: 'aura-dental',
      client: 'Aura Dental & Wellness',
      title: 'Modernizing patient intakes with friction-free booking funnel',
      industry: 'Dental Clinics',
      challenge: 'Aura’s legacy system resulted in 42% booking cart abandonment and slow page load times (4.8s) causing patient drop-offs.',
      solution: 'Designed and deployed a server-rendered patient reservation framework. Optimized Core Web Vitals to 98% and implemented an automatic SMS notification gateway to reduce no-shows.',
      results: [
        '+210% Booking intake conversions',
        '38% Reduction in front-desk call workload',
        '0.8s Complete page loading velocity',
        '650+ Active digital patient profiles registered'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Twilio API'],
      metric: '+210%',
      metricLabel: 'Booking Conversion',
      accentColor: 'from-blue-500 to-indigo-600',
      imageUrl: auraDentalImg,
    },
    {
      id: 'vanguard-legal',
      client: 'Vanguard Legal Group',
      title: 'A high-authority lead generation platform for high-ticket law partners',
      industry: 'Law Firms',
      challenge: 'Unfocused organic search strategies led to low-quality intake inquiries, costing senior attorneys dozens of unproductive hours monthly.',
      solution: 'Re-architected site architecture around premium authority articles, semantic structural schema markups, and an automated smart-filter client evaluation intake form.',
      results: [
        '+145% Qualified organic search traffic',
        '3.2x Average retainer values signed',
        '22hrs Saved per attorney monthly',
        'Schema-optimized for top-tier Google Rich Snippets'
      ],
      technologies: ['Next.js', 'PostgreSQL', 'TailwindCSS', 'Semantic SEO'],
      metric: '3.2x',
      metricLabel: 'Retainer Growth',
      accentColor: 'from-slate-700 to-slate-900',
      imageUrl: vanguardLegalImg,
    },
    {
      id: 'solas-resort',
      client: 'Solas Beach Resort & Hotel',
      title: 'Rebranding a luxury coastal estate into a direct-booking powerhouse',
      industry: 'Hotels',
      challenge: 'Excessive reliance on high-commission Online Travel Agencies (OTAs like Expedia) ate into 18% of guest booking profit margins.',
      solution: 'Engineered a highly immersive 4K video-background direct reservation engine, with personalized upsell modals and direct custom Stripe integration.',
      results: [
        '+82% Direct resort bookings',
        '$145,000 Commisions saved in Year 1',
        '+15% Guest ancillary spa/dining spend',
        'Fluid cross-device rendering (Mobile booking rate +90%)'
      ],
      technologies: ['React', 'TypeScript', 'Stripe API', 'Cloudflare CDN'],
      metric: '+82%',
      metricLabel: 'Direct Bookings',
      accentColor: 'from-amber-500 to-orange-600',
      imageUrl: solasResortImg,
    },
    {
      id: 'elysian-estate',
      client: 'Elysian Estate Holdings',
      title: 'A cinematic listing and virtual viewing experience for real estate portfolios',
      industry: 'Real Estate',
      challenge: 'Static photography failed to capture the luxury quality of multi-million dollar estates, driving down buyer interest.',
      solution: 'Deployed a custom fluid gallery framework with high-speed virtual walkthrough rendering, interactive architectural blueprints, and direct broker-chat hotlines.',
      results: [
        '-40% Average days on market',
        '5.8x Increase in virtual viewing queries',
        '100% Fully fluid responsiveness',
        'Seamless integration with luxury broker MLS data engines'
      ],
      technologies: ['React', 'Framer Motion', 'TailwindCSS', 'MLS API'],
      metric: '-40%',
      metricLabel: 'Days on Market',
      accentColor: 'from-blue-600 to-cyan-500',
      imageUrl: elysianEstateImg,
    },
    {
      id: 'veritas-structural',
      client: 'Veritas Structural Group',
      title: 'A digital authority framework for civil construction bidding pipelines',
      industry: 'Construction',
      challenge: 'Outdated static corporate site failed compliance audits and did not communicate structural integrity during high-ticket government bidding phases.',
      solution: 'Created an elite, portfolio-first civil engineering hub detailing past projects with dynamic interactive maps, client specifications, and digital ISO compliance certs.',
      results: [
        '$12.4M Civil tender contracts secured',
        '100% Mobile performance audit rating',
        'Instant security protocol clearance',
        'Integrated live bid dashboard indicator'
      ],
      technologies: ['TypeScript', 'Vite', 'Node.js', 'Interactive Maps'],
      metric: '$12.4M',
      metricLabel: 'Contract Pipeline',
      accentColor: 'from-emerald-600 to-teal-700',
      imageUrl: veritasStructuralImg,
    },
    {
      id: 'luminary-spa',
      client: 'Luminary MedSpa & Salon',
      title: 'A high-end aesthetic portal linking luxury beauty to digital reservations',
      industry: 'Beauty Salons',
      challenge: 'A cluttered, generic booking calendar led to double-bookings, high staff stress, and lost VIP customer profiles.',
      solution: 'Engineered a gorgeous, high-contrast calendar intake that intelligently spreads workloads across technicians, featuring digital style profile uploads.',
      results: [
        'Zero Scheduling double-booking conflicts',
        '+75% VIP client repeat booking rate',
        '+44% Average checkout spend per appointment',
        'Instant style profile pre-uploads from customers'
      ],
      technologies: ['React', 'TailwindCSS', 'Node.js', 'Google Calendar API'],
      metric: '+75%',
      metricLabel: 'Repeat Client Rate',
      accentColor: 'from-pink-500 to-rose-600',
      imageUrl: luminarySpaImg,
    },
    {
      id: 'gia-lounge',
      client: 'Gia Ristorante & Lounge',
      title: 'Transforming custom dining menus into reservation and loyalty hubs',
      industry: 'Restaurants',
      challenge: 'Cumbersome PDF-based dining menus on mobile were difficult to read, leading to drop-offs and low reservation checkouts.',
      solution: 'Replaced PDF downloads with an elegant, responsive digital menu system equipped with beautiful typography, dietary tag filters, and inline reserving links.',
      results: [
        '3.8x Direct dinner reservation volume',
        '100% Legibility rating on mobile devices',
        '30% Reduction in waitstaff onboarding training times',
        'Easy real-time digital item pricing updates'
      ],
      technologies: ['Vite', 'React', 'TypeScript', 'TailwindCSS'],
      metric: '3.8x',
      metricLabel: 'Reservations Lift',
      accentColor: 'from-red-600 to-rose-700',
      imageUrl: giaRistoranteImg,
    },
    {
      id: 'ascent-athletics',
      client: 'Ascent Athletic Club',
      title: 'Powering automated corporate fitness signups and digital client metrics',
      industry: 'Gyms',
      challenge: 'High customer drop-off during the initial membership intake flow. Complex contract signing and payment forms.',
      solution: 'Redesigned the membership portal with clear step trackers, digital contract signatures, secure Stripe billing setups, and a progress calculator.',
      results: [
        '+115% Monthly membership sales',
        '92% Contract signing completion rate',
        '10-minute Automatic onboarding layout flow',
        'Full Stripe automated billing and invoice tracking'
      ],
      technologies: ['Next.js', 'Stripe Subscriptions', 'TailwindCSS', 'D3.js'],
      metric: '+115%',
      metricLabel: 'Membership Growth',
      accentColor: 'from-violet-600 to-indigo-700',
      imageUrl: ascentAthleticImg,
    },
  ];

  const filters = ['all', 'Dental Clinics', 'Law Firms', 'Hotels', 'Real Estate', 'Construction', 'Beauty Salons', 'Restaurants', 'Gyms'];

  const filteredStudies = activeFilter === 'all'
    ? caseStudies
    : caseStudies.filter(c => c.industry === activeFilter);

  return (
    <section id="featured-work" className="py-24 bg-brand-bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" id="portfolio-header">
          <div className="max-w-2xl text-left">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-premium uppercase mb-3 block">
              PORTFOLIO OF EXCELLENCE
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-white tracking-tighter leading-tight">
              Our Flagship Projects. <br /> Built <span className="font-serif italic font-normal text-brand-text-secondary">for</span> Immediate Impact<span className="text-brand-premium">.</span>
            </h2>
          </div>
          <div className="max-w-md text-left md:text-right">
            <p className="font-sans text-sm sm:text-base text-brand-text-secondary leading-relaxed">
              Every client project is a bespoke masterpiece designed to outshine industry standards, increase lead value, and achieve high-performance rankings.
            </p>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 mb-12" id="portfolio-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 border cursor-pointer ${
                activeFilter === filter
                  ? 'bg-brand-premium text-white border-brand-premium hover:shadow-[0_0_15px_rgba(79,125,255,0.25)]'
                  : 'bg-white/5 text-brand-text-secondary border-brand-border hover:bg-white/10 hover:border-brand-border-hover hover:text-white'
              }`}
            >
              {filter === 'all' ? 'All Industries' : filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10" id="portfolio-grid">
          {filteredStudies.map((study) => (
            <motion.div
              layout
              key={study.id}
              onClick={() => setSelectedCase(study)}
              className="group cursor-pointer flex flex-col justify-between bg-brand-card border border-brand-border rounded-3xl p-6.5 hover:border-brand-border-hover hover:shadow-[0_0_30px_rgba(79,125,255,0.15)] hover:scale-[1.01] transition-all duration-300 overflow-hidden"
              id={`portfolio-item-${study.id}`}
            >
              {/* Premium Interactive Vector Mockup Panel */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-[#05070B] flex flex-col justify-between border border-brand-border shadow-sm group-hover:shadow-md transition-all duration-300">
                {/* The website preview image */}
                {study.imageUrl && (
                  <img
                    src={study.imageUrl}
                    alt={`${study.client} Website Preview`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Subtle dark gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 z-10 opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
                
                {/* Simulated Header */}
                <div className="relative z-20 flex items-center justify-between border-b border-white/10 pb-3 p-5">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[11px] font-bold tracking-widest text-white uppercase">{study.client}</span>
                    <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-sm font-mono text-white/90">{study.industry}</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                  </div>
                </div>


                {/* Mockup footer status */}
                <div className="relative z-20 flex items-center justify-between text-[9px] font-mono text-white/70 border-t border-white/10 p-4 bg-black/20 backdrop-blur-xs">
                  <span>AUDIT: 100% STABLE</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    ACTIVE IN PRODUCTION
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col text-left">
                <span className="font-mono text-[10px] tracking-widest font-bold text-brand-premium uppercase mb-2">
                  {study.industry}
                </span>
                <h3 className="font-sans text-xl font-bold text-white group-hover:text-brand-premium transition-colors duration-300 mb-3">
                  {study.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-brand-text-secondary leading-relaxed line-clamp-2">
                  {study.challenge}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-6 border-t border-brand-border pt-5">
                  {study.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono text-brand-text-secondary bg-white/5 px-2.5 py-1 rounded-sm border border-brand-border">
                      {tech}
                    </span>
                  ))}
                  {study.technologies.length > 4 && (
                    <span className="text-[10px] font-mono text-brand-text-muted bg-white/5 px-2.5 py-1 rounded-sm border border-brand-border">
                      +{study.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Study Detail Sheet Modal */}
        <AnimatePresence>
          {selectedCase && (
            <div className="fixed inset-0 z-55 flex items-center justify-end p-0 sm:p-4 bg-[#05070B]/80 backdrop-blur-sm" id="portfolio-modal">
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="w-full max-w-2xl h-full sm:h-[calc(100vh-2rem)] bg-[#0A1018] border border-brand-border rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
              >
                {/* Modal close hotkey */}
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-brand-text-secondary hover:text-white transition-colors border border-brand-border"
                  aria-label="Close details"
                  id="modal-close-btn"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Header */}
                <div className="p-8 text-white flex flex-col justify-end min-h-[240px] relative overflow-hidden">
                  {/* Backdrop Website Preview Image */}
                  {selectedCase.imageUrl && (
                    <img
                      src={selectedCase.imageUrl}
                      alt={`${selectedCase.client} Preview`}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {/* Vibrant Gradient overlay to blend with brand color */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${selectedCase.accentColor} opacity-75 mix-blend-multiply z-10`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-15"></div>

                  <div className="relative z-20">
                    <span className="font-mono text-[9px] tracking-widest font-bold bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-sm uppercase inline-block mb-3 border border-white/10">
                      {selectedCase.industry}
                    </span>
                    <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-1">
                      {selectedCase.client}
                    </h2>
                    <p className="font-sans text-xs text-white/90 font-medium tracking-wide max-w-lg">
                      {selectedCase.title}
                    </p>
                  </div>
                </div>

                {/* Modal Body Scroll Container */}
                <div className="flex-grow overflow-y-auto p-8 flex flex-col gap-8 text-left bg-[#0A1018]">
                  
                  {/* Performance Indicators */}
                  <div>
                    <h4 className="font-display text-xs font-bold tracking-widest text-white uppercase mb-4">
                      VERIFIED OUTCOMES
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedCase.results.map((result, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-brand-border">
                          <CheckCircle className="w-4 h-4 text-brand-success flex-shrink-0 mt-0.5" />
                          <span className="font-sans text-xs sm:text-sm font-semibold text-brand-text-secondary">
                            {result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenge and Solution Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-brand-border pt-8">
                    <div>
                      <h4 className="font-display text-xs font-bold tracking-widest text-brand-text-muted uppercase mb-3">
                        THE CHALLENGE
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                        {selectedCase.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-display text-xs font-bold tracking-widest text-brand-premium uppercase mb-3">
                        THE SOLUTION
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                        {selectedCase.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack breakdown */}
                  <div className="border-t border-brand-border pt-8">
                    <h4 className="font-display text-xs font-bold tracking-widest text-white uppercase mb-3">
                      TECHNOLOGY INFRASTRUCTURE
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.technologies.map((tech, i) => (
                        <span key={i} className="text-xs font-mono font-medium text-brand-text-secondary bg-white/5 border border-brand-border px-3 py-1.5 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Representative Testimonial mock */}
                  <div className="border-t border-brand-border pt-8 bg-white/5 p-6 rounded-2xl border border-brand-border">
                    <div className="flex items-center gap-1.5 text-amber-500 mb-3.5">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="font-sans text-xs sm:text-sm italic text-brand-text-secondary leading-relaxed mb-4">
                      "The engineering rigor from Nexora was staggering. They didn't just rebuild our platform; they optimized our entire customer funnel. Booking conversion rose dramatically in the first 30 days."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-premium text-white font-mono flex items-center justify-center font-bold text-xs uppercase">
                        {selectedCase.client.substring(0, 2)}
                      </div>
                      <div>
                        <span className="block font-display text-xs font-bold text-white">Dr. Alan Mercer</span>
                        <span className="block font-mono text-[9px] text-brand-text-muted uppercase">Director & Chief of Operations, {selectedCase.client}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Modal footer call */}
                <div className="p-6 border-t border-brand-border bg-[#05070B] flex items-center justify-between">
                  <span className="text-xs text-brand-text-muted font-medium">Ready to discuss a similar outcome?</span>
                  <button
                    onClick={() => {
                      setSelectedCase(null);
                      const contactForm = document.getElementById('contact');
                      if (contactForm) {
                        contactForm.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-brand-premium text-white text-[11px] font-bold tracking-widest uppercase hover:bg-blue-600 transition-colors"
                  >
                    <span>Connect Partner</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
