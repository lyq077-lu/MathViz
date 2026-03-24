import { useState } from 'react';
import { FunctionSquare, Shapes, Calculator, Circle, Triangle, TrendingUp, Play, Pause, RotateCcw, ChevronDown, ChevronRight, Box, FlaskConical, Dices, Sigma, Infinity, Sparkles, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Tailwind safelist - 确保以下类名被包含在构建中
// bg-cyan-500/5 bg-cyan-500/20 border-cyan-500/20 border-cyan-500/50 text-cyan-300/80 text-cyan-400
// bg-orange-500/5 bg-orange-500/20 border-orange-500/20 border-orange-500/50 text-orange-300/80 text-orange-400
// bg-purple-500/5 bg-purple-500/20 border-purple-500/20 border-purple-500/50 text-purple-300/80 text-purple-400
// bg-green-500/5 bg-green-500/20 border-green-500/20 border-green-500/50 text-green-300/80 text-green-400
import { AnimationProvider, useAnimation, type TrigonometryState, type LinearState, type QuadraticState, type PythagoreanState, type CircleState } from './contexts/AnimationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserProfile } from './components/AuthModal';
import { LandingPage } from './components/LandingPage';
import { PersonalCenter } from './components/PersonalCenter';
import UnitCircle from './modules/functions/trigonometry/UnitCircle';
import LinearFunction from './modules/functions/linear/LinearFunction';
import QuadraticFunction from './modules/functions/quadratic/QuadraticFunction';
import ComplexNumbers from './modules/algebra/complex/ComplexNumbers';
import PythagoreanTheorem from './modules/geometry/triangles/PythagoreanTheorem';
import CircleEquation from './modules/geometry/circles/CircleEquation';
import FractalGeometry from './modules/geometry/fractals/FractalGeometry';
import LimitConcept from './modules/calculus/limits/LimitConcept';
import DerivativeGeometry from './modules/calculus/derivatives/DerivativeGeometry';
import RiemannSum from './modules/calculus/integrals/RiemannSum';
import DifferentialEquations from './modules/calculus/diff-equations/DifferentialEquations';
import LawOfLargeNumbers from './modules/probability/laws-of-large-numbers/LawOfLargeNumbers';
import NormalDistribution from './modules/probability/distributions/NormalDistribution';
import BayesianTheorem from './modules/probability/bayesian/BayesianTheorem';

// ============ 类型定义 ============
interface SubTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface TopicGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  subTopics: SubTopic[];
}

