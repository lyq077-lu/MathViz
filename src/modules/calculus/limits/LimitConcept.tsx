import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LimitConcept() {
  const [epsilon] = useState(0.5);
  const [xValue] = useState(2);
  const targetX = 2;
  const limitValue = 4; // x^2 at x=2
  
  const scale = 40;
  const centerX = 250;
  const centerY = 250;
  
  // Function: f(x) = x^2
  const f = (x: number) => x * x;
  
  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">极限概念</h3>
        <div className="text-slate-400 text-sm font-mono">lim(x→2) x² = 4</div>
      </div>
      
      <div className="flex-1 w-full overflow-auto flex items-center justify-center">
        <svg viewBox="0 0 500 400" className="w-full max-w-3xl bg-slate-900 rounded-xl" preserveAspectRatio="xMidYMid meet">
          {/* Grid */}
          <defs>
            <pattern id="limitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="500" height="400" fill="url(#limitGrid)" />
          
          {/* Axes */}
          <line x1="0" y1={centerY} x2="500" y2={centerY} stroke="#64748b" strokeWidth="2" />
          <line x1={centerX} y1="0" x2={centerX} y2="400" stroke="#64748b" strokeWidth="2" />
          
          {/* Epsilon band around limit */}
          <rect 
            x="0" 
            y={centerY - (limitValue + epsilon) * scale} 
            width="500" 
            height={2 * epsilon * scale} 
            fill="rgba(168, 85, 247, 0.1)" 
            stroke="#a855f7" 
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          
          {/* Delta band around target */}
          <rect 
            x={centerX + (targetX - epsilon) * scale} 
            y="0" 
            width={2 * epsilon * scale} 
            height="400" 
            fill="rgba(6, 182, 212, 0.1)" 
            stroke="#06b6d4" 
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          
          {/* Function curve: y = x^2 */}
          <path
            d={`M ${centerX - 100} ${centerY - f(-2.5) * scale} Q ${centerX} ${centerY} ${centerX + 100} ${centerY - f(2.5) * scale}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
          />
          
          {/* Moving point */}
          <motion.circle 
            cx={centerX + (xValue - targetX) * scale}
            cy={centerY - f(xValue) * scale}
            r="8"
            fill="#f97316"
            animate={{ 
              cx: centerX + (xValue - targetX) * scale,
              cy: centerY - f(xValue) * scale
            }}
          />
          
          {/* Labels */}
          <text x="20" y="30" fill="#a855f7" fontSize="14">ε-带: y = 4 ± ε</text>
          <text x="20" y="55" fill="#06b6d4" fontSize="14">δ-带: x = 2 ± δ</text>
          <text x="20" y="380" fill="#f97316" fontSize="14">当前: x = {xValue.toFixed(2)}, f(x) = {f(xValue).toFixed(2)}</text>
        </svg>
      </div>
    </div>
  );
}
