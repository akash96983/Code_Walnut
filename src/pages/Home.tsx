import { useState } from 'react';
import { Clock, Watch } from 'lucide-react';
import { Toaster } from 'sonner';
import Stopwatch from './Stopwatch';
import Timer from './Timer';
import NavigationContent from '../components/NavigationContent';

function Home() {
  const [activeTab, setActiveTab] = useState<'timers' | 'stopwatch'>('timers');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />

      {/* Desktop Side Navigation */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Timer</h1>
          </div>
          <div className="flex flex-col gap-6">
            <NavigationContent activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        <div className="container mx-auto px-4 py-8 pb-24 lg:pb-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Clock className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Timer</h1>
          </div>
          
          <div className="mb-8">
            {activeTab === 'timers' ? <Timer /> : <Stopwatch />}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex">
          <button
            onClick={() => setActiveTab('timers')}
            className={`flex-1 flex flex-col items-center py-3 px-4 transition-colors ${
              activeTab === 'timers'
                ? 'text-green-600 bg-green-50'
                : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
            }`}
          >
            <Clock className="w-6 h-6 mb-1" />
            <span className="text-sm font-medium">Timer</span>
          </button>
          <button
            onClick={() => setActiveTab('stopwatch')}
            className={`flex-1 flex flex-col items-center py-3 px-4 transition-colors ${
              activeTab === 'stopwatch'
                ? 'text-green-600 bg-green-50'
                : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
            }`}
          >
            <Watch className="w-6 h-6 mb-1" />
            <span className="text-sm font-medium">Stopwatch</span>
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Home;


