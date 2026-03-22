import { useState } from 'react';
export default function DerivativeGeometry() {
  const [x] = useState(1);
  const [h] = useState(0.5);
  
  const f = (val: number) => val * val; // f(x) = x^2
  const df = (val: number) => 2 * val; // f'(x) = 2x
  
  const scale = 30;
  const centerX = 250;
  const centerY = 300;
  
  const fx = f(x);
  const fxh = f(x + h);
  const slope = (fxh - fx) / h;
  const derivative = df(x);
  
  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">导数几何意义</h3>
        <div className="text-slate-400 text-sm font-mono">f(x) = x²</div>
      </div>
      
      <div className="flex-1 w-full overflow-auto flex items-center justify-center">
        <svg viewBox="0 0 500 400" className="w-full max-w-3xl bg-slate-900 rounded-xl" preserveAspectRatio="xMidYMid meet">
          {/* Grid */}
          <defs>
            <pattern id="derivativeGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="500" height="400" fill="url(#derivativeGrid)" />
          
          {/* Axes */}
          <line x1="0" y1={centerY} x2="500" y2={centerY} stroke="#64748b" strokeWidth="2" />
          <line x1={centerX} y1="0" x2={centerX} y2="400" stroke="#64748b" strokeWidth="2" />
          
          {/* Function curve */}
          <path
            d={`M ${centerX - 120} ${centerY - f(-4) * scale} Q ${centerX} ${centerY} ${centerX + 120} ${centerY - f(4) * scale}`}
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
          />
          
          {/* Secant line */}
          <line 
            x1={centerX + (x - 3) * scale}
            y1={centerY - (fx - slope * 3) * scale}
            x2={centerX + (x + h + 2) * scale}
            y2={centerY - (fxh + slope * 2) * scale}
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          
          {/* Tangent line */}
          <line 
            x1={centerX + (x - 3) * scale}
            y1={centerY - (fx - derivative * 3) * scale}
            x2={centerX + (x + 3) * scale}
            y2={centerY - (fx + derivative * 3) * scale}
            stroke="#a855f7"
            strokeWidth="3"
          />
          
          {/* Points */}
          <circle cx={centerX + x * scale} cy={centerY - fx * scale} r="6" fill="#06b6d4" />
          <circle cx={centerX + (x + h) * scale} cy={centerY - fxh * scale} r="6" fill="#f97316" />
          
          {/* Delta x and Delta y */}
          <line x1={centerX + x * scale} y1={centerY - fx * scale} x2={centerX + (x + h) * scale} y2={centerY - fx * scale} stroke="#94a3b8" strokeWidth="1" />
          <line x1={centerX + (x + h) * scale} y1={centerY - fx * scale} x2={centerX + (x + h) * scale} y2={centerY - fxh * scale} stroke="#94a3b8" strokeWidth="1" />
          
          {/* Labels */}
          <text x="20" y="30" fill="#a855f7" fontSize="14" fontWeight="bold">切线 (导数)</text>
          <text x="20" y="50" fill="#f97316" fontSize="14">割线 (差商)</text>
          <text x="20" y="380" fill="#06b6d4" fontSize="14">f'({x.toFixed(1)}) = {derivative.toFixed(2)}</text>
          <text x="200" y="380" fill="#f97316" fontSize="14">割线斜率 = {slope.toFixed(2)}</text>
        </svg>
      </div>
    </div>
  );
}
