import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Calculator, Shapes, FunctionSquare, Triangle, Sparkles, ChevronRight, Lock } from 'lucide-react';
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
  const [loginReady, setLoginReady] = useState(false);

  // 弹窗打开后延迟渲染Google登录按钮，确保容器已准备好
  useEffect(() => {
    if (showLogin) {
      const timer = setTimeout(() => setLoginReady(true), 100);
      return () => clearTimeout(timer);
    } else {
      setLoginReady(false);
    }
  }, [showLogin]);

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
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)}
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(4px)'
              }}
            />
            
            {/* 居中登录框 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: '400px',
                zIndex: 1
              }}
            >
              <div 
                className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl"
                style={{ padding: '32px', backgroundColor: '#1e293b', border: '1px solid #334155' }}
              >
                {/* 关闭按钮 */}
                <button
                  onClick={() => setShowLogin(false)}
                  style={{ 
                    position: 'absolute', 
                    top: '16px', 
                    right: '16px',
                    padding: '8px',
                    color: '#94a3b8',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  className="hover:text-white hover:bg-slate-700"
                >
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* 图标 */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                  <div 
                    style={{ 
                      width: '64px', 
                      height: '64px',
                      background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Lock style={{ width: '32px', height: '32px', color: 'white' }} />
                  </div>
                </div>
                
                {/* 标题 */}
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: 'white', 
                  textAlign: 'center',
                  marginBottom: '8px'
                }}>
                  欢迎访问 MathViz
                </h2>
                <p style={{ 
                  color: '#94a3b8', 
                  textAlign: 'center', 
                  marginBottom: '32px'
                }}>
                  登录后即可开始学习之旅
                </p>
                
                {/* Google 登录按钮 - 居中 */}
                <div style={{ display: 'flex', justifyContent: 'center', minHeight: '40px' }}>
                  {loginReady && (
                    <GoogleLogin
                      onSuccess={handleSuccess}
                      onError={handleError}
                      useOneTap={false}
                      theme="filled_black"
                      size="large"
                      width="280"
                      text="signin_with"
                      shape="rectangular"
                    />
                  )}
                </div>
                
                {/* 提示 */}
                <div style={{ 
                  marginTop: '24px', 
                  paddingTop: '24px', 
                  borderTop: '1px solid #334155'
                }}>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#64748b', 
                    textAlign: 'center'
                  }}>
                    使用 Google 账号快速登录，无需额外注册
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
