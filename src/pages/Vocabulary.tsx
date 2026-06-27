import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import { useAuthStore } from '../store/authStore';
import { FlashCard } from '../components/learning/FlashCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Sidebar } from '../components/layout/Sidebar';
import { ArrowLeft, ArrowRight, BookOpen, Trophy, Zap } from 'lucide-react';
import { getCourseById, languageNames } from '../data/courses';
import { getVocabularyByUnit, VocabWord } from '../data/vocabulary';

export function Vocabulary() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { completeLesson, startCourse } = useLearningStore();
  const { addXP, user } = useAuthStore();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownWords, setKnownWords] = useState(0);
  const [fuzzyWords, setFuzzyWords] = useState(0);
  const [unknownWords, setUnknownWords] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const course = courseId ? getCourseById(courseId) : undefined;
  const firstUnitId = course?.units[0]?.id;
  const words = firstUnitId ? getVocabularyByUnit(firstUnitId) : [];
  const currentWord = words[currentIndex];

  useEffect(() => {
    if (courseId) {
      startCourse(courseId, firstUnitId);
    }
  }, [courseId, firstUnitId, startCourse]);

  const handleKnow = () => {
    setKnownWords(prev => prev + 1);
    addXP(5);
    moveToNext();
  };

  const handleFuzzy = () => {
    setFuzzyWords(prev => prev + 1);
    addXP(2);
    moveToNext();
  };

  const handleDontKnow = () => {
    setUnknownWords(prev => prev + 1);
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      if (courseId) {
        completeLesson(courseId, 'vocabulary');
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setKnownWords(0);
    setFuzzyWords(0);
    setUnknownWords(0);
    setIsComplete(false);
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
                  <p className="text-gray-600">单词记忆练习</p>
                </div>
              </div>
            </div>
            <Badge variant="primary" size="md">
              <BookOpen className="mr-1" size={14} />
              单词学习
            </Badge>
          </div>

          {/* Progress */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">学习进度</span>
              <span className="text-sm font-semibold text-gray-900">
                {currentIndex + 1} / {words.length}
              </span>
            </div>
            <ProgressBar 
              value={currentIndex + 1} 
              max={words.length} 
              color="gradient"
              size="md"
            />
            <div className="flex justify-between mt-4 text-sm">
              <span className="text-green-600">认识: {knownWords}</span>
              <span className="text-yellow-600">模糊: {fuzzyWords}</span>
              <span className="text-red-600">不认识: {unknownWords}</span>
            </div>
          </Card>

          {/* Flash Card */}
          {!isComplete && currentWord ? (
            <div className="animate-slide-up">
              <FlashCard
                word={currentWord.word}
                translation={currentWord.translation}
                pronunciation={currentWord.pronunciation}
                example={currentWord.example}
                exampleTranslation={currentWord.exampleTranslation}
                onKnow={handleKnow}
                onFuzzy={handleFuzzy}
                onDontKnow={handleDontKnow}
              />
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">太棒了!</h2>
              <p className="text-gray-600 mb-8">你已完成本单元的单词学习</p>
              
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">{knownWords}</p>
                  <p className="text-sm text-gray-600">认识</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <p className="text-2xl font-bold text-yellow-600">{fuzzyWords}</p>
                  <p className="text-sm text-gray-600">模糊</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl">
                  <p className="text-2xl font-bold text-red-600">{unknownWords}</p>
                  <p className="text-sm text-gray-600">不认识</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={handleRetry}>
                  再学一遍
                </Button>
                <Button onClick={() => navigate(`/grammar/${courseId}`)}>
                  继续语法练习
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
                    <p className="text-sm text-gray-600">获得 XP +{knownWords * 5 + fuzzyWords * 2}</p>
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
