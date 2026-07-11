import React from 'react';
import { motion } from 'motion/react';
import { Layout, Globe, Star, Palette, RefreshCw, Search, CheckCircle, ArrowRight, Brain } from 'lucide-react';
import { Service } from '../types';

export const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 'web-design',
      title: 'Premium Website Design',
      description: 'Award-winning aesthetics coupled with meticulous visual planning to tell your unique brand story.',
      features: ['Custom design layout grids', 'Immersive typography strategy', 'Artistic brand styling direction', 'Interactive high-end wireframing'],
    },
    {
      id: 'business-sites',
      title: 'Enterprise Business Websites',
      description: 'Durable, corporate-ready platforms designed to establish absolute authority and convert high-ticket leads.',
      features: ['Corporate CRM integrations', 'Multi-page information design', 'CMS-driven editor layouts', 'Custom lead acquisition funnels'],
    },
    {
      id: 'landing-pages',
      title: 'High-Conversion Landing Pages',
      description: 'Surgical focus on conversion rates (CRO) and sales velocity to squeeze maximum value from your ad campaigns.',
      features: ['Optimized psychological triggers', 'Frictionless call-to-actions', 'Ultra-fast loading times', 'A/B testing-ready architecture'],
    },
    {
      id: 'ui-ux',
      title: 'Elite UI/UX Product Design',
      description: 'Human-centered interfaces mapped to rigorous user flow maps and high-fidelity clickable mockups.',
      features: ['In-depth user persona mapping', 'Friction-free usability flow', 'Design system token guides', 'Hi-fi responsive prototyping'],
    },
    {
      id: 'redesign',
      title: 'Strategic Website Redesign',
      description: 'Transform outdated digital assets into modern, high-performance engines while protecting existing SEO rankings.',
      features: ['Legacy technical debt cleanup', 'Modern aesthetic overhaul', 'Secure redirect map setup', 'Speed and SEO improvements'],
    },
    {
      id: 'seo-ready',
      title: 'Semantic SEO Optimization',
      description: 'Rigorous keyword alignment and structural schema markup built directly into your site’s core code.',
      features: ['Structured Rich Snippets schema', 'Semantic HTML5 hierarchy', 'Metadata index optimizations', 'PageSpeed Core Web Vitals audit'],
    },
    {
      id: 'responsive-dev',
      title: 'Fluid Responsive Development',
      description: 'Pristine viewport adaptability spanning ultra-wide desktop monitors down to standard smartphones.',
      features: ['Mobile-first fluid grids', 'Retina-ready SVG interfaces', 'Cross-browser rendering safety', 'Zero layout shift (CLS) ratings'],
    },
    {
      id: 'ai-automation',
      title: 'AI Solutions & Automation',
      description: 'Intelligent customer pipelines and automatic data syncs that run silently in the background.',
      features: ['Gemini LLM pipeline setups', 'Semantic data query filters', 'Automated customer intake', 'Interactive cognitive chatbots'],
      upcoming: true,
    },
  ];

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'web-design':
        return Layout;
      case 'business-sites':
        return Globe;
      case 'landing-pages':
        return Star;
      case 'ui-ux':
        return Palette;
      case 'redesign':
        return RefreshCw;
      case 'seo-ready':
        return Search;
      case 'responsive-dev':
        return Globe;
      case 'ai-automation':
      default:
        return Brain;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="services" className="py-24 bg-brand-bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" id="services-header">
          <div className="max-w-2xl text-left">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-premium uppercase mb-3 block">
              OUR CAPABILITIES
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-white tracking-tighter leading-tight">
              Premium Solutions, <br className="hidden sm:inline" /> Handcrafted <span className="font-serif italic font-normal text-brand-text-secondary">for</span> Business Growth<span className="text-brand-premium">.</span>
            </h2>
          </div>
          <div className="max-w-md text-left md:text-right">
            <p className="font-sans text-sm sm:text-base text-brand-text-secondary leading-relaxed">
              We do not copy layouts. We build high-performance web applications that establish instant trust, outrank search rivals, and secure premium clientele.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          id="services-cards-grid"
        >
          {services.map((service) => {
            const Icon = getServiceIcon(service.id);
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative bg-brand-card border border-brand-border rounded-2xl p-6 flex flex-col justify-between hover:border-brand-border-hover hover:shadow-[0_0_30px_rgba(79,125,255,0.15)] hover:scale-[1.02] transition-all duration-300 text-left"
                id={`service-card-${service.id}`}
              >
                {/* Accent line top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-premium opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>

                <div>
                  {/* Top Header with Icon and Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-white/5 text-white border border-brand-border group-hover:bg-brand-premium/10 group-hover:text-brand-premium group-hover:border-brand-premium/20 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    {service.upcoming && (
                      <span className="font-mono text-[9px] tracking-widest font-bold text-white bg-brand-premium px-2 py-0.5 rounded-sm uppercase">
                        COMING SOON
                      </span>
                    )}
                  </div>

                  {/* Title and Description */}
                  <h3 className="font-sans text-lg font-bold text-white mb-3 transition-colors duration-250">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-text-secondary leading-relaxed mb-6 transition-colors duration-250 group-hover:text-white">
                    {service.description}
                  </p>

                  <hr className="border-brand-border group-hover:border-brand-border-hover my-4 transition-colors" />

                  {/* Bullet points */}
                  <ul className="space-y-2.5 mb-8">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-premium group-hover:text-brand-success flex-shrink-0 mt-0.5 transition-colors" />
                        <span className="text-brand-text-secondary group-hover:text-white transition-colors">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Link */}
                <div className="mt-auto pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-premium group-hover:text-white tracking-wider uppercase transition-colors"
                  >
                    <span>{service.upcoming ? 'Pre-Inquire Now' : 'Inquire Portfolio'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
