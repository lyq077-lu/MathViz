import { useState, useEffect } from 'react';

export default function NormalDistribution() {
  const [samples, setSamples] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sampleCount, setSampleCount] = useState(0);
  
  // Box-Muller transform for normal distribution
  const generateNormal = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };
  
  useEffect(() => {
    if (!isGenerating) return;
    
    const interval = setInterval(() => {
      setSamples(prev => {
        const newSamples = [...prev, generateNormal()];
        if (newSamples.length >= 500) {
          setIsGenerating(false);
          setSampleCount(500);
          return newSamples;
        }
        setSampleCount(newSamples.length);
        return newSamples;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, [isGenerating]);
  
  // Calculate histogram
  const bins: number[] = new Array(20).fill(0);
  const binWidth = 0.5;
  const minVal = -5;
  
  samples.forEach(val => {
    const binIndex = Math.floor((val - minVal) / binWidth);
    if (binIndex >= 0 && binIndex < 20) {
      bins[binIndex]++;
    }
  });
  
  const maxCount = Math.max(...bins, 1);
  
  const reset = () => {
    setSamples([]);
    setSampleCount(0);
    setIsGenerating(false);
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">正态分布</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsGenerating(!isGenerating)}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm"
          >
            {isGenerating ? '暂停' : '生成'}
          </button>
          <button 
            onClick={reset}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm"
          >
            重置
          </button>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <span className="text-slate-400 text-sm">样本数: </span>
        <span className="text-green-400 font-bold">{sampleCount}</span>
      </div>
      
      <div className="flex-1 bg-slate-900 rounded-xl p-4 relative overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-center gap-1 px-4 pb-8">
          {bins.map((count, i) => (
            <div 
              key={i}
              className="w-4 bg-green-500/70 rounded-t transition-all duration-300"
              style={{ height: `${(count / maxCount) * 80}%` }}
            />
          ))}
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4 text-xs text-slate-500">
          <span>-4σ</span>
          <span>-2σ</span>
          <span>0</span>
          <span>+2σ</span>
          <span>+4σ</span>
        </div>
        <div className="absolute top-4 left-4 text-slate-500 text-sm">
          钟形曲线生成过程
        </div>
      </div>
    </div>
  );
}
