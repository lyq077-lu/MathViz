import { FunctionSquare, Shapes, Calculator, Circle, Triangle, TrendingUp, Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimationProvider, useAnimation, type TrigonometryState, type LinearState, type QuadraticState, type PythagoreanState, type CircleState } from './contexts/AnimationContext';
import UnitCircle from './modules/functions/trigonometry/UnitCircle';
import LinearFunction from './modules/functions/linear/LinearFunction';
import QuadraticFunction from './modules/functions/quadratic/QuadraticFunction';
import PythagoreanTheorem from './modules/geometry/triangles/PythagoreanTheorem';
import CircleEquation from './modules/geometry/circles/CircleEquation';

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const topics: Topic[] = [
  { id: 'trigonometry', title: '三角函数', description: '单位圆与正弦波', icon: <Shapes className="w-5 h-5" />, component: <UnitCircle /> },
  { id: 'linear', title: '线性函数', description: 'y = kx + b', icon: <FunctionSquare className="w-5 h-5" />, component: <LinearFunction /> },
  { id: 'quadratic', title: '二次函数', description: '抛物线顶点', icon: <TrendingUp className="w-5 h-5" />, component: <QuadraticFunction /> },
  { id: 'pythagorean', title: '勾股定理', description: '拼图动画证明', icon: <Triangle className="w-5 h-5" />, component: <PythagoreanTheorem /> },
  { id: 'circle', title: '圆的方程', description: '标准方程', icon: <Circle className="w-5 h-5" />, component: <CircleEquation /> },
];

