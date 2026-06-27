import { Link, useLocation } from 'react-router-dom';
import { useLearningStore } from '../../store/learningStore';
import { 
  Home, BookOpen, GraduationCap, FileText, Mic, Headphones, 
  Trophy, Users, Settings, ChevronLeft, ChevronRight, Flame 
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  courseId?: string;
}

export function Sidebar({ courseId }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { progress } = useLearningStore();
  const { user } = useAuthStore();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const mainNav = [
    { path: '/dashboard', label: '学习中心', icon: Home },
    { path: '/vocabulary', label: '单词学习', icon: BookOpen },
    { path: '/grammar', label: '语法练习', icon: FileText },
    { path: '/speaking', label: '口语跟读', icon: Mic },
    { path: '/listening', label: '听力训练', icon: Headphones },
  ];

  const secondaryNav = [
    { path: '/achievements', label: '成就中心', icon: Trophy },
    { path: '/community', label: '学习社区', icon: Users },
    { path: '/profile', label: '个人设置', icon: Settings },
  ];

  return (
    <aside 
      className={`bg-white h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {user && (
          <div className={`p-4 border-b ${collapsed ? 'text-center' : ''}`}>
            {!collapsed && (
              <div className="mb-3">
                <p className="text-sm text-gray-500">今日学习</p>
                <p className="text-2xl font-bold text-primary-600">
                  {user.stats.totalMinutes} 分钟
                </p>
              </div>
            )}
            <div className="flex items-center space-x-2 justify-center">
              <Flame className="text-accent-500" size={20} />
              <span className="font-semibold text-gray-700">
                {user.stats.streakDays} 天
              </span>
            </div>
            {!collapsed && (
              <p className="text-xs text-gray-500 mt-1">连续学习</p>
            )}
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {mainNav.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={courseId ? `${path}/${courseId}` : path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive(path)
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}

          <div className="my-4 border-t" />

          {secondaryNav.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive(path)
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!collapsed && <span className="text-sm">收起</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
