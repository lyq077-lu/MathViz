import { useAuth } from '../contexts/AuthContext';
import { 
  Mail, Calendar, Clock, Crown, Coins, 
  ChevronLeft, Flame, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface PersonalCenterProps {
  onBack: () => void;
}

// 会员计划数据
const plans = [
  { id: 'monthly', name: '月度会员', price: '¥19.9', unit: '/月', popular: false },
  { id: 'yearly', name: '年度会员', price: '¥199', unit: '/年', popular: true },
  { id: 'permanent', name: '永久会员', price: '¥499', unit: '一次性', popular: false },
];

export function PersonalCenter({ onBack }: PersonalCenterProps) {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<typeof plans[0] | null>(null);

  // 模拟数据 - 后续对接真实数据
  const userStats = {
    studyTime: '12小时30分钟',
    points: 1280,
    memberType: '普通会员',
    memberExpiry: '2026-12-31',
    joinDate: '2026-03-24',
  };

  const handlePlanClick = (plan: typeof plans[0]) => {
    setSelectedPlan(plan.id);
    setPaymentPlan(plan);
    setShowPaymentModal(true);
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
            {/* 用户卡片 - 头像居左，缩小一倍 */}
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
              {/* 头像和名称 - 水平布局，头像缩小一倍 */}
              <div className="flex items-center gap-4">
                {/* 头像 - 缩小一倍 */}
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

                {/* 名称 - 不可编辑 */}
                <div>
                  <h2 className="text-lg font-bold text-white">{user.name}</h2>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                    <Mail className="w-3 h-3" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* 注册时间 */}
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
              {/* 学习时长 */}
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

              {/* 积分 */}
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

              {/* 会员类型 */}
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

              {/* 会员有效期 */}
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
                    {/* 推荐标签 - 左上角火焰图标 */}
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
                    <div className="text-white text-lg font-bold mt-1">{plan.price}</div>
                    <div className="text-slate-500 text-xs">{plan.unit}</div>
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
                <div 
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                    >
                      <Clock className="w-5 h-5" style={{ color: '#c084fc' }} />
                    </div>
                    <div>
                      <div className="text-white text-sm">极限概念 - ε-δ定义</div>
                      <div className="text-slate-500 text-xs">3天前</div>
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">45分钟</div>
                </div>
              </div>
            </motion.div>

            {/* 更多功能 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(51, 65, 85, 0.5)'
              }}
            >
              <h3 className="text-white font-semibold mb-4">更多功能</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button 
                  className="p-4 rounded-xl text-left transition-colors"
                  style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                >
                  <div style={{ color: '#22d3ee' }} className="font-medium">我的收藏</div>
                  <div className="text-slate-500 text-xs mt-1">查看收藏的内容</div>
                </button>
                <button 
                  className="p-4 rounded-xl text-left transition-colors"
                  style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                >
                  <div style={{ color: '#fb923c' }} className="font-medium">积分商城</div>
                  <div className="text-slate-500 text-xs mt-1">兑换精美礼品</div>
                </button>
                <button 
                  className="p-4 rounded-xl text-left transition-colors"
                  style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                >
                  <div style={{ color: '#c084fc' }} className="font-medium">学习报告</div>
                  <div className="text-slate-500 text-xs mt-1">查看学习统计</div>
                </button>
                <button 
                  className="p-4 rounded-xl text-left transition-colors"
                  style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                >
                  <div style={{ color: '#4ade80' }} className="font-medium">账号设置</div>
                  <div className="text-slate-500 text-xs mt-1">管理账号信息</div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* 支付弹窗 */}
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
              if (e.target === e.currentTarget) setShowPaymentModal(false);
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
                  onClick={() => setShowPaymentModal(false)}
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
                {/* 订单信息 */}
                <div 
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">会员类型</span>
                    <span className="text-white font-medium">{paymentPlan.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">价格</span>
                    <span className="text-2xl font-bold" style={{ color: '#22d3ee' }}>{paymentPlan.price}</span>
                  </div>
                </div>

                {/* 支付方式 - PayPal预留 */}
                <div>
                  <h4 className="text-white font-semibold mb-3">选择支付方式</h4>
                  <button 
                    className="w-full p-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:opacity-90"
                    style={{ 
                      backgroundColor: 'rgba(0, 112, 186, 0.2)',
                      border: '2px solid #0070ba'
                    }}
                  >
                    <span className="text-white font-medium">PayPal</span>
                    <span className="text-xs text-slate-400">(即将接入)</span>
                  </button>
                </div>

                {/* 提示 */}
                <p className="text-xs text-slate-500 text-center">
                  点击支付即表示您同意服务条款
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
