import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ShieldCheck } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Support');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name || !email || !message) {
      setError('Please fill out all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);
    // Simulate sending message API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 pt-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Contact Our Workspace
        </h1>
        <p className="text-brand-muted text-sm leading-relaxed">
          Have questions about connecting custom LLM keys, enterprise features, or data parsing schemas? Reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Details (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-brand-card/25">
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white pb-2 border-b border-white/5">Corporate Office</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-brand-muted">
                <MapPin className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <span>100 AI Innovation Boulevard, Suite 500, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-brand-muted">
                <Phone className="h-4 w-4 text-brand-secondary flex-shrink-0" />
                <span>+1 (555) 309-1229</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-brand-muted">
                <Mail className="h-4 w-4 text-brand-secondary flex-shrink-0" />
                <span>support@campaigncraft.ai</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 text-xs space-y-2 text-brand-muted leading-relaxed">
            <h4 className="font-bold text-white flex items-center gap-1">
              <HelpCircle className="h-4 w-4 text-brand-primary" />
              Need Immediate Access?
            </h4>
            <p>
              Use the autofill option on the login screen to access the full workspace, upload test files, and run copywriting drafts immediately.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form (8 cols) */}
        <div className="lg:col-span-8">
          <form className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-brand-card/25 space-y-5 h-full flex flex-col justify-between" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white pb-2 border-b border-white/5">Send Us a Message</h2>
              
              {error && (
                <div className="p-3.5 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-semibold">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3.5 rounded-xl bg-brand-secondary/15 border border-brand-secondary/35 text-brand-secondary text-xs font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Your message has been sent successfully. Our team will contact you shortly!
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(null); }}
                    placeholder="John Doe"
                    className="block w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(null); }}
                    placeholder="name@company.com"
                    className="block w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                  Subject Scope
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="block w-full px-3 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-primary cursor-pointer"
                >
                  <option value="General Support">General Support & Accounts</option>
                  <option value="Billing">Billing & Subscription Tiers</option>
                  <option value="AI Engine Integration">AI Engine Integration & Custom Keys</option>
                  <option value="Enterprise Solutions">Enterprise Teams & SLAs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                  Detailed Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); setError(null); }}
                  placeholder="Explain your inquiry in detail here..."
                  className="block w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-brand-primary hover:bg-brand-primary/95 text-white transition-all shadow-md shadow-brand-primary/20 focus:outline-none glow-btn mt-4"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="h-4.5 w-4.5" />
                  Submit Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
