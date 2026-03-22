import { useState } from 'react';

export default function BayesianTheorem() {
  const [prior, setPrior] = useState(0.1); // P(A)
  const [likelihood, setLikelihood] = useState(0.8); // P(B|A)
  const [falsePositive, setFalsePositive] = useState(0.1); // P(B|¬A)
  
  // Bayes' theorem: P(A|B) = P(B|A) * P(A) / P(B)
  // P(B) = P(B|A) * P(A) + P(B|¬A) * P(¬A)
  const pB = likelihood * prior + falsePositive * (1 - prior);
  const posterior = pB > 0 ? (likelihood * prior) / pB : 0;

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">贝叶斯定理</h3>
        <div className="text-slate-400 text-sm font-mono">P(A|B) = P(B|A)·P(A) / P(B)</div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Controls */}
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-xl p-4">
            <h4 className="text-cyan-400 font-medium mb-3">先验概率 P(A)</h4>
            <input 
              type="range" min="0.01" max="0.99" step="0.01" 
              value={prior}
              onChange={(e) => setPrior(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-sm text-slate-400 mt-2">
              <span>1%</span>
              <span className="text-cyan-400 font-bold">{(prior * 100).toFixed(1)}%</span>
              <span>99%</span>
            </div>
            <p className="text-slate-500 text-xs mt-2">事件A发生的初始概率</p>
          </div>
          
          <div className="bg-slate-900 rounded-xl p-4">
            <h4 className="text-green-400 font-medium mb-3">似然 P(B|A)</h4>
            <input 
              type="range" min="0" max="1" step="0.01" 
              value={likelihood}
              onChange={(e) => setLikelihood(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-sm text-slate-400 mt-2">
              <span>0%</span>
              <span className="text-green-400 font-bold">{(likelihood * 100).toFixed(1)}%</span>
              <span>100%</span>
            </div>
            <p className="text-slate-500 text-xs mt-2">A发生时观测到B的概率</p>
          </div>
          
          <div className="bg-slate-900 rounded-xl p-4">
            <h4 className="text-orange-400 font-medium mb-3">假阳性 P(B|¬A)</h4>
            <input 
              type="range" min="0" max="1" step="0.01" 
              value={falsePositive}
              onChange={(e) => setFalsePositive(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-sm text-slate-400 mt-2">
              <span>0%</span>
              <span className="text-orange-400 font-bold">{(falsePositive * 100).toFixed(1)}%</span>
              <span>100%</span>
            </div>
            <p className="text-slate-500 text-xs mt-2">A不发生时观测到B的概率</p>
          </div>
        </div>
        
        {/* Visualization */}
        <div className="bg-slate-900 rounded-xl p-6 flex flex-col justify-center">
          <h4 className="text-white font-medium mb-6 text-center">后验概率 P(A|B)</h4>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#334155"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#22c55e"
                strokeWidth="10"
                strokeDasharray={`${posterior * 283} 283`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-green-400">{(posterior * 100).toFixed(1)}%</span>
            </div>
          </div>
          
          <div className="space-y-2 text-center">
            <p className="text-slate-400 text-sm">
              观测到B后，A发生的概率
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>P(B) = {(pB * 100).toFixed(1)}%</p>
              <p>P(A|B) = {(likelihood * 100).toFixed(0)}% × {(prior * 100).toFixed(0)}% / {(pB * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
