import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Sparkles, FolderPlus, PlusCircle, Compass, ShieldAlert } from 'lucide-react';

interface BrandProfile {
  _id: string;
  name: string;
  industry: string;
}

export const AddCampaign: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [launchDate, setLaunchDate] = useState('');
  const [status, setStatus] = useState('Planning');
  const [brandProfileId, setBrandProfileId] = useState('');

  // Brand profile list
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [isCreatingBrand, setIsCreatingBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandIndustry, setNewBrandIndustry] = useState('');
  const [newBrandAudience, setNewBrandAudience] = useState('');
  const [newBrandTone, setNewBrandTone] = useState('Professional');
  const [newBrandGoals, setNewBrandGoals] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const channelsList = ['Google Ads', 'Meta Ads', 'LinkedIn', 'Twitter', 'YouTube', 'Email'];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const fetchBrands = async () => {
    try {
      const response = await axios.get('/api/brands');
      setBrands(response.data);
      if (response.data.length > 0) {
        setBrandProfileId(response.data[0]._id);
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

  const handleChannelToggle = (ch: string) => {
    if (selectedChannels.includes(ch)) {
      setSelectedChannels(selectedChannels.filter((c) => c !== ch));
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleCreateBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName || !newBrandIndustry || !newBrandAudience || !newBrandGoals) {
      setFormError('Please fill out all brand profile details.');
      return;
    }

    try {
      const response = await axios.post('/api/brands', {
        name: newBrandName,
        industry: newBrandIndustry,
        targetAudience: newBrandAudience,
        voiceTone: newBrandTone,
        goals: newBrandGoals
      });
      setBrands([...brands, response.data]);
      setBrandProfileId(response.data._id);
      setIsCreatingBrand(false);
      // Reset brand fields
      setNewBrandName('');
      setNewBrandIndustry('');
      setNewBrandAudience('');
      setNewBrandGoals('');
      setFormError(null);
    } catch (error) {
      console.error('Error creating brand profile:', error);
      setFormError('Could not save brand profile.');
    }
  };

  const handleSubmitCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !shortDescription || !fullDescription || !budget || !launchDate) {
      setFormError('Please fill out all required campaign fields.');
      return;
    }

    if (selectedChannels.length === 0) {
      setFormError('Please select at least one marketing channel.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      await axios.post('/api/campaigns', {
        title,
        shortDescription,
        fullDescription,
        budget: parseFloat(budget),
        channels: selectedChannels,
        launchDate,
        status,
        brandProfileId: brandProfileId || undefined
      });
      navigate('/items/manage');
    } catch (error: any) {
      console.error('Error launching campaign:', error);
      setFormError(error.response?.data?.message || 'Error launching campaign. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <FolderPlus className="h-8 w-8 text-brand-primary" />
          Launch New Campaign
        </h1>
        <p className="text-brand-muted text-sm">
          Set up budgets, flight dates, target channels, and ground it in a brand context.
        </p>
      </div>

      {formError && (
        <div className="p-4 rounded-xl bg-brand-accent/10 border border-brand-accent/25 flex items-start space-x-3 text-brand-accent text-sm">
          <ShieldAlert className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Execution Error</p>
            <p className="text-xs text-brand-muted mt-0.5">{formError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (8 cols) */}
        <form className="lg:col-span-8 space-y-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-brand-card/25" onSubmit={handleSubmitCampaign}>
          <h2 className="text-xl font-bold text-white">Campaign Details</h2>
          
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Campaign Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => { setTitle(e.target.value); setFormError(null); }}
                placeholder="e.g. Q3 SaaS Expansion Ads"
                className="block w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>

            {/* Short description */}
            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Short Catchy Summary
              </label>
              <input
                type="text"
                required
                value={shortDescription}
                onChange={(e) => { setShortDescription(e.target.value); setFormError(null); }}
                placeholder="e.g. Scale registrations by 25% with automated custom target channels."
                className="block w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>

            {/* Full description */}
            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Full Description & Brief
              </label>
              <textarea
                required
                rows={4}
                value={fullDescription}
                onChange={(e) => { setFullDescription(e.target.value); setFormError(null); }}
                placeholder="Write target parameters, ad copy guidelines, and primary KPI expectations here..."
                className="block w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none"
              />
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                  Budget ($ USD)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={budget}
                  onChange={(e) => { setBudget(e.target.value); setFormError(null); }}
                  placeholder="5000"
                  className="block w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                  Launch Flight Date
                </label>
                <input
                  type="date"
                  required
                  value={launchDate}
                  onChange={(e) => { setLaunchDate(e.target.value); setFormError(null); }}
                  className="block w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Initial Status
              </label>
              <div className="flex gap-4">
                {['Planning', 'Active'].map((st) => (
                  <label key={st} className="flex items-center space-x-2 text-sm text-brand-muted cursor-pointer hover:text-white">
                    <input
                      type="radio"
                      name="status"
                      value={st}
                      checked={status === st}
                      onChange={() => setStatus(st)}
                      className="text-brand-primary focus:ring-brand-primary border-white/10 bg-slate-900 h-4 w-4"
                    />
                    <span>{st}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Channels MultiSelect */}
            <div>
              <label className="block text-xs font-bold uppercase text-brand-muted mb-1.5">
                Target Marketing Channels
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {channelsList.map((ch, idx) => {
                  const isChecked = selectedChannels.includes(ch);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChannelToggle(ch)}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        isChecked
                          ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-sm shadow-brand-primary/5'
                          : 'bg-slate-900 border-white/10 hover:border-white/20 text-brand-muted'
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-brand-primary hover:bg-brand-primary/95 text-white transition-all shadow-md shadow-brand-primary/20 focus:outline-none glow-btn"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <PlusCircle className="h-4.5 w-4.5" />
                Launch Campaign Dashboard
              </>
            )}
          </button>
        </form>

        {/* Right Form: Brand Grounding Context (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-brand-card/25 space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Compass className="h-4.5 w-4.5 text-brand-secondary animate-spin" style={{ animationDuration: '6s' }} />
              AI Grounding Context
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Linking a Brand Profile provides target demographics and voice tones to customize optimization advice.
            </p>

            {!isCreatingBrand ? (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5">
                    Select Brand Profile
                  </label>
                  {brands.length === 0 ? (
                    <p className="text-xs text-brand-muted italic">No brand profiles found.</p>
                  ) : (
                    <select
                      value={brandProfileId}
                      onChange={(e) => setBrandProfileId(e.target.value)}
                      className="block w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-secondary cursor-pointer"
                    >
                      {brands.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.name} ({b.industry})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreatingBrand(true)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 border border-white/10 hover:bg-slate-800 text-white transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-brand-secondary" />
                  Create New Brand Profile
                </button>
              </div>
            ) : (
              <form className="space-y-3 pt-2" onSubmit={handleCreateBrand}>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="e.g. Acme Tech"
                    className="block w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-secondary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    required
                    value={newBrandIndustry}
                    onChange={(e) => setNewBrandIndustry(e.target.value)}
                    placeholder="e.g. Cloud SaaS"
                    className="block w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-secondary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    required
                    value={newBrandAudience}
                    onChange={(e) => setNewBrandAudience(e.target.value)}
                    placeholder="e.g. DevOps Leads & IT directors"
                    className="block w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-secondary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Voice Tone
                    </label>
                    <select
                      value={newBrandTone}
                      onChange={(e) => setNewBrandTone(e.target.value)}
                      className="block w-full px-2 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-secondary"
                    >
                      <option value="Professional">Professional</option>
                      <option value="Witty & Bold">Witty & Bold</option>
                      <option value="Friendly">Friendly</option>
                      <option value="Direct">Direct</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Goals
                    </label>
                    <input
                      type="text"
                      required
                      value={newBrandGoals}
                      onChange={(e) => setNewBrandGoals(e.target.value)}
                      placeholder="e.g. Generate leads"
                      className="block w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { setIsCreatingBrand(false); setFormError(null); }}
                    className="w-1/2 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-brand-muted hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 rounded-xl bg-brand-secondary text-brand-dark hover:bg-brand-secondary/90 text-xs font-bold"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
export default AddCampaign;
