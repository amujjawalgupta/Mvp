import { useState } from 'react';
import { Shield, LayoutDashboard, FileSearch, Target, History, Video } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TrafficAnalyzer from './components/TrafficAnalyzer';
import ThreatDetails from './components/ThreatDetails';
import AlertHistory from './components/AlertHistory';
import DemoVideo from './components/DemoVideo';

export type TabType = 'dashboard' | 'analyzer' | 'threat-details' | 'history' | 'demo';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleViewDetails = (eventId: string) => {
    setSelectedEventId(eventId);
    setActiveTab('threat-details');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onViewDetails={handleViewDetails} />;
      case 'analyzer':
        return <TrafficAnalyzer />;
      case 'threat-details':
        return <ThreatDetails eventId={selectedEventId} onBack={() => setActiveTab('dashboard')} />;
      case 'history':
        return <AlertHistory onViewDetails={handleViewDetails} />;
      case 'demo':
        return <DemoVideo />;
      default:
        return <Dashboard onViewDetails={handleViewDetails} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300 z-10">
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <div className="relative">
            <Shield className="w-8 h-8 text-emerald-500" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wider text-slate-100">UBA DETECT</h1>
            <p className="text-xs text-slate-400">Team HACKER ECLIPSE</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            isActive={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<FileSearch size={20} />} 
            label="Traffic Analyzer" 
            isActive={activeTab === 'analyzer'} 
            onClick={() => setActiveTab('analyzer')} 
          />
          <NavItem 
            icon={<Target size={20} />} 
            label="Threat Details" 
            isActive={activeTab === 'threat-details'} 
            onClick={() => setActiveTab('threat-details')} 
          />
          <NavItem 
            icon={<History size={20} />} 
            label="Alert History" 
            isActive={activeTab === 'history'} 
            onClick={() => setActiveTab('history')} 
          />
          <NavItem 
            icon={<Video size={20} />} 
            label="Demo Showcase" 
            isActive={activeTab === 'demo'} 
            onClick={() => setActiveTab('demo')} 
          />
        </nav>

        <div className="p-4 m-4 rounded-lg bg-slate-700/30 border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-sm font-medium text-emerald-400">Engine Active</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/40 via-slate-900 to-slate-900">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500 opacity-20"></div>
        {renderContent()}
      </main>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
        isActive 
          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
          : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
      }`}
    >
      <div className={`${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default App;