// ============ 导航配置 ============
const topicGroups: TopicGroup[] = [
  {
    id: 'algebra',
    title: '代数与函数',
    icon: <FunctionSquare className="w-5 h-5" />,
    color: 'cyan',
    subTopics: [
      { id: 'trigonometry', title: '三角函数', description: '单位圆与正弦波', icon: <Shapes className="w-4 h-4" />, component: <UnitCircle /> },
      { id: 'linear', title: '线性函数', description: 'y = kx + b', icon: <TrendingUp className="w-4 h-4" />, component: <LinearFunction /> },
      { id: 'quadratic', title: '二次函数', description: '抛物线顶点', icon: <Box className="w-4 h-4" />, component: <QuadraticFunction /> },
      { id: 'complex', title: '复数', description: '复平面与运算', icon: <Hexagon className="w-4 h-4" />, component: <ComplexNumbers /> },
    ]
  },
  {
    id: 'geometry',
    title: '几何探索',
    icon: <Triangle className="w-5 h-5" />,
    color: 'orange',
    subTopics: [
      { id: 'pythagorean', title: '勾股定理', description: '拼图动画证明', icon: <Triangle className="w-4 h-4" />, component: <PythagoreanTheorem /> },
      { id: 'circle', title: '圆的方程', description: '标准方程', icon: <Circle className="w-4 h-4" />, component: <CircleEquation /> },
      { id: 'fractals', title: '分形几何', description: '自相似之美', icon: <Sparkles className="w-4 h-4" />, component: <FractalGeometry /> },
    ]
  },
  {
    id: 'calculus',
    title: '微积分入门',
    icon: <FlaskConical className="w-5 h-5" />,
    color: 'purple',
    subTopics: [
      { id: 'limits', title: '极限概念', description: 'ε-δ定义', icon: <Infinity className="w-4 h-4" />, component: <LimitConcept /> },
      { id: 'derivatives', title: '导数几何', description: '切线与斜率', icon: <Sigma className="w-4 h-4" />, component: <DerivativeGeometry /> },
      { id: 'integrals', title: '黎曼和', description: '积分堆积', icon: <Box className="w-4 h-4" />, component: <RiemannSum /> },
      { id: 'diff-equations', title: '微分方程', description: '向量场轨迹', icon: <TrendingUp className="w-4 h-4" />, component: <DifferentialEquations /> },
    ]
  },
  {
    id: 'probability',
    title: '概率统计',
    icon: <Dices className="w-5 h-5" />,
    color: 'green',
    subTopics: [
      { id: 'law-of-large-numbers', title: '大数定律', description: '频率稳定性', icon: <TrendingUp className="w-4 h-4" />, component: <LawOfLargeNumbers /> },
      { id: 'normal-distribution', title: '正态分布', description: '钟形曲线', icon: <Box className="w-4 h-4" />, component: <NormalDistribution /> },
      { id: 'bayesian', title: '贝叶斯定理', description: '概率更新', icon: <Hexagon className="w-4 h-4" />, component: <BayesianTheorem /> },
    ]
  },
];

// 扁平化所有子主题供查找
const allTopics = topicGroups.flatMap(g => g.subTopics);

