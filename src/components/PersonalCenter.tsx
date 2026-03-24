import { useAuth } from '../contexts/AuthContext';
import { googleLogout } from '@react-oauth/google';
import { 
  Mail, Calendar, Clock, Crown, Coins, 
  ChevronLeft, Edit3, Save, X, LogOut 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PersonalCenterProps {
  onBack: () => void;
}

export function PersonalCenter({ onBack }: PersonalCenterProps) {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || '');

  // 模拟数据 - 后续对接真实数据
  const userStats = {
    studyTime: '12小时30分钟',  // 学习时长
    points: 1280,               // 积分
    memberType: '普通会员',      // 会员类型
    memberExpiry: '2026-12-31',  // 会员有效期
    joinDate: '2026-03-24',      // 注册日期
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  const handleSaveName = () => {
    // 这里后续可以对接后端保存昵称
    if (user && displayName.trim()) {
      setUser({ ...user, name: displayName.trim() });
    }
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 顶部导航 */}
      <header className="px-6 py-4 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>返回应用</span>
          </button>
          <h1 className="text-xl font-bold text-white">个人中心</h1>
          <div className="w-20" /> {/* 占位保持居中 */}
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
              className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6"
            >
              <div className="flex flex-col items-center">
                {/* 头像 */}
                <div className="relative mb-4">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-24 h-24 rounded-full border-4 border-slate-700"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-3xl font-medium border-4 border-slate-700">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>

                {/* 用户名（可编辑） */}
                <div className="w-full mb-4">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-cyan-500"
                        placeholder="输入昵称"
                      />
                      <button
                        onClick={handleSaveName}
                        className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDisplayName(user.name);
                          setIsEditing(false);
                        }}
                        className="p-2 text-slate-400 hover:bg-slate-700 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-xl font-bold text-white">{user.name}</h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-slate-500 hover:text-cyan-400 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* 邮箱 */}
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>

                {/* 注册时间 */}
                <div className="flex items-center gap-2 text-slate-500 text-xs mt-2">
                  <Calendar className="w-3 h-3" />
                  <span>注册于 {userStats.joinDate}</span>
                </div>
              </div>
            </motion.div>

            {/* 快捷操作 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 rounded-2xl border border-slate-700 p-4"
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>退出登录</span>
              </button>
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
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-slate-400 text-sm">学习时长</span>
                </div>
                <div className="text-xl font-bold text-white">{userStats.studyTime}</div>
                <div className="text-xs text-slate-500 mt-1">累计学习</div>
              </div>

              {/* 积分 */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <Coins className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span className="text-slate-400 text-sm">积分</span>
                </div>
                <div className="text-xl font-bold text-white">{userStats.points}</div>
                <div className="text-xs text-slate-500 mt-1">可用于兑换</div>
              </div>

              {/* 会员类型 */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Crown className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-slate-400 text-sm">会员类型</span>
                </div>
                <div className="text-xl font-bold text-white">{userStats.memberType}</div>
                <div className="text-xs text-slate-500 mt-1">当前等级</div>
              </div>

              {/* 会员有效期 */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-green-400" />
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
              className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/20 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">升级会员</h3>
                    <p className="text-slate-400 text-sm">解锁更多高级功能</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                  立即升级
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                  <div className="text-cyan-400 font-semibold">月度会员</div>
                  <div className="text-white text-lg font-bold">¥19.9</div>
                  <div className="text-slate-500 text-xs">/月</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-3 text-center border-2 border-purple-500/50 relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">
                    推荐
                  </div>
                  <div className="text-cyan-400 font-semibold">年度会员</div>
                  <div className="text-white text-lg font-bold">¥199</div>
                  <div className="text-slate-500 text-xs">/年</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                  <div className="text-cyan-400 font-semibold">永久会员</div>
                  <div className="text-white text-lg font-bold">¥499</div>
                  <div className="text-slate-500 text-xs">一次性</div>
                </div>
              </div>
            </motion.div>

            {/* 学习记录 - 预留区域 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6"
            >
              <h3 className="text-white font-semibold mb-4">学习记录</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm">三角函数 - 单位圆</div>
                      <div className="text-slate-500 text-xs">今天 14:30</div>
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">15分钟</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm">勾股定理 - 拼图证明</div>
                      <div className="text-slate-500 text-xs">昨天 20:15</div>
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">23分钟</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-400" />
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

            {/* 更多功能 - 预留区域 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6"
            >
              <h3 className="text-white font-semibold mb-4">更多功能</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors text-left">
                  <div className="text-cyan-400 font-medium">我的收藏</div>
                  <div className="text-slate-500 text-xs mt-1">查看收藏的内容</div>
                </button>
                <button className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors text-left">
                  <div className="text-orange-400 font-medium">积分商城</div>
                  <div className="text-slate-500 text-xs mt-1">兑换精美礼品</div>
                </button>
                <button className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors text-left">
                  <div className="text-purple-400 font-medium">学习报告</div>
                  <div className="text-slate-500 text-xs mt-1">查看学习统计</div>
                </button>
                <button className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors text-left">
                  <div className="text-green-400 font-medium">账号设置</div>
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
