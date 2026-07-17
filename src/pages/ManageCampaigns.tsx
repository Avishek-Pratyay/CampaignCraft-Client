import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Trash2, Eye, Calendar, DollarSign, Target, Settings, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Campaign {
  _id: string;
  title: string;
  shortDescription: string;
  budget: number;
  channels: string[];
  launchDate: string;
  status: string;
  conversions: number;
}

export const ManageCampaigns: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const fetchUserCampaigns = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get('/api/campaigns');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching user campaigns:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserCampaigns();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/campaigns/${id}`);
      setCampaigns(campaigns.filter((c) => c._id !== id));
      setDeleteTargetId(null);
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Failed to delete campaign. Please try again.');
    }
  };

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Settings className="h-8 w-8 text-brand-primary" />
            Manage Campaigns
          </h1>
          <p className="text-brand-muted text-sm">
            Overview table listing all campaign assets. View charts, optimize strategies, or remove elements.
          </p>
        </div>
        <Link
          to="/items/add"
          className="px-5 py-2.5 rounded-xl font-bold bg-brand-primary hover:bg-brand-primary/95 text-white text-sm shadow-md shadow-brand-primary/20 glow-btn"
        >
          Launch New Campaign
        </Link>
      </div>

      {/* Main Container */}
      {isFetching ? (
        <div className="space-y-4 text-center py-20">
          <div className="h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-brand-muted">Fetching campaign logs...</p>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-white/5 bg-brand-card/15 space-y-4">
          <ShieldCheck className="h-10 w-10 text-brand-secondary mx-auto opacity-50" />
          <h3 className="text-lg font-bold text-white">No campaigns found</h3>
          <p className="text-brand-muted text-sm max-w-sm mx-auto">
            You haven't launched any campaign dashboards yet. Create one to ground your analytics report!
          </p>
          <Link
            to="/items/add"
            className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-secondary text-brand-dark hover:bg-brand-secondary/90 transition-all shadow-md"
          >
            Launch First Campaign
          </Link>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden bg-brand-card/15">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 font-bold uppercase text-[10px] tracking-wider bg-slate-950/40">
                  <th className="py-4 px-6">Campaign Info</th>
                  <th className="py-4 px-6">Flight Date</th>
                  <th className="py-4 px-6">Budget</th>
                  <th className="py-4 px-6">Lead Conversions</th>
                  <th className="py-4 px-6">Channels</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {campaigns.map((camp) => (
                  <tr key={camp._id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="py-4.5 px-6">
                      <div className="font-bold text-white text-base">{camp.title}</div>
                      <div className="text-brand-muted text-xs line-clamp-1 mt-0.5 max-w-xs">{camp.shortDescription}</div>
                      <span className={`inline-block px-2 py-0.5 text-[9px] font-bold rounded-full uppercase mt-2 ${
                        camp.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="py-4.5 px-6 text-brand-muted font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-brand-primary" />
                        {new Date(camp.launchDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="py-4.5 px-6 font-bold text-white">
                      <div className="flex items-center gap-0.5">
                        <DollarSign className="h-4 w-4 text-brand-secondary" />
                        {(camp.budget || 0).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4.5 px-6 font-semibold text-white">
                      <div className="flex items-center gap-1.5">
                        <Target className="h-4 w-4 text-brand-accent" />
                        {(camp.conversions || 0).toLocaleString()} leads
                      </div>
                    </td>
                    <td className="py-4.5 px-6">
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {camp.channels.map((ch, idx) => (
                          <span key={idx} className="bg-slate-900 border border-white/5 text-[9px] px-1.5 py-0.5 rounded text-brand-muted">
                            {ch}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4.5 px-6 text-center">
                      <div className="flex justify-center items-center gap-2">
                        {/* View Action */}
                        <Link
                          to={`/explore/${camp._id}`}
                          className="flex items-center justify-center p-2 rounded-lg bg-slate-900 border border-white/10 text-brand-secondary hover:bg-slate-800 transition-colors"
                          title="View Campaign Dashboard"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </Link>
                        
                        {/* Delete Action */}
                        <button
                          onClick={() => setDeleteTargetId(camp._id)}
                          className="flex items-center justify-center p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/20 text-brand-accent hover:bg-brand-accent/20 transition-colors"
                          title="Delete Campaign"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Overlay Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-md w-full glass-panel p-6 rounded-3xl border border-brand-accent/20 bg-brand-dark/95 space-y-6">
            <div className="flex items-center space-x-3 text-brand-accent">
              <AlertTriangle className="h-6 w-6 animate-bounce" />
              <h3 className="text-lg font-bold">Delete Campaign Dashboard?</h3>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed">
              Are you sure you want to delete this campaign? This action is irreversible and will purge all associated analytical history and recommendations from our servers.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-brand-muted hover:text-white"
              >
                Cancel, Keep
              </button>
              <button
                onClick={() => deleteTargetId && handleDelete(deleteTargetId)}
                className="w-1/2 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-xs font-bold text-white"
              >
                Yes, Delete Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageCampaigns;