// ============ 左侧主题栏（一二级目录结构） ============
function LeftPanel() {
  const { activeTopic, setActiveTopic, reset } = useAnimation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['algebra', 'geometry', 'calculus', 'probability']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  // 获取颜色样式 - 使用内联样式确保颜色生效
  const getGroupStyles = (color: string, isActive: boolean) => {
    const colors: Record<string, { bg: string; border: string; text: string; iconBg: string; iconText: string; indicator: string; bgInactive: string; borderInactive: string }> = {
      cyan: {
        bg: 'rgba(6, 182, 212, 0.2)',
        border: 'rgba(6, 182, 212, 0.5)',
        text: 'text-cyan-400',
        iconBg: 'bg-cyan-500',
        iconText: 'text-white',
        indicator: 'bg-cyan-500',
        bgInactive: 'rgba(6, 182, 212, 0.08)',
        borderInactive: 'rgba(6, 182, 212, 0.25)'
      },
      orange: {
        bg: 'rgba(249, 115, 22, 0.2)',
        border: 'rgba(249, 115, 22, 0.5)',
        text: 'text-orange-400',
        iconBg: 'bg-orange-500',
        iconText: 'text-white',
        indicator: 'bg-orange-500',
        bgInactive: 'rgba(249, 115, 22, 0.08)',
        borderInactive: 'rgba(249, 115, 22, 0.25)'
      },
      purple: {
        bg: 'rgba(168, 85, 247, 0.2)',
        border: 'rgba(168, 85, 247, 0.5)',
        text: 'text-purple-400',
        iconBg: 'bg-purple-500',
        iconText: 'text-white',
        indicator: 'bg-purple-500',
        bgInactive: 'rgba(168, 85, 247, 0.08)',
        borderInactive: 'rgba(168, 85, 247, 0.25)'
      },
      green: {
        bg: 'rgba(34, 197, 94, 0.2)',
        border: 'rgba(34, 197, 94, 0.5)',
        text: 'text-green-400',
        iconBg: 'bg-green-500',
        iconText: 'text-white',
        indicator: 'bg-green-500',
        bgInactive: 'rgba(34, 197, 94, 0.08)',
        borderInactive: 'rgba(34, 197, 94, 0.25)'
      }
    };
    const c = colors[color] || colors.cyan;
    return {
      bg: isActive ? c.bg : c.bgInactive,
      border: isActive ? c.border : c.borderInactive,
      text: c.text,
      iconBg: c.iconBg,
      iconText: isActive ? 'text-white' : c.text,
      indicator: c.indicator
    };
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        width: '260px', 
        minWidth: '260px',
        maxWidth: '260px',
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

      {/* Topic Groups */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 min-h-0">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 px-2">选择主题</p>
        
        {topicGroups.map((group) => {
          const isExpanded = expandedGroups.includes(group.id);
          const hasSubTopics = group.subTopics.length > 0;
          const isGroupActive = group.subTopics.some(t => t.id === activeTopic);
          const groupStyle = getGroupStyles(group.color, isGroupActive);

          return (
            <div key={group.id} className="mb-2">
              {/* 一级目录：模块分组 */}
              <motion.button
                onClick={() => hasSubTopics && toggleGroup(group.id)}
                whileHover={{ scale: hasSubTopics ? 1.01 : 1 }}
                whileTap={{ scale: hasSubTopics ? 0.99 : 1 }}
                disabled={!hasSubTopics}
                style={{ backgroundColor: groupStyle.bg, borderColor: groupStyle.border }}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  !hasSubTopics ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${groupStyle.iconBg} ${groupStyle.iconText}`}>
                    {group.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm ${groupStyle.text}`}>
                      {group.title}
                    </h3>
                  </div>
                  {hasSubTopics && (
                    <div className="text-slate-500">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  )}
                  {!hasSubTopics && (
                    <span className="text-xs text-slate-600 px-2 py-0.5 rounded bg-slate-800">待开发</span>
                  )}
                </div>
              </motion.button>

              {/* 二级目录：具体功能 */}
              <AnimatePresence>
                {isExpanded && hasSubTopics && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 pl-4 border-l-2 border-slate-700/50 mt-1 space-y-1">
                      {group.subTopics.map((topic) => {
                        const isActive = activeTopic === topic.id;
                        const topicStyle = getGroupStyles(group.color, isActive);

                        return (
                          <motion.button
                            key={topic.id}
                            onClick={() => { setActiveTopic(topic.id); reset(); }}
                            whileHover={{ scale: 1.02, x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ backgroundColor: topicStyle.bg, borderColor: topicStyle.border }}
                            className="w-full p-2.5 rounded-lg border text-left transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded shrink-0 ${topicStyle.iconBg} ${topicStyle.iconText}`}>
                                {topic.icon}
                              </div>
                              <div className="min-w-0 overflow-hidden">
                                <h4 className={`font-medium text-sm ${isActive ? topicStyle.text : 'text-slate-300'}`}>
                                  {topic.title}
                                </h4>
                                <p className="text-slate-500 text-xs truncate">{topic.description}</p>
                              </div>
                              {isActive && (
                                <div className={`ml-auto w-1.5 h-1.5 rounded-full ${topicStyle.indicator}`} />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 shrink-0">
        <p className="text-xs text-slate-500 text-center">MathViz © 2026</p>
      </div>
    </div>
  );
}

// ============ 播放控制组件 ============
function PlaybackControlInline() {
  const { isPlaying, setIsPlaying, reset } = useAnimation();

  return (
    <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
      <p className="text-xs text-slate-400 mb-2">播放控制</p>
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-sm">{isPlaying ? '暂停' : '播放'}</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={reset}
          className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg"
          title="重置"
        >
          <RotateCcw className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}

// ============ 右侧参数设置栏 ============
interface RightPanelProps {
  onPersonalCenter?: () => void;
}

function RightPanel({ onPersonalCenter }: RightPanelProps) {
  const { activeTopic, isPlaying, setIsPlaying, trigState, linearState, quadraticState, pythagoreanState, circleState } = useAnimation();

  const renderControls = () => {
    switch (activeTopic) {
      case 'trigonometry':
        return <TrigControls state={trigState} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
      case 'linear':
        return <LinearControls state={linearState} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
      case 'quadratic':
        return <QuadraticControls state={quadraticState} />;
      case 'complex':
        return <ComplexControls />;
      case 'pythagorean':
        return <PythagoreanControls state={pythagoreanState} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />;
      case 'circle':
        return <CircleControls state={circleState} />;
      case 'fractals':
        return <FractalControls />;
      case 'limits':
        return <LimitControls />;
      case 'derivatives':
        return <DerivativeControls />;
      case 'law-of-large-numbers':
        return <LawOfLargeNumbersControls />;
      case 'integrals':
        return <IntegralControls />;
      case 'diff-equations':
        return <DiffEquationControls />;
      case 'normal-distribution':
        return <NormalDistControls />;
      case 'bayesian':
        return <BayesianControls />;
      default:
        return <PlaceholderControls topic={activeTopic} />;
    }
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        right: 0, 
        top: 0, 
        width: '300px', 
        minWidth: '300px',
        maxWidth: '300px',
        height: '100vh',
        zIndex: 1000,
        flexShrink: 0
      }}
      className="bg-slate-900/95 backdrop-blur-md border-l border-slate-700 flex flex-col"
    >
      {/* 用户登录区域 - 置顶 */}
      <div className="p-4 border-b border-slate-700 shrink-0">
        <UserProfile onPersonalCenter={onPersonalCenter} />
      </div>
      {/* 播放控制 */}
      <div className="p-4 border-b border-slate-700 shrink-0">
        <PlaybackControlInline />
      </div>
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
  const activeComponent = allTopics.find(t => t.id === activeTopic)?.component;

  return (
    <div 
      style={{ 
        position: 'fixed',
        left: '260px',
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

// ============ 新模块控制组件 ============
function ComplexControls() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-cyan-400 font-medium mb-3">复数概念</h4>
        <div className="text-slate-300 text-sm space-y-2">
          <p>复数 z = a + bi</p>
          <p>其中 a 为实部，b 为虚部</p>
          <p>模长 |z| = √(a² + b²)</p>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">操作说明</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• 观察复数在复平面上的位置</li>
          <li>• 查看模长和幅角的变化</li>
          <li>• 理解直角坐标与极坐标转换</li>
        </ul>
      </div>
    </div>
  );
}

function FractalControls() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-orange-400 font-medium mb-3">分形几何</h4>
        <div className="text-slate-300 text-sm space-y-2">
          <p>谢尔宾斯基三角形</p>
          <p>自相似的经典分形图案</p>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">动画说明</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• 自动展示迭代过程</li>
          <li>• 观察递归生成模式</li>
          <li>• 从简单到复杂的演变</li>
        </ul>
      </div>
    </div>
  );
}

function LimitControls() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-purple-400 font-medium mb-3">极限定义</h4>
        <div className="text-slate-300 text-sm space-y-2">
          <p>ε-δ 定义: lim(x→a)f(x) = L</p>
          <p>∀ε&gt;0, ∃δ&gt;0, 当|x-a|&lt;δ时, |f(x)-L|&lt;ε</p>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">可视化说明</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• 紫色带: ε-邻域 (y值范围)</li>
          <li>• 青色带: δ-邻域 (x值范围)</li>
          <li>• 观察当x趋近于2时f(x)趋近于4</li>
        </ul>
      </div>
    </div>
  );
}

function DerivativeControls() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-purple-400 font-medium mb-3">导数定义</h4>
        <div className="text-slate-300 text-sm space-y-2">
          <p>f'(x) = lim(h→0) [f(x+h)-f(x)]/h</p>
          <p>几何意义: 切线斜率</p>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">图例说明</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• 紫色线: 切线 (导数)</li>
          <li>• 橙色虚线: 割线 (差商)</li>
          <li>• 绿色曲线: 函数 f(x)=x²</li>
        </ul>
      </div>
    </div>
  );
}

function LawOfLargeNumbersControls() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-green-400 font-medium mb-3">大数定律</h4>
        <div className="text-slate-300 text-sm space-y-2">
          <p>随着试验次数增加</p>
          <p>事件频率趋近于其理论概率</p>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">操作说明</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• 点击"开始"模拟掷硬币</li>
          <li>• 观察正面频率趋近于50%</li>
          <li>• 绿线表示50%基准线</li>
        </ul>
      </div>
    </div>
  );
}

function PlaceholderControls({ topic }: { topic: string }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">{topic}</h4>
        <p className="text-slate-400 text-sm">该模块暂无参数控制</p>
      </div>
    </div>
  );
}

function IntegralControls() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-purple-400 font-medium mb-3">黎曼和</h4>
        <div className="text-slate-300 text-sm space-y-2">
          <p>∫₀³ x² dx = 9</p>
          <p>通过矩形面积逼近积分值</p>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">说明</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• 紫色矩形: 黎曼和近似</li>
          <li>• 绿色曲线: 真实函数</li>
          <li>• 分区越多越精确</li>
        </ul>
      </div>
    </div>
  );
}

function DiffEquationControls() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-purple-400 font-medium mb-3">微分方程</h4>
        <div className="text-slate-300 text-sm space-y-2">
          <p>dy/dt = -y</p>
          <p>指数衰减模型</p>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">图例</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• 紫色向量: 方向场</li>
          <li>• 绿色轨迹: 解曲线</li>
          <li>• 橙色点: 初始条件</li>
        </ul>
      </div>
    </div>
  );
}

