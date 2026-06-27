import { Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🌍</span>
              </div>
              <span className="text-xl font-bold gradient-text">LinguaFlow</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              LinguaFlow是一款沉浸式多语种学习平台,支持英语、日语、韩语等主流语言的学习。通过科学的分级体系和游戏化学习机制,让语言学习变得轻松有趣。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">学习资源</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-gray-600 hover:text-primary-500 transition-colors">课程中心</Link></li>
              <li><Link to="/vocabulary" className="text-gray-600 hover:text-primary-500 transition-colors">单词记忆</Link></li>
              <li><Link to="/grammar" className="text-gray-600 hover:text-primary-500 transition-colors">语法练习</Link></li>
              <li><Link to="/speaking" className="text-gray-600 hover:text-primary-500 transition-colors">口语训练</Link></li>
              <li><Link to="/listening" className="text-gray-600 hover:text-primary-500 transition-colors">听力训练</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">关于我们</h3>
            <ul className="space-y-2">
              <li><Link to="/community" className="text-gray-600 hover:text-primary-500 transition-colors">学习社区</Link></li>
              <li><Link to="/achievements" className="text-gray-600 hover:text-primary-500 transition-colors">成就系统</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">帮助中心</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">联系我们</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">隐私政策</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} LinguaFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
