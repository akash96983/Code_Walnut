import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TimerList } from '../components/TimerList';
import { AddTimerModal } from '../components/AddTimerModal';

function Timer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (

    <div className="container mx-auto px-4 py-8">

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
      >
        <Plus className="w-5 h-5" />
        Add Timer
      </button>

      <TimerList />

      <AddTimerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Timer;


