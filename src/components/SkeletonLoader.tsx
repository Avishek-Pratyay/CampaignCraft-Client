import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-white/5 bg-brand-card/20 animate-pulse">
      {/* Visual aspect cover placeholder */}
      <div className="h-40 w-full bg-slate-800/40 relative" />

      {/* Card body placeholder */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        {/* Title skeleton */}
        <div className="h-5 bg-slate-800/60 rounded-md w-3/4" />

        {/* Short description skeleton */}
        <div className="space-y-2">
          <div className="h-3.5 bg-slate-800/50 rounded-md w-full" />
          <div className="h-3.5 bg-slate-800/50 rounded-md w-5/6" />
        </div>

        {/* Meta details skeleton */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <div className="space-y-1.5">
            <div className="h-2.5 bg-slate-800/40 rounded w-1/2" />
            <div className="h-4 bg-slate-800/60 rounded w-3/4" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2.5 bg-slate-800/40 rounded w-1/2" />
            <div className="h-4 bg-slate-800/60 rounded w-3/4" />
          </div>
          <div className="col-span-2 space-y-1.5">
            <div className="h-2.5 bg-slate-800/40 rounded w-1/3" />
            <div className="h-4 bg-slate-800/60 rounded w-1/2" />
          </div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-slate-800/70 rounded-xl w-full mt-2" />
      </div>
    </div>
  );
};

export const SkeletonGrid: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonLoader key={idx} />
      ))}
    </div>
  );
};
export default SkeletonLoader;
