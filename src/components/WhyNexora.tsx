import React from 'react';
import { motion } from 'motion/react';
import { Landmark, TrendingUp, Award, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const WhyNexora: React.FC = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Measurable ROI Focus',
      tagline: 'HIGH ACQUISITION VELOCITY',
      desc: 'We do not build digital art. We build targeted customer acquisition machines. Every line of code, visual layout decision, and conversion funnel step is crafted to directly elevate your average order value (AOV) and conversion rates.',
      metrics: 'Average +34% Conversion Boost',
    },
    {
      icon: Award,
      title: 'Premium Brand Placement',
      tagline: 'INSTANT COMPETITIVE MOAT',
      desc: 'First impressions are non-negotiable. Our premium styling immediately positions your business at the absolute top tier of your sector, enabling you to charge premium prices and win high-value accounts.',
      metrics: 'Establish Instant Pricing Authority',
    },
    {
      icon: Zap,
      title: 'Core Web Vitals Mastery',
      tagline: 'GOOGLE RANKING DOMINANCE',
      desc: 'Google actively penalizes slow websites. Our builds score 95+ on Lighthouse, delivering lightning-fast sub-200ms loads that prevent drop-offs, delight mobile buyers, and lift organic search (SEO) authority.',
      metrics: 'Sub-200ms Page Loads',
    },
    {
      icon: Landmark,
      title: 'Zero Tech Debt Foundation',
      tagline: 'PREVENT RE-PLATFORM COSTS',
      desc: 'Cheap templates break under load or require costly total rebuilds in 12 months. Nexora structures code bases with clean TypeScript, modular components, and durable cloud-ready APIs, ensuring 10-year platform life.',
      metrics: 'Built to Scale Indefinitely',
    },
  ];

  const highlights = [
    'No outsourced offshore contractors—100% elite engineering.',
    'Bespoke visual frameworks matching your logo & exact brand values.',
    'Full-service handling: Strategy, Design, Development, and Support.',
    'Transparent timeline accountability with real-time status portals.',
    'Native performance optimizations for high-traffic campaigns.',
  ];

  return (
    <section id="why-nexora" className="py-24 bg-brand-bg-secondary border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Bold Copy and Highlight Bullet Points */}
          <div className="lg:col-span-5 text-left" id="why-nexora-left">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-premium uppercase mb-3 block">
              OUR STRATEGIC EDGE
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-white tracking-tighter leading-tight mb-6">
              Why High-Growth Companies Choose <span className="font-serif italic font-normal text-brand-text-secondary">Nexora</span>.
            </h2>
            <p className="font-sans text-base text-brand-text-secondary leading-relaxed mb-8">
              Cheap web templates are a liability, not an asset. They dilute your brand value, fail to convert mobile users, and result in slow load times that leak revenue daily. 
              <br /><br />
              Nexora builds premium digital systems designed for immediate business impact, long-term brand equity, and real financial returns.
            </p>

            <div className="space-y-4 border-t border-brand-border pt-8" id="why-nexora-bullets">
              <span className="font-display text-xs font-bold tracking-widest text-white uppercase mb-4 block">
                THE NEXORA STANDARD
              </span>
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-success flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-xs sm:text-sm text-brand-text-secondary font-medium leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Custom Benefit Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="why-nexora-benefits-grid">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-brand-card border border-brand-border rounded-2xl p-6 hover:border-brand-border-hover hover:shadow-[0_0_25px_rgba(79,125,255,0.15)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
                  id={`benefit-card-${idx}`}
                >
                  <div>
                    <div className="inline-flex p-3 rounded-xl bg-white/5 text-white mb-6 border border-brand-border">
                      <Icon className="w-5 h-5 text-brand-premium" />
                    </div>
                    <span className="font-mono text-[9px] tracking-widest font-bold text-brand-premium mb-2.5 block">
                      {benefit.tagline}
                    </span>
                    <h3 className="font-display text-base font-extrabold text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="font-sans text-xs text-brand-text-secondary leading-relaxed mb-6">
                      {benefit.desc}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3 border border-brand-border">
                    <span className="font-mono text-[10px] tracking-wide font-bold text-brand-premium">
                      RESULT: {benefit.metrics}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