// ============ 左侧主题栏 ============
function LeftPanel() {
  const { activeTopic, setActiveTopic, reset } = useAnimation();

  return (
    <div 
      style={{ 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        width: '240px', 
        minWidth: '240px',
        maxWidth: '240px',
        height: '100vh',
        zIndex: 1000,
        flexShrink: 0
      }}
      className="bg-slate-900/95 backdrop-blur-md border-r border-slate-700 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              MathViz
            </h1>
            <p className="text-xs text-slate-500">数学可视化</p>
          </div>
        </div>
      </div>

      {/* Topic List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 px-2">选择主题</p>
        {topics.map((topic) => (
          <motion.button
            key={topic.id}
            onClick={() => { setActiveTopic(topic.id); reset(); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-3 rounded-xl border text-left transition-all ${
              activeTopic === topic.id
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${activeTopic === topic.id ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                {topic.icon}
              </div>
              <div className="min-w-0 overflow-hidden">
                <h3 className={`font-semibold text-sm ${activeTopic === topic.id ? 'text-cyan-400' : 'text-white'}`}>
                  {topic.title}
                </h3>
                <p className="text-slate-400 text-xs truncate">{topic.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 shrink-0">
        <p className="text-xs text-slate-500 text-center">MathViz © 2026</p>
      </div>
    </div>
  );
}

// ============ 播放控制 - 右上角悬浮 ============
function PlaybackControl() {
  const { isPlaying, setIsPlaying, reset } = useAnimation();

  return (
    <div 
      style={{ 
        position: 'fixed', 
        right: '16px', 
        top: '16px', 
        zIndex: 1001 
      }}
      className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-3 shadow-2xl flex items-center gap-2"
    >
      <span className="text-slate-400 text-sm mr-2 hidden sm:inline">播放控制</span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        <span className="text-sm">{isPlaying ? '暂停' : '播放'}</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={reset}
        className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg"
        title="重置"
      >
        <RotateCcw className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

// ============ 右侧参数设置栏 ============
function RightPanel() {
  const { activeTopic, isPlaying, setIsPlaying, trigState, linearState, quadraticState, pythagoreanState, circleState } = useAnimation();

  const renderControls = () => {
    switch (activeTopic) {
      case 'trigonometry':
        return <TrigControls state={trigState} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
      case 'linear':
        return <LinearControls state={linearState} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
      case 'quadratic':
        return <QuadraticControls state={quadraticState} />;
      case 'pythagorean':
        return <PythagoreanControls state={pythagoreanState} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
      case 'circle':
        return <CircleControls state={circleState} />;
      default:
        return null;
    }
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        right: 0, 
        top: '80px', 
        width: '300px', 
        minWidth: '300px',
        maxWidth: '300px',
        height: 'calc(100vh - 80px)',
        zIndex: 1000,
        flexShrink: 0
      }}
      className="bg-slate-900/95 backdrop-blur-md border-l border-slate-700 flex flex-col"
    >
      <div className="p-4 border-b border-slate-700 shrink-0">
        <h2 className="text-lg font-bold text-white">参数设置</h2>
        <p className="text-xs text-slate-500">调整动画参数</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {renderControls()}
      </div>
    </div>
  );
}

// ============ 主内容区 - 自适应 ============
function MainContent() {
  const { activeTopic } = useAnimation();
  const activeComponent = topics.find(t => t.id === activeTopic)?.component;

  return (
    <div 
      style={{ 
        position: 'fixed',
        left: '240px',
        right: '300px',
        top: 0,
        height: '100vh',
        overflow: 'auto'
      }}
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="min-h-full p-6 flex flex-col">
        <motion.div
          key={activeTopic}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {activeComponent}
        </motion.div>
      </div>
    </div>
  );
}

// ============ 各主题控制组件 ============
function TrigControls({ state, setIsPlaying }: { state: TrigonometryState; isPlaying?: boolean; setIsPlaying: (p: boolean) => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">角度调节</h4>
        <input
          type="range" min="0" max={Math.PI * 2} step="0.01" value={state.angle}
          onChange={(e) => { state.setAngle(parseFloat(e.target.value)); setIsPlaying(false); }}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>0°</span>
          <span className="text-cyan-400 font-mono">{(state.angle * 180 / Math.PI).toFixed(1)}°</span>
          <span>360°</span>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">显示选项</h4>
        <label className="flex items-center gap-3 mb-3 cursor-pointer">
          <input type="checkbox" checked={state.showSine} onChange={(e) => state.setShowSine(e.target.checked)} className="w-4 h-4 accent-pink-500" />
          <span className="text-pink-400 text-sm">显示正弦线</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={state.showCosine} onChange={(e) => state.setShowCosine(e.target.checked)} className="w-4 h-4 accent-green-500" />
          <span className="text-green-400 text-sm">显示余弦线</span>
        </label>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">当前值</h4>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex justify-between"><span className="text-slate-400">sin(θ):</span><span className="text-pink-400">{Math.sin(state.angle).toFixed(4)}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">cos(θ):</span><span className="text-green-400">{Math.cos(state.angle).toFixed(4)}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">tan(θ):</span><span className="text-cyan-400">{Math.tan(state.angle).toFixed(4)}</span></div>
        </div>
      </div>
    </div>
  );
}

function LinearControls({ state, setIsPlaying }: { state: LinearState; isPlaying?: boolean; setIsPlaying: (p: boolean) => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">斜率 (k)</h4>
        <input type="range" min="-3" max="3" step="0.1" value={state.slope}
          onChange={(e) => { state.setSlope(parseFloat(e.target.value)); setIsPlaying(false); }}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500" />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>-3</span><span className="text-orange-400 font-mono">{state.slope.toFixed(1)}</span><span>+3</span>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">截距 (b)</h4>
        <input type="range" min="-5" max="5" step="0.5" value={state.intercept}
          onChange={(e) => { state.setIntercept(parseFloat(e.target.value)); setIsPlaying(false); }}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>-5</span><span className="text-green-400 font-mono">{state.intercept.toFixed(1)}</span><span>+5</span>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">关键点</h4>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex justify-between"><span className="text-slate-400">y 轴交点:</span><span className="text-green-400">(0, {state.intercept.toFixed(1)})</span></div>
          <div className="flex justify-between"><span className="text-slate-400">x 轴交点:</span>
            <span className="text-cyan-400">{state.slope !== 0 ? `(${(-state.intercept/state.slope).toFixed(1)}, 0)` : '无'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuadraticControls({ state }: { state: QuadraticState }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">二次项 a</h4>
        <input type="range" min="-3" max="3" step="0.1" value={state.a}
          onChange={(e) => state.setA(parseFloat(e.target.value) || 0.1)}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>-3</span><span className="text-cyan-400 font-mono">{state.a.toFixed(1)}</span><span>+3</span>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">一次项 b</h4>
        <input type="range" min="-5" max="5" step="0.5" value={state.b}
          onChange={(e) => state.setB(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500" />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>-5</span><span className="text-orange-400 font-mono">{state.b.toFixed(1)}</span><span>+5</span>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">常数项 c</h4>
        <input type="range" min="-5" max="5" step="0.5" value={state.c}
          onChange={(e) => state.setC(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>-5</span><span className="text-green-400 font-mono">{state.c.toFixed(1)}</span><span>+5</span>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">显示选项</h4>
        <label className="flex items-center gap-3 mb-2 cursor-pointer">
          <input type="checkbox" checked={state.showVertex} onChange={(e) => state.setShowVertex(e.target.checked)} className="w-4 h-4 accent-orange-500" />
          <span className="text-orange-400 text-sm">显示顶点</span>
        </label>
        <label className="flex items-center gap-3 mb-2 cursor-pointer">
          <input type="checkbox" checked={state.showRoots} onChange={(e) => state.setShowRoots(e.target.checked)} className="w-4 h-4 accent-green-500" />
          <span className="text-green-400 text-sm">显示零点</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={state.showAxis} onChange={(e) => state.setShowAxis(e.target.checked)} className="w-4 h-4 accent-orange-500" />
          <span className="text-orange-400 text-sm">显示对称轴</span>
        </label>
      </div>
    </div>
  );
}

function PythagoreanControls({ state, isPlaying, setIsPlaying }: { state: PythagoreanState; isPlaying: boolean; setIsPlaying: (p: boolean) => void }) {
  const presets = [
    { a: 3, b: 4, name: '3-4-5' },
    { a: 5, b: 12, name: '5-12-13' },
    { a: 8, b: 15, name: '8-15-17' },
    { a: 1, b: 1, name: '等腰直角' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">动画进度</h4>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              state.setAnimationStep(0);
              setIsPlaying(true);
              let step = 0;
              const interval = setInterval(() => {
                step++;
                state.setAnimationStep(step);
                if (step >= 4) { clearInterval(interval); setIsPlaying(false); }
              }, 1500);
            }}
            disabled={isPlaying}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm">{isPlaying ? '播放中...' : '播放证明'}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { state.setAnimationStep(0); setIsPlaying(false); }}
            className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="flex gap-2 mt-3">
          {[0, 1, 2, 3, 4].map((step) => (
            <div key={step} className={`flex-1 h-2 rounded-full transition-colors ${state.animationStep >= step ? 'bg-cyan-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">常用勾股数</h4>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => (
            <button key={preset.name} onClick={() => { state.setA(preset.a); state.setB(preset.b); state.setAnimationStep(0); }}
              className={`p-2 rounded-lg text-sm font-medium transition-colors ${state.a === preset.a && state.b === preset.b ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              {preset.name}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-cyan-400 font-medium mb-3">直角边 a</h4>
        <input type="range" min="1" max="8" step="0.5" value={state.a}
          onChange={(e) => { state.setA(parseFloat(e.target.value)); state.setAnimationStep(0); }}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>1</span><span className="text-cyan-400 font-mono">{state.a}</span><span>8</span>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-orange-400 font-medium mb-3">直角边 b</h4>
        <input type="range" min="1" max="8" step="0.5" value={state.b}
          onChange={(e) => { state.setB(parseFloat(e.target.value)); state.setAnimationStep(0); }}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500" />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>1</span><span className="text-orange-400 font-mono">{state.b}</span><span>8</span>
        </div>
      </div>
    </div>
  );
}

function CircleControls({ state }: { state: CircleState }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-pink-400 font-medium mb-3">圆心横坐标 h</h4>
        <input type="range" min="-5" max="5" step="0.5" value={state.h}
          onChange={(e) => state.setH(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500" />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>-5</span><span className="text-pink-400 font-mono">{state.h.toFixed(1)}</span><span>+5</span>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-pink-400 font-medium mb-3">圆心纵坐标 k</h4>
        <input type="range" min="-5" max="5" step="0.5" value={state.k}
          onChange={(e) => state.setK(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500" />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>-5</span><span className="text-pink-400 font-mono">{state.k.toFixed(1)}</span><span>+5</span>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-cyan-400 font-medium mb-3">半径 r</h4>
        <input type="range" min="1" max="6" step="0.5" value={state.r}
          onChange={(e) => state.setR(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        <div className="flex justify-between text-sm text-slate-400 mt-2">
          <span>1</span><span className="text-cyan-400 font-mono">{state.r.toFixed(1)}</span><span>6</span>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">动点 P 位置</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm text-slate-400">
              <label>x 坐标</label><span>{state.pointP.x.toFixed(1)}</span>
            </div>
            <input type="range" min="-8" max="8" step="0.5" value={state.pointP.x}
              onChange={(e) => state.setPointP({ ...state.pointP, x: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between text-sm text-slate-400">
              <label>y 坐标</label><span>{state.pointP.y.toFixed(1)}</span>
            </div>
            <input type="range" min="-8" max="8" step="0.5" value={state.pointP.y}
              onChange={(e) => state.setPointP({ ...state.pointP, y: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ 主应用 ============
function AppContent() {
  return (
    <>
      <LeftPanel />
      <PlaybackControl />
      <RightPanel />
      <MainContent />
    </>
  );
}

function App() {
  return (
    <AnimationProvider>
      <AppContent />
    </AnimationProvider>
  );
}

export default App;
