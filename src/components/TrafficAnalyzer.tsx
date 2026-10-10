import { useState, useEffect } from 'react';
import { UploadCloud, Play, Loader2, Database, ShieldCheck, AlertOctagon } from 'lucide-react';

export default function TrafficAnalyzer() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
    }, 1500);
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setAnalysisComplete(false);
  };

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            setAnalysisComplete(true);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <header>
        <h2 className="text-2xl font-bold text-white tracking-wide">Traffic / Log Analyzer</h2>
        <p className="text-slate-400 mt-1">Upload logs and run the Detection Engine (Isolation Forest + Rules).</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="glass-panel p-8 flex flex-col items-center justify-center text-center border-dashed border-2 hover:border-blue-500/50 transition-colors cursor-pointer group" onClick={handleUpload}>
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <UploadCloud className="w-10 h-10 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Upload Log Data (CSV)</h3>
          <p className="text-sm text-slate-400 mb-6">Drag and drop your logs, or click to browse. Supported format: CERT r4.2 structured logs.</p>
          
          <button 
            className={`px-6 py-2.5 rounded-lg font-medium transition-all w-full flex items-center justify-center gap-2 ${
              uploadComplete 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
            }`}
            disabled={isUploading || uploadComplete}
          >
            {isUploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
            ) : uploadComplete ? (
              <><Database className="w-4 h-4" /> dataset_CERT_r4.2.csv Loaded</>
            ) : (
              'Select File or Use Demo Dataset'
            )}
          </button>
        </div>

        {/* Engine Section */}
        <div className="glass-panel p-8 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-200 mb-6 border-b border-slate-700 pb-4">Detection Engine</h3>
          
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Model:</span>
              <span className="text-blue-400 font-mono">Isolation Forest v2.1</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Ruleset:</span>
              <span className="text-blue-400 font-mono">MITRE ATT&CK Baseline</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Data Size:</span>
              <span className="text-slate-200 font-mono">{uploadComplete ? '1.45M Records' : '---'}</span>
            </div>
          </div>

          <button 
            onClick={runAnalysis}
            disabled={!uploadComplete || isAnalyzing}
            className={`mt-8 w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
              !uploadComplete 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
            }`}
          >
            {isAnalyzing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            ) : (
              <><Play className="w-5 h-5" /> Run Analysis</>
            )}
          </button>
        </div>
      </div>

      {/* Progress & Results */}
      {(isAnalyzing || analysisComplete) && (
        <div className="glass-panel p-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-slate-300">Analysis Progress</span>
            <span className="text-blue-400 font-mono">{Math.min(progress, 100)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-emerald-500 to-emerald-400 transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
            </div>
          </div>

          {analysisComplete && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-700">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-emerald-400">Baseline Verified</h4>
                  <p className="text-sm text-slate-400 mt-1">1,450,088 records matched learned behavior profiles.</p>
                </div>
              </div>
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
                <AlertOctagon className="w-6 h-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-amber-400">142 Anomalies Detected</h4>
                  <p className="text-sm text-slate-400 mt-1">Deviations flagged by Isolation Forest & rule thresholds.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
