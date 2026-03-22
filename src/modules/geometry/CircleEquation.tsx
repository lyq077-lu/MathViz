import { motion } from 'framer-motion';
import { useAnimation } from '../../contexts/AnimationContext';

export default function CircleEquation() {
  const { circleState } = useAnimation();
  const { h, k, r, showRadius, pointP } = circleState;

  const scale = 28;
  const centerX = 250;
  const centerY = 250;

  const toScreen = (x: number, y: number) => ({ x: centerX + x * scale, y: centerY - y * scale });
  const screenCenter = toScreen(h, k);
  const screenRadius = r * scale;

  const distance = Math.sqrt(Math.pow(pointP.x - h, 2) + Math.pow(pointP.y - k, 2));
  const isInside = distance < r;
  const isOn = Math.abs(distance - r) < 0.1;

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">圆的方程</h3>
        <div className="text-lg font-mono">
          <span className="text-white">(x </span>
          <span className="text-pink-400">{h >= 0 ? '-' : '+'} {Math.abs(h).toFixed(1)}</span>
          <span className="text-white">)² + (y </span>
          <span className="text-pink-400">{k >= 0 ? '-' : '+'} {Math.abs(k).toFixed(1)}</span>
          <span className="text-white">)² = </span>
          <span className="text-cyan-400">{r}²</span>
        </div>
      </div>
      
      <div className="flex-1 w-full overflow-auto flex items-center justify-center">
        <svg viewBox="0 0 500 500" className="w-full max-w-2xl bg-slate-900 rounded-xl" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="circleGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#334155" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="500" height="500" fill="url(#circleGrid)" />

          <line x1="0" y1={centerY} x2="500" y2={centerY} stroke="#64748b" strokeWidth="2" />
          <line x1={centerX} y1="0" x2={centerX} y2="500" stroke="#64748b" strokeWidth="2" />
          <text x="480" y={centerY - 10} fill="#94a3b8" fontSize="14">x</text>
          <text x={centerX + 10} y="20" fill="#94a3b8" fontSize="14">y</text>

          {[-8, -6, -4, -2, 2, 4, 6, 8].map(tick => (
            <g key={`x-${tick}`}>
              <line x1={centerX + tick * scale} y1={centerY - 5} x2={centerX + tick * scale} y2={centerY + 5} stroke="#64748b" />
              <text x={centerX + tick * scale} y={centerY + 20} fill="#64748b" fontSize="10" textAnchor="middle">{tick}</text>
            </g>
          ))}
          {[-8, -6, -4, -2, 2, 4, 6, 8].map(tick => (
            <g key={`y-${tick}`}>
              <line x1={centerX - 5} y1={centerY - tick * scale} x2={centerX + 5} y2={centerY - tick * scale} stroke="#64748b" />
              <text x={centerX - 15} y={centerY - tick * scale + 4} fill="#64748b" fontSize="10" textAnchor="middle">{tick}</text>
            </g>
          ))}

          <circle cx={screenCenter.x} cy={screenCenter.y} r={screenRadius} fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="3" />

          {showRadius && (
            <>
              <line x1={screenCenter.x} y1={screenCenter.y} x2={screenCenter.x + screenRadius} y2={screenCenter.y} stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" />
              <text x={screenCenter.x + screenRadius / 2} y={screenCenter.y - 10} fill="#f97316" fontSize="14" textAnchor="middle">r = {r}</text>
            </>
          )}

          <circle cx={screenCenter.x} cy={screenCenter.y} r="7" fill="#f97316" />
          <text x={screenCenter.x + 18} y={screenCenter.y + 5} fill="#f97316" fontSize="14">C({h.toFixed(1)}, {k.toFixed(1)})</text>

          <motion.circle cx={toScreen(pointP.x, pointP.y).x} cy={toScreen(pointP.x, pointP.y).y} r="9" fill={isOn ? '#22c55e' : isInside ? '#06b6d4' : '#ec4899'} stroke="white" strokeWidth="2" whileHover={{ scale: 1.2 }} />
          <text x={toScreen(pointP.x, pointP.y).x + 18} y={toScreen(pointP.x, pointP.y).y - 12} fill={isOn ? '#22c55e' : isInside ? '#06b6d4' : '#ec4899'} fontSize="14">
            P({pointP.x.toFixed(1)}, {pointP.y.toFixed(1)})
          </text>

          <line x1={screenCenter.x} y1={screenCenter.y} x2={toScreen(pointP.x, pointP.y).x} y2={toScreen(pointP.x, pointP.y).y} stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <circle cx={centerX} cy={centerY} r="4" fill="#64748b" />
          <text x={centerX - 20} y={centerY + 22} fill="#64748b" fontSize="12">O</text>
        </svg>
      </div>
    </div>
  );
}
