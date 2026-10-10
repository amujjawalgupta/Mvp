import { PlayCircle, Award, Target, Crosshair, Users, Activity, Play } from 'lucide-react';

export default function DemoVideo() {
  const timestamps = [
    { time: "00:00", title: "Introduction & Problem Statement" },
    { time: "01:15", title: "Log Upload & Baseline Training" },
    { time: "02:30", title: "Anomaly Detection & Risk Score" },
    { time: "03:45", title: "Threat Investigation & Mitigation" }
  ];

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          <PlayCircle className="text-emerald-500" />
          Project Demo Showcase
        </h2>
        <p className="text-slate-400 mt-1">Video presentation for Cyber AI Hackathon 2026.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel overflow-hidden relative group">
            <div className="aspect-video bg-black flex items-center justify-center relative">
              {/* Fallback for MVP if no real video is linked */}
              <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 m-4 rounded-xl">
                <Play className="w-16 h-16 text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-2">Hackathon Demo Video</h3>
                <p className="text-slate-400 text-sm max-w-sm text-center">
                  Video player container. In a live environment, this would embed a local MP4, YouTube, or Loom link.
                </p>
                <div className="mt-6 px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-sm flex items-center gap-2">
                  <PlayCircle size={16} /> Click to Play Demo
                </div>
              </div>
            </div>
            {/* Custom Player Controls Mock */}
            <div className="p-4 bg-slate-800 flex items-center gap-4">
              <button className="text-slate-200 hover:text-white transition-colors">
                <Play size={20} fill="currentColor" />
              </button>
              <div className="flex-1 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-1/3 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">01:15 / 05:00</span>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Award className="text-amber-400" />
              About The Project
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              "AI-Powered Insider Threat Detection through User Behavior Analytics" leverages a hybrid detection engine combining unsupervised machine learning (Isolation Forests) with rules-based heuristics (MITRE ATT&CK). By establishing behavioral baselines from historical access logs (e.g., CERT r4.2), the system dynamically flags anomalies—such as off-hours access, mass data exfiltration, or sudden privilege escalation—assigning a 0-100 Risk Score for immediate SOC triage.
            </p>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="glass-panel p-6 border-t-4 border-emerald-500">
            <h3 className="text-xl font-bold text-white mb-2 leading-tight">AI-Powered Insider Threat Detection through UBA</h3>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-start gap-3">
                <Users size={18} className="text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-200">Team HACKER ECLIPSE (T-007)</p>
                  <p className="text-xs text-slate-400">Rungta International Skills University</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target size={18} className="text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-200">Hackathon</p>
                  <p className="text-xs text-slate-400">Cyber AI Hackathon 2026</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h4 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Activity size={16} className="text-blue-400" /> Architecture Pipeline
            </h4>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-600 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-blue-500 bg-slate-800 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded glass border border-slate-700 text-xs">
                  <strong className="text-slate-200 block mb-1">1. Collect Logs</strong>
                  <span className="text-slate-400">Ingest structured data (Logon, File, USB).</span>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-emerald-500 bg-slate-800 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded glass border border-slate-700 text-xs">
                  <strong className="text-slate-200 block mb-1">2. Baseline Creation</strong>
                  <span className="text-slate-400">Profile standard user behavior.</span>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-amber-500 bg-slate-800 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded glass border border-slate-700 text-xs">
                  <strong className="text-slate-200 block mb-1">3. Detection Engine</strong>
                  <span className="text-slate-400">Isolation Forest + Rule Checks.</span>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-crimson-500 bg-slate-800 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="w-2 h-2 bg-crimson-500 rounded-full"></span>
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded glass border border-slate-700 text-xs">
                  <strong className="text-slate-200 block mb-1">4. Alert & Explain</strong>
                  <span className="text-slate-400">Risk Score & Explainable Dashboard.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h4 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Crosshair size={16} className="text-amber-400" /> Video Timestamps
            </h4>
            <div className="space-y-2">
              {timestamps.map((ts, idx) => (
                <button key={idx} className="w-full flex items-center gap-3 p-2 rounded hover:bg-slate-700/50 transition-colors text-left group">
                  <span className="text-blue-400 font-mono text-sm bg-blue-500/10 px-2 py-1 rounded group-hover:bg-blue-500 group-hover:text-white transition-colors">{ts.time}</span>
                  <span className="text-slate-300 text-sm group-hover:text-slate-100 transition-colors">{ts.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
