import React from 'react';
import { Shield, Zap, RefreshCw, Cpu } from 'lucide-react';

export const TrustBar: React.FC = () => {
  // Key process highpoints
  const commitments = [
    {
      icon: Shield,
      title: 'Enterprise Grade Security',
      desc: 'SSL, OAuth2, cloud firewalls, and stringent encryption out-of-the-box.',
      badge: 'SECURE',
    },
    {
      icon: Zap,
      title: 'Sub-200ms Performance',
      desc: 'Vite & Next.js-driven static compilation with optimized caching layouts.',
      badge: 'LIGHTNING',
    },
    {
      icon: RefreshCw,
      title: 'Continuous Deployment',
      desc: 'Real-time production branches, stable server rollouts, and zero-downtime boots.',
      badge: 'AGILE',
    },
    {
      icon: Cpu,
      title: 'AI & Automation Ready',
      desc: 'Native API integrations with LLMs, vectors, and semantic orchestration layers.',
      badge: 'FUTURE-PROOF',
    },
  ];

  const clientBrands = [
    { name: 'React', type: 'Framework' },
    { name: 'TypeScript', type: 'Security' },
    { name: 'Next.js', type: 'Static/SSR' },
    { name: 'TailwindCSS', type: 'Design System' },
    { name: 'Node.js', type: 'Server' },
    { name: 'Gemini AI', type: 'Cognitive' },
    { name: 'PostgreSQL', type: 'Database' },
    { name: 'Google Cloud', type: 'Hosting' },
  ];

  return (
    <section id="trust-bar" className="bg-brand-bg-secondary border-y border-brand-border py-16 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Core Architectural Commitments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" id="trust-commitments-grid">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-brand-card border border-brand-border rounded-2xl p-6 hover:border-brand-border-hover hover:shadow-[0_0_25px_rgba(79,125,255,0.15)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
                id={`commitment-card-${idx}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5 text-brand-text-secondary group-hover:bg-brand-premium/10 group-hover:text-brand-premium transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] tracking-widest font-bold text-brand-premium bg-brand-premium/10 px-2 py-0.5 rounded-sm uppercase border border-brand-premium/20">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sliding Technologies Ticker */}
        <div className="flex flex-col items-center text-center mt-6">
          <span className="font-mono text-[10px] tracking-[0.25em] text-brand-text-muted uppercase mb-8">
            ENGINEERING EXCELLENCE IN MODERN TECHNOLOGIES
          </span>
          
          <div className="w-full relative overflow-hidden" id="tech-ticker-container">
            {/* Left and Right gradients for visual depth */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-brand-bg-secondary to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-brand-bg-secondary to-transparent z-10 pointer-events-none"></div>

            {/* Sliding/Ticker container */}
            <div className="flex gap-4 sm:gap-6 items-center whitespace-nowrap animate-[marquee_25s_linear_infinite]" style={{ width: 'max-content' }}>
              {/* Render twice for seamless looping */}
              {[...clientBrands, ...clientBrands, ...clientBrands].map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-brand-card border border-brand-border shadow-md hover:border-brand-border-hover hover:shadow-[0_0_15px_rgba(79,125,255,0.1)] transition-all duration-300"
                >
                  <span className="font-display text-xs font-bold text-white">{brand.name}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-premium/50"></span>
                  <span className="font-mono text-[9px] tracking-wider text-brand-text-muted uppercase">{brand.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
