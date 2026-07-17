import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

interface DataPoint {
  date: string;
  channel: string;
  spend: number;
  imps: number;
  clicks: number;
  convs: number;
}

interface DataVisualizerProps {
  data: DataPoint[];
  type?: 'area' | 'bar';
}

export const DataVisualizer: React.FC<DataVisualizerProps> = ({ data, type = 'area' }) => {
  // Never render charts with empty data — prevents Recharts from crashing
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center text-brand-muted text-sm">
        No chart data available.
      </div>
    );
  }

  // Format dates for display
  const chartData = data.map((d) => {
    let formattedDate = d.date;
    try {
      const parsed = new Date(d.date);
      if (!isNaN(parsed.getTime())) {
        formattedDate = parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    } catch (_) {}
    return {
      ...d,
      displayDate: formattedDate,
      ctr: d.imps > 0 ? parseFloat(((d.clicks / d.imps) * 100).toFixed(2)) : 0
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-white/10 p-3 rounded-xl shadow-lg backdrop-blur-md">
          <p className="text-xs font-bold text-brand-muted mb-2">{label}</p>
          {payload.map((entry: any, index: number) => {
            const name = entry.name || '';
            const val = entry.value !== undefined && entry.value !== null ? entry.value : 0;
            const displayVal = typeof val === 'number' ? val.toLocaleString() : val;
            return (
              <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
                {name}: {name.includes('Spend') ? `$${displayVal}` : displayVal}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  if (type === 'bar') {
    // Channel breakdown aggregator
    const channelMap: Record<string, { name: string; spend: number; convs: number }> = {};
    data.forEach((d) => {
      const channel = d.channel || 'Other';
      if (!channelMap[channel]) {
        channelMap[channel] = { name: channel, spend: 0, convs: 0 };
      }
      channelMap[channel].spend += d.spend;
      channelMap[channel].convs += d.convs;
    });
    const barData = Object.values(channelMap).map(c => ({
      ...c,
      spend: parseFloat(c.spend.toFixed(2))
    }));

    return (
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
            <Bar name="Total Spend ($)" dataKey="spend" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar name="Conversions (Leads)" dataKey="convs" fill="#14b8a6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorConvs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="displayDate" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            name="Ad Spend ($)"
            dataKey="spend"
            stroke="#8b5cf6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSpend)"
          />
          <Area
            type="monotone"
            name="Conversions"
            dataKey="convs"
            stroke="#14b8a6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorConvs)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default DataVisualizer;