function NormalDistControls() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-green-400 font-medium mb-3">正态分布</h4>
        <div className="text-slate-300 text-sm space-y-2">
          <p>N(μ, σ²) - 钟形曲线</p>
          <p>68-95-99.7 规则</p>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">操作</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• 点击"生成"开始采样</li>
          <li>• 观察钟形曲线形成</li>
          <li>• 样本越多越接近理论</li>
        </ul>
      </div>
    </div>
  );
}

function BayesianControls() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-green-400 font-medium mb-3">贝叶斯定理</h4>
        <div className="text-slate-300 text-sm space-y-2">
          <p>P(A|B) = P(B|A)·P(A) / P(B)</p>
          <p>后验 ∝ 似然 × 先验</p>
        </div>
      </div>
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-3">调节参数</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• 先验: 初始信念</li>
          <li>• 似然: 证据强度</li>
          <li>• 假阳性: 误差率</li>
        </ul>
      </div>
    </div>
  );
}

// ============ 主应用（登录后） ============
function MainApp({ onPersonalCenter }: { onPersonalCenter: () => void }) {
  return (
    <>
      <LeftPanel />
      <RightPanel onPersonalCenter={onPersonalCenter} />
      <MainContent />
    </>
  );
}

// ============ 应用路由 ============
function AppContent() {
  const { isLoggedIn } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'main' | 'personal'>('landing');

  // 根据登录状态和当前视图显示不同页面
  // 1. 未登录 -> 显示首页 LandingPage
  // 2. 已登录 + main -> 显示主应用 MainApp
  // 3. 已登录 + personal -> 显示个人中心 PersonalCenter

  if (!isLoggedIn) {
    return <LandingPage />;
  }

  // 切换到个人中心
  if (currentView === 'personal') {
    return <PersonalCenter onBack={() => setCurrentView('main')} />;
  }

  // 显示主应用
  return <MainApp onPersonalCenter={() => setCurrentView('personal')} />;
}

// Google OAuth 客户端 ID
// 注意：请替换为你从 Google Cloud Console 获取的实际客户端 ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <AnimationProvider>
          <AppContent />
        </AnimationProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
