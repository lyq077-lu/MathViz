import { useAuth } from '../contexts/AuthContext';
import { 
  Mail, Calendar, Clock, Crown, Coins, 
  ChevronLeft, Flame, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PayPalButton } from './PayPalButton';

interface PersonalCenterProps {
  onBack: () => void;
}

// 会员计划数据
interface Plan {
  id: string;
  name: string;
  priceUSD: string;
  priceCNY: string;
  unit: string;
  popular: boolean;
  description: string;
}

const plans: Plan[] = [
  { 
    id: 'monthly', 
    name: '月度会员', 
    priceUSD: '9.99',
    priceCNY: '¥19.9', 
    unit: '/月', 
    popular: false,
    description: 'MathViz 月度会员'
  },
  { 
    id: 'yearly', 
    name: '年度会员', 
    priceUSD: '99.99',
    priceCNY: '¥199', 
    unit: '/年', 
    popular: true,
    description: 'MathViz 年度会员'
  },
  { 
    id: 'permanent', 
    name: '永久会员', 
    priceUSD: '499.99',
    priceCNY: '¥499', 
    unit: '一次性', 
    popular: false,
    description: 'MathViz 永久会员'
  },
];

export function PersonalCenter({ onBack }: PersonalCenterProps) {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<Plan | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // 模拟数据 - 后续对接真实数据
  const userStats = {
    studyTime: '12小时30分钟',
    points: 1280,
    memberType: '普通会员',
    memberExpiry: '2026-12-31',
    joinDate: '2026-03-24',
  };

  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan.id);
    setPaymentPlan(plan);
    setShowPaymentModal(true);
    setPaymentSuccess(false);
  };

  const handlePaymentSuccess = (details: any) => {
    console.log('Payment successful:', details);
    setPaymentSuccess(true);
    // 3秒后关闭弹窗
    setTimeout(() => {
      setShowPaymentModal(false);
    }, 3000);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(false);
  };

  if (!user) return null;

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
      }}
    >
      {/* 顶部导航 */}
      <header 
        className="px-6 py-4 sticky top-0 z-50"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(51, 65, 85, 0.5)'
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>返回应用</span>
          </button>
          <h1 className="text-xl font-bold text-white">个人中心</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 左侧：用户基本信息 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 用户卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(51, 65, 85, 0.5)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <div className="flex items-center gap-4">
                <div>
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                      style={{ border: '2px solid rgba(51, 65, 85, 0.5)' }}
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-medium"
                      style={{
                        background: 'linear-gradient(135deg, #06b6d4, #2563eb)'
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{user.name}</h2>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                    <Mail className="w-3 h-3" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs mt-4 pt-4" style={{ borderTop: '1px solid rgba(51, 65, 85, 0.3)' }}>
                <Calendar className="w-3 h-3" />
                <span>注册于 {userStats.joinDate}</span>
              </div>
            </motion.div>
          </div>

          {/* 右侧：统计数据和功能 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 统计卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div 
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(51, 65, 85, 0.5)'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                  >
                    <Clock className="w-4 h-4" style={{ color: '#22d3ee' }} />
                  </div>
                  <span className="text-slate-400 text-sm">学习时长</span>
                </div>
                <div className="text-xl font-bold text-white">{userStats.studyTime}</div>
                <div className="text-xs text-slate-500 mt-1">累计学习</div>
              </div>

              <div 
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(51, 65, 85, 0.5)'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}
                  >
                    <Coins className="w-4 h-4" style={{ color: '#facc15' }} />
                  </div>
                  <span className="text-slate-400 text-sm">积分</span>
                </div>
                <div className="text-xl font-bold text-white">{userStats.points}</div>
                <div className="text-xs text-slate-500 mt-1">可用于兑换</div>
              </div>

              <div 
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(51, 65, 85, 0.5)'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                  >
                    <Crown className="w-4 h-4" style={{ color: '#c084fc' }} />
                  </div>
                  <span className="text-slate-400 text-sm">会员类型</span>
                </div>
                <div className="text-xl font-bold text-white">{userStats.memberType}</div>
                <div className="text-xs text-slate-500 mt-1">当前等级</div>
              </div>

              <div 
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(51, 65, 85, 0.5)'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                  >
                    <Calendar className="w-4 h-4" style={{ color: '#4ade80' }} />
                  </div>
                  <span className="text-slate-400 text-sm">会员有效期</span>
                </div>
                <div className="text-xl font-bold text-white">{userStats.memberExpiry}</div>
                <div className="text-xs text-slate-500 mt-1">到期时间</div>
              </div>
            </motion.div>

            {/* 功能区 - 会员升级 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
                border: '1px solid rgba(168, 85, 247, 0.3)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #ec4899)'
                    }}
                  >
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">升级会员</h3>
                    <p className="text-slate-400 text-sm">解锁更多高级功能</p>
                  </div>
                </div>
              </div>
              
              {/* 会员选项 */}
              <div className="grid grid-cols-3 gap-3">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    onClick={() => handlePlanClick(plan)}
                    className="rounded-xl p-3 text-center relative cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: selectedPlan === plan.id ? 'rgba(51, 65, 85, 0.9)' : 'rgba(30, 41, 59, 0.6)',
                      border: selectedPlan === plan.id ? '2px solid #a855f7' : '1px solid rgba(51, 65, 85, 0.5)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={(e) => {
                      if (selectedPlan !== plan.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.8)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedPlan !== plan.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.6)';
                      }
                    }}
                  >
                    {/* 推荐标签 */}
                    {plan.popular && (
                      <div 
                        className="absolute flex items-center gap-1"
                        style={{ top: '4px', left: '4px' }}
                      >
                        <Flame className="w-4 h-4 text-red-500 fill-red-500" />
                        <span className="text-xs font-bold text-red-500">HOT</span>
                      </div>
                    )}
                    
                    <div className="font-semibold mt-2" style={{ color: '#22d3ee' }}>{plan.name}</div>
                    <div className="text-white text-lg font-bold mt-1">{plan.priceCNY}</div>
                    <div className="text-slate-500 text-xs">{plan.unit}</div>
                    <div className="text-xs text-slate-400 mt-1">≈ ${plan.priceUSD}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 学习记录 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(51, 65, 85, 0.5)'
              }}
            >
              <h3 className="text-white font-semibold mb-4">学习记录</h3>
              <div className="space-y-3">
                <div 
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                    >
                      <Clock className="w-5 h-5" style={{ color: '#22d3ee' }} />
                    </div>
                    <div>
                      <div className="text-white text-sm">三角函数 - 单位圆</div>
                      <div className="text-slate-500 text-xs">今天 14:30</div>
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">15分钟</div>
                </div>
                <div 
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
                    >
                      <Clock className="w-5 h-5" style={{ color: '#fb923c' }} />
                    </div>
                    <div>
                      <div className="text-white text-sm">勾股定理 - 拼图证明</div>
                      <div className="text-slate-500 text-xs">昨天 20:15</div>
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">23分钟</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* PayPal 支付弹窗 */}
      <AnimatePresence>
        {showPaymentModal && paymentPlan && (
          <div 
            className="fixed inset-0 z-[100]"
            style={{ 
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(8px)'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                border: '1px solid rgba(51, 65, 85, 0.5)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* 头部 */}
              <div 
                className="p-6 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))'
                }}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-lg transition-colors"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center relative z-10">
                  <Crown className="w-12 h-12 text-white mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">确认订单</h3>
                  <p className="text-white/80">{paymentPlan.name}</p>
                </div>
              </div>

              {/* 内容 */}
              <div className="p-6 space-y-6">
                {paymentSuccess ? (
                  /* 支付成功状态 */
                  <div className="text-center py-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
                    >
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">支付成功！</h4>
                    <p className="text-slate-400">感谢您升级到 {paymentPlan.name}</p>
                  </div>
                ) : (
                  <>
                    {/* 订单信息 */}
                    <div 
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400">会员类型</span>
                        <span className="text-white font-medium">{paymentPlan.name}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400">人民币价格</span>
                        <span className="text-lg font-bold text-white">{paymentPlan.priceCNY}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-600">
                        <span className="text-slate-400">PayPal 支付</span>
                        <span className="text-2xl font-bold" style={{ color: '#22d3ee' }}>${paymentPlan.priceUSD}</span>
                      </div>
                    </div>

                    {/* 沙盒提示 */}
                    <div 
                      className="p-3 rounded-lg text-center"
                      style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)' }}
                    >
                      <p className="text-yellow-400 text-sm">🏖️ 当前为 PayPal 沙盒测试模式</p>
                      <p className="text-slate-400 text-xs mt-1">使用 PayPal 沙盒账户进行测试支付</p>
                    </div>

                    {/* PayPal 支付按钮 */}
                    <PayPalButton
                      amount={paymentPlan.priceUSD}
                      description={paymentPlan.description}
                      onSuccess={handlePaymentSuccess}
                      onError={(error) => console.error('Payment error:', error)}
                      onCancel={() => console.log('Payment cancelled')}
                    />

                    {/* 提示 */}
                    <p className="text-xs text-slate-500 text-center">
                      点击支付即表示您同意服务条款
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
