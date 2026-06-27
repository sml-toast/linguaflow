import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Sidebar } from '../components/layout/Sidebar';
import { Modal } from '../components/common/Modal';
import { Users, MessageCircle, Heart, Share2, Plus, Send } from 'lucide-react';
import { posts, getPostsByLanguage, Post } from '../data/community';
import { languageNames } from '../data/courses';

export function Community() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'en' | 'jp' | 'kr'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
  const [localPosts, setLocalPosts] = useState<Post[]>(posts);

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

  const filteredPosts = getPostsByLanguage(selectedLanguage);

  const handleLike = (postId: string) => {
    setLocalPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post: Post = {
        id: `p${Date.now()}`,
        author: { id: user.id, username: user.username, avatar: user.avatar, level: 1 },
        language: 'all',
        title: newPost.title,
        content: newPost.content,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString().split('T')[0],
        tags: newPost.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      setLocalPosts([post, ...localPosts]);
      setNewPost({ title: '', content: '', tags: '' });
      setIsCreateModalOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">学习社区</h1>
              <p className="text-gray-600">与其他学习者交流心得,分享学习经验</p>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} icon={<Plus size={18} />}>
              发布帖子
            </Button>
          </div>

          {/* Language Filter */}
          <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedLanguage('all')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedLanguage === 'all'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              全部
            </button>
            {Object.entries(languageNames).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => setSelectedLanguage(code as 'all')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  selectedLanguage === code
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {localPosts.map((post) => (
              <Card key={post.id} variant="interactive" className="hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    {post.author.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">{post.author.username}</span>
                      <Badge variant="primary" size="sm">Lv.{post.author.level}</Badge>
                      {post.language !== 'all' && (
                        <Badge variant="secondary" size="sm">
                          {languageNames[post.language]?.flag} {languageNames[post.language]?.name}
                        </Badge>
                      )}
                      <span className="text-sm text-gray-500 ml-auto">{post.createdAt}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-3">{post.content}</p>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                          post.isLiked ? 'text-red-500' : ''
                        }`}
                      >
                        <Heart size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-primary-500 transition-colors">
                        <MessageCircle size={18} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-primary-500 transition-colors">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Study Groups */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="mr-2 text-primary-500" size={24} />
              学习小组
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: '英语口语练习群', members: 1234, lang: 'en' },
                { name: '日语文化交流群', members: 856, lang: 'jp' },
                { name: '韩语TOPIK备考群', members: 2341, lang: 'kr' },
              ].map((group, index) => (
                <Card key={index} variant="interactive" className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
                    {languageNames[group.lang]?.flag}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{group.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{group.members} 成员</p>
                  <Button variant="outline" size="sm" className="w-full">
                    加入小组
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Create Post Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="发布新帖子"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              placeholder="输入帖子标题..."
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="分享你的学习心得..."
              rows={5}
              className="input-field resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">标签 (用逗号分隔)</label>
            <input
              type="text"
              value={newPost.tags}
              onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              placeholder="英语, 学习技巧, 经验分享"
              className="input-field"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleCreatePost} icon={<Send size={16} />}>
              发布
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
