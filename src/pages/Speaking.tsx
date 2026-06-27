import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import { useAuthStore } from '../store/authStore';
import { AudioRecorder } from '../components/learning/AudioRecorder';
import { ProgressBar } from '../components/common/ProgressBar';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Sidebar } from '../components/layout/Sidebar';
import { ArrowLeft, Mic, Trophy, Zap } from 'lucide-react';
import { getCourseById, languageNames } from '../data/courses';

const speakingPractice = [
  { id: 's1', text: 'Hello, how are you today?', translation: '你好,今天怎么样?' },
  { id: 's2', text: 'Nice to meet you!', translation: '很高兴认识你!' },
  { id: 's3', text: 'Where are you from?', translation: '你来自哪里?' },
  { id: 's4', text: 'I am learning English.', translation: '我正在学习英语。' },
  { id: 's5', text: 'Thank you very much!', translation: '非常感谢你!' },
];

export function Speaking() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { completeLesson, startCourse } = useLearningStore();
  const { addXP, user, updateUser } = useAuthStore();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const course = courseId ? getCourseById(courseId) : undefined;
  const currentPractice = speakingPractice[currentIndex];

  useEffect(() => {
    if (courseId) {
      startCourse(courseId);
    }
  }, [courseId, startCourse]);

  const handleRecordingComplete = () => {
    setCompletedCount(prev => prev + 1);
  };

  const handleScoreUpdate = (score: number) => {
    setScores(prev => [...prev, score]);
    addXP(10);
  };

  const handleNext = () => {
    if (currentIndex < speakingPractice.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      if (courseId) {
        completeLesson(courseId, 'speaking');
      }
      if (user) {
        updateUser({
          stats: {
            ...user.stats,
            speakingCompleted: user.stats.speakingCompleted + 1,
          },
        });
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

  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

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
                  <p className="text-gray-600">口语跟读练习</p>
                </div>
              </div>
            </div>
            <Badge variant="danger" size="md">
              <Mic className="mr-1" size={14} />
              口语练习
            </Badge>
          </div>

          {/* Progress */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">练习进度</span>
              <span className="text-sm font-semibold text-gray-900">
                {currentIndex + 1} / {speakingPractice.length}
              </span>
            </div>
            <ProgressBar 
              value={currentIndex + 1} 
              max={speakingPractice.length} 
              color="primary"
              size="md"
            />
          </Card>

          {!isComplete ? (
            <div className="animate-slide-up">
              {/* Speaking Practice */}
              <AudioRecorder
                key={currentPractice.id}
                text={currentPractice.text}
                onRecordingComplete={handleRecordingComplete}
                onScoreUpdate={handleScoreUpdate}
                language={course.language}
              />

              {/* Navigation */}
              <div className="mt-6 flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                >
                  上一题
                </Button>
                <Button onClick={handleNext}>
                  {currentIndex < speakingPractice.length - 1 ? '下一题' : '完成练习'}
                </Button>
              </div>
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">口语练习完成!</h2>
              <p className="text-gray-600 mb-8">你完成了 {speakingPractice.length} 个跟读练习</p>
              
              <div className="max-w-md mx-auto mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-primary-50 rounded-xl">
                    <p className="text-4xl font-bold text-primary-600 mb-2">
                      {averageScore}
                    </p>
                    <p className="text-gray-600">平均评分</p>
                  </div>
                  <div className="p-6 bg-accent-50 rounded-xl">
                    <p className="text-4xl font-bold text-accent-600 mb-2">
                      +{speakingPractice.length * 10}
                    </p>
                    <p className="text-gray-600">获得 XP</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  返回学习中心
                </Button>
                <Button onClick={() => navigate(`/listening/${courseId}`)}>
                  继续听力训练
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
                    <p className="text-sm text-gray-600">获得 XP +{completedCount * 10}</p>
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
