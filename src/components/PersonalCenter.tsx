import { useAuth } from '../contexts/AuthContext';
import { 
  Mail, Calendar, Clock, Crown, Coins, 
  ChevronLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PersonalCenterProps {
  onBack: () => void;
}

export function PersonalCenter({ onBack }: PersonalCenterProps) {
  const { user } = useAuth();

  // 模拟数据 - 后续对接真实数据
  const userStats = {
    studyTime: '12小时30分钟',  // 学习时长
    points: 1280,               // 积分
    memberType: '普通会员',      // 会员类型
    memberExpiry: '2026-12-31',  // 会员有效期
    joinDate: '2026-03-24',      // 注册日期
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
                {/* 头像 - 缩小一倍 (原w-24 h-24，现w-12 h-12) */}
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

            {/* 功能区 - 会员充值 */}
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
                <button 
                  className="px-4 py-2 text-white rounded-lg transition-opacity hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)'
                  }}
                >
                  立即升级
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div 
                  className="rounded-xl p-3 text-center"
                  style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)' }}
                >
                  <div className="font-semibold" style={{ color: '#22d3ee' }}>月度会员</div>
                  <div className="text-white text-lg font-bold">¥19.9</div>
                  <div className="text-slate-500 text-xs">/月</div>
                </div>
                <div 
                  className="rounded-xl p-3 text-center relative"
                  style={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.6)',
                    border: '2px solid rgba(168, 85, 247, 0.5)'
                  }}
                >
                  <div 
                    className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-white text-xs rounded-full"
                    style={{ backgroundColor: '#a855f7' }}
                  >
                    推荐
                  </div>
                  <div className="font-semibold" style={{ color: '#22d3ee' }}>年度会员</div>
                  <div className="text-white text-lg font-bold">¥199</div>
                  <div className="text-slate-500 text-xs">/年</div>
                </div>
                <div 
                  className="rounded-xl p-3 text-center"
                  style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)' }}
                >
                  <div className="font-semibold" style={{ color: '#22d3ee' }}>永久会员</div>
                  <div className="text-white text-lg font-bold">¥499</div>
                  <div className="text-slate-500 text-xs">一次性</div>
                </div>
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
    </div>
  );
}
