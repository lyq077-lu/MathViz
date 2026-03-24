import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface GoogleJwtPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

interface UserProfileProps {
  onPersonalCenter?: () => void;
}

export function UserProfile({ onPersonalCenter }: UserProfileProps) {
  const { user, setUser, isLoggedIn } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setIsDropdownOpen(false);
  };

  const handlePersonalCenter = () => {
    setIsDropdownOpen(false);
    onPersonalCenter?.();
  };

  // 未登录状态
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

  // 已登录状态 - 带下拉菜单
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
      >
        {/* 头像 */}
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
        
        {/* 用户信息 */}
        <div className="flex-1 min-w-0 overflow-hidden text-left">
          <p className="text-sm text-white truncate">{user.name}</p>
          <p className="text-xs text-slate-400 truncate">{user.email}</p>
        </div>

        {/* 下拉箭头 */}
        <ChevronDown 
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* 下拉菜单 */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {/* 个人中心选项 */}
          <button
            onClick={handlePersonalCenter}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors text-left"
          >
            <User className="w-4 h-4" />
            <span className="text-sm">个人中心</span>
          </button>

          {/* 分隔线 */}
          <div className="border-t border-slate-700" />

          {/* 退出登录选项 */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">退出登录</span>
          </button>
        </div>
      )}
    </div>
  );
}
