import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Database, Blocks, Zap, Code2, Repeat, Milestone } from 'lucide-react';

export const TechStack: React.FC = () => {
  const techItems = [
    {
      name: 'Next.js (App Router)',
      category: 'Static & Server Side rendering',
      desc: 'The corporate standard for hybrid server-rendered platforms. Deploys optimized static routes with dynamic page overrides.',
      badge: 'SPEED',
      icon: Blocks,
    },
    {
      name: 'React 19+',
      category: 'Client Side Composition',
      desc: 'Leveraging concurrent rendering, server components, and responsive state hooks to deliver desktop-app feel in the browser.',
      badge: 'STABLE',
      icon: Zap,
    },
    {
      name: 'TypeScript',
      category: 'Type-Safe Engineering',
      desc: 'Eliminates 99% of runtime bugs by enforcing strict static compilation structures. Ideal for high-security healthcare, legal, or finance apps.',
      badge: 'ROBUST',
      icon: Code2,
    },
    {
      name: 'Tailwind CSS v4',
      category: 'Declarative Design tokens',
      desc: 'Utility-first CSS engine compile-time optimized to produce minimal asset payloads and guarantee beautiful fluid viewports.',
      badge: 'RESPONSIVE',
      icon: Milestone,
    },
    {
      name: 'Node.js & Express',
      category: 'Server Architecture',
      desc: 'Fast, asynchronous event loops perfect for hosting client-side assets and routing high-traffic API requests safely.',
      badge: 'SCALABLE',
      icon: Database,
    },
    {
      name: 'AI Ready Integration',
      category: 'Cognitive Computing',
      desc: 'Integrated vectors, semantic schemas, and pre-configured client middleware to power natural-language pipelines.',
      badge: 'INTELLIGENT',
      icon: Cpu,
    },
    {
      name: 'Automation Ready',
      category: 'Workflow Automation',
      desc: 'Background webhooks, automated email flows, and calendar synchronizations running silently on serverless triggers.',
      badge: 'EFFICIENT',
      icon: Repeat,
    },
    {
      name: 'Future Proof Security',
      category: 'Platform Architecture',
      desc: 'Isolated environments, CSRF protections, strict Content Security Policies, and native cookie-based session verification.',
      badge: 'SECURE',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="tech-stack" className="py-24 bg-brand-bg-secondary border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" id="tech-stack-header">
          <div className="max-w-2xl text-left">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-premium uppercase mb-3 block">
              OUR STACK & STANDARDS
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-white tracking-tighter leading-tight">
              A Modern Architecture. <br /> Built <span className="font-serif italic font-normal text-brand-text-secondary">for</span> Decades<span className="text-brand-premium">.</span>
            </h2>
          </div>
          <div className="max-w-md text-left md:text-right">
            <p className="font-sans text-sm sm:text-base text-brand-text-secondary leading-relaxed">
              We compile code using highly trusted, industrial-grade frameworks that assure fast rendering, strong search ratings, and smooth maintenance loops.
            </p>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" id="tech-stack-cards-grid">
          {techItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative bg-brand-card border border-brand-border rounded-2xl p-6.5 hover:border-brand-border-hover hover:shadow-[0_0_25px_rgba(79,125,255,0.15)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between text-left"
                id={`tech-card-${idx}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-white/5 text-white group-hover:bg-brand-premium/10 group-hover:text-brand-premium transition-all duration-300 border border-brand-border">
                      <IconComponent className="w-5 h-5 text-brand-premium" />
                    </div>
                    <span className="font-mono text-[9px] tracking-wider font-extrabold text-brand-premium bg-brand-premium/10 px-2 py-0.5 rounded-sm uppercase border border-brand-premium/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-extrabold text-white mb-1 group-hover:text-brand-premium transition-colors">
                    {item.name}
                  </h3>
                  <span className="block font-mono text-[9px] tracking-wider text-brand-text-muted uppercase mb-4 font-bold">
                    {item.category}
                  </span>
                  <p className="font-sans text-xs text-brand-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
