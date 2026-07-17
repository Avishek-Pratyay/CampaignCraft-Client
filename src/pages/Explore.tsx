import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import CampaignCard from '../components/CampaignCard';
import { SkeletonGrid } from '../components/SkeletonLoader';

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

export const Explore: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [channel, setChannel] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const channelsList = ['Google Ads', 'Meta Ads', 'LinkedIn', 'Twitter', 'YouTube', 'Email'];

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/campaigns/public', {
        params: {
          search,
          status,
          channel,
          sortBy,
          page,
          limit: 8
        }
      });
      setCampaigns(response.data.campaigns);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error loading public campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset to page 1 when search or filters change
    setPage(1);
  }, [search, status, channel, sortBy]);

  useEffect(() => {
    fetchCampaigns();
  }, [page, search, status, channel, sortBy]);

  const handleClearFilters = () => {
    setSearch('');
    setStatus('');
    setChannel('');
    setSortBy('');
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Explore Campaigns
        </h1>
        <p className="text-brand-muted text-sm max-w-xl">
          Browse real-time active, planning, and historic campaigns managed by our agent workspace.
        </p>
      </div>

      {/* Filter and Search Container */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-brand-card/25 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search bar */}
          <div className="relative md:col-span-4">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
              <Search className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="block w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="relative md:col-span-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full px-3 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-primary appearance-none cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-brand-muted">
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Channel Filter */}
          <div className="relative md:col-span-2">
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="block w-full px-3 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-primary appearance-none cursor-pointer"
            >
              <option value="">All Channels</option>
              {channelsList.map((ch, idx) => (
                <option key={idx} value={ch}>{ch}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-brand-muted">
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Sorting */}
          <div className="relative md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full px-3 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-primary appearance-none cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="budget_asc">Budget: Low to High</option>
              <option value="budget_desc">Budget: High to Low</option>
              <option value="conversions">Most Conversions</option>
              <option value="title">Campaign Name</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-brand-muted">
              <ArrowUpDown className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Reset Filters */}
          <div className="md:col-span-2">
            <button
              onClick={handleClearFilters}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-sm font-semibold bg-slate-900 border border-white/10 hover:bg-slate-800 text-brand-muted hover:text-white transition-all"
            >
              <X className="h-4 w-4" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Count */}
      <div className="flex items-center justify-between text-xs text-brand-muted font-bold uppercase tracking-wider">
        <span>Found {total} Campaigns</span>
        <span>Page {page} of {totalPages}</span>
      </div>

      {/* Grid listing */}
      {isLoading ? (
        <SkeletonGrid count={8} />
      ) : campaigns.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-white/5 bg-brand-card/15 space-y-4">
          <SlidersHorizontal className="h-10 w-10 text-brand-primary mx-auto opacity-40" />
          <h3 className="text-lg font-bold text-white">No Campaigns Match Your Search</h3>
          <p className="text-brand-muted text-sm max-w-sm mx-auto">
            Try adjusting your search criteria or clear filters to view all entries.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-primary hover:bg-brand-primary/90 text-white transition-all shadow-md shadow-brand-primary/10"
          >
            Show All Campaigns
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaigns.map((camp) => (
            <CampaignCard key={camp._id} campaign={camp} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-bold text-brand-muted px-2">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};
export default Explore;
