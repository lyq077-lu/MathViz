import { useMemo } from 'react';
import { useAnimation } from '../contexts/AnimationContext';

export default function QuadraticFunction() {
  const { quadraticState } = useAnimation();
  const { a, b, c, showVertex, showRoots, showAxis } = quadraticState;

  const scale = 30;
  const centerX = 250;
  const centerY = 250;

  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let px = -8; px <= 8; px += 0.1) {
      const py = a * px * px + b * px + c;
      if (py >= -8 && py <= 8) pts.push({ x: px, y: py });
    }
    return pts;
  }, [a, b, c]);

  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  const discriminant = b * b - 4 * a * c;
  const roots = useMemo(() => {
    if (discriminant < 0) return [];
    const sqrtD = Math.sqrt(discriminant);
    return [(-b + sqrtD) / (2 * a), (-b - sqrtD) / (2 * a)].sort((x1, x2) => x1 - x2);
  }, [a, b, discriminant]);

  const toScreen = (x: number, y: number) => ({ x: centerX + x * scale, y: centerY - y * scale });

  const pathD = points.length > 0
    ? `M ${toScreen(points[0].x, points[0].y).x} ${toScreen(points[0].x, points[0].y).y}` +
      points.slice(1).map(p => { const s = toScreen(p.x, p.y); return `L ${s.x} ${s.y}`; }).join('')
    : '';

  const axisTop = toScreen(vertexX, 8);
  const axisBottom = toScreen(vertexX, -8);

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">二次函数探索</h3>
        <div className="text-lg font-mono">
          <span className="text-cyan-400">{a > 0 ? '' : '-'}{Math.abs(a) === 1 ? '' : Math.abs(a).toFixed(1)}</span>
          <span className="text-white">x² </span>
          <span className="text-orange-400">{b >= 0 ? '+' : '-'}{Math.abs(b).toFixed(1)}</span>
          <span className="text-white">x </span>
          <span className="text-green-400">{c >= 0 ? '+' : '-'}{Math.abs(c).toFixed(1)}</span>
        </div>
      </div>
      
      <div className="flex-1 w-full overflow-auto flex items-center justify-center">
        <svg viewBox="0 0 500 500" className="w-full max-w-2xl bg-slate-900 rounded-xl" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="quadGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="500" height="500" fill="url(#quadGrid)" />

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

          {showAxis && <line x1={axisTop.x} y1={axisTop.y} x2={axisBottom.x} y2={axisBottom.y} stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />}

          {pathD && <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />}

          {showVertex && (
            <g>
              <circle cx={toScreen(vertexX, vertexY).x} cy={toScreen(vertexX, vertexY).y} r="8" fill="#f97316" />
              <text x={toScreen(vertexX, vertexY).x + 15} y={toScreen(vertexX, vertexY).y - 10} fill="#f97316" fontSize="12">
                顶点 ({vertexX.toFixed(2)}, {vertexY.toFixed(2)})
              </text>
            </g>
          )}

          {showRoots && roots.map((root, i) => (
            <g key={`root-${i}`}>
              <circle cx={toScreen(root, 0).x} cy={toScreen(root, 0).y} r="6" fill="#22c55e" />
              <text x={toScreen(root, 0).x} y={toScreen(root, 0).y + 25} fill="#22c55e" fontSize="12" textAnchor="middle">x{i + 1} = {root.toFixed(2)}</text>
            </g>
          ))}

          <circle cx={centerX} cy={centerY} r="4" fill="#64748b" />
        </svg>
      </div>
    </div>
  );
}
