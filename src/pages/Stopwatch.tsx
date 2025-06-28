  import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

  interface LapTime {
    id: number;
    lapTime: number;
    totalTime: number;
  }

  function Stopwatch() {
    const [time, setTime] = useState(0); // Time in centiseconds (1/100 second)
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<LapTime[]>([]);
    const intervalRef = useRef<number | null>(null);

    // Format time to MM:SS.CS (centiseconds)
    const formatTime = (centiseconds: number): string => {
      const totalSeconds = Math.floor(centiseconds / 100);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const cs = centiseconds % 100;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
    };

    // Start/Pause toggle
    const toggleStopwatch = () => {
      setIsRunning(!isRunning);
    };

    // Record lap time
    const recordLap = () => {
      if (time > 0) {
        const lastTotalTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
        const lapTime = time - lastTotalTime;
        const newLap: LapTime = {
          id: laps.length + 1,
          lapTime,
          totalTime: time,
        };
        setLaps([...laps, newLap]);
      }
    };

    // Reset stopwatch and laps
    const resetStopwatch = () => {
      setTime(0);
      setIsRunning(false);
      setLaps([]);
    };

    // Effect to handle the timer
    useEffect(() => {
      if (isRunning) {
        intervalRef.current = setInterval(() => {
          setTime(prevTime => prevTime + 1);
        }, 10); // Update every 10ms for centiseconds
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }

      // Cleanup on unmount
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [isRunning]);

    return (
      <div className="w-full">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Stopwatch</h1>
          
          <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
            {/* Time Display */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-4xl sm:text-5xl font-mono font-bold text-gray-800 mb-2">
                {formatTime(time)}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-6">
              {/* Start/Pause Button */}
              <button
                onClick={toggleStopwatch}
                className={`p-3 sm:p-4 rounded-full transition-colors ${
                  isRunning
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
                title={isRunning ? 'Pause Stopwatch' : 'Start Stopwatch'}
              >
                {isRunning ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>

              {/* Lap Button */}
              <button
                onClick={recordLap}
                disabled={time === 0}
                className="p-3 sm:p-4 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
                title="Record Lap"
              >
                <Flag className="w-6 h-6" />
              </button>

              {/* Reset Button */}
              <button
                onClick={resetStopwatch}
                className="p-3 sm:p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Reset Stopwatch"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            {/* Lap Times Table */}
            {laps.length > 0 && (
              <div className="border-t pt-4">
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 mb-2">
                  <div>Lap</div>
                  <div>Split Time</div>
                  <div>Total Time</div>
                </div>
                <div className="max-h-32 overflow-hidden">
                  <div className="overflow-y-auto max-h-32 pr-2 -mr-2">
                    {laps.map((lap) => (
                      <div key={lap.id} className="grid grid-cols-3 gap-4 text-sm py-1 border-b border-gray-100">
                        <div className="font-medium">{lap.id}</div>
                        <div className="font-mono">{formatTime(lap.lapTime)}</div>
                        <div className="font-mono">{formatTime(lap.totalTime)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  export default Stopwatch;