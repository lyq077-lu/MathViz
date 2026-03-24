import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Calculator, Shapes, FunctionSquare, Triangle, Sparkles, ChevronRight, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

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
    description: '单位圆与正弦波可视化',
    color: 'cyan',
  },
  {
    id: 'algebra',
    icon: <FunctionSquare className="w-6 h-6" />,
    title: '代数与函数',
    description: '线性、二次、复数运算',
    color: 'orange',
  },
  {
    id: 'geometry',
    icon: <Triangle className="w-6 h-6" />,
    title: '几何探索',
    description: '勾股定理、圆方程、分形',
    color: 'purple',
  },
  {
    id: 'probability',
    icon: <Sparkles className="w-6 h-6" />,
    title: '概率统计',
    description: '大数定律、正态分布、贝叶斯',
    color: 'green',
  },
];

export function LandingPage() {
  const { setUser } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loginKey, setLoginKey] = useState(0);

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

  // 当弹窗打开时，强制重新渲染Google登录按钮
  useEffect(() => {
    if (showLogin) {
      setLoginKey(prev => prev + 1);
    }
  }, [showLogin]);

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
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap={false}
            theme="filled_black"
            size="medium"
            text="signin_with"
            shape="rectangular"
          />
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
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    onClick={() => setShowLogin(true)}
                    className={`p-6 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-${feature.color}-500/30 hover:bg-slate-800/80 transition-all group cursor-pointer`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:bg-${feature.color}-500/20 transition-colors`}>
                      <div className={`text-${feature.color}-400`}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
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

      {/* 居中登录弹窗 */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            className="fixed inset-0 z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 背景遮罩 */}
            <motion.div
              className="absolute inset-0 bg-slate-900/90"
              onClick={() => setShowLogin(false)}
              style={{ backdropFilter: 'blur(8px)' }}
            />
            
            {/* 居中容器 */}
            <div 
              className="absolute inset-0 flex items-center justify-center p-4"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-sm"
              >
                <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                  {/* 头部背景 */}
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 pb-0">
                    {/* 关闭按钮 */}
                    <button
                      onClick={() => setShowLogin(false)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* 图标 */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* 内容区域 */}
                  <div className="p-6 pt-4">
                    {/* 标题 */}
                    <h2 className="text-2xl font-bold text-white text-center mb-2">
                      欢迎访问 MathViz
                    </h2>
                    <p className="text-slate-400 text-center mb-6">
                      登录后即可开始学习之旅
                    </p>
                    
                    {/* Google 登录按钮容器 - 确保可见 */}
                    <div 
                      className="flex justify-center bg-slate-900/50 rounded-xl p-4 border border-slate-700/50"
                      style={{ minHeight: '50px' }}
                    >
                      <div key={loginKey} className="google-login-wrapper">
                        <GoogleLogin
                          onSuccess={handleSuccess}
                          onError={handleError}
                          useOneTap={false}
                          theme="filled_black"
                          size="large"
                          width="250"
                          text="signin_with"
                          shape="rectangular"
                        />
                      </div>
                    </div>
                    
                    {/* 提示 */}
                    <div className="mt-4 text-center">
                      <p className="text-xs text-slate-500">
                        使用 Google 账号快速登录
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
