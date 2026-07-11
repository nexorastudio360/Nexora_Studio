import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';
import { FaqItem } from '../types';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'What makes Nexora Studio different from standard agency groups?',
      answer: 'We do not build from templates or resell bloated WordPress themes. Nexora is a premium digital engineering house. Every site is handcrafted from scratch in modern TypeScript, React, and Tailwind, ensuring unmatched sub-200ms load speeds, structural SEO advantages, and a distinctive luxury design that commands pricing authority.',
      category: 'philosophy',
    },
    {
      id: 'faq-2',
      question: 'What is your average project pricing and contract model?',
      answer: 'Our bespoke digital engineering solutions range from $5,000 to $25,000+ depending on the complexity of layouts, API scopes, and data integrations. We provide fixed-price scope proposals with clear, phased milestones so there are never surprise billings or technical hidden fees.',
      category: 'pricing',
    },
    {
      id: 'faq-3',
      question: 'How long does a typical Nexora digital project take to launch?',
      answer: 'A high-converting landing page or direct lead-funnel can launch within 3 to 4 weeks. Multi-page enterprise solutions, deep booking integrations, or custom real estate listing galleries typically span 6 to 8 weeks from initial Discovery phase to active CDN deployment.',
      category: 'logistics',
    },
    {
      id: 'faq-4',
      question: 'How do you guarantee your sub-200ms page load speeds?',
      answer: 'We avoid server-side bloat by compiling static assets using Vite and Next.js, optimizing styling assets through Tailwind, and rendering dynamic elements using lazy-load React wrappers. Your site is then orchestrated globally across CDN networks (Cloudflare Edge) so files sit inches away from your clients.',
      category: 'technology',
    },
    {
      id: 'faq-5',
      question: 'Do you configure semantic SEO and schema schema markups?',
      answer: 'Yes. SEO is not an afterthought or plugin for us. We compile proper, semantic HTML5, optimize asset metadata (titles, descriptions, OpenGraph tags), and inject rich JSON-LD structured data schemas directly into the code. This ensures Google registers your business location and ratings for premium rich snippet placement.',
      category: 'technology',
    },
    {
      id: 'faq-6',
      question: 'Can you integrate third-party scheduling, payments, or CRMs?',
      answer: 'Absolutely. We specialize in custom API linkages. We routinely link secure Stripe payment networks, Twilio SMS alerts, Google/Outlook Calendar scheduling pipelines, MLS broker indexes for real estate, and corporate CRMs (HubSpot, Salesforce) to automate lead capture.',
      category: 'technology',
    },
    {
      id: 'faq-7',
      question: 'What is your "AI Solutions & Automation" capability (Coming Soon)?',
      answer: 'We are engineering native server-side gateways linking businesses directly to Google Gemini and OpenAI LLMs. Soon, Nexora clients can deploy custom intake agents, semantic document sorters, and intelligent visual analyzers to cut manual administrative overhead by 40%.',
      category: 'technology',
    },
    {
      id: 'faq-8',
      question: 'Will our staff be able to edit text and images after launch?',
      answer: 'Yes. We deliver intuitive CMS integrations (e.g. Sanity, Contentful, or custom secure JSON dashboards) tailored exactly to your workflow. Anyone can edit blog pieces, upload listing photos, or update dining prices without looking at code.',
      category: 'logistics',
    },
    {
      id: 'faq-9',
      question: 'What support and maintenance options do you offer post-launch?',
      answer: 'We provide premium maintenance agreements covering 24/7 server monitoring, visual regression updates, browser adaptability checks, dependency upgrades, and iterative conversion rate (CRO) tweaks to keep your customer conversion rates high.',
      category: 'pricing',
    },
    {
      id: 'faq-10',
      question: 'How do you handle client communication and project milestones?',
      answer: 'Transparency is our absolute core value. Every project is assigned an elite project lead. You receive access to a live status portal detailing exactly what phase we are on, with live wireframe links, interactive drafts, and clear deliverable timestamps.',
      category: 'logistics',
    },
    {
      id: 'faq-11',
      question: 'Are there monthly hosting charges or hidden software fees?',
      answer: 'We recommend hosting assets on serverless edge networks (such as Vercel, Netlify, or AWS), which usually have free tiers or cost under $20/month. We help you set up all accounts directly under your corporate ownership so you have absolute control over your assets.',
      category: 'pricing',
    },
    {
      id: 'faq-12',
      question: 'Where is Nexora Studio based and do you work internationally?',
      answer: 'Nexora Studio operates on a global remote-first model, with core directors, designers, and systems architects based in modern tech Hubs across North America and Europe. We securely partner with premium companies across 14+ countries.',
      category: 'philosophy',
    },
    {
      id: 'faq-13',
      question: 'Do you offer custom-made logo design and branding services?',
      answer: 'Yes. While we are primarily a digital engineering house, our creative directors offer comprehensive branding frameworks—including typography selections, strict responsive logo grids, custom icons, and visual standards manuals.',
      category: 'philosophy',
    },
    {
      id: 'faq-14',
      question: 'How do you safeguard user data and ensure contact forms are safe?',
      answer: 'We build all form submit routers with serverless security constraints. We sanitize input payloads, enforce HTTPS protocols, utilize invisible anti-spam filters, and ensure compliance with GDPR, HIPAA guidelines (for healthcare intakes), and SOC2 principles.',
      category: 'technology',
    },
    {
      id: 'faq-15',
      question: 'How do we get started with a Nexora digital project?',
      answer: 'Simply fill out our premium Contact Inquiry at the bottom of this page. We review your industry challenges within 24 business hours, formulate a custom strategic roadmap, and schedule a 30-minute discovery consultation to finalize deliverables.',
      category: 'logistics',
    },
  ];

  const categories = [
    { label: 'All FAQs', id: 'all' },
    { label: 'Technology & Speed', id: 'technology' },
    { label: 'Pricing & Milestones', id: 'pricing' },
    { label: 'Project Logistics', id: 'logistics' },
    { label: 'Branding & Philosophy', id: 'philosophy' },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-brand-bg-primary">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16" id="faq-header">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-premium uppercase mb-3 block">
            COMMON INQUIRIES
          </span>
          <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-white tracking-tighter leading-tight">
            Frequently Asked <span className="font-serif italic font-normal text-brand-text-secondary">Questions</span>.
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-text-secondary leading-relaxed mt-4">
            Everything you need to know about our elite web engineering, direct-booking funnels, pricing milestones, and strategic deliverables.
          </p>
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="faq-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenId(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-250 border cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-premium text-white border-brand-premium shadow-[0_0_15px_rgba(79,125,255,0.2)]'
                  : 'bg-white/5 text-brand-text-secondary border-brand-border hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4" id="faq-list">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-border-hover"
                id={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-hidden transition-colors hover:bg-white/5 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-colors ${isOpen ? 'text-brand-premium' : 'text-brand-text-muted'}`} />
                    <span className="font-display text-sm sm:text-base font-extrabold text-white pr-4">
                      {faq.question}
                    </span>
                  </div>
                  <div className="p-1 rounded-full bg-white/5 border border-brand-border text-white flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-brand-premium" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-left border-t border-brand-border">
                        <p className="font-sans text-xs sm:text-sm text-brand-text-secondary leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* FAQ CTA bottom */}
        <div className="mt-12 bg-brand-bg-secondary rounded-2xl border border-brand-border p-6 flex flex-col sm:flex-row items-center justify-between text-left gap-4" id="faq-footer-promo">
          <div>
            <span className="block font-display text-sm font-bold text-white">Have a specific technical question or complex database query?</span>
            <span className="block font-sans text-xs text-brand-text-muted">Our chief developer will provide a free technical review for your project.</span>
          </div>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase hover:bg-white/20 border border-brand-border transition-colors whitespace-nowrap"
          >
            <span>Ask Chief Developer</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
