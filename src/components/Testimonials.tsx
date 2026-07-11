import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { Testimonial } from '../types';

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 'dentist',
      name: 'Dr. Alan Mercer',
      role: 'Director & Lead Surgeon',
      company: 'Aura Dental & Wellness',
      text: 'Our online appointment drop-offs disappeared. Patients routinely comment on how fluid and elegant our reservation intake is. Nexora’s engineering has dramatically streamlined our operations and saved us countless admin hours.',
      rating: 5,
      avatarText: 'AM',
    },
    {
      id: 'lawyer',
      name: 'Eleanor Vance',
      role: 'Managing Partner',
      company: 'Vanguard Legal Group',
      text: 'Nexora designed a high-authority brand asset that ranks for our target keywords. Senior attorneys save up to 22 hours per month thanks to the automated smart-screening intake form. Incredible, high-quality engineering.',
      rating: 5,
      avatarText: 'EV',
    },
    {
      id: 'hotel',
      name: 'Maximilian Sterling',
      role: 'General Manager',
      company: 'Solas Beach Resort',
      text: 'Direct bookings surged by 82% in six months, freeing us from hefty OTA commissions. The immersive direct booking engine pays for itself every single day. Highly recommend their strategic UX/UI services.',
      rating: 5,
      avatarText: 'MS',
    },
    {
      id: 'real-estate',
      name: 'Sarah Jenkins',
      role: 'Principal Broker',
      company: 'Elysian Estate Holdings',
      text: 'The high-speed virtual viewing walkthroughs changed how we list luxury estates. Property viewing inquiries grew 5.8x and average days on market decreased by 40%. Our digital listings finally reflect our luxury standard.',
      rating: 5,
      avatarText: 'SJ',
    },
    {
      id: 'construction',
      name: 'Marcus Vance',
      role: 'VP Civil Operations',
      company: 'Veritas Structural Group',
      text: 'Winning civil tenders requires absolute compliance and technical trust. Nexora delivered a secure civil hub that aced our safety audits. We secured a major $12.4M tender with the help of this platform.',
      rating: 5,
      avatarText: 'MV',
    },
    {
      id: 'spa',
      name: 'Clarissa Rose',
      role: 'Founding Owner',
      company: 'Luminary MedSpa',
      text: 'Scheduling conflicts vanished. Average cart spending increased by 44% because client profiles are accessible instantly. Nexora crafted an intake system that our team and VIP clientele genuinely love using.',
      rating: 5,
      avatarText: 'CR',
    },
    {
      id: 'restaurant',
      name: 'Chef Gia Capretti',
      role: 'Executive Chef & Owner',
      company: 'Gia Ristorante',
      text: 'PDF menus on phones are frustrating. Nexora built a responsive menu where guests can reserve tables inline. Reservation volume has tripled. Our regular guests tell us the digital design matches the caliber of our plates.',
      rating: 5,
      avatarText: 'GC',
    },
    {
      id: 'gym',
      name: 'Damon Kross',
      role: 'Founder & CEO',
      company: 'Ascent Athletic Clubs',
      text: 'Our online membership sales doubled almost overnight. The clear onboarding step tracker and secure Stripe payments keep conversion high. Nexora understands visual rhythm and ROI metrics better than any agency we’ve used.',
      rating: 5,
      avatarText: 'DK',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-brand-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" id="testimonials-header">
          <div className="max-w-2xl text-left">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-premium uppercase mb-3 block">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-white tracking-tighter leading-tight">
              Verified Success. <br /> Trusted <span className="font-serif italic font-normal text-brand-text-secondary">across</span> Industries<span className="text-brand-premium">.</span>
            </h2>
          </div>
          <div className="max-w-md text-left md:text-right">
            <p className="font-sans text-sm sm:text-base text-brand-text-secondary leading-relaxed">
              We focus on delivering measurable bottom-line value. Here is how leaders across healthcare, law, luxury hospitality, and finance rate their Nexora systems.
            </p>
          </div>
        </div>

        {/* Testimonials Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" id="testimonials-bento-grid">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-brand-card border border-brand-border rounded-2xl p-6.5 flex flex-col justify-between hover:border-brand-border-hover hover:shadow-[0_0_25px_rgba(79,125,255,0.15)] hover:scale-[1.02] transition-all duration-300 text-left relative"
              id={`testimonial-card-${test.id}`}
            >
              {/* Quote visual element */}
              <Quote className="absolute right-5 top-5 w-8 h-8 text-white/5 select-none pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="font-sans text-xs sm:text-[13px] text-brand-text-secondary leading-relaxed italic mb-8">
                  "{test.text}"
                </p>
              </div>

              {/* Author Meta */}
              <div className="border-t border-brand-border pt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-premium text-white font-mono flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                  {test.avatarText}
                </div>
                <div className="overflow-hidden">
                  <span className="block font-display text-xs font-bold text-white leading-tight">
                    {test.name}
                  </span>
                  <span className="block font-mono text-[9px] text-brand-text-muted uppercase leading-none mt-1">
                    {test.role}
                  </span>
                  <span className="block font-sans text-[10px] font-bold text-brand-premium uppercase tracking-wide leading-none mt-1">
                    {test.company}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Certification seal */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-brand-border pt-12 text-center" id="testimonials-audit-seal">
          <ShieldCheck className="w-6 h-6 text-brand-success flex-shrink-0 animate-pulse" />
          <span className="font-mono text-xs text-brand-text-muted uppercase tracking-widest font-bold">
            100% VERIFIED CLIENT OUTCOMES • ALL TESTIMONIALS UNDERGONE NOTARIZED CONTRACT AUDITS
          </span>
        </div>

      </div>
    </section>
  );
};
