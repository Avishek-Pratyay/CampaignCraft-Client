import React from 'react';
import { Bot, ShieldCheck, Compass, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Compass,
      title: 'Context Grounding',
      desc: 'AI writing must reflect the brand. We secure parameters (industry, voice tone) and feed them directly into the context memory for targeted text generation.'
    },
    {
      icon: Zap,
      title: 'Autonomous Strategy Loop',
      desc: 'Our agent analyzes CPC rates, conversion volumes, and spends to generate real-time bid adjustments and cap limits rather than static advice.'
    },
    {
      icon: ShieldCheck,
      title: 'Privacy-First Parsing',
      desc: 'All tabular campaign logs are parsed in-memory. Data is aggregated and synthesized without sharing internal identifiers with external networks.'
    }
  ];

  const team = [
    {
      name: 'Alexander Sterling',
      role: 'Chief AI Architect',
      bio: 'Former ML researcher specializing in agentic workflows and multi-agent reasoning graphs.'
    },
    {
      name: 'Elena Vance',
      role: 'Director of Growth Marketing',
      bio: '12+ years optimizing acquisition campaigns for top-tier SaaS and high-volume e-commerce brands.'
    },
    {
      name: 'Marcus Chen',
      role: 'Principal Full Stack Engineer',
      bio: 'Ecosystem lead focused on designing low-latency API architectures and real-time visualization systems.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-6">
        <div className="mx-auto h-12 w-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
          <Bot className="h-6 w-6 animate-pulse" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
          Autonomous Campaign Crafting
        </h1>
        <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
          CampaignCraft AI was founded to build a modern workspace where agentic LLMs handle the calculations, copywriting drafts, and bid recommendations, letting marketers focus on creative direction.
        </p>
      </section>

      {/* Pillars Section */}
      <section className="space-y-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center">Core Agent Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="glass-card p-6 rounded-2xl bg-brand-card/25 border border-white/5 space-y-4">
                <div className="h-10 w-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack Highlights */}
      <section className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 bg-brand-card/15 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">The Intelligence Stack</h2>
          <p className="text-brand-muted text-sm leading-relaxed">
            CampaignCraft is built using standard enterprise technologies: MongoDB for document persistence, Express and Node.js for backend controller APIs, and React + Tailwind CSS + Recharts for the client workspace.
          </p>
          <p className="text-brand-muted text-sm leading-relaxed">
            AI tasks run through the official Google Gemini SDK or OpenAI engines. The application compiles custom instruction buffers, manages data formats, and formats HTML documents.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs font-mono font-bold text-brand-muted text-center uppercase">
          <div className="p-4 bg-slate-950/40 rounded-xl border border-white/5">React & Vite</div>
          <div className="p-4 bg-slate-950/40 rounded-xl border border-white/5">Express Router</div>
          <div className="p-4 bg-slate-950/40 rounded-xl border border-white/5">Mongoose ODM</div>
          <div className="p-4 bg-slate-950/40 rounded-xl border border-white/5">Gemini 1.5 Flash</div>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="space-y-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center">Meet the Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((t, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl bg-brand-card/30 border border-white/5 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-brand-secondary font-extrabold text-sm">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{t.name}</h3>
                  <p className="text-xs text-brand-secondary font-semibold uppercase mt-0.5">{t.role}</p>
                </div>
                <p className="text-brand-muted text-xs leading-relaxed">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default About;
