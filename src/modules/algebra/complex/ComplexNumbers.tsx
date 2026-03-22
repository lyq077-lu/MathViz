import { useState } from 'react';

export default function ComplexNumbers() {
  const [real] = useState(3);
  const [imag] = useState(4);

  const magnitude = Math.sqrt(real * real + imag * imag);
  const angle = Math.atan2(imag, real);
  const scale = 40;
  const centerX = 250;
  const centerY = 250;

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">复数与复平面</h3>
        <div className="text-xl font-mono">
          <span className="text-cyan-400">{real}</span>
          <span className="text-white"> {imag >= 0 ? '+' : '-'} </span>
          <span className="text-orange-400">{Math.abs(imag)}i</span>
        </div>
      </div>
      
      <div className="flex-1 w-full overflow-auto flex items-center justify-center">
        <svg viewBox="0 0 500 400" className="w-full max-w-3xl bg-slate-900 rounded-xl" preserveAspectRatio="xMidYMid meet">
          {/* Grid */}
          <defs>
            <pattern id="complexGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="500" height="400" fill="url(#complexGrid)" />
          
          {/* Axes */}
          <line x1="0" y1={centerY} x2="500" y2={centerY} stroke="#64748b" strokeWidth="2" />
          <line x1={centerX} y1="0" x2={centerX} y2="400" stroke="#64748b" strokeWidth="2" />
          
          {/* Real axis labels */}
          <text x="480" y={centerY - 10} fill="#94a3b8" fontSize="14">Re</text>
          {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map(n => (
            <g key={`re-${n}`}>
              <line x1={centerX + n * scale} y1={centerY - 5} x2={centerX + n * scale} y2={centerY + 5} stroke="#64748b" strokeWidth="1" />
              <text x={centerX + n * scale} y={centerY + 20} fill="#64748b" fontSize="12" textAnchor="middle">{n}</text>
            </g>
          ))}
          
          {/* Imaginary axis labels */}
          <text x={centerX + 10} y="20" fill="#94a3b8" fontSize="14">Im</text>
          {[-4, -3, -2, -1, 1, 2, 3, 4].map(n => (
            <g key={`im-${n}`}>
              <line x1={centerX - 5} y1={centerY - n * scale} x2={centerX + 5} y2={centerY - n * scale} stroke="#64748b" strokeWidth="1" />
              <text x={centerX - 15} y={centerY - n * scale + 4} fill="#64748b" fontSize="12" textAnchor="middle">{n}i</text>
            </g>
          ))}
          
          {/* Complex number vector */}
          <line 
            x1={centerX} y1={centerY} 
            x2={centerX + real * scale} y2={centerY - imag * scale} 
            stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrowhead)"
          />
          
          {/* Arrow marker */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#06b6d4" />
            </marker>
          </defs>
          
          {/* Projection lines */}
          <line x1={centerX + real * scale} y1={centerY - imag * scale} x2={centerX + real * scale} y2={centerY} stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" />
          <line x1={centerX + real * scale} y1={centerY - imag * scale} x2={centerX} y2={centerY - imag * scale} stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Point */}
          <circle cx={centerX + real * scale} cy={centerY - imag * scale} r="8" fill="#06b6d4" />
          
          {/* Info panel */}
          <rect x="280" y="60" width="200" height="120" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="300" y="90" fill="#94a3b8" fontSize="14">模长 |z|</text>
          <text x="380" y="90" fill="#22c55e" fontSize="16" fontWeight="bold">{magnitude.toFixed(2)}</text>
          <text x="300" y="120" fill="#94a3b8" fontSize="14">幅角 θ</text>
          <text x="380" y="120" fill="#f97316" fontSize="16" fontWeight="bold">{(angle * 180 / Math.PI).toFixed(1)}°</text>
          <text x="300" y="150" fill="#94a3b8" fontSize="14">极坐标</text>
          <text x="380" y="150" fill="#06b6d4" fontSize="14">{magnitude.toFixed(1)}∠{(angle * 180 / Math.PI).toFixed(0)}°</text>
        </svg>
      </div>
    </div>
  );
}
