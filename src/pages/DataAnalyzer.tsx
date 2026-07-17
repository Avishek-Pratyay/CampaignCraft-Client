import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Upload, 
  FileSpreadsheet, 
  Bot, 
  BarChart3, 
  DollarSign, 
  Award, 
  TrendingUp,
  Download,
  Compass
} from 'lucide-react';
import DataVisualizer from '../components/DataVisualizer';

interface SummaryData {
  totalSpend: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  overallCTR: number;
  overallCPC: number;
  conversionRate: number;
}

interface ChartPoint {
  date: string;
  channel: string;
  spend: number;
  imps: number;
  clicks: number;
  convs: number;
}

export const DataAnalyzer: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [reportMarkdown, setReportMarkdown] = useState('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSummary(null);
      setReportMarkdown('');
      setAgentLogs([]);
      setAnalysisError(null);
    }
  };

  // Safe async log appender — no setInterval, no race conditions
  const appendLogsSequentially = async (logs: string[]) => {
    if (!isMounted.current) return;
    setAgentLogs([]);
    for (const log of logs) {
      if (!isMounted.current) return;
      await new Promise<void>(resolve => setTimeout(resolve, 600));
      if (!isMounted.current) return;
      setAgentLogs(prev => [...prev, log]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsProcessing(true);
    setAnalysisError(null);

    const logs = [
      `> Received file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
      `> Validating header mapping schemas...`,
      `> Parsing tabular matrix data in-memory...`,
      `> Calculating aggregate KPI performance parameters...`,
      `> Grounding metrics & requesting LLM Agent audit synthesis...`
    ];

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Run logs animation and API call in parallel
      const [_, response] = await Promise.all([
        appendLogsSequentially(logs),
        axios.post('/api/ai/analyze-data', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      ]);

      if (!isMounted.current) return;

      const data = response?.data;
      if (data && typeof data === 'object') {
        // Safely extract all fields with fallback defaults
        const summaryData: SummaryData = {
          totalSpend: Number(data.summary?.totalSpend) || 0,
          totalImpressions: Number(data.summary?.totalImpressions) || 0,
          totalClicks: Number(data.summary?.totalClicks) || 0,
          totalConversions: Number(data.summary?.totalConversions) || 0,
          overallCTR: Number(data.summary?.overallCTR) || 0,
          overallCPC: Number(data.summary?.overallCPC) || 0,
          conversionRate: Number(data.summary?.conversionRate) || 0,
        };
        const chartRows: ChartPoint[] = Array.isArray(data.chartData) ? data.chartData.map((row: any) => ({
          date: String(row?.date || 'N/A'),
          channel: String(row?.channel || 'N/A'),
          spend: Number(row?.spend) || 0,
          imps: Number(row?.imps) || 0,
          clicks: Number(row?.clicks) || 0,
          convs: Number(row?.convs) || 0,
        })) : [];

        setSummary(summaryData);
        setChartData(chartRows);
        setReportMarkdown(typeof data.analysis === 'string' ? data.analysis : '');
        setAgentLogs(prev => [...prev, '> Analysis completed successfully! Dashboard elements updated.']);
      } else {
        throw new Error('Invalid response from analytics agent');
      }
    } catch (error: any) {
      console.error('Error analyzing data:', error);
      if (isMounted.current) {
        const msg = error?.response?.data?.message || error?.message || 'Failed to process file';
        setAnalysisError(msg);
        setAgentLogs(prev => [...prev, `> Error: ${msg}`]);
      }
    } finally {
      if (isMounted.current) {
        setIsProcessing(false);
      }
    }
  };

  const downloadReportHTML = () => {
    if (!summary || !reportMarkdown) return;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>CampaignCraft AI Marketing Audit Report</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 40px auto; padding: 0 20px; }
          h1 { color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px; }
          h2 { color: #14b8a6; margin-top: 30px; }
          code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
          pre { background: #f4f4f4; padding: 15px; border-radius: 8px; font-family: monospace; overflow-x: auto; }
          .kpi-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
          .kpi-card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: #fafafa; }
          .kpi-value { font-size: 24px; font-weight: bold; color: #8b5cf6; margin-top: 5px; }
        </style>
      </head>
      <body>
        <h1>CampaignCraft AI Marketing Audit Report</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        <div class="kpi-container">
          <div class="kpi-card">
            <div>Total Ad Spend</div>
            <div class="kpi-value">$${summary.totalSpend.toLocaleString()}</div>
          </div>
          <div class="kpi-card">
            <div>Total Conversions</div>
            <div class="kpi-value">${summary.totalConversions.toLocaleString()} leads</div>
          </div>
          <div class="kpi-card">
            <div>Click-Through Rate (CTR)</div>
            <div class="kpi-value">${summary.overallCTR}%</div>
          </div>
          <div class="kpi-card">
            <div>Average Cost Per Click (CPC)</div>
            <div class="kpi-value">$${summary.overallCPC}</div>
          </div>
        </div>
        <div>
          ${reportMarkdown
            .replace(/# (.*)/g, '<h1>$1</h1>')
            .replace(/## (.*)/g, '<h2>$1</h2>')
            .replace(/### (.*)/g, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>')}
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CampaignCraft_AI_Audit_${new Date().toISOString().slice(0, 10)}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadSampleCSV = () => {
    const csvContent = 
`date,channel,spend,impressions,clicks,conversions
2026-07-10,Google Ads,120.50,5400,210,18
2026-07-11,Meta Ads,95.00,8200,410,48
2026-07-12,LinkedIn,250.00,4100,85,12
2026-07-13,Twitter,45.00,6200,120,6
2026-07-14,Google Ads,135.00,5900,245,22
2026-07-15,Meta Ads,110.00,9100,480,54
2026-07-16,LinkedIn,280.00,4300,92,15`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample_campaign_performance.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-brand-primary" />
          Multimodal Data Intelligence
        </h1>
        <p className="text-brand-muted text-sm">
          Upload raw marketing CSV or JSON performance data. Receive actionable KPI breakdown insights and strategy edits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Upload Container (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-brand-card/25 space-y-5">
            <h2 className="text-lg font-bold text-white pb-2 border-b border-white/5">
              Upload Metric Logs
            </h2>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 text-center hover:border-brand-primary/50 transition-all cursor-pointer relative bg-slate-950/20">
                <input
                  type="file"
                  accept=".csv,.json"
                  required
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="h-8 w-8 text-brand-primary mx-auto mb-3 animate-bounce" />
                <p className="text-sm font-semibold text-white">Select CSV or JSON File</p>
                <p className="text-[11px] text-brand-muted mt-1">Maximum size limit 5MB</p>
                {file && (
                  <div className="mt-4 px-3 py-1.5 rounded-lg bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary text-xs font-bold inline-flex items-center gap-1">
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                    <span className="truncate max-w-[120px]">{file.name}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={downloadSampleCSV}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-bold text-brand-muted hover:text-white transition-colors"
                >
                  Get CSV Sample
                </button>
                <button
                  type="submit"
                  disabled={!file || isProcessing}
                  className="w-1/2 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-xs font-bold text-white transition-all shadow-md shadow-brand-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Analyzing...' : 'Analyze File'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Audit Outputs (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Progress Tracer */}
          {agentLogs.length > 0 && (
            <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-slate-950/60 font-mono text-[11px] text-brand-muted space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-white text-[10px] uppercase pb-1 border-b border-white/5 mb-2">
                <Compass className="h-3.5 w-3.5 text-brand-primary animate-spin" />
                <span>Data Parsing Operations Trace</span>
              </div>
              {agentLogs.map((log, idx) => (
                <div key={idx} className={
                  log.startsWith('> Analysis completed') ? 'text-brand-secondary' :
                  log.startsWith('> Error') ? 'text-brand-accent' : 'text-white/80'
                }>
                  {log}
                </div>
              ))}
            </div>
          )}

          {/* Error display */}
          {analysisError && !isProcessing && (
            <div className="glass-panel p-4 rounded-2xl border border-brand-accent/20 bg-brand-accent/5 text-brand-accent text-sm">
              <p className="font-bold mb-1">Analysis Failed</p>
              <p className="text-xs text-brand-muted">{analysisError}</p>
            </div>
          )}

          {/* Results Summary Elements */}
          {isProcessing ? (
            <div className="glass-panel p-16 rounded-3xl border border-white/5 bg-brand-card/25 text-center space-y-4">
              <div className="h-10 w-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-brand-muted font-semibold">LLM Marketing Agent is auditing performance metrics...</p>
            </div>
          ) : !summary ? (
            <div className="glass-panel p-16 rounded-3xl border border-white/5 bg-brand-card/25 text-center space-y-3">
              <BarChart3 className="h-12 w-12 text-brand-primary mx-auto opacity-30 animate-pulse" />
              <h3 className="text-lg font-bold text-white">Metrics Workspace Empty</h3>
              <p className="text-brand-muted text-xs max-w-sm mx-auto">
                No marketing performance file has been analyzed. Upload your CSV performance logs on the left menu.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* KPI Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-brand-card/20">
                  <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-brand-secondary" /> Ad Spend
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-white mt-1">${(summary.totalSpend || 0).toLocaleString()}</p>
                </div>

                <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-brand-card/20">
                  <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                    <Award className="h-3 w-3 text-brand-accent" /> Conversions
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-white mt-1">{(summary.totalConversions || 0).toLocaleString()}</p>
                </div>

                <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-brand-card/20">
                  <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-brand-primary" /> CTR %
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-white mt-1">{summary.overallCTR || 0}%</p>
                </div>

                <div className="glass-panel p-4 rounded-2xl border border-white/5 bg-brand-card/20">
                  <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-brand-secondary" /> Avg CPC
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-white mt-1">${summary.overallCPC || 0}</p>
                </div>
              </div>

              {/* Dynamic Recharts Performance Plot */}
              {chartData.length > 0 && (
                <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-brand-card/25 space-y-3">
                  <h3 className="text-base font-bold text-white pb-2 border-b border-white/5 flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-brand-secondary" />
                    Performance Dynamic Graph (Spend vs Conversions)
                  </h3>
                  <div className="pt-2">
                    <DataVisualizer data={chartData} type="area" />
                  </div>
                </div>
              )}

              {/* AI Narrative Markdown Document */}
              {reportMarkdown && (
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-brand-card/25 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Bot className="h-4 w-4 text-brand-primary" />
                      AI Marketing Audit Report
                    </h3>
                    <button
                      onClick={downloadReportHTML}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-secondary text-brand-dark hover:bg-brand-secondary/90 transition-all shadow-sm"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download HTML Report
                    </button>
                  </div>

                  <div className="prose prose-invert text-sm leading-relaxed text-brand-muted select-text whitespace-pre-line bg-slate-950/30 p-5 rounded-2xl border border-white/5 font-sans">
                    {reportMarkdown}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
export default DataAnalyzer;
