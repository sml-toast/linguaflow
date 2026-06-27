import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ArrowRight, BookOpen, Mic, Headphones, GraduationCap, Users, Trophy, Sparkles } from 'lucide-react';
import { languageNames } from '../data/courses';

export function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: BookOpen,
      title: '智能单词记忆',
      description: '科学的记忆曲线算法,让单词学习更高效',
      color: 'from-primary-400 to-primary-600',
    },
    {
      icon: GraduationCap,
      title: '分级课程体系',
      description: '从入门到精通,循序渐进的系统学习路径',
      color: 'from-secondary-400 to-secondary-600',
    },
    {
      icon: Mic,
      title: '口语跟读练习',
      description: 'AI智能评分,实时纠正发音问题',
      color: 'from-pink-400 to-pink-600',
    },
    {
      icon: Headphones,
      title: '沉浸式听力训练',
      description: '真实语境听力材料,提升理解能力',
      color: 'from-accent-400 to-accent-600',
    },
  ];

  const languages = [
    { code: 'en', ...languageNames.en, color: 'bg-blue-500' },
    { code: 'jp', ...languageNames.jp, color: 'bg-pink-500' },
    { code: 'kr', ...languageNames.kr, color: 'bg-purple-500' },
  ];

  const stats = [
    { value: '10000+', label: '学习用户' },
    { value: '50+', label: '精品课程' },
    { value: '95%', label: '学习满意度' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-medium mb-6">
              <Sparkles size={16} />
              <span>全新版本 · 沉浸式学习体验</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">多语种在线学习平台</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
              支持英语、日语、韩语等多语种学习,通过科学的分级体系和互动式学习模块,让语言学习变得轻松有趣
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                icon={<ArrowRight size={20} />}
              >
                {isAuthenticated ? '继续学习' : '免费开始学习'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                了解更多
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language Selection */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              选择你的学习语言
            </h2>
            <p className="text-xl text-gray-600">
              从世界主流语言开始你的学习之旅
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {languages.map((lang) => (
              <Card
                key={lang.code}
                variant="interactive"
                className="relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${lang.color} opacity-10 rounded-bl-full`} />
                <div className="relative">
                  <div className="text-6xl mb-4">{lang.flag}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{lang.name}</h3>
                  <p className="text-gray-600 mb-4">{lang.native}</p>
                  <Button
                    variant="ghost"
                    className="group-hover:text-primary-600"
                    onClick={() => navigate(isAuthenticated ? `/dashboard?lang=${lang.code}` : '/register')}
                  >
                    开始学习 <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              为什么选择 LinguaFlow
            </h2>
            <p className="text-xl text-gray-600">
              专业、科学的语言学习解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} variant="highlighted" className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              全方位学习模块
            </h2>
            <p className="text-xl text-gray-600">
              听说读写,全面提升语言能力
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { icon: BookOpen, title: '单词记忆', desc: '闪卡记忆法 + 智能复习', color: 'primary' },
              { icon: GraduationCap, title: '语法练习', desc: '互动例句 + 即时反馈', color: 'secondary' },
              { icon: Mic, title: '口语跟读', desc: '录音对比 + 智能评分', color: 'pink' },
              { icon: Headphones, title: '听力训练', desc: '逐句听写 + 速度调节', color: 'accent' },
            ].map((module, index) => (
              <Card key={index} variant="interactive" className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-${module.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <module.icon className={`text-${module.color}-600`} size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600">{module.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            准备好开始你的语言学习之旅了吗?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            加入 thousands of learners, 开启你的多语言学习之旅
          </p>
          <Button
            size="lg"
            className="bg-white text-primary-600 hover:bg-gray-100 shadow-xl"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
          >
            {isAuthenticated ? '进入学习中心' : '立即注册 · 完全免费'}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🌍</span>
              </div>
              <span className="text-xl font-bold">LinguaFlow</span>
            </div>
            <div className="flex items-center space-x-6">
              <Users size={20} className="text-gray-400" />
              <Trophy size={20} className="text-gray-400" />
              <BookOpen size={20} className="text-gray-400" />
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} LinguaFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
