import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import heroImage from '../assets/images/premium_ai_workspace_blue_1783788170910.jpg';

interface HeroProps {
  onCtas: (targetId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtas }) => {
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
      onCtas(id);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-[#05070c]"
    >
      {/* Background grids and abstract premium styling */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Crisp grid system lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        {/* Subtle blur highlights - Large blurred blue orbs & radial glows */}
        <div className="absolute top-[10%] left-[25%] w-[600px] h-[600px] rounded-full bg-[#1A3B85]/20 blur-[150px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#20409A]/15 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Copywriting and CTAs */}
        <div className="lg:col-span-5 flex flex-col text-left">
          {/* Tagline/Brand intro */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#20409A]/30 text-[#4F7CFF] text-[11px] font-sans font-semibold tracking-wider uppercase mb-8 self-start bg-[#0A1020]/80 shadow-[0_0_15px_rgba(32,64,154,0.3)] backdrop-blur-sm"
            id="hero-badge"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F7CFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4F7CFF]"></span>
            </span>
            <span>NOW ACCEPTING PREMIUM INQUIRIES</span>
          </motion.div>

          {/* Core Premium Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans text-5xl sm:text-6xl xl:text-[80px] font-extrabold text-white tracking-tight leading-[1] mb-6"
            id="hero-headline"
          >
            Designing<br />
            <span className="font-serif italic font-medium opacity-90">the</span> Future.
          </motion.h1>

          {/* Authoritative Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-[17px] sm:text-[19px] text-slate-300 leading-[1.6] max-w-[440px] mb-10 font-light"
            id="hero-description"
          >
            We build premium digital assets for industry leaders.<br/>
            Strategic innovation, AI integration, and world-class<br/>
            engineering for the elite.
          </motion.p>

          {/* Premium CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 mb-16"
            id="hero-ctas"
          >
            <button
              onClick={() => handleScrollTo('services')}
              className="px-8 py-4 bg-[#4F7CFF] hover:bg-[#3D65DB] text-white rounded-full font-bold uppercase text-[13px] tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(79,124,255,0.4)] hover:shadow-[0_0_40px_rgba(79,124,255,0.6)] cursor-pointer"
              id="hero-primary-cta"
            >
              EXPLORE SOLUTIONS
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="flex items-center gap-4 group text-left cursor-pointer"
              id="hero-secondary-cta"
            >
              <span className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                <Play className="w-4 h-4 fill-white text-white ml-1" />
              </span>
              <span className="text-[13px] font-bold uppercase tracking-wider text-white group-hover:text-slate-200 transition-colors">WATCH SHOWREEL</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Animated Premium Enterprise AI Workspace */}
        <div 
          className="lg:col-span-7 relative w-full flex items-center justify-center py-12 select-none overflow-visible perspective-[1200px]" 
          id="hero-graphic-panel"
        >
          {/* Depth Gradient Masking */}
          <div className="absolute inset-[-40px] pointer-events-none z-30 bg-[radial-gradient(circle_at_center,transparent_45%,#05070c_90%)]" />

          {/* The Core Visual Container */}
          <motion.div 
            initial={{ opacity: 0, rotateX: 10, y: 20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="relative w-full max-w-[850px] aspect-[16/10] rounded-[24px] overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.15)] border border-white/5 bg-[#05070B]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* 1. Base Image - Premium Futuristic Desk */}
            <motion.div 
              initial={{ scale: 1.05, filter: 'blur(10px)' }}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={heroImage} 
                alt="Premium Enterprise AI Workstation" 
                className="w-full h-full object-cover"
                fetchPriority="high"
                decoding="async"
                loading="eager"
                width={1376}
                height={768}
              />
            </motion.div>

            {/* 2. Soft Bloom & Atmospheric Fog */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/20 opacity-90 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen opacity-40 pointer-events-none" />

            {/* 3. Volumetric Blue Lighting / Monitor Glow */}
            <motion.div 
              animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[25%] left-[15%] right-[15%] h-[45%] bg-blue-500/30 blur-[80px] rounded-full pointer-events-none mix-blend-screen"
            />

            {/* 4. Tiny Orbiting Particles (Ambient Data) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-[2px] h-[2px] rounded-full bg-blue-300 shadow-[0_0_8px_#60A5FA]"
                  initial={{ 
                    x: `${Math.random() * 100}%`, 
                    y: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.4 + 0.1,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{
                    y: [null, `${Math.random() * 100}%`],
                    x: [null, `${Math.random() * 100}%`],
                    opacity: [null, Math.random() * 0.6 + 0.2, null]
                  }}
                  transition={{
                    duration: Math.random() * 15 + 15,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "mirror"
                  }}
                />
              ))}
            </div>

            {/* 5. Floating Glass Panel 1: System Architecture (Top Right) */}
            <motion.div
              animate={{ y: [0, -12, 0], rotateX: [0, 4, 0], rotateY: [0, -4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[12%] right-[8%] w-[180px] h-[130px] bg-[#0A1020]/40 backdrop-blur-md border border-blue-400/20 rounded-xl p-3 shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col gap-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[7px] text-blue-300 font-bold uppercase tracking-widest opacity-80">Architecture</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_5px_#60A5FA]" />
              </div>
              <div className="flex-1 flex gap-2">
                <div className="w-1/3 bg-blue-500/10 border border-blue-500/20 rounded-lg" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-full bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-3 h-3 bg-blue-400/50 rounded-full blur-[2px]" />
                  </div>
                  <div className="h-full bg-blue-400/5 border border-blue-400/10 rounded-lg" />
                </div>
              </div>
            </motion.div>

            {/* 6. Floating Glass Panel 2: Neural Network (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 15, 0], rotateX: [0, -3, 0], rotateY: [0, 3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[18%] left-[6%] w-[160px] h-[170px] bg-[#050B14]/50 backdrop-blur-md border border-blue-500/30 rounded-2xl p-4 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(59,130,246,0.1)]"
            >
              <div className="w-full flex justify-between items-center">
                <span className="text-[7px] text-blue-200 font-bold uppercase tracking-widest">Neural Net</span>
                <span className="text-[7px] text-blue-400 font-mono">ACTIVE</span>
              </div>
              <div className="relative w-20 h-20 rounded-full border border-blue-400/20 flex items-center justify-center my-2">
                <motion.div 
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-blue-500 blur-xl mix-blend-screen"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050B14_70%)] rounded-full" />
                <svg className="absolute inset-0 w-full h-full text-blue-400/40 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" />
                </svg>
              </div>
              <div className="w-full space-y-1.5">
                <div className="h-[2px] w-full bg-blue-900/40 rounded-full overflow-hidden relative">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-blue-400 rounded-full"
                  />
                </div>
                <div className="h-[2px] w-3/4 mx-auto bg-blue-900/40 rounded-full overflow-hidden relative">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-blue-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* 7. Floating Glass Panel 3: Performance Metrics (Top Left) */}
            <motion.div
              animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-[8%] left-[10%] w-[130px] h-[60px] bg-[#0A1020]/60 backdrop-blur-md border border-blue-400/15 rounded-lg p-2.5 shadow-[0_0_30px_rgba(59,130,246,0.1)] flex items-end justify-between"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div 
                  key={`bar-${i}`}
                  animate={{ height: [`${Math.random() * 40 + 20}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 40 + 20}%`] }}
                  transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 bg-gradient-to-t from-blue-600 to-blue-300 rounded-sm opacity-80"
                />
              ))}
            </motion.div>

            {/* 8. Scanning Line / Vertical Sweep */}
            <motion.div 
              animate={{ left: ["-20%", "120%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute top-0 bottom-0 w-[40px] bg-gradient-to-r from-transparent via-blue-400/10 to-transparent skew-x-[-20deg] pointer-events-none mix-blend-screen blur-[2px]"
            />
            
            {/* 9. Light Reflections - Edge Glint */}
            <div className="absolute inset-0 rounded-[24px] border border-white/5 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />
          </motion.div>
        </div>
      </div>

      {/* Trust Logos Row */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full mt-12 relative z-10 border-t border-white/5 pt-12" id="hero-logos-row">
        <div className="flex flex-wrap justify-between items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-6 object-contain brightness-0 invert" loading="lazy" decoding="async" />
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 116 100" fill="white" className="h-5">
              <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
            </svg>
            <span className="text-white font-bold text-xl tracking-tight">Vercel</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-6 fill-white" viewBox="0 0 24 24">
               <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.2157-2.1042 5.9926 5.9926 0 0 0-4.6644-4.2255 5.991 5.991 0 0 0-4.8948 1.1578A5.993 5.993 0 0 0 6.6416 3.16a5.9847 5.9847 0 0 0-4.6468 4.238 5.9847 5.9847 0 0 0 .1677 4.2982 5.9936 5.9936 0 0 0 1.1278 4.9082 5.9847 5.9847 0 0 0 4.6631 4.2256 5.9926 5.9926 0 0 0 4.881-1.1578 5.991 5.991 0 0 0 5.867 1.4886 5.9847 5.9847 0 0 0 4.6468-4.238 5.993 5.993 0 0 0-.1664-4.2983 5.9926 5.9926 0 0 0-1.1001-2.8034zm-6.3848-4.6974a4.3418 4.3418 0 0 1 3.5186.9744 4.3312 4.3312 0 0 1 1.4428 2.508c-.0152-.0084-.0302-.0165-.0456-.0245l-4.5937-2.652a1.6874 1.6874 0 0 0-1.6876 0l-4.9961 2.8851-.144-1.0776a4.3298 4.3298 0 0 1 6.5056-2.6134zm-9.3364 2.6134a4.3312 4.3312 0 0 1 3.493-4.327 4.338 4.338 0 0 1 2.9877.8282c-.0045.0163-.0086.0332-.0127.0498l-2.2965 5.304a1.688 1.688 0 0 0 .8437 2.1915l4.996 2.885v1.0841L6.6433 7.827v-.0898zm-2.072 8.441a4.3312 4.3312 0 0 1-.7267-2.7667 4.338 4.338 0 0 1 2.1643-3.693c.0152.0084.0302.0165.0456.0246l4.5937 2.6521a1.6885 1.6885 0 0 0 1.6877 0l4.9959-2.885.1441 1.0776-9.986 5.7663a4.3312 4.3312 0 0 1-2.9186-.176zm6.536 7.6431a4.3312 4.3312 0 0 1-3.493 4.327 4.338 4.338 0 0 1-2.9876-.8281c.0045-.0164.0086-.0333.0126-.0499l2.2966-5.304a1.6886 1.6886 0 0 0-.8438-2.1915l-4.996-2.8851v-1.0842l9.9248 5.7314.0864.2844zm8.6253-2.6133a4.3312 4.3312 0 0 1 .7266 2.7667 4.338 4.338 0 0 1-2.1642 3.6929c-.0152-.0083-.0302-.0164-.0456-.0245l-4.5937-2.652a1.6883 1.6883 0 0 0-1.6876 0l-4.996 2.885-.1441-1.0776 9.9861-5.7662a4.3298 4.3298 0 0 1 2.9185.1757zm1.1963-3.5654L11.59 13.9161a1.6883 1.6883 0 0 0-.8437-2.1915l2.428-1.4018 2.4277 1.4018a1.688 1.688 0 0 0 .8438 2.1915l-2.428 1.4017-2.4277-1.4017z" />
            </svg>
            <span className="text-white font-bold text-[19px] tracking-tight">OpenAI</span>
          </div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-6 object-contain brightness-0 invert" loading="lazy" decoding="async" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" alt="Microsoft Azure" className="h-6 object-contain brightness-0 invert" loading="lazy" decoding="async" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-7 object-contain brightness-0 invert" loading="lazy" decoding="async" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg" alt="Cloudflare" className="h-6 object-contain brightness-0 invert" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
};

