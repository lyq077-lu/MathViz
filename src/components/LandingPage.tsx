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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* 导航栏 */}
      <nav className="w-full px-6 py-4 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                MathViz
              </h1>
              <p className="text-xs text-slate-500">数学可视化</p>
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
      <main className="flex-1 flex flex-col">
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-cyan-400">免费在线学习工具</span>
                </div>
                
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  让数学
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    动起来
                  </span>
                </h2>
                
                <p className="text-lg text-slate-400 max-w-lg">
                  通过交互式可视化动画，深入理解数学概念。
                  从三角函数到微积分，从几何到概率统计，
                  让抽象的数学变得直观易懂。
                </p>

                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>免费使用</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span>无需注册</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span>即开即用</span>
                  </div>
                </div>
              </motion.div>

              {/* 右侧：特性卡片 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {features.map((f, index) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    onClick={() => setSelectedFeature(f)}
                    className={`p-6 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-${f.color}-500/30 hover:bg-slate-800/80 transition-all group cursor-pointer`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-${f.color}-500/10 flex items-center justify-center mb-4 group-hover:bg-${f.color}-500/20 transition-colors`}>
                      <div className={`text-${f.color}-400`}>
                        {f.icon}
                      </div>
                    </div>
                    <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                    <p className="text-slate-400 text-sm">{f.shortDesc}</p>
                    <div className="flex items-center gap-1 mt-4 text-slate-500 text-sm group-hover:text-slate-300 transition-colors">
                      <span>了解详情</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 底部统计 */}
        <section className="px-6 py-12 border-t border-slate-700/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">14+</div>
                <div className="text-slate-500 text-sm">可视化模块</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">4</div>
                <div className="text-slate-500 text-sm">数学领域</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-slate-500 text-sm">免费使用</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">∞</div>
                <div className="text-slate-500 text-sm">探索可能</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-6 border-t border-slate-700/50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <p className="text-slate-500 text-sm">
              MathViz © 2026 - 数学可视化学习平台
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>代数</span>
              <span>·</span>
              <span>几何</span>
              <span>·</span>
              <span>微积分</span>
              <span>·</span>
              <span>概率</span>
            </div>
          </div>
        </footer>
      </main>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {feature && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            
            {/* 详情卡片 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
            >
              {/* 头部 */}
              <div className={`bg-${feature.color}-500/10 border-b border-${feature.color}-500/20 p-6`}>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-${feature.color}-500/20 flex items-center justify-center`}>
                    <div className={`text-${feature.color}-400`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                    <p className="text-slate-400">{feature.shortDesc}</p>
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
                    <Sparkles className={`w-4 h-4 text-${feature.color}-400`} />
                    功能亮点
                  </h4>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg"
                      >
                        <div className={`text-${feature.color}-400`}>
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
                        className={`px-3 py-1 rounded-full text-sm bg-${feature.color}-500/10 text-${feature.color}-400 border border-${feature.color}-500/20`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 底部提示 */}
                {!isLoggedIn && (
                  <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl">
                    <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
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
