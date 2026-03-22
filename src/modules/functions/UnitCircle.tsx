import { useEffect, useRef } from 'react';
import { useAnimation } from '../../contexts/AnimationContext';

export default function UnitCircle() {
  const animationRef = useRef<number | undefined>(undefined);
  const { isPlaying, trigState } = useAnimation();
  const { angle, setAngle, showSine, showCosine } = trigState;

  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setAngle((prev: number) => (prev + 0.02) % (Math.PI * 2));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, setAngle]);

  // Calculate positions
  const radius = 140;
  const centerX = 200;
  const centerY = 200;
  const waveOffset = 400;

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">单位圆与三角函数</h3>
        <div className="text-slate-400 font-mono">θ = {(angle * 180 / Math.PI).toFixed(1)}°</div>
      </div>
      
      <div className="flex-1 w-full overflow-auto flex items-center justify-center">
        <svg viewBox="0 0 700 400" className="w-full max-w-4xl bg-slate-900 rounded-xl" preserveAspectRatio="xMidYMid meet">
          {/* Grid */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="700" height="400" fill="url(#grid)" />

          {/* Unit Circle */}
          <g transform={`translate(${centerX}, ${centerY})`}>
            <circle r={radius} fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="-160" y1="0" x2="160" y2="0" stroke="#64748b" strokeWidth="2" />
            <line x1="0" y1="-160" x2="0" y2="160" stroke="#64748b" strokeWidth="2" />
            
            {/* Angle arc */}
            <path
              d={`M 50 0 A 50 50 0 ${angle > Math.PI ? 1 : 0} 0 ${50 * Math.cos(angle)} ${-50 * Math.sin(angle)}`}
              fill="none" stroke="#f97316" strokeWidth="3"
            />
            <text x="60" y="-25" fill="#f97316" fontSize="16">θ</text>

            {/* Radius line */}
            <line x1="0" y1="0" x2={radius * Math.cos(angle)} y2={-radius * Math.sin(angle)} stroke="#06b6d4" strokeWidth="3" />

            {/* Point on circle */}
            <circle cx={radius * Math.cos(angle)} cy={-radius * Math.sin(angle)} r="10" fill="#06b6d4" />

            {/* Sine projection */}
            {showSine && (
              <>
                <line x1={radius * Math.cos(angle)} y1={-radius * Math.sin(angle)} x2={radius * Math.cos(angle)} y2="0" stroke="#ec4899" strokeWidth="3" strokeDasharray="5,5" />
                <text x={radius * Math.cos(angle) + 15} y={-radius * Math.sin(angle) / 2} fill="#ec4899" fontSize="14">sin(θ)</text>
              </>
            )}

            {/* Cosine projection */}
            {showCosine && (
              <>
                <line x1="0" y1="0" x2={radius * Math.cos(angle)} y2="0" stroke="#22c55e" strokeWidth="3" strokeDasharray="5,5" />
                <text x={radius * Math.cos(angle) / 2} y="25" fill="#22c55e" fontSize="14">cos(θ)</text>
              </>
            )}
          </g>

          {/* Sine Wave */}
          <g transform={`translate(${waveOffset}, ${centerY})`}>
            <text x="0" y="-160" fill="#94a3b8" fontSize="16">y = sin(θ)</text>
            <line x1="0" y1="0" x2="280" y2="0" stroke="#475569" strokeWidth="1" />
            <line x1="0" y1="-140" x2="0" y2="140" stroke="#475569" strokeWidth="1" />
            
            {/* Sine curve */}
            <path
              d={`M 0 ${-radius * Math.sin(0)} ${Array.from({ length: Math.floor(angle * 50) }, (_, i) => {
                const a = i / 50;
                return `L ${i} ${-radius * Math.sin(a)}`;
              }).join(' ')}`}
              fill="none" stroke="#ec4899" strokeWidth="3"
            />
            <circle cx={angle * 50} cy={-radius * Math.sin(angle)} r="8" fill="#ec4899" />
            <line x1={-200 + radius * Math.cos(angle)} y1={-radius * Math.sin(angle)} x2="0" y2={-radius * Math.sin(angle)} stroke="#ec4899" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}
