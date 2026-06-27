import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useLearningStore } from '../store/learningStore';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Sidebar } from '../components/layout/Sidebar';
import { 
  Flame, Clock, BookOpen, Trophy, Star, Target, TrendingUp,
  ArrowRight, Play, Book, Mic, Headphones, GraduationCap
} from 'lucide-react';
import { courses, languageNames, levelNames } from '../data/courses';
import { getUserLevel } from '../data/achievements';

export function Dashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  const { progress } = useLearningStore();
  
  const selectedLang = searchParams.get('lang') || 'en';
  const filteredCourses = courses.filter(c => c.language === selectedLang);
  const userLevel = user ? getUserLevel(user.stats.totalXP) : { level: 1, title: '语言探险家', nextLevelXP: 100, currentXP: 0 };

  const stats = [
    { icon: Flame, label: '连续学习', value: user?.stats.streakDays || 0, unit: '天', color: 'text-accent-500' },
    { icon: Clock, label: '学习时长', value: user?.stats.totalMinutes || 0, unit: '分钟', color: 'text-primary-500' },
    { icon: BookOpen, label: '已学单词', value: user?.stats.wordsLearned || 0, unit: '个', color: 'text-secondary-500' },
    { icon: Trophy, label: '总积分', value: user?.stats.totalXP || 0, unit: 'XP', color: 'text-accent-500' },
  ];

  const modules = [
    { icon: Book, title: '单词学习', desc: '闪卡记忆', color: 'bg-primary-500', path: '/vocabulary' },
    { icon: GraduationCap, title: '语法练习', desc: '互动例句', color: 'bg-secondary-500', path: '/grammar' },
    { icon: Mic, title: '口语跟读', desc: '智能评分', color: 'bg-pink-500', path: '/speaking' },
    { icon: Headphones, title: '听力训练', desc: '逐句听写', color: 'bg-accent-500', path: '/listening' },
  ];

  if (!user) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <Card className="max-w-2xl mx-auto text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">请先登录</h2>
            <p className="text-gray-600 mb-6">登录后即可开始你的学习之旅</p>
            <Button onClick={() => navigate('/login')}>前往登录</Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              你好, {user.username}! 👋
            </h1>
            <p className="text-gray-600">继续保持学习的热情,今天也要加油哦!</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={28} />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Level Progress */}
          <Card className="mb-8 bg-gradient-to-r from-primary-50 to-secondary-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-3xl">
                  🎓
                </div>
                <div>
                  <Badge variant="accent">Lv.{userLevel.level}</Badge>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{userLevel.title}</h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-600">{userLevel.currentXP} XP</p>
                <p className="text-sm text-gray-500">距离下一级: {userLevel.nextLevelXP - user.stats.totalXP} XP</p>
              </div>
            </div>
            <ProgressBar 
              value={userLevel.currentXP} 
              max={userLevel.nextLevelXP} 
              color="gradient"
              size="lg"
            />
          </Card>

          {/* Language Tabs & Course List */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
              {Object.entries(languageNames).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => navigate(`/dashboard?lang=${code}`)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                    selectedLang === code
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredCourses.map((course) => {
                const courseProgress = progress[course.id];
                const isLocked = user.stats.totalXP < course.requiredXP;
                
                return (
                  <Card
                    key={course.id}
                    variant={isLocked ? 'default' : 'interactive'}
                    className={`relative ${isLocked ? 'opacity-60' : ''}`}
                  >
                    {isLocked && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="warning">需要 {course.requiredXP} XP 解锁</Badge>
                      </div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                        {languageNames[course.language]?.flag}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                          <Badge variant="secondary">{levelNames[course.level]?.name}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                        
                        {courseProgress ? (
                          <div className="space-y-2">
                            <ProgressBar 
                              value={courseProgress.completionRate} 
                              showLabel 
                              color="gradient"
                            />
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>词汇 {courseProgress.vocabularyProgress}%</span>
                              <span>语法 {courseProgress.grammarProgress}%</span>
                              <span>口语 {courseProgress.speakingProgress}%</span>
                              <span>听力 {courseProgress.listeningProgress}%</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Star size={14} />
                            <span>开始学习解锁课程进度</span>
                          </div>
                        )}
                      </div>
                      
                      {!isLocked && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate(`/vocabulary/${course.id}`)}
                          icon={<Play size={16} />}
                        >
                          开始
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Access Modules */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">快速学习模块</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {modules.map((module, index) => (
              <Card
                key={index}
                variant="interactive"
                className="text-center"
                onClick={() => navigate(`${module.path}/${selectedLang}-a1`)}
              >
                <div className={`w-14 h-14 ${module.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <module.icon className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{module.title}</h3>
                <p className="text-sm text-gray-500">{module.desc}</p>
              </Card>
            ))}
          </div>

          {/* Today's Goal */}
          <Card className="bg-gradient-to-r from-accent-50 to-accent-100 border border-accent-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-accent-500 rounded-xl flex items-center justify-center">
                  <Target className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">今日学习目标</h3>
                  <p className="text-gray-600">完成20分钟学习即可达成</p>
                </div>
              </div>
              <div className="text-center">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="#f59e0b"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${Math.min(100, (user.stats.totalMinutes / 20) * 220)} 220`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-accent-600">
                      {Math.min(100, Math.round((user.stats.totalMinutes / 20) * 100))}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
