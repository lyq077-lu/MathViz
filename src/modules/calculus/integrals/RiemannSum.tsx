import { useState } from 'react';

export default function RiemannSum() {
  const [partitions] = useState(10);
  const [functionType] = useState<'square' | 'cube'>('square');
  
  // Function: f(x) = x^2 or x^3
  const f = (x: number) => functionType === 'square' ? x * x : x * x * x;
  
  const scale = 30;
  const centerX = 50;
  const centerY = 350;
  
  // Calculate Riemann sum
  const dx = 3 / partitions;
  let sum = 0;
  const bars = [];
  
  for (let i = 0; i < partitions; i++) {
    const x = i * dx;
    const barHeight = f(x);
    sum += barHeight * dx;
    
    bars.push(
      <rect
        key={i}
        x={centerX + x * scale}
        y={centerY - barHeight * scale}
        width={dx * scale - 1}
        height={barHeight * scale}
        fill="rgba(168, 85, 247, 0.6)"
        stroke="#a855f7"
        strokeWidth="1"
      />
    );
  }
  
  // Actual integral value
  const actualValue = functionType === 'square' ? 9 : 20.25;
  
  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">黎曼和与积分</h3>
        <div className="text-slate-400 text-sm font-mono">
          {functionType === 'square' ? '∫₀³ x² dx' : '∫₀³ x³ dx'}
        </div>
      </div>
      
      <div className="flex-1 w-full overflow-auto flex items-center justify-center">
        <svg viewBox="0 0 450 400" className="w-full max-w-3xl bg-slate-900 rounded-xl" preserveAspectRatio="xMidYMid meet">
          {/* Grid */}
          <defs>
            <pattern id="riemannGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="450" height="400" fill="url(#riemannGrid)" />
          
          {/* Axes */}
          <line x1="40" y1={centerY} x2="400" y2={centerY} stroke="#64748b" strokeWidth="2" />
          <line x1={centerX} y1="20" x2={centerX} y2="380" stroke="#64748b" strokeWidth="2" />
          
          {/* Function curve */}
          <path
            d={`M ${centerX} ${centerY} ${Array.from({ length: 90 }, (_, i) => {
              const x = i / 30;
              const y = f(x);
              return `L ${centerX + x * scale} ${centerY - y * scale}`;
            }).join(' ')}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
          />
          
          {/* Riemann bars */}
          {bars}
          
          {/* Labels */}
          <text x="380" y={centerY + 20} fill="#94a3b8" fontSize="14">x</text>
          <text x={centerX - 15} y="30" fill="#94a3b8" fontSize="14">y</text>
          
          {/* Info panel */}
          <rect x="280" y="40" width="150" height="100" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="300" y="70" fill="#94a3b8" fontSize="14">分区数 n</text>
          <text x="380" y="70" fill="#a855f7" fontSize="16" fontWeight="bold">{partitions}</text>
          <text x="300" y="95" fill="#94a3b8" fontSize="14">黎曼和</text>
          <text x="380" y="95" fill="#f97316" fontSize="16" fontWeight="bold">{sum.toFixed(2)}</text>
          <text x="300" y="120" fill="#94a3b8" fontSize="14">真实值</text>
          <text x="380" y="120" fill="#22c55e" fontSize="16" fontWeight="bold">{actualValue}</text>
        </svg>
      </div>
    </div>
  );
}
