import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { Sidebar } from '../components/layout/Sidebar';
import { Trophy, Star, Flame, BookOpen, Mic, Headphones, Users, TrendingUp, Award } from 'lucide-react';
import { achievements, getUserLevel } from '../data/achievements';

export function Achievements() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

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

  const categoryStats = {
    streak: user.achievements.filter(id => achievements.find(a => a.id === id)?.category === 'streak').length,
    skill: user.achievements.filter(id => achievements.find(a => a.id === id)?.category === 'skill').length,
    milestone: user.achievements.filter(id => achievements.find(a => a.id === id)?.category === 'milestone').length,
    social: user.achievements.filter(id => achievements.find(a => a.id === id)?.category === 'social').length,
  };

  const getProgressForAchievement = (achievement: typeof achievements[0]) => {
    switch (achievement.requirement.type) {
      case 'streak':
        return user.stats.streakDays;
      case 'words':
        return user.stats.wordsLearned;
      case 'grammar':
        return user.stats.grammarCompleted;
      case 'speaking':
        return user.stats.speakingCompleted;
      case 'listening':
        return user.stats.listeningCompleted;
      case 'courses':
        return 0;
      case 'posts':
        return 0;
      case 'comments':
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">成就中心</h1>
            <p className="text-gray-600">查看你的学习成就和徽章</p>
          </div>

          {/* Level Card */}
          <Card className="mb-8 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
                  <span className="text-5xl">🏆</span>
                </div>
                <div>
                  <Badge variant="accent" className="mb-2">等级 {userLevel.level}</Badge>
                  <h2 className="text-3xl font-bold mb-1">{userLevel.title}</h2>
                  <p className="text-white/80">
                    距离下一级还需 {userLevel.nextLevelXP - user.stats.totalXP} XP
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">{user.stats.totalXP}</p>
                <p className="text-white/80">总积分</p>
              </div>
            </div>
            <div className="mt-6">
              <ProgressBar 
                value={userLevel.currentXP} 
                max={userLevel.nextLevelXP} 
                color="gradient"
                size="lg"
              />
            </div>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <Flame className="mx-auto mb-2 text-accent-500" size={28} />
              <p className="text-2xl font-bold text-gray-900">{categoryStats.streak}</p>
              <p className="text-sm text-gray-500">连续成就</p>
            </Card>
            <Card className="text-center">
              <Star className="mx-auto mb-2 text-secondary-500" size={28} />
              <p className="text-2xl font-bold text-gray-900">{categoryStats.skill}</p>
              <p className="text-sm text-gray-500">技能徽章</p>
            </Card>
            <Card className="text-center">
              <Award className="mx-auto mb-2 text-primary-500" size={28} />
              <p className="text-2xl font-bold text-gray-900">{categoryStats.milestone}</p>
              <p className="text-sm text-gray-500">里程碑</p>
            </Card>
            <Card className="text-center">
              <Users className="mx-auto mb-2 text-pink-500" size={28} />
              <p className="text-2xl font-bold text-gray-900">{categoryStats.social}</p>
              <p className="text-sm text-gray-500">社交成就</p>
            </Card>
          </div>

          {/* Achievement Grid */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">所有成就</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {achievements.map((achievement) => {
              const isUnlocked = user.achievements.includes(achievement.id);
              const progress = getProgressForAchievement(achievement);
              const progressPercent = Math.min(100, (progress / achievement.requirement.value) * 100);

              return (
                <Card
                  key={achievement.id}
                  className={`relative overflow-hidden ${
                    isUnlocked ? 'bg-gradient-to-br from-accent-50 to-accent-100' : 'opacity-60'
                  }`}
                >
                  {isUnlocked && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="success">已获得</Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                      isUnlocked ? 'bg-accent-500 text-white' : 'bg-gray-200'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      
                      {!isUnlocked && (
                        <>
                          <ProgressBar 
                            value={progressPercent} 
                            max={100} 
                            size="sm"
                            showLabel
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {progress} / {achievement.requirement.value}
                          </p>
                        </>
                      )}
                      
                      <div className="flex items-center space-x-1 mt-2">
                        <Star size={14} className="text-accent-500" />
                        <span className="text-sm text-accent-600">+{achievement.rewardXP} XP</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Leaderboard Preview */}
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <TrendingUp className="mr-2 text-primary-500" size={20} />
                周排行榜
              </h3>
              <button className="text-sm text-primary-600 hover:text-primary-700">查看全部</button>
            </div>
            <div className="space-y-3">
              {[
                { rank: 1, name: '学习达人', xp: 2500, avatar: '🎓' },
                { rank: 2, name: user.username, xp: user.stats.totalXP, avatar: user.avatar },
                { rank: 3, name: '日语小能手', xp: 680, avatar: '👩‍🎨' },
              ].map((item) => (
                <div key={item.rank} className="flex items-center space-x-4 p-3 bg-white rounded-xl">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    item.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                    item.rank === 2 ? 'bg-gray-200 text-gray-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {item.rank}
                  </div>
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-xl">
                    {item.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
