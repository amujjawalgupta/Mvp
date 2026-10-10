import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, AlertTriangle, Users, Clock, ArrowRight, ShieldAlert } from 'lucide-react';
import { mockStats, mockEvents, timelineData } from '../data/mockData';

const COLORS = ['#dc2626', '#f59e0b', '#3b82f6', '#10b981'];
const pieData = [
  { name: 'Malicious', value: 35 },
  { name: 'Negligent', value: 45 },
  { name: 'Compromised', value: 20 },
];

interface DashboardProps {
  onViewDetails: (id: string) => void;
}

export default function Dashboard({ onViewDetails }: DashboardProps) {
  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-wide">SOC Overview & Analytics</h2>
        <p className="text-slate-400 mt-1">Real-time threat landscape based on user behavior.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Activity className="text-blue-400" />} 
          title="Total Events" 
          value={mockStats.totalEventsProcessed.toLocaleString()} 
          subtitle="Past 24 hours"
          trend="+12%"
          trendUp={true}
        />
        <StatCard 
          icon={<ShieldAlert className="text-amber-400" />} 
          title="Anomalies Detected" 
          value={mockStats.totalAnomaliesDetected.toString()} 
          subtitle="0.01% of total"
          trend="-2%"
          trendUp={false}
        />
        <StatCard 
          icon={<Users className="text-crimson-500" />} 
          title="High-Risk Users" 
          value={mockStats.highRiskUsers.toString()} 
          subtitle="Require immediate review"
          trend="+5"
          trendUp={true}
        />
        <StatCard 
          icon={<Clock className="text-emerald-400" />} 
          title="Avg Latency" 
          value={mockStats.latency} 
          subtitle={`FP Rate: ${mockStats.falsePositiveRate}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timeline Chart */}
        <div className="glass-panel p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <Activity size={18} className="text-blue-400"/>
            Anomaly Timeline
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="time" stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
                <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#374151', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="normal" stroke="#3b82f6" fillOpacity={1} fill="url(#colorNormal)" />
                <Area type="monotone" dataKey="anomaly" stroke="#f59e0b" fillOpacity={1} fill="url(#colorAnomaly)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Breakdown */}
        <div className="glass-panel p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Threat Category Breakdown</h3>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#374151', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-xs text-slate-400">Analyzed</span>
            </div>
            
            <div className="w-full mt-4 space-y-2">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-slate-300">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-200">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="glass-panel p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-400" />
            Recent High-Risk Alerts
          </h3>
          <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            View All <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-sm uppercase tracking-wider">
                <th className="pb-3 font-medium px-4">Event ID</th>
                <th className="pb-3 font-medium px-4">User</th>
                <th className="pb-3 font-medium px-4">Type</th>
                <th className="pb-3 font-medium px-4">Risk</th>
                <th className="pb-3 font-medium px-4">Severity</th>
                <th className="pb-3 font-medium px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockEvents.filter(e => e.isAnomaly).slice(0, 4).map((event) => (
                <tr key={event.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="py-4 px-4 font-mono text-slate-300">{event.id}</td>
                  <td className="py-4 px-4 text-slate-200">{event.userId}</td>
                  <td className="py-4 px-4 text-slate-300">{event.activityType}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${event.riskScore > 80 ? 'bg-crimson-500' : event.riskScore > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${event.riskScore}%` }}
                        ></div>
                      </div>
                      <span className="text-slate-300 font-mono">{event.riskScore}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <SeverityBadge severity={event.severity} />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => onViewDetails(event.id)}
                      className="px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded border border-blue-500/20 transition-colors"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, trend, trendUp }: any) {
  return (
    <div className="glass-panel p-5 relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-32 h-32" }) : null}
      </div>
      <div className="flex items-start justify-between mb-2">
        <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-crimson-500/20 text-crimson-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <h4 className="text-slate-400 text-sm font-medium mb-1">{title}</h4>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

export function SeverityBadge({ severity }: { severity: string }) {
  const styles = {
    High: 'bg-crimson-500/20 text-crimson-400 border-crimson-500/30',
    Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  }[severity] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles}`}>
      {severity}
    </span>
  );
}
