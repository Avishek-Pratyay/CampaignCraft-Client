import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Bot, Sparkles, BookOpen, Copy, RotateCcw, Compass, ArrowRight, Settings2 } from 'lucide-react';

interface BrandProfile {
  _id: string;
  name: string;
  industry: string;
}

export const ContentGenerator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [brandProfileId, setBrandProfileId] = useState('');
  const [template, setTemplate] = useState('Social Media Post');
  const [length, setLength] = useState('medium');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);

  // Track mounted state to prevent state updates after unmount
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const fetchBrands = async () => {
    try {
      const response = await axios.get('/api/brands');
      if (isMounted.current) {
        const data = Array.isArray(response.data) ? response.data : [];
        setBrands(data);
        if (data.length > 0) {
          setBrandProfileId(data[0]._id);
        }
      }
    } catch (error) {
      console.error('Error fetching brand profiles:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBrands();
    }
  }, [isAuthenticated]);

  // Sequential log appender using async/await — no setInterval race conditions
  const appendLogsSequentially = async (logs: string[]) => {
    if (!isMounted.current) return;
    setAgentLogs([]);
    for (const log of logs) {
      if (!isMounted.current) return;
      await new Promise<void>(resolve => setTimeout(resolve, 500));
      if (!isMounted.current) return;
      setAgentLogs(prev => [...prev, log]);
    }
  };

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGeneratedText('');
    setAgentLogs([]);

    const selectedBrand = brands.find(b => b._id === brandProfileId);
    const logSequence = [
      '> Initializing Content Generation Agent...',
      `> Grounding context with brand: ${selectedBrand?.name || 'General Default'}`,
      `> Injecting copywriting template: ${template}`,
      `> Setting length requirements: ${length.toUpperCase()}`,
      `> Contacting LLM Reasoning Engine...`
    ];

    try {
      // Show logs and wait simultaneously with the API call
      const [_, response] = await Promise.all([
        appendLogsSequentially(logSequence),
        axios.post('/api/ai/generate-copy', {
          brandProfileId: brandProfileId || undefined,
          template,
          length,
          additionalInstructions
        })
      ]);

      if (!isMounted.current) return;

      const text = response?.data?.text;
      if (typeof text === 'string' && text.length > 0) {
        setGeneratedText(text);
        setAgentLogs(prev => [...prev, '> Success! Content generated and rendered.']);
      } else {
        setGeneratedText('The AI agent returned an unexpected response. Please try again.');
        setAgentLogs(prev => [...prev, '> Warning: Unexpected response format.']);
      }
    } catch (error: any) {
      console.error('Error generating content:', error);
      if (isMounted.current) {
        const msg = error?.response?.data?.message || 'Error contacting AI writer agent. Please try again.';
        setGeneratedText(msg);
        setAgentLogs(prev => [...prev, `> Error: ${msg}`]);
      }
    } finally {
      if (isMounted.current) {
        setIsGenerating(false);
      }
    }
  };

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText).catch(() => {
      // Fallback for browsers that block clipboard
      const ta = document.createElement('textarea');
      ta.value = generatedText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
    setCopied(true);
    setTimeout(() => { if (isMounted.current) setCopied(false); }, 2000);
  };

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const templatesList = ['Social Media Post', 'Email Newsletter', 'Blog Article', 'Ad Variants'];
  // Allow generation even when no brand profile exists (use general context)
  const canGenerate = !isGenerating;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-brand-primary" />
          AI Copywriting Engine
        </h1>
        <p className="text-brand-muted text-sm">
          Write custom marketing content grounded in your brand identity and goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-brand-card/25 space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
              <Settings2 className="h-4.5 w-4.5 text-brand-primary" />
              Generator Parameters
            </h2>

            {/* Brand Grounding Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-brand-muted">
                Grounding Brand Profile
              </label>
              {brands.length === 0 ? (
                <div className="p-3 bg-slate-900 border border-white/5 rounded-xl text-xs space-y-2">
                  <p className="text-brand-muted">No brand profile yet — generating with general context.</p>
                  <button
                    onClick={() => navigate('/items/add')}
                    className="text-brand-secondary hover:underline font-semibold flex items-center gap-1"
                  >
                    Set up a Brand Profile <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <select
                  value={brandProfileId}
                  onChange={(e) => setBrandProfileId(e.target.value)}
                  className="block w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-primary cursor-pointer"
                >
                  <option value="">None (General Context)</option>
                  {brands.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name} ({b.industry})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Template Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-brand-muted">
                Content Format / Template
              </label>
              <div className="grid grid-cols-2 gap-2">
                {templatesList.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTemplate(t)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      template === t
                        ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                        : 'bg-slate-900 border-white/10 hover:border-white/20 text-brand-muted'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Length parameter */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-brand-muted">
                Target Copy Length
              </label>
              <div className="flex gap-2">
                {['short', 'medium', 'long'].map((ln) => (
                  <button
                    key={ln}
                    type="button"
                    onClick={() => setLength(ln)}
                    className={`w-1/3 py-2 rounded-xl border text-xs font-bold capitalize transition-all ${
                      length === ln
                        ? 'bg-brand-secondary/15 border-brand-secondary text-brand-secondary'
                        : 'bg-slate-900 border-white/10 hover:border-white/20 text-brand-muted'
                    }`}
                  >
                    {ln}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional custom guidelines */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase text-brand-muted">
                Keywords & Special Instructions
              </label>
              <textarea
                rows={3}
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="e.g. Include pricing details of $19/mo. Keep sentences short. Use emojis."
                className="block w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-brand-primary hover:bg-brand-primary/95 text-white transition-all shadow-md shadow-brand-primary/20 focus:outline-none glow-btn disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Bot className="h-4.5 w-4.5" />
              {isGenerating ? 'Generating...' : 'Generate Marketing Copy'}
            </button>
          </div>
        </div>

        {/* Right Output Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Agent Operations Log */}
          {agentLogs.length > 0 && (
            <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/60 font-mono text-[11px] text-brand-muted space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-white text-[10px] uppercase pb-1 border-b border-white/5 mb-2">
                <Compass className="h-3.5 w-3.5 text-brand-primary animate-spin" />
                <span>Agent Operations Trace</span>
              </div>
              {agentLogs.map((log, idx) => (
                <div key={idx} className={log.startsWith('> Success') ? 'text-brand-secondary' : log.startsWith('> Error') ? 'text-brand-accent' : 'text-white/80'}>
                  {log}
                </div>
              ))}
            </div>
          )}

          {/* Core Copy Output Canvas */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-brand-card/25 space-y-5 min-h-[350px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5 text-brand-secondary" />
                  Generated Output Preview
                </h3>
                {typeof generatedText === 'string' && generatedText.length > 0 && (
                  <span className="text-[10px] font-bold text-brand-muted uppercase bg-slate-900 border border-white/5 px-2.5 py-1 rounded-full">
                    {generatedText.trim().split(/\s+/).length} Words
                  </span>
                )}
              </div>

              {isGenerating ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3">
                  <div className="h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-brand-muted font-semibold">Generating copywriting nodes...</p>
                </div>
              ) : !generatedText ? (
                <div className="py-20 text-center text-brand-muted space-y-2">
                  <Sparkles className="h-8 w-8 mx-auto opacity-30 animate-pulse" />
                  <p className="text-sm font-semibold">Copywriter Canvas is Empty</p>
                  <p className="text-xs">Adjust your parameters and trigger 'Generate Marketing Copy' to begin.</p>
                </div>
              ) : (
                <div className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 text-sm sm:text-base leading-relaxed text-white whitespace-pre-line select-text">
                  {generatedText}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            {generatedText && !isGenerating && (
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-white/10 hover:border-brand-primary text-brand-muted hover:text-white transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Regenerate
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-primary hover:bg-brand-primary/95 text-white transition-all shadow-md shadow-brand-primary/10"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
export default ContentGenerator;
