import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import { useAuthStore } from '../store/authStore';
import { ProgressBar } from '../components/common/ProgressBar';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Sidebar } from '../components/layout/Sidebar';
import { ArrowLeft, Headphones, Trophy, Zap, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { clsx } from 'clsx';
import { getCourseById, languageNames } from '../data/courses';
import { getListeningByUnit, ListeningItem } from '../data/listening';

export function Listening() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { completeLesson, startCourse } = useLearningStore();
  const { addXP, user } = useAuthStore();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const course = courseId ? getCourseById(courseId) : undefined;
  const firstUnitId = course?.units[0]?.id;
  const listeningItems = firstUnitId ? getListeningByUnit(firstUnitId) : [];
  const currentItem = listeningItems[currentIndex] || {
    id: 'default',
    title: '听力练习',
    transcript: 'Hello, nice to meet you. I am learning a new language.',
    translation: '你好,很高兴认识你。我正在学习一门新语言。',
    difficulty: 'easy' as const,
    duration: 30,
  };

  useEffect(() => {
    if (courseId) {
      startCourse(courseId);
    }
  }, [courseId, startCourse]);

  const handlePlay = () => {
    const utterance = new SpeechSynthesisUtterance(currentItem.transcript);
    utterance.lang = course?.language === 'jp' ? 'ja-JP' : course?.language === 'kr' ? 'ko-KR' : 'en-US';
    utterance.rate = 0.8;
    
    utterance.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleComplete = () => {
    setCompletedCount(prev => prev + 1);
    addXP(8);
    setShowAnswer(false);
    
    if (currentIndex < listeningItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      if (courseId) {
        completeLesson(courseId, 'listening');
      }
    }
  };

  if (!course) {
    return (
      <div className="flex min-h-screen">
        <Sidebar courseId={courseId} />
        <main className="flex-1 p-8">
          <Card className="max-w-2xl mx-auto text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">课程不存在</h2>
            <Button onClick={() => navigate('/dashboard')}>返回学习中心</Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar courseId={courseId} />
      
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{languageNames[course.language]?.flag}</span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                  <p className="text-gray-600">听力训练</p>
                </div>
              </div>
            </div>
            <Badge variant="accent" size="md">
              <Headphones className="mr-1" size={14} />
              听力训练
            </Badge>
          </div>

          {/* Progress */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">练习进度</span>
              <span className="text-sm font-semibold text-gray-900">
                {currentIndex + 1} / {listeningItems.length || 5}
              </span>
            </div>
            <ProgressBar 
              value={currentIndex + 1} 
              max={listeningItems.length || 5} 
              color="accent"
              size="md"
            />
          </Card>

          {!isComplete ? (
            <div className="animate-slide-up">
              {/* Listening Card */}
              <Card className="mb-6 bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200">
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Headphones className="text-white" size={40} />
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{currentItem.title}</h2>
                  <p className="text-gray-600 mb-6">点击播放按钮听录音</p>

                  {/* Audio Controls */}
                  <div className="flex justify-center items-center space-x-4 mb-8">
                    <button
                      onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentIndex === 0}
                      className="p-3 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <RotateCcw size={20} className="transform -scale-x-100" />
                    </button>
                    
                    <button
                      onClick={isPlaying ? handleStop : handlePlay}
                      className="w-16 h-16 bg-accent-500 hover:bg-accent-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
                    >
                      {isPlaying ? (
                        <Pause className="text-white" size={32} />
                      ) : (
                        <Play className="text-white ml-1" size={32} />
                      )}
                    </button>
                    
                    <button
                      onClick={() => setCurrentIndex(prev => Math.min((listeningItems.length || 5) - 1, prev + 1))}
                      disabled={currentIndex >= (listeningItems.length || 5) - 1}
                      className="p-3 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <RotateCcw size={20} />
                    </button>
                  </div>

                  <Button
                    variant="secondary"
                    onClick={handlePlay}
                    icon={<Volume2 size={18} />}
                  >
                    听原音
                  </Button>
                </div>
              </Card>

              {/* Transcript / Translation */}
              <Card className="mb-6">
                <div className="space-y-4">
                  {!showAnswer ? (
                    <div className="text-center">
                      <p className="text-lg text-gray-700 mb-4">听出来了是什么意思吗?</p>
                      <Button variant="outline" onClick={() => setShowAnswer(true)}>
                        查看原文和翻译
                      </Button>
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <p className="text-sm text-gray-500 mb-2">原文</p>
                        <p className="text-lg text-gray-900">{currentItem.transcript}</p>
                      </div>
                      <div className="bg-primary-50 rounded-xl p-4">
                        <p className="text-sm text-primary-500 mb-2">翻译</p>
                        <p className="text-lg text-gray-900">{currentItem.translation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                >
                  返回学习中心
                </Button>
                <Button onClick={handleComplete}>
                  完成练习
                </Button>
              </div>
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">听力练习完成!</h2>
              <p className="text-gray-600 mb-8">你完成了 {listeningItems.length || 5} 个听力练习</p>
              
              <div className="max-w-md mx-auto mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-accent-50 rounded-xl">
                    <p className="text-4xl font-bold text-accent-600 mb-2">
                      +{completedCount * 8}
                    </p>
                    <p className="text-gray-600">获得 XP</p>
                  </div>
                  <div className="p-6 bg-secondary-50 rounded-xl">
                    <p className="text-4xl font-bold text-secondary-600 mb-2">
                      {listeningItems.length || 5}
                    </p>
                    <p className="text-gray-600">练习数量</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  返回学习中心
                </Button>
                <Button onClick={() => navigate('/vocabulary/en-a1')}>
                  再学一遍
                </Button>
              </div>
            </Card>
          )}

          {/* XP Info */}
          {user && (
            <Card className="mt-6 bg-gradient-to-r from-accent-50 to-accent-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="text-accent-500" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">本次学习</p>
                    <p className="text-sm text-gray-600">获得 XP +{completedCount * 8}</p>
                  </div>
                </div>
                <Badge variant="accent">
                  <Trophy className="mr-1" size={14} />
                  总计: {user.stats.totalXP} XP
                </Badge>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
