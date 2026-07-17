import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, 
  DollarSign, 
  Target, 
  BarChart3, 
  Award, 
  ChevronRight, 
  AlertTriangle,
  Bot,
  Compass,
  Zap
} from 'lucide-react';
import CampaignCard from '../components/CampaignCard';
import DataVisualizer from '../components/DataVisualizer';

interface Campaign {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  budget: number;
  channels: string[];
  launchDate: string;
  status: string;
  cpc: number;
  conversions: number;
  ctr: number;
  impressions: number;
  clicks: number;
  brandProfile?: {
    name: string;
    industry: string;
    targetAudience: string;
    voiceTone: string;
    goals: string;
  };
}

interface Recommendation {
  title: string;
  impact: string;
  description: string;
  action: string;
}

export const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [related, setRelated] = useState<Campaign[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAIRecommendationsLoading, setIsAIRecommendationsLoading] = useState(false);

  const fetchCampaignDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/campaigns/public/${id}`);
      setCampaign(response.data.campaign);
      setRelated(response.data.related);
      
      // Immediately fetch AI Recommendations
      fetchAIRecommendations(response.data.campaign._id);
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIRecommendations = async (campId: string) => {
    setIsAIRecommendationsLoading(true);
    try {
      const token = localStorage.getItem('cc_token');
      // Pass JWT if available, else endpoint fallback handles gracefully
      const response = await axios.post('/api/ai/recommendations', { campaignId: campId }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
    } finally {
      setIsAIRecommendationsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignDetails();
  }, [id]);

  if (isLoading || !campaign) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-brand-muted text-sm font-semibold">Loading campaign dashboard metrics...</p>
        </div>
      </div>
    );
  }

  // Visual header gradient selection
  const getGradient = (title: string) => {
    const code = title.charCodeAt(0) || 0;
    const gradients = [
      'from-violet-600 to-indigo-600',
      'from-teal-500 to-emerald-600',
      'from-rose-500 to-pink-600',
      'from-cyan-500 to-blue-600',
      'from-amber-500 to-orange-600',
    ];
    return gradients[code % gradients.length];
  };

  // Mock historic campaign chart timeline data based on core metrics
  const chartTimelineData = Array.from({ length: 7 }).map((_, idx) => {
    const multiplier = 0.6 + (idx * 0.15) + (Math.random() * 0.2);
    const dayDate = new Date(campaign.launchDate);
    dayDate.setDate(dayDate.getDate() + idx);
    
    return {
      date: dayDate.toISOString(),
      channel: campaign.channels[idx % campaign.channels.length] || 'Google Ads',
      spend: parseFloat(((campaign.budget / 28) * multiplier).toFixed(2)),
      imps: Math.floor((campaign.impressions / 7) * multiplier),
      clicks: Math.floor((campaign.clicks / 7) * multiplier),
      convs: Math.floor((campaign.conversions / 7) * multiplier)
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-muted">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-brand-secondary">{campaign.title}</span>
      </div>

      {/* Hero Visual Panel */}
      <div className={`rounded-3xl p-8 bg-gradient-to-r ${getGradient(campaign.title)} relative overflow-hidden flex flex-col justify-between min-h-[250px] shadow-xl border border-white/10`}>
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
        <div className="flex justify-between items-start z-10">
          <span className="px-3.5 py-1 text-xs font-extrabold bg-black/40 text-white rounded-full border border-white/10 uppercase tracking-widest">
            {campaign.status}
          </span>
          <div className="flex gap-2">
            {campaign.channels.map((ch, idx) => (
              <span key={idx} className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10">
                {ch}
              </span>
            ))}
          </div>
        </div>

        <div className="z-10 mt-12 space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {campaign.title}
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl font-medium">
            {campaign.shortDescription}
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Details & Specs (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Detailed Overview */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-brand-card/25 space-y-4">
            <h2 className="text-xl font-extrabold text-white">Campaign Overview</h2>
            <p className="text-brand-muted text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {campaign.fullDescription}
            </p>
            
            {campaign.brandProfile && (
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary text-xs font-bold uppercase tracking-wider">
                  <Compass className="h-4 w-4" />
                  <span>Grounded Brand Target</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                  <div>
                    <span className="font-bold text-slate-500 uppercase">Brand Profile:</span>
                    <p className="font-semibold text-white text-sm mt-0.5">{campaign.brandProfile.name}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 uppercase">Industry Focus:</span>
                    <p className="font-semibold text-white text-sm mt-0.5">{campaign.brandProfile.industry}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 uppercase">Target Audience:</span>
                    <p className="font-semibold text-white text-sm mt-0.5">{campaign.brandProfile.targetAudience}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 uppercase">Voice and Tone:</span>
                    <p className="font-semibold text-white text-sm mt-0.5 capitalize">{campaign.brandProfile.voiceTone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Performance Data Trends */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-brand-card/25 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-brand-primary" />
                Performance Dynamics
              </h2>
              <span className="text-xs font-bold text-brand-muted uppercase">7-Day Historic View</span>
            </div>
            <div className="pt-4">
              <DataVisualizer data={chartTimelineData} />
            </div>
          </div>
        </div>

        {/* Right Column: Specifications & AI Recommendations (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Specifications List */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-brand-card/25 space-y-6">
            <h3 className="text-lg font-extrabold text-white pb-3 border-b border-white/5">
              Campaign Specifications
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-muted flex items-center gap-1.5">
                  <DollarSign className="h-4.5 w-4.5 text-brand-secondary" /> Budget
                </span>
                <span className="font-bold text-white">${campaign.budget.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-muted flex items-center gap-1.5">
                  <Calendar className="h-4.5 w-4.5 text-brand-primary" /> Launch Date
                </span>
                <span className="font-bold text-white">
                  {new Date(campaign.launchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-muted flex items-center gap-1.5">
                  <Target className="h-4.5 w-4.5 text-brand-secondary" /> Impressions
                </span>
                <span className="font-bold text-white">{campaign.impressions.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-muted flex items-center gap-1.5">
                  <Award className="h-4.5 w-4.5 text-brand-accent" /> Conversions
                </span>
                <span className="font-bold text-white">{campaign.conversions.toLocaleString()} leads</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-muted flex items-center gap-1.5">
                  <Zap className="h-4.5 w-4.5 text-brand-primary" /> Click-Through Rate
                </span>
                <span className="font-bold text-white">{campaign.ctr}%</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-muted flex items-center gap-1.5">
                  <DollarSign className="h-4.5 w-4.5 text-brand-secondary" /> Average CPC
                </span>
                <span className="font-bold text-white">${campaign.cpc}</span>
              </div>
            </div>
          </div>

          {/* AI Strategy Advisor (AI Recommendations) */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-brand-card/70 to-brand-primary/5 space-y-5">
            <div className="flex items-center space-x-2 text-white">
              <Bot className="h-5 w-5 text-brand-primary animate-pulse" />
              <h3 className="text-base font-extrabold">Smart Agent Recommendations</h3>
            </div>
            
            {isAIRecommendationsLoading ? (
              <div className="space-y-3 py-4 text-center">
                <div className="h-6 w-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-brand-muted font-semibold">Consulting optimization agent...</p>
              </div>
            ) : recommendations.length === 0 ? (
              <div className="text-center py-4 space-y-2 border border-dashed border-white/10 rounded-2xl p-4 bg-slate-950/20">
                <AlertTriangle className="h-5 w-5 text-brand-accent mx-auto" />
                <p className="text-xs font-bold text-white">Recommendations Unavailable</p>
                <p className="text-[11px] text-brand-muted">Please log in as a marketer to activate strategic recommendations.</p>
                <Link to="/login" className="inline-block text-xs font-bold text-brand-secondary hover:underline pt-1">
                  Login Workspace
                </Link>
              </div>
            ) : (
              <div className="space-y-4.5">
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-slate-950/50 p-4 rounded-2xl border border-white/5 text-xs space-y-2 hover:border-brand-primary/30 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-sm">{rec.title}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        rec.impact === 'High' 
                          ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20' 
                          : 'bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20'
                      }`}>
                        {rec.impact} Impact
                      </span>
                    </div>
                    <p className="text-brand-muted leading-relaxed">{rec.description}</p>
                    <div className="pt-1.5 border-t border-white/5 flex items-center gap-1">
                      <span className="font-bold text-slate-500 uppercase text-[9px]">Action:</span>
                      <span className="font-semibold text-brand-secondary">{rec.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Related Campaigns Grid */}
      {related.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-white/5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Related Campaigns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((camp) => (
              <CampaignCard key={camp._id} campaign={camp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default CampaignDetails;
