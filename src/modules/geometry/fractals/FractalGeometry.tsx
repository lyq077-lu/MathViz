import { useEffect, useRef } from 'react';

export default function FractalGeometry() {
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
    
    // Draw Sierpinski Triangle
    const drawSierpinski = (x: number, y: number, size: number, depth: number) => {
      if (depth === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size / 2, y - size * Math.sin(Math.PI / 3));
        ctx.closePath();
        ctx.fillStyle = `hsl(${180 + depth * 10}, 70%, 50%)`;
        ctx.fill();
        return;
      }
      
      const newSize = size / 2;
      const height_offset = newSize * Math.sin(Math.PI / 3);
      
      drawSierpinski(x, y, newSize, depth - 1);
      drawSierpinski(x + newSize, y, newSize, depth - 1);
      drawSierpinski(x + newSize / 2, y - height_offset, newSize, depth - 1);
    };
    
    // Draw with animation
    let currentDepth = 0;
    const maxDepth = 6;
    
    const animate = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
      
      const startX = width / 2 - 150;
      const startY = height / 2 + 100;
      
      drawSierpinski(startX, startY, 300, currentDepth);
      
      // Title
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px sans-serif';
      ctx.fillText(`谢尔宾斯基三角形 (迭代深度: ${currentDepth})`, 20, 30);
      
      if (currentDepth < maxDepth) {
        currentDepth++;
        setTimeout(animate, 1000);
      }
    };
    
    animate();
  }, []);

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">分形几何</h3>
        <div className="text-slate-400 text-sm">自相似之美</div>
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
