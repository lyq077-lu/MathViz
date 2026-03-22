import { useState, useEffect } from 'react';

export default function LawOfLargeNumbers() {
  const [trials, setTrials] = useState(0);
  const [heads, setHeads] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setTrials(prev => {
        const newTrials = prev + 10;
        if (newTrials >= 1000) {
          setIsRunning(false);
          return 1000;
        }
        return newTrials;
      });
      
      setHeads(prev => {
        // Simulate coin flips - expected 50% heads
        const newHeads = prev + Math.floor(Math.random() * 6) + 2; // Roughly 50%
        return newHeads;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  useEffect(() => {
    if (trials > 0) {
      setHistory(prev => [...prev, heads / trials]);
    }
  }, [trials, heads]);
  
  const ratio = trials > 0 ? (heads / trials * 100).toFixed(1) : '50.0';
  
  const reset = () => {
    setTrials(0);
    setHeads(0);
    setHistory([]);
    setIsRunning(false);
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">大数定律</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm"
          >
            {isRunning ? '暂停' : '开始'}
          </button>
          <button 
            onClick={reset}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm"
          >
            重置
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-slate-900 rounded-lg p-3 text-center">
          <div className="text-slate-400 text-sm">试验次数</div>
          <div className="text-2xl font-bold text-white">{trials}</div>
        </div>
        <div className="bg-slate-900 rounded-lg p-3 text-center">
          <div className="text-slate-400 text-sm">正面次数</div>
          <div className="text-2xl font-bold text-green-400">{heads}</div>
        </div>
        <div className="bg-slate-900 rounded-lg p-3 text-center">
          <div className="text-slate-400 text-sm">正面频率</div>
          <div className="text-2xl font-bold text-cyan-400">{ratio}%</div>
        </div>
      </div>
      
      <div className="flex-1 bg-slate-900 rounded-xl p-4 relative overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-center gap-1 px-4 pb-8">
          {history.slice(-50).map((val, i) => (
            <div 
              key={i}
              className="w-2 bg-green-500/60 rounded-t"
              style={{ height: `${val * 100}%` }}
            />
          ))}
        </div>
        <div className="absolute top-4 left-4 text-slate-500 text-sm">
          随着试验次数增加，频率趋近于 50%
        </div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-green-500/30" style={{ top: '50%' }}>
          <span className="absolute right-4 -top-3 text-green-500 text-xs">50%</span>
        </div>
      </div>
    </div>
  );
}
