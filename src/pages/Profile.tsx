import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Sidebar } from '../components/layout/Sidebar';
import { ProgressBar } from '../components/common/ProgressBar';
import { User, Mail, Lock, Bell, Globe, Trash2 } from 'lucide-react';
import { getUserLevel } from '../data/achievements';

export function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  if (!user) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <Card className="max-w-2xl mx-auto text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">请先登录</h2>
            <button onClick={() => navigate('/login')} className="btn-primary">
              前往登录
            </button>
          </Card>
        </main>
      </div>
    );
  }

  const userLevel = getUserLevel(user.stats.totalXP);

  const handleSaveEdit = (field: string) => {
    if (field === 'username') {
      updateUser({ username: editValue });
    }
    setEditingField(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">个人设置</h1>
            <p className="text-gray-600">管理你的账号信息和学习偏好</p>
          </div>

          {/* Profile Card */}
          <Card className="mb-6">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg">
                  {user.avatar}
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors">
                  📷
                </button>
              </div>
              <div className="flex-1">
                {editingField === 'username' ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="input-field max-w-xs"
                      autoFocus
                    />
                    <Button size="sm" onClick={() => handleSaveEdit('username')}>保存</Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditingField(null)}>取消</Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
                    <button
                      onClick={() => {
                        setEditingField('username');
                        setEditValue(user.username);
                      }}
                      className="text-gray-400 hover:text-primary-500"
                    >
                      ✏️
                    </button>
                  </div>
                )}
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="primary">Lv.{userLevel.level} {userLevel.title}</Badge>
                  <Badge variant="secondary">{user.stats.totalXP} XP</Badge>
                </div>
                <p className="text-gray-500 mt-2">加入于 {user.joinDate}</p>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="text-center">
              <p className="text-3xl font-bold text-primary-600">{userLevel.currentXP}</p>
              <p className="text-sm text-gray-500">当前经验</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-accent-600">{user.stats.streakDays}</p>
              <p className="text-sm text-gray-500">连续天数</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-secondary-600">{user.stats.totalMinutes}</p>
              <p className="text-sm text-gray-500">学习分钟</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-pink-600">{user.achievements.length}</p>
              <p className="text-sm text-gray-500">获得成就</p>
            </Card>
          </div>

          {/* Level Progress */}
          <Card className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4">等级进度</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Lv.{userLevel.level} {userLevel.title}</span>
              <span className="text-sm text-gray-600">Lv.{userLevel.level + 1}</span>
            </div>
            <ProgressBar value={userLevel.currentXP} max={userLevel.nextLevelXP} color="gradient" size="lg" />
            <p className="text-sm text-gray-500 mt-2 text-center">
              还需 {userLevel.nextLevelXP - user.stats.totalXP} XP 升级
            </p>
          </Card>

          {/* Account Settings */}
          <Card className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <User className="mr-2 text-primary-500" size={20} />
              账号信息
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={20} />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <Button variant="ghost" size="sm">修改</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Lock className="text-gray-400" size={20} />
                  <span className="text-gray-700">密码</span>
                </div>
                <Button variant="ghost" size="sm">修改</Button>
              </div>
            </div>
          </Card>

          {/* Learning Preferences */}
          <Card className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Globe className="mr-2 text-primary-500" size={20} />
              学习偏好
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">学习语言</p>
                  <p className="text-sm text-gray-500">
                    {user.learningLanguages.map(l => {
                      const langNames: Record<string, string> = { en: '英语', jp: '日语', kr: '韩语' };
                      return langNames[l] || l;
                    }).join(', ')}
                  </p>
                </div>
                <Button variant="ghost" size="sm">管理</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Bell className="text-gray-400" size={20} />
                  <span className="text-gray-700">每日学习提醒</span>
                </div>
                <Button variant="ghost" size="sm">设置</Button>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border-2 border-red-200 bg-red-50">
            <h3 className="font-bold text-red-600 mb-4 flex items-center">
              <Trash2 className="mr-2" size={20} />
              危险区域
            </h3>
            <p className="text-gray-600 mb-4">
              删除账号将永久清除所有学习数据和成就,此操作不可撤销。
            </p>
            <Button variant="danger" size="sm">
              删除账号
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
