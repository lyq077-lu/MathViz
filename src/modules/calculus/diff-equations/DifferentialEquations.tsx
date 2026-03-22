import { useEffect, useRef } from 'react';

export default function DifferentialEquations() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);
    
    // Draw vector field for dy/dx = -y/x (decay)
    const drawVectorField = () => {
      const gridSize = 30;
      
      for (let x = gridSize; x < width; x += gridSize) {
        for (let y = gridSize; y < height; y += gridSize) {
          const centerX = width / 2;
          const centerY = height / 2;
          const dx = (x - centerX) / 50;
          const dy = -(y - centerY) / 50;
          
          const angle = Math.atan2(dy, dx);
          const length = 15;
          
          const endX = x + Math.cos(angle) * length;
          const endY = y + Math.sin(angle) * length;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Arrow head
          ctx.beginPath();
          ctx.moveTo(endX, endY);
          ctx.lineTo(endX - 5 * Math.cos(angle - 0.5), endY - 5 * Math.sin(angle - 0.5));
          ctx.lineTo(endX - 5 * Math.cos(angle + 0.5), endY - 5 * Math.sin(angle + 0.5));
          ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
          ctx.fill();
        }
      }
    };
    
    // Draw solution trajectory
    const drawTrajectory = () => {
      ctx.beginPath();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      
      let x = 50;
      let y = height - 50;
      
      ctx.moveTo(x, y);
      
      for (let i = 0; i < 200; i++) {
        const centerX = width / 2;
        const centerY = height / 2;
        const dx = (x - centerX) / 100;
        const dy = -(y - centerY) / 100;
        
        x += dx;
        y += dy;
        
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      
      // Draw start point
      ctx.beginPath();
      ctx.arc(50, height - 50, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f97316';
      ctx.fill();
    };
    
    drawVectorField();
    drawTrajectory();
    
    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('向量场与轨迹追踪', 20, 30);
    ctx.fillText('dy/dt = -y', 20, 55);
    
  }, []);

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">微分方程</h3>
        <div className="text-slate-400 text-sm font-mono">dy/dt = -y</div>
      </div>
      
      <div className="flex-1 w-full overflow-auto flex items-center justify-center">
        <canvas 
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full max-w-3xl bg-slate-900 rounded-xl"
        />
      </div>
    </div>
  );
}
