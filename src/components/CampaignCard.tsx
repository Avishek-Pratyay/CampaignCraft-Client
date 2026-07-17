import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, Target, Award, ArrowUpRight } from 'lucide-react';

interface CampaignCardProps {
  campaign: {
    _id: string;
    title: string;
    shortDescription: string;
    budget: number;
    channels: string[];
    launchDate: string | Date;
    status: string;
    conversions: number;
  };
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const formattedDate = new Date(campaign.launchDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Generate a premium dynamic background gradient using the title length or string hash
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'Planning':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Paused':
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
      default:
        return 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20';
    }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-white/5 bg-brand-card/40">
      {/* Aspect visual cover instead of static raw placeholders */}
      <div className={`h-40 w-full bg-gradient-to-br ${getGradient(campaign.title)} p-6 flex flex-col justify-between relative`}>
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
        <div className="flex justify-between items-start z-10">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getStatusStyle(campaign.status)}`}>
            {campaign.status}
          </span>
          <div className="flex space-x-1">
            {campaign.channels.slice(0, 3).map((ch, idx) => (
              <span key={idx} className="bg-black/40 text-[10px] text-white px-2 py-0.5 rounded-full font-medium border border-white/10">
                {ch}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-white z-10">
          <Target className="h-5 w-5 opacity-80" />
          <span className="font-extrabold text-sm uppercase tracking-widest opacity-90">CAMPAIGN LOG</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-brand-secondary transition-colors">
          {campaign.title}
        </h3>
        <p className="text-brand-muted text-sm line-clamp-2 leading-relaxed mb-4 flex-grow">
          {campaign.shortDescription}
        </p>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-3 mb-5 border-t border-white/5 pt-4">
          <div className="flex items-center space-x-2 text-brand-muted text-xs">
            <DollarSign className="h-4 w-4 text-brand-secondary flex-shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Budget</p>
              <p className="font-semibold text-white">${campaign.budget.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-brand-muted text-xs">
            <Calendar className="h-4 w-4 text-brand-primary flex-shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Launch Date</p>
              <p className="font-semibold text-white">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-brand-muted text-xs col-span-2">
            <Award className="h-4 w-4 text-brand-accent flex-shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Conversions</p>
              <p className="font-semibold text-white">{campaign.conversions.toLocaleString()} leads</p>
            </div>
          </div>
        </div>

        {/* View Details CTA */}
        <Link
          to={`/explore/${campaign._id}`}
          className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-brand-primary text-sm font-semibold hover:bg-slate-800 text-white transition-all shadow-sm"
        >
          View Details
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
export default CampaignCard;
