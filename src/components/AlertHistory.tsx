import { useState } from 'react';
import { Search, Filter, Download, ArrowRight, Activity, HardDrive, Mail, ShieldAlert } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { SeverityBadge } from './Dashboard';

interface AlertHistoryProps {
  onViewDetails: (id: string) => void;
}

export default function AlertHistory({ onViewDetails }: AlertHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.userId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'All' || event.severity === severityFilter;
    const matchesCategory = categoryFilter === 'All' || event.activityType === categoryFilter;
    return matchesSearch && matchesSeverity && matchesCategory;
  });

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Alert History & Reports</h2>
          <p className="text-slate-400 mt-1">Review past detections, filter by attributes, and export reports.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-200 transition-colors">
          <Download size={16} />
          Export Analyst Report
        </button>
      </div>

      <div className="glass-panel p-6">
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 pb-6 border-b border-slate-700">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Event ID or User..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-1">
              <Filter size={16} className="text-slate-400" />
              <select 
                value={severityFilter}
                onChange={e => setSeverityFilter(e.target.value)}
                className="bg-transparent text-slate-200 text-sm focus:outline-none appearance-none cursor-pointer outline-none border-none py-1"
              >
                <option value="All">All Severities</option>
                <option value="High">High Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="Low">Low Risk</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-1">
              <Activity size={16} className="text-slate-400" />
              <select 
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="bg-transparent text-slate-200 text-sm focus:outline-none appearance-none cursor-pointer outline-none border-none py-1"
              >
                <option value="All">All Types</option>
                <option value="Logon">Logon</option>
                <option value="File">File</option>
                <option value="USB">USB</option>
                <option value="Email">Email</option>
                <option value="Privilege">Privilege</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium rounded-tl-lg">Timestamp</th>
                <th className="p-4 font-medium">Event ID</th>
                <th className="p-4 font-medium">User & Device</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Severity</th>
                <th className="p-4 font-medium">Risk Score</th>
                <th className="p-4 font-medium rounded-tr-lg text-right">Details</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredEvents.length > 0 ? filteredEvents.map((event) => (
                <tr key={event.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="p-4 text-slate-400 whitespace-nowrap">{new Date(event.timestamp).toLocaleString()}</td>
                  <td className="p-4 font-mono text-slate-300">{event.id}</td>
                  <td className="p-4">
                    <div className="text-slate-200 font-medium">{event.userId}</div>
                    <div className="text-slate-500 text-xs flex items-center gap-1 mt-0.5"><HardDrive size={10} />{event.device}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      {event.activityType === 'Email' ? <Mail size={14} className="text-blue-400" /> : 
                       event.activityType === 'Logon' ? <ShieldAlert size={14} className="text-emerald-400" /> :
                       <Activity size={14} className="text-amber-400" />}
                      {event.activityType}
                    </div>
                  </td>
                  <td className="p-4"><SeverityBadge severity={event.severity} /></td>
                  <td className="p-4 font-mono text-slate-300">{event.riskScore}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => onViewDetails(event.id)}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                      title="Investigate"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No matching events found. Adjust your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
          <span>Showing 1 to {filteredEvents.length} of {filteredEvents.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
