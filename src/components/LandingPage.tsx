import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Calculator, Shapes, FunctionSquare, Triangle, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface GoogleJwtPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

// 特性展示数据
const features = [
  {
    icon: <Shapes className="w-6 h-6" />,
    title: '三角函数',
    description: '单位圆与正弦波可视化',
    color: 'cyan',
  },
  {
    icon: <FunctionSquare className="w-6 h-6" />,
    title: '代数与函数',
    description: '线性、二次、复数运算',
    color: 'orange',
  },
  {
    icon: <Triangle className="w-6 h-6" />,
    title: '几何探索',
    description: '勾股定理、圆方程、分形',
    color: 'purple',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: '概率统计',
    description: '大数定律、正态分布、贝叶斯',
    color: 'green',
  },
];

export function LandingPage() {
  const { setUser } = useAuth();

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
          
          {/* 登录按钮 */}
          <div className="flex items-center gap-4">
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

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex flex-col gap-2">
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
                    <span className="text-xs text-slate-500 text-center">登录后即可开始使用</span>
                  </div>
                </div>

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
                    className={`p-6 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-${feature.color}-500/30 transition-all group cursor-pointer`}
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
    </div>
  );
}
