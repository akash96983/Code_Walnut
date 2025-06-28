import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TimerList } from '../components/TimerList';
import { TimerModal } from '../components/TimerModal';

function Timer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Timer
        </button>
      </div>

      <TimerList />

      <TimerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="add"
      />
    </div>
  );
}

export default Timer;


