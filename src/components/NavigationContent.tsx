import { Timer as TimerIcon, Watch } from 'lucide-react';

interface NavigationContentProps {
  activeTab: 'timers' | 'stopwatch';
  setActiveTab: (tab: 'timers' | 'stopwatch') => void;
}

const NavigationContent = ({ activeTab, setActiveTab }: NavigationContentProps) => (
  <>
    <button
      onClick={() => setActiveTab('timers')}
      className={`flex items-center gap-2 transition-colors ${
        activeTab === 'timers'
          ? 'text-green-600'
          : 'text-gray-600 hover:text-green-600'
      }`}
    >
      <TimerIcon className="w-5 h-5" />
      <span className="font-medium">Timers</span>
    </button>
    <button
      onClick={() => setActiveTab('stopwatch')}
      className={`flex items-center gap-2 transition-colors ${
        activeTab === 'stopwatch'
          ? 'text-green-600'
          : 'text-gray-600 hover:text-green-600'
      }`}
    >
      <Watch className="w-5 h-5" />
      <span className="font-medium">Stopwatch</span>
    </button>
  </>
);

export default NavigationContent; 