import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { LogOut, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface GoogleJwtPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export function AuthModal() {
  const { setUser, isLoggedIn } = useAuth();

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

  // 已登录时不显示
  if (isLoggedIn) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        zIndex: 99999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
        style={{ position: 'absolute', inset: 0 }}
      />
      
      {/* 登录弹窗 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md mx-4"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          {/* 图标 */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* 标题 */}
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            欢迎访问 MathViz
          </h2>
          <p className="text-slate-400 text-center mb-8">
            请使用 Google 账号登录以继续使用
          </p>
          
          {/* 登录按钮 */}
          <div className="flex justify-center">
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
          
          {/* 特性说明 */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>可视化数学学习平台</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function UserProfile() {
  const { user, setUser, isLoggedIn } = useAuth();

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="text-center py-2">
        <p className="text-xs text-slate-500 mb-2">未登录</p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
                setUser({
                  id: decoded.sub,
                  email: decoded.email,
                  name: decoded.name,
                  picture: decoded.picture,
                });
              }
            }}
            onError={() => console.error('登录失败')}
            theme="filled_black"
            size="medium"
            width="200"
            text="signin_with"
            shape="rectangular"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3">
      <div className="flex items-center gap-3">
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="w-10 h-10 rounded-full border border-slate-600 shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-medium shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-sm text-white truncate">{user.name}</p>
          <p className="text-xs text-slate-400 truncate">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
          title="退出登录"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-center">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>退出登录</span>
        </button>
      </div>
    </div>
  );
}
