import { useEffect, useRef } from 'react';
import { useAnimation } from '../contexts/AnimationContext';

export default function LinearFunction() {
  const animationRef = useRef<number | undefined>(undefined);
  const { isPlaying, linearState } = useAnimation();
  const { slope, setSlope, intercept } = linearState;

  // Auto animation for slope
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setSlope((prev: number) => {
          const next = prev + 0.02;
          return next > 3 ? -3 : next;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, setSlope]);

  const scale = 40;
  const centerX = 250;
  const centerY = 250;

  const x1 = -250 / scale;
  const y1 = slope * x1 + intercept;
  const x2 = 250 / scale;
  const y2 = slope * x2 + intercept;

  const screenX1 = centerX + x1 * scale;
  const screenY1 = centerY - y1 * scale;
  const screenX2 = centerX + x2 * scale;
  const screenY2 = centerY - y2 * scale;

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">线性函数探索</h3>
        <div className="text-xl font-mono">
          <span className="text-white">y = </span>
          <span className="text-orange-400">{slope.toFixed(2)}</span>
          <span className="text-white">x + </span>
          <span className="text-green-400">{intercept.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="flex-1 w-full overflow-auto flex items-center justify-center">
        <svg viewBox="0 0 500 500" className="w-full max-w-2xl bg-slate-900 rounded-xl" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="500" height="500" fill="url(#grid2)" />

          <line x1="0" y1={centerY} x2="500" y2={centerY} stroke="#64748b" strokeWidth="2" />
          <line x1={centerX} y1="0" x2={centerX} y2="500" stroke="#64748b" strokeWidth="2" />
          <text x="480" y={centerY - 10} fill="#94a3b8" fontSize="14">x</text>
          <text x={centerX + 10} y="20" fill="#94a3b8" fontSize="14">y</text>

          {/* Ticks */}
            {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map(tick => (
            <g key={`x-${tick}`}>
              <line x1={centerX + tick * scale} y1={centerY - 5} x2={centerX + tick * scale} y2={centerY + 5} stroke="#64748b" />
              <text x={centerX + tick * scale} y={centerY + 20} fill="#64748b" fontSize="12" textAnchor="middle">{tick}</text>
            </g>
          ))}
          {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map(tick => (
            <g key={`y-${tick}`}>
              <line x1={centerX - 5} y1={centerY - tick * scale} x2={centerX + 5} y2={centerY - tick * scale} stroke="#64748b" />
              <text x={centerX - 15} y={centerY - tick * scale + 5} fill="#64748b" fontSize="12" textAnchor="middle">{tick}</text>
            </g>
          ))}

          {/* The line */}
          <line x1={Math.max(0, screenX1)} y1={screenY1} x2={Math.min(500, screenX2)} y2={screenY2} stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />

          {/* Slope triangle */}
          {slope !== 0 && (
            <>
              <path d={`M ${centerX} ${centerY - intercept * scale} L ${centerX + scale} ${centerY - intercept * scale} L ${centerX + scale} ${centerY - (intercept + slope) * scale} Z`}
                fill="rgba(249, 115, 22, 0.2)" stroke="#f97316" strokeWidth="2" />
              <text x={centerX + scale / 2} y={centerY - intercept * scale + (slope > 0 ? 20 : -10)} fill="#f97316" fontSize="12" textAnchor="middle">Δx = 1</text>
              <text x={centerX + scale + 20} y={centerY - (intercept + slope / 2) * scale} fill="#f97316" fontSize="12" textAnchor="start">Δy = {slope.toFixed(2)}</text>
            </>
          )}

          {/* Intercept point */}
          <circle cx={centerX} cy={centerY - intercept * scale} r="8" fill="#22c55e" />
          <text x={centerX + 15} y={centerY - intercept * scale} fill="#22c55e" fontSize="14">(0, {intercept.toFixed(1)})</text>
          <circle cx={centerX} cy={centerY} r="4" fill="#64748b" />
        </svg>
      </div>
    </div>
  );
}
