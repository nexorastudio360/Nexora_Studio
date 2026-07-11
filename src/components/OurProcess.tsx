import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, Eye, Terminal, CheckCircle2, Rocket, LifeBuoy, ArrowRight } from 'lucide-react';
import { ProcessStep } from '../types';

const stepImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80', // Stage 01: Discovery & Analytics
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&h=800&q=80', // Stage 02: Strategic Architecture
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&h=800&q=80', // Stage 03: Premium UX/UI Design
  'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&h=800&q=80', // Stage 04: Production Engineering
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=800&q=80', // Stage 05: Vigilant Security Testing
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=800&q=80', // Stage 06: Launch & CDN Orchestration
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=800&q=80', // Stage 07: Continuous Support & Scale
];

export const OurProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isPanelHovered, setIsPanelHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Preload next and all images on mount to ensure smooth immediate transition
  useEffect(() => {
    stepImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const steps: ProcessStep[] = [
    {
      step: '01',
      title: 'Discovery & Analytics',
      description: 'We audit your legacy assets, benchmark your market competitors, analyze search keywords, and map out your target buyer personas.',
      outcome: 'Technical audit report, competitor benchmark matrices, and custom feature scope mapping.',
    },
    {
      step: '02',
      title: 'Strategic Architecture',
      description: 'We structure user flows, model page schemas, map conversion paths, and align design plans with your business objectives.',
      outcome: 'Interactive user-journey sitemaps, system data structures, and SEO keyword alignment guides.',
    },
    {
      step: '03',
      title: 'Premium UX/UI Design',
      description: 'We pair Space Grotesk typography, custom grids, and subtle visual transitions to craft a responsive design system.',
      outcome: 'High-fidelity Figma layouts, complete UI token libraries, and clickable interactive prototypes.',
    },
    {
      step: '04',
      title: 'Production Engineering',
      description: 'Our senior developers handcraft code in clean TypeScript with modular structures, fast rendering engines, and robust APIs.',
      outcome: 'Clean, type-safe Github repository, server-side asset pipelines, and Lighthouse performance rating 95+.',
    },
    {
      step: '05',
      title: 'Vigilant Security Testing',
      description: 'We perform automated testing, visual regression reviews, form safety checks, and load balance testing.',
      outcome: 'Form submission audits, mobile view tests, and structural HTML5 validation certificate.',
    },
    {
      step: '06',
      title: 'Launch & CDN Orchestration',
      description: 'We launch the app onto fast, global edge servers with secure SSL certification and direct SEO search indexes.',
      outcome: 'Active production URL, live Google Search console submission, and edge cache rule deployment.',
    },
    {
      step: '07',
      title: 'Continuous Support & Scale',
      description: 'We monitor core analytics, analyze conversion funnels, keep dependencies updated, and plan coming-soon AI automation updates.',
      outcome: 'Monthly performance health checks, speed monitoring, and iterative CRO updates.',
    },
  ];

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return Search;
      case 1:
        return Compass;
      case 2:
        return Eye;
      case 3:
        return Terminal;
      case 4:
        return CheckCircle2;
      case 5:
        return Rocket;
      case 6:
      default:
        return LifeBuoy;
    }
  };

  return (
    <section id="process" className="py-24 bg-brand-bg-primary border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" id="process-header">
          <div className="max-w-2xl text-left">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-premium uppercase mb-3 block">
              OUR SERVICE METHODOLOGY
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-white tracking-tighter leading-tight">
              Rigorous Engineering. <br /> Predictable <span className="font-serif italic font-normal text-brand-text-secondary">Timelines</span><span className="text-brand-premium">.</span>
            </h2>
          </div>
          <div className="max-w-md text-left md:text-right">
            <p className="font-sans text-sm sm:text-base text-brand-text-secondary leading-relaxed">
              We do not believe in guesswork. Our 7-stage development pipeline is designed to eliminate risk and keep you updated at every step of the project.
            </p>
          </div>
        </div>

        {/* Process Steps Visual Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="process-timeline-layout">
          
          {/* Left Side: Vertical Step Selector */}
          <div className="lg:col-span-4 flex flex-col gap-2 text-left" id="process-step-selector">
            {steps.map((item, idx) => {
              const Icon = getStepIcon(idx);
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-brand-premium border-brand-premium text-white shadow-[0_0_20px_rgba(79,125,255,0.25)]'
                      : 'bg-white/5 hover:bg-white/10 border-brand-border text-brand-text-secondary hover:text-white'
                  }`}
                  id={`process-button-${idx}`}
                >
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-sm ${isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-brand-text-muted'}`}>
                    {item.step}
                  </span>
                  <div className="flex-grow">
                    <span className="block font-display text-xs sm:text-sm font-bold leading-none mb-1">
                      {item.title}
                    </span>
                  </div>
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-brand-text-muted'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Side: Interactive Active Step Deep Dive Card */}
          <div className="lg:col-span-8 h-full min-h-[480px] lg:min-h-[520px]" id="process-active-card-container">
            <div 
              onMouseEnter={() => setIsPanelHovered(true)}
              onMouseLeave={() => setIsPanelHovered(false)}
              className="group bg-[#0c101a]/55 backdrop-blur-[20px] border border-white/8 rounded-3xl p-8 sm:p-10 h-full flex flex-col md:flex-row justify-between text-left shadow-[0_0_50px_rgba(79,125,255,0.06)] hover:shadow-[0_0_50px_rgba(79,125,255,0.18),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:border-white/12 transition-all duration-700 relative overflow-hidden"
            >
              
              {/* Premium Background Cinematic Image Layer */}
              <div className="absolute top-0 right-0 w-full md:w-[45%] h-full z-0 pointer-events-none select-none overflow-hidden rounded-3xl md:rounded-none md:rounded-r-3xl">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 1.05, filter: 'blur(8px) contrast(1.1) brightness(1.05)' }}
                    animate={{ 
                      opacity: 1, 
                      scale: isPanelHovered ? 1.03 : 1.00,
                      filter: 'blur(0px) contrast(1.1) brightness(1.05)',
                    }}
                    exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px) contrast(1.1) brightness(1.05)' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${stepImages[activeStep]})` }}
                  />
                </AnimatePresence>

                {/* Subtle overall dark overlay (25-35% as requested) */}
                <div className="absolute inset-0 bg-black/28 z-[1]" />

                {/* Layer 2: Precise custom cinematic gradient overlay to ensure text readability & perfect blend */}
                <div className="absolute inset-0 z-[2] md:hidden bg-gradient-to-b from-[#0c101a]/95 via-[#0c101a]/80 to-[#0c101a]/95" />
                <div 
                  className="hidden md:block absolute inset-0 z-[2]" 
                  style={{
                    background: 'linear-gradient(to left, rgba(5, 8, 18, 0.92), rgba(5, 8, 18, 0.45), rgba(5, 8, 18, 0.15))'
                  }}
                />

                {/* Layer 3: Subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,8,18,0.42)_100%)] z-[3]" />

                {/* Layer 4: Soft ambient glow / radial blue light */}
                <motion.div 
                  animate={{ 
                    opacity: (hoveredStep !== null || isPanelHovered) ? 0.35 : 0.22,
                    scale: (hoveredStep !== null || isPanelHovered) ? 1.15 : 1.0
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,125,255,0.25),transparent_75%)] z-[4]" 
                />

                {/* Layer 5: Glass reflections layer */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_60%,rgba(255,255,255,0.01)_100%)] z-[5]" />

                {/* Layer 6: Noise grain overlay */}
                <div 
                  className="absolute inset-0 z-[6] mix-blend-overlay opacity-[0.035]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                  }}
                />

                {/* Layer 7: Light Sweep Reflection */}
                <motion.div 
                  key={`sweep-${activeStep}-${hoveredStep !== null || isPanelHovered}`}
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent z-[7] pointer-events-none" 
                />
              </div>

              {/* Subtle design element */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none z-10 hidden md:block">
                <span className="font-display text-[160px] font-extrabold leading-none text-white">
                  {steps[activeStep].step}
                </span>
              </div>

              {/* Left Side Content Column (takes up left 52% of card to leave room for cinematic image on right) */}
              <div className="relative z-10 w-full md:max-w-[52%] lg:max-w-[52%] flex flex-col justify-between h-full gap-8">
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <span className="font-mono text-xs font-extrabold text-brand-premium bg-brand-premium/10 border border-brand-premium/20 px-3 py-1 rounded-sm uppercase tracking-widest">
                      STAGE {steps[activeStep].step}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-border"></span>
                    <span className="font-mono text-[10px] text-brand-text-muted uppercase tracking-widest font-bold">
                      SYSTEMATIC PHASING
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
                    {steps[activeStep].title}
                  </h3>
                  <p className="font-sans text-xs sm:text-base text-brand-text-secondary leading-relaxed mb-6">
                    {steps[activeStep].description}
                  </p>
                </div>

                <div className="border-t border-brand-border pt-6 mt-auto">
                  <h4 className="font-mono text-[10px] tracking-widest font-extrabold text-brand-text-muted uppercase mb-3">
                    TANGIBLE PHASE DELIVERABLE
                  </h4>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-success flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-xs sm:text-sm font-bold text-white leading-normal">
                      {steps[activeStep].outcome}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Next step button in bottom right corner */}
              {activeStep < steps.length - 1 && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="mt-8 md:mt-0 md:absolute md:bottom-8 md:right-8 inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-premium uppercase font-bold hover:text-white transition-all cursor-pointer relative z-10 bg-[#0c101a]/40 backdrop-blur-md border border-white/10 hover:border-brand-premium/30 px-4 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(79,125,255,0.15)]"
                  id="process-next-btn"
                >
                  <span>Advance to Stage {steps[activeStep + 1].step}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
