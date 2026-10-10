import { ArrowLeft, ShieldAlert, Cpu, HardDrive, Clock, CheckCircle, AlertTriangle, Download, Lock, Check } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { SeverityBadge } from './Dashboard';
import { useState } from 'react';

interface ThreatDetailsProps {
  eventId: string | null;
  onBack: () => void;
}

export default function ThreatDetails({ eventId, onBack }: ThreatDetailsProps) {
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  const event = mockEvents.find(e => e.id === eventId) || mockEvents.find(e => e.isAnomaly);

  if (!event) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full">
        <p className="text-slate-400">No event selected.</p>
        <button onClick={onBack} className="mt-4 text-blue-400">Go Back</button>
      </div>
    );
  }

  const handleAction = (action: string) => {
    setActionStatus(action);
    setTimeout(() => setActionStatus(null), 3000);
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto pb-24">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium mb-6"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-white font-mono">{event.id}</h2>
            <SeverityBadge severity={event.severity} />
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border bg-slate-800 text-slate-300 border-slate-600`}>
              {event.category}
            </span>
          </div>
          <p className="text-slate-400">Detected on {new Date(event.timestamp).toLocaleString()}</p>
        </div>

        {/* Risk Score Gauge */}
        <div className="flex items-center gap-4 glass p-4 rounded-xl">
          <div className="text-right">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Risk Score</p>
            <p className="text-2xl font-bold font-mono text-white">{event.riskScore}<span className="text-sm text-slate-500">/100</span></p>
          </div>
          <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-slate-800">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-700" />
              <circle 
                cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" 
                strokeDasharray="175" strokeDashoffset={175 - (175 * event.riskScore) / 100}
                className={event.riskScore > 80 ? 'text-crimson-500' : event.riskScore > 60 ? 'text-amber-500' : 'text-emerald-500'}
                strokeLinecap="round"
              />
            </svg>
            <ShieldAlert className={`absolute w-6 h-6 ${event.riskScore > 80 ? 'text-crimson-500' : event.riskScore > 60 ? 'text-amber-500' : 'text-emerald-500'}`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Context */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Event Context</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">User</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold font-mono text-sm">
                    {event.userId.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-200">{event.userId}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Device</p>
                <div className="flex items-center gap-2 text-slate-200">
                  <HardDrive size={16} className="text-slate-400" />
                  <span className="font-mono">{event.device}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Activity Type</p>
                <span className="text-slate-200">{event.activityType}</span>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Detection Method</p>
                <div className="flex items-center gap-2 text-slate-200">
                  <Cpu size={16} className="text-blue-400" />
                  <span>Isolation Forest Anomaly</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Description</p>
              <p className="text-slate-300">{event.description}</p>
            </div>
          </div>

          <div className="glass-panel p-6 border-l-4 border-amber-500">
            <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" />
              Explainability: Why was this flagged?
            </h3>
            <ul className="space-y-3">
              {event.whyFlagged?.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-amber-500/5 p-3 rounded border border-amber-500/10">
                  <div className="mt-0.5"><Clock size={16} className="text-amber-500" /></div>
                  <span className="text-slate-300 text-sm">{reason}</span>
                </li>
              ))}
              {!event.whyFlagged && <p className="text-slate-400 text-sm">No specific reasons provided by model.</p>}
            </ul>
          </div>
        </div>

        {/* Right Column: Actions & Intel */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Threat Intel</h3>
            {event.mitreTtp ? (
              <div className="p-4 border border-blue-500/30 bg-blue-500/5 rounded-lg">
                <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">MITRE ATT&CK Mapping</p>
                <p className="font-mono text-sm text-slate-200 font-bold">{event.mitreTtp}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-400">No known TTP mapping available for this anomaly.</p>
            )}
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Response Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => handleAction('quarantine')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-crimson-600 hover:bg-crimson-500 text-white font-medium transition-colors"
              >
                {actionStatus === 'quarantine' ? <><Check size={18} /> Quarantined</> : <><Lock size={18} /> Quarantine User Session</>}
              </button>
              <button 
                onClick={() => handleAction('fp')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium border border-slate-600 transition-colors"
              >
                {actionStatus === 'fp' ? <><Check size={18} /> Marked FP</> : <><CheckCircle size={18} /> Mark False Positive</>}
              </button>
              <button 
                onClick={() => handleAction('export')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-medium border border-blue-500/30 transition-colors"
              >
                {actionStatus === 'export' ? <><Check size={18} /> Exported</> : <><Download size={18} /> Export Evidence (PDF)</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
