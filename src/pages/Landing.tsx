import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Bot, 
  Sparkles, 
  BarChart3, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Quote
} from 'lucide-react';

export const Landing: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { value: '82%', label: 'Average ROI Increase' },
    { value: '$0.42', label: 'Average CPC Reduced' },
    { value: '3.4M+', label: 'Generated Ads & Copies' },
    { value: '14.2x', label: 'Faster Campaign Execution' }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI Content Copywriter',
      desc: 'Generate headlines, newsletters, and social variant posts utilizing brand voice-tone grounding.'
    },
    {
      icon: BarChart3,
      title: 'Multimodal Data Intelligence',
      desc: 'Upload campaign metrics CSV/JSON sheets and receive full audits, trends, and ROI recommendations.'
    },
    {
      icon: TrendingUp,
      title: 'Strategic Recommender',
      desc: 'Continuous feedback agent providing adjustments, bid caps, and platform target suggestions.'
    },
    {
      icon: Bot,
      title: 'Agentic Reasoning Loop',
      desc: 'Go beyond templates. Our agents analyze data, reason about results, and generate actionable steps.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: '$49',
      features: ['2 Brand Profiles', '50 AI Copy Generations/mo', 'Basic CSV Data Uploads', 'Standard Email Support']
    },
    {
      name: 'Professional',
      price: '$149',
      isPopular: true,
      features: ['Unlimited Brand Profiles', 'Unlimited AI Generations', 'Advanced Data Insights with PDF Exports', 'Smart Recommendation Engine API', 'Priority 24/7 Slack Support']
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Custom LLM Fine-Tuning', 'Multi-user Teams & Permissions', 'Dedicated Account Analyst Agent', 'Custom SLA & Security Guarantees']
    }
  ];

  const faqs = [
    {
      q: "How does the AI grounding system work?",
      a: "By creating a Brand Profile (industry, target audience, tone of voice), our backend prompt system wraps all AI requests with this context, ensuring generated marketing copy aligns with your business goals."
    },
    {
      q: "What file formats does the Data Intelligence Analyzer support?",
      a: "We currently support standard CSV and JSON data exports from major marketing channels (Facebook Ads, Google Analytics, LinkedIn Campaign Manager). The analyzer parses the data in-memory for security."
    },
    {
      q: "Can I use CampaignCraft without a paid subscription?",
      a: "Yes! Creating an account gives you access to a free tier. You can also log in instantly using the 'Demo Marketer' account to test all premium features, campaigns, and analyzer tools."
    },
    {
      q: "Can I connect my own Google Gemini API keys?",
      a: "Absolutely. The backend checks for a custom API key in the environment configuration, enabling you to use your personal developer quota without restrictions."
    }
  ];

  return (
    <div className="w-full space-y-24 pb-20">
      {/* 1. HERO SECTION (limited to 65% height, interactive CTA, visual flow) */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-primary/20 via-brand-dark to-brand-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider animate-bounce">
            <Sparkles className="h-4.5 w-4.5" />
            <span>Autonomous Campaign Management is Here</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none max-w-4xl mx-auto">
            Craft Winning Marketing Campaigns <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">Powered by AI Agents</span>
          </h1>

          <p className="text-brand-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Ground your ad copies in brand voice, parse raw campaign analytics instantly, and get smart tactical optimization advice from agentic intelligence.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              to={isAuthenticated ? "/items/add" : "/register"}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-brand-primary text-white hover:bg-brand-primary/95 transition-all shadow-lg shadow-brand-primary/30 flex items-center justify-center gap-2 glow-btn text-base"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-slate-900 border border-white/10 hover:border-brand-secondary/40 text-white hover:bg-slate-800/80 transition-colors text-base"
            >
              Explore Templates
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 text-center bg-brand-card/25">
              <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">
                {s.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-brand-muted mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Built for High-Growth Teams
          </h2>
          <p className="text-brand-muted text-base max-w-xl mx-auto">
            Everything you need to automate content creation and audit analytics from a single unified command workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col h-full bg-brand-card/30 border border-white/5">
                <div className="h-12 w-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed flex-grow">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WORKFLOW / HIGHLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/5 bg-brand-card/25 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ground Copywriting Directly in Your Brand DNA
            </h2>
            <p className="text-brand-muted text-base leading-relaxed">
              Standard LLM writing models generate generic copy. CampaignCraft connects to your business profile to adapt keywords, brand voice, and industry parameters dynamically.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3 text-brand-muted">
                <CheckCircle className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <span>Specify custom guidelines (e.g. friendly, professional, witty, bold).</span>
              </li>
              <li className="flex items-center space-x-3 text-brand-muted">
                <CheckCircle className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <span>Choose format targets: Social Media, Newsletter, or Landing Pages.</span>
              </li>
              <li className="flex items-center space-x-3 text-brand-muted">
                <CheckCircle className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <span>Regenerate or extend responses on the fly.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                to={isAuthenticated ? "/generator" : "/login"}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-secondary text-brand-dark hover:bg-brand-secondary/90 transition-all font-bold shadow-md shadow-brand-secondary/10"
              >
                Launch Writing Assistant
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>
          {/* Visual card represent mockup */}
          <div className="space-y-4 bg-slate-950/60 p-6 rounded-2xl border border-white/5 font-mono text-xs text-brand-muted">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <span className="text-brand-primary font-bold flex items-center gap-1.5">
                <Bot className="h-4 w-4" /> Agentic_System_Log
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-white">&gt; Loading Grounding Parameters...</p>
            <p className="text-brand-secondary">&gt; Tone: Witty & Professional | Target: SaaS Developers</p>
            <p className="text-white">&gt; Compiling copy options (Length: 150 words)...</p>
            <div className="bg-slate-900 p-4 rounded border border-white/10 text-white leading-relaxed mt-2">
              <p className="font-bold text-sm text-brand-accent">🚀 Deploy Docker and Sip Coffee 🚀</p>
              <p className="mt-1">Tired of managing Kubernetes files at 2 AM? Our brand new agent orchestrates workloads automatically. Get 99.9% uptime without tearing your hair out.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">What Growth Teams Say</h2>
          <p className="text-brand-muted text-base max-w-md mx-auto">
            Trusted by marketing professionals, growth managers, and freelance copywriters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl bg-brand-card/35 border border-white/5 flex flex-col justify-between">
            <Quote className="h-8 w-8 text-brand-primary opacity-20 mb-4" />
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              "We uploaded our Facebook campaign performance sheets. Within seconds, CampaignCraft flagged two redundant ad groups and calculated CPC anomalies. We saved $1,200 in ad spend in week one."
            </p>
            <div>
              <p className="font-bold text-sm text-white">Sarah Jenkins</p>
              <p className="text-xs text-brand-secondary font-semibold">Growth Lead, PixelMedia</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl bg-brand-card/35 border border-white/5 flex flex-col justify-between">
            <Quote className="h-8 w-8 text-brand-primary opacity-20 mb-4" />
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              "Grounding writing prompts in brand profiles is a game changer. The outputs actually sound like they were written by our copy team rather than a generic chat engine."
            </p>
            <div>
              <p className="font-bold text-sm text-white">David Miller</p>
              <p className="text-xs text-brand-secondary font-semibold">Creative Director, Apex Copy</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl bg-brand-card/35 border border-white/5 flex flex-col justify-between">
            <Quote className="h-8 w-8 text-brand-primary opacity-20 mb-4" />
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              "The recommendations engine on our campaign dashboard is spot on. It gives exact bid caps and tells us where to adjust. Highly recommend the demo autofill login to try it out."
            </p>
            <div>
              <p className="font-bold text-sm text-white">Elena Rostova</p>
              <p className="text-xs text-brand-secondary font-semibold">Founder, GrowthFlow</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <HelpCircle className="h-8 w-8 text-brand-primary mx-auto mb-3" />
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpened = activeFaq === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/5 bg-brand-card/20 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpened ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-white hover:bg-slate-800/30 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-brand-secondary transition-transform duration-300 ${isOpened ? 'rotate-180' : ''}`} />
                </button>
                {isOpened && (
                  <div className="px-6 pb-5 pt-1 text-sm text-brand-muted leading-relaxed border-t border-white/5 bg-slate-900/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Transparent, Simple Pricing</h2>
          <p className="text-brand-muted text-base max-w-md mx-auto">
            Choose the workspace capability that matches your organization scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`glass-panel p-8 rounded-3xl border flex flex-col justify-between relative ${
                tier.isPopular 
                  ? 'border-brand-primary bg-brand-primary/5 shadow-lg shadow-brand-primary/5' 
                  : 'border-white/5 bg-brand-card/25'
              }`}
            >
              {tier.isPopular && (
                <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-brand-primary text-white text-[10px] uppercase font-bold tracking-wider">
                  Popular Choice
                </span>
              )}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-xs text-brand-muted">/month</span>}
                </div>
                <ul className="space-y-3 pt-6 border-t border-white/5">
                  {tier.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center space-x-2.5 text-brand-muted text-sm">
                      <CheckCircle className="h-4.5 w-4.5 text-brand-secondary flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  to={isAuthenticated ? "/items/add" : "/register"}
                  className={`w-full block text-center py-3 rounded-xl text-sm font-bold transition-all ${
                    tier.isPopular
                      ? 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md shadow-brand-primary/20'
                      : 'bg-slate-900 border border-white/10 text-white hover:bg-slate-800'
                  }`}
                >
                  Choose {tier.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/5 bg-gradient-to-br from-brand-card/50 to-brand-primary/5 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand-secondary/10 via-transparent to-transparent pointer-events-none" />
          <Bot className="h-10 w-10 text-brand-primary mx-auto" />
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Get Marketing Advice Delivered Directly
          </h2>
          <p className="text-brand-muted text-sm sm:text-base max-w-lg mx-auto">
            Stay up to date with AI agent strategy updates, prompt recipes, and marketing analytics guidelines.
          </p>
          <form 
            onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing to CampaignCraft alerts!"); }} 
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your professional email"
              className="flex-grow px-4 py-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl font-bold bg-brand-primary hover:bg-brand-primary/95 text-white transition-all text-sm flex-shrink-0 glow-btn"
            >
              Subscribe Updates
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
export default Landing;
