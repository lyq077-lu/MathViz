import { AnimatePresence, motion } from 'framer-motion';
import { useAnimation } from '../contexts/AnimationContext';

export default function PythagoreanTheorem() {
  const { pythagoreanState } = useAnimation();
  const { a, b, animationStep } = pythagoreanState;

  const c = Math.sqrt(a * a + b * b);
  const scale = 45;

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">勾股定理探索</h3>
        <div className="text-xl font-mono">
          <span className="text-cyan-400">{a}²</span>
          <span className="text-white"> + </span>
          <span className="text-orange-400">{b}²</span>
          <span className="text-white"> = </span>
          <span className="text-green-400">{c.toFixed(0)}²</span>
        </div>
      </div>
      
      <div className="flex-1 w-full overflow-auto flex items-center justify-center">
        <svg viewBox="0 0 500 400" className="w-full max-w-3xl bg-slate-900 rounded-xl" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="pythagGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.3"/>
            </pattern>
            <pattern id="patternA" patternUnits="userSpaceOnUse" width="10" height="10">
              <rect width="10" height="10" fill="#06b6d4" fillOpacity="0.3"/>
              <circle cx="5" cy="5" r="2" fill="#06b6d4"/>
            </pattern>
            <pattern id="patternB" patternUnits="userSpaceOnUse" width="10" height="10">
              <rect width="10" height="10" fill="#f97316" fillOpacity="0.3"/>
              <rect x="2" y="2" width="6" height="6" fill="#f97316"/>
            </pattern>
            <pattern id="patternC" patternUnits="userSpaceOnUse" width="10" height="10">
              <rect width="10" height="10" fill="#22c55e" fillOpacity="0.3"/>
              <path d="M 0 10 L 5 0 L 10 10 Z" fill="#22c55e"/>
            </pattern>
          </defs>
          <rect width="500" height="400" fill="url(#pythagGrid)" />

          <g transform="translate(120, 100)">
            {/* Right triangle */}
            <polygon points={`0,${a * scale} 0,0 ${b * scale},0`} fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="3" />
            <path d="M 15,0 L 15,15 L 0,15" fill="none" stroke="#64748b" strokeWidth="2" />
            <text x="-30" y={a * scale / 2} fill="#06b6d4" fontSize="20" fontWeight="bold">a</text>
            <text x={b * scale / 2} y="-20" fill="#f97316" fontSize="20" fontWeight="bold">b</text>
            <text x={b * scale / 2 + 15} y={a * scale / 2} fill="#22c55e" fontSize="20" fontWeight="bold">c</text>

            {/* Square on side a */}
            <AnimatePresence>
              {animationStep >= 1 && (
                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                  <rect x={-a * scale} y="0" width={a * scale} height={a * scale} fill="url(#patternA)" stroke="#06b6d4" strokeWidth="2" />
                  <text x={-a * scale / 2} y={a * scale / 2 + 6} fill="#06b6d4" fontSize="16" textAnchor="middle">a² = {a * a}</text>
                </motion.g>
              )}
            </AnimatePresence>

            {/* Square on side b */}
            <AnimatePresence>
              {animationStep >= 2 && (
                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                  <rect x="0" y={-b * scale} width={b * scale} height={b * scale} fill="url(#patternB)" stroke="#f97316" strokeWidth="2" />
                  <text x={b * scale / 2} y={-b * scale / 2 + 6} fill="#f97316" fontSize="16" textAnchor="middle">b² = {b * b}</text>
                </motion.g>
              )}
            </AnimatePresence>

            {/* Square on side c */}
            <AnimatePresence>
              {animationStep >= 3 && (
                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                  <g transform={`translate(${b * scale}, 0) rotate(${-Math.atan(a/b) * 180 / Math.PI})`}>
                    <rect x="0" y={-c * scale} width={c * scale} height={c * scale} fill="url(#patternC)" stroke="#22c55e" strokeWidth="2" />
                  </g>
                  <text x={b * scale / 2 + 30} y={a * scale / 2 - 30} fill="#22c55e" fontSize="16">c² = {(c * c).toFixed(0)}</text>
                </motion.g>
              )}
            </AnimatePresence>

            {/* Verification checkmark */}
            <AnimatePresence>
              {animationStep >= 4 && (
                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                  <circle cx="180" cy="180" r="30" fill="#22c55e" />
                  <path d="M 165 180 L 175 190 L 195 170" stroke="white" strokeWidth="5" fill="none" />
                </motion.g>
              )}
            </AnimatePresence>
          </g>

          <g transform="translate(250, 360)" textAnchor="middle">
            <text fill="white" fontSize="28" fontWeight="bold">a² + b² = c²</text>
            <text y="30" fill="#94a3b8" fontSize="18">{a}² + {b}² = {c.toFixed(2)}²</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
