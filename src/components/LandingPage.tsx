import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { 
  Calculator, Shapes, FunctionSquare, Triangle, Sparkles, ChevronRight, 
  X, Play, Eye, BookOpen, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface GoogleJwtPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

// 特性展示数据
const features = [
  {
    id: 'trigonometry',
    icon: <Shapes className="w-6 h-6" />,
    title: '三角函数',
    shortDesc: '单位圆与正弦波可视化',
    description: '通过动态单位圆，直观理解三角函数的本质。观察角度变化时正弦、余弦值的动态生成过程，掌握三角函数的周期性特征。',
    color: 'cyan',
    bgColor: '#06b6d4',
    highlights: [
      { icon: <Play className="w-4 h-4" />, text: '动态演示正弦、余弦生成过程' },
      { icon: <Eye className="w-4 h-4" />, text: '可视化角度与函数值关系' },
      { icon: <BookOpen className="w-4 h-4" />, text: '交互式调节角度参数' },
    ],
    topics: ['单位圆', '正弦函数', '余弦函数', '正切函数', '周期性'],
  },
  {
    id: 'algebra',
    icon: <FunctionSquare className="w-6 h-6" />,
    title: '代数与函数',
    shortDesc: '线性、二次、复数运算',
    description: '探索各类函数图像，理解代数之美。从线性函数到二次函数，从实数到复数，全面掌握代数核心概念。',
    color: 'orange',
    bgColor: '#f97316',
    highlights: [
      { icon: <Play className="w-4 h-4" />, text: '线性函数 y = kx + b 动态展示' },
      { icon: <Eye className="w-4 h-4" />, text: '二次函数顶点与对称轴可视化' },
      { icon: <BookOpen className="w-4 h-4" />, text: '复数在复平面上的运算' },
    ],
    topics: ['线性函数', '二次函数', '复数', '复平面', '函数变换'],
  },
  {
    id: 'geometry',
    icon: <Triangle className="w-6 h-6" />,
    title: '几何探索',
    shortDesc: '勾股定理、圆方程、分形',
    description: '用动画证明几何定理，探索分形的自相似之美。从经典定理到现代分形几何，领略数学的几何魅力。',
    color: 'purple',
    bgColor: '#a855f7',
    highlights: [
      { icon: <Play className="w-4 h-4" />, text: '勾股定理拼图动画证明' },
      { icon: <Eye className="w-4 h-4" />, text: '圆的标准方程可视化' },
      { icon: <BookOpen className="w-4 h-4" />, text: '谢尔宾斯基三角形分形' },
    ],
    topics: ['勾股定理', '圆方程', '分形', '自相似性', '几何证明'],
  },
  {
    id: 'probability',
    icon: <Sparkles className="w-6 h-6" />,
    title: '概率统计',
    shortDesc: '大数定律、正态分布、贝叶斯',
    description: '通过模拟实验理解概率统计的核心概念。从掷硬币到贝叶斯定理，用数据揭示随机现象背后的规律。',
    color: 'green',
    bgColor: '#22c55e',
    highlights: [
      { icon: <Play className="w-4 h-4" />, text: '掷硬币模拟大数定律' },
      { icon: <Eye className="w-4 h-4" />, text: '正态分布钟形曲线生成' },
      { icon: <BookOpen className="w-4 h-4" />, text: '贝叶斯定理概率更新' },
    ],
    topics: ['大数定律', '正态分布', '贝叶斯定理', '条件概率', '统计推断'],
  },
];

export function LandingPage() {
  const { setUser, isLoggedIn } = useAuth();
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  const handleSuccess = (credentialResponse: { credential?: string }) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
      const userData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };
      setUser(userData);
    }
  };

  const handleError = () => {
    console.error('Google 登录失败');
  };

  const feature = selectedFeature;

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
      }}
    >
      {/* 背景装饰 - 使用SVG确保显示 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* 网格背景 */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#06b6d4" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* 浮动装饰圆形 */}
        <div 
          className="absolute rounded-full opacity-20"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
            top: '-200px',
            right: '-200px',
            filter: 'blur(60px)'
          }}
        />
        <div 
          className="absolute rounded-full opacity-20"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
            bottom: '-150px',
            left: '-150px',
            filter: 'blur(60px)'
          }}
        />
        <div 
          className="absolute rounded-full opacity-15"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      {/* 导航栏 */}
      <nav 
        className="w-full px-6 py-4 sticky top-0 z-50"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(51, 65, 85, 0.5)'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
                boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)'
              }}
            >
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MathViz</h1>
              <p className="text-xs text-slate-400">数学可视化</p>
            </div>
          </div>
          
          {/* 顶部登录按钮 */}
          {!isLoggedIn && (
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap={false}
              theme="filled_black"
              size="medium"
              text="signin_with"
              shape="rectangular"
            />
          )}
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Hero 区域 */}
        <section className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 左侧：标题和描述 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)'
                  }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: '#22d3ee' }} />
                  <span className="text-sm font-medium" style={{ color: '#22d3ee' }}>免费在线学习工具</span>
                </div>
                
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  让数学
                  <span 
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #22d3ee, #60a5fa, #a78bfa)'
                    }}
                  >
                    动起来
                  </span>
                </h2>
                
                <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                  通过交互式可视化动画，深入理解数学概念。
                  从三角函数到微积分，从几何到概率统计，
                  让抽象的数学变得直观易懂。
                </p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e' }}
                    />
                    <span>免费使用</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#06b6d4', boxShadow: '0 0 8px #06b6d4' }}
                    />
                    <span>无需注册</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#a855f7', boxShadow: '0 0 8px #a855f7' }}
                    />
                    <span>即开即用</span>
                  </div>
                </div>
              </motion.div>

              {/* 右侧：特性卡片 */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((f, index) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    onClick={() => setSelectedFeature(f)}
                    className="group cursor-pointer rounded-2xl p-6 transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(51, 65, 85, 0.5)',
                      backdropFilter: 'blur(8px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = f.bgColor + '60';
                      e.currentTarget.style.boxShadow = `0 8px 30px ${f.bgColor}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.5)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-shadow duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${f.bgColor}, ${f.bgColor}dd)`,
                        boxShadow: `0 4px 15px ${f.bgColor}40`
                      }}
                    >
                      <div className="text-white">
                        {f.icon}
                      </div>
                    </div>
                    <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{f.title}</h3>
                    <p className="text-slate-400 text-sm">{f.shortDesc}</p>
                    <div className="flex items-center gap-1 mt-4 text-slate-500 text-sm group-hover:text-cyan-400 transition-colors">
                      <span>了解详情</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 底部统计 */}
        <section className="px-6 py-12" style={{ borderTop: '1px solid rgba(51, 65, 85, 0.3)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '14+', label: '可视化模块', color: '#06b6d4' },
                { value: '4', label: '数学领域', color: '#a855f7' },
                { value: '100%', label: '免费使用', color: '#22c55e' },
                { value: '∞', label: '探索可能', color: '#f97316' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center p-6 rounded-2xl transition-colors"
                  style={{
                    backgroundColor: 'rgba(30, 41, 59, 0.4)',
                    border: '1px solid rgba(51, 65, 85, 0.3)'
                  }}
                >
                  <div 
                    className="text-3xl font-bold mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer 
          className="px-6 py-6"
          style={{ borderTop: '1px solid rgba(51, 65, 85, 0.3)' }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <p className="text-slate-500 text-sm">
              MathViz © 2026 - 数学可视化学习平台
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>代数</span>
              <span className="text-slate-700">·</span>
              <span>几何</span>
              <span className="text-slate-700">·</span>
              <span>微积分</span>
              <span className="text-slate-700">·</span>
              <span>概率</span>
            </div>
          </div>
        </footer>
      </main>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {feature && (
          <div 
            className="fixed inset-0 z-[9999]"
            style={{ 
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedFeature(null);
            }}
          >
            {/* 详情卡片 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                border: '1px solid rgba(51, 65, 85, 0.5)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* 头部渐变背景 */}
              <div 
                className="p-6 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${feature.bgColor}30, ${feature.bgColor}10)`
                }}
              >
                {/* 装饰圆 */}
                <div 
                  className="absolute rounded-full"
                  style={{
                    width: '150px',
                    height: '150px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    filter: 'blur(40px)',
                    top: '-50px',
                    right: '-50px'
                  }}
                />
                
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-lg transition-colors z-10"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 relative z-10">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    <p className="text-white/80">{feature.shortDesc}</p>
                  </div>
                </div>
              </div>

              {/* 内容 */}
              <div className="p-6 space-y-6">
                {/* 描述 */}
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* 功能亮点 */}
                <div className="space-y-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Sparkles style={{ color: feature.bgColor }} />
                    功能亮点
                  </h4>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                      >
                        <div style={{ color: feature.bgColor }}>
                          {highlight.icon}
                        </div>
                        <span className="text-slate-300 text-sm">{highlight.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 包含主题 */}
                <div>
                  <h4 className="text-white font-semibold mb-3">包含主题</h4>
                  <div className="flex flex-wrap gap-2">
                    {feature.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: `${feature.bgColor}20`,
                          color: feature.bgColor,
                          border: `1px solid ${feature.bgColor}40`
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 底部提示 */}
                {!isLoggedIn && (
                  <div 
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(51, 65, 85, 0.3)',
                      border: '1px solid rgba(71, 85, 105, 0.5)'
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(71, 85, 105, 0.5)' }}
                    >
                      <Lock className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">登录后解锁完整功能</div>
                      <div className="text-slate-400 text-sm">请使用顶部导航栏的登录按钮</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
