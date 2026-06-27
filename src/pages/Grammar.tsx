import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import { useAuthStore } from '../store/authStore';
import { QuizQuestion } from '../components/learning/QuizQuestion';
import { ProgressBar } from '../components/common/ProgressBar';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Sidebar } from '../components/layout/Sidebar';
import { ArrowLeft, GraduationCap, Trophy, Zap, BookOpen } from 'lucide-react';
import { getCourseById, languageNames } from '../data/courses';
import { getGrammarByUnit, GrammarRule } from '../data/grammar';

export function Grammar() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { completeLesson, startCourse } = useLearningStore();
  const { addXP, user } = useAuthStore();
  
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const course = courseId ? getCourseById(courseId) : undefined;
  const firstUnitId = course?.units[0]?.id;
  const rules = firstUnitId ? getGrammarByUnit(firstUnitId) : [];
  const currentRule = rules[currentRuleIndex];
  const currentExercise = currentRule?.exercises[currentExerciseIndex];

  useEffect(() => {
    if (courseId) {
      startCourse(courseId, firstUnitId);
    }
  }, [courseId, firstUnitId, startCourse]);

  useEffect(() => {
    if (rules.length > 0) {
      setTotalExercises(rules.reduce((sum, rule) => sum + rule.exercises.length, 0));
    }
  }, [rules]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      addXP(5);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    
    if (currentExerciseIndex < currentRule.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else if (currentRuleIndex < rules.length - 1) {
      setCurrentRuleIndex(prev => prev + 1);
      setCurrentExerciseIndex(0);
    } else {
      setIsComplete(true);
      if (courseId) {
        completeLesson(courseId, 'grammar');
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
                  <p className="text-gray-600">语法练习</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" size="md">
              <GraduationCap className="mr-1" size={14} />
              语法练习
            </Badge>
          </div>

          {/* Progress */}
          <Card className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">
                {currentRule?.title || '加载中...'}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {correctCount} / {totalExercises} 正确
              </span>
            </div>
            <ProgressBar 
              value={correctCount} 
              max={totalExercises} 
              color="secondary"
              size="md"
            />
          </Card>

          {!isComplete && currentRule && currentExercise ? (
            <div className="animate-slide-up">
              {/* Grammar Rule Explanation */}
              <Card className="mb-6 bg-gradient-to-r from-secondary-50 to-secondary-100 border border-secondary-200">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{currentRule.title}</h3>
                    <p className="text-gray-700 mb-3">{currentRule.description}</p>
                    <div className="space-y-2">
                      {currentRule.examples.map((ex, idx) => (
                        <div key={idx} className="bg-white/80 rounded-lg p-3">
                          <p className="text-gray-900">{ex.sentence}</p>
                          <p className="text-sm text-gray-500">{ex.translation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quiz Question */}
              <QuizQuestion
                question={currentExercise.question}
                type={currentExercise.type}
                options={currentExercise.options}
                correctAnswer={currentExercise.correctAnswer}
                explanation={currentExercise.explanation}
                onAnswer={handleAnswer}
              />

              {showExplanation && (
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleNext}>
                    下一题
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">语法练习完成!</h2>
              <p className="text-gray-600 mb-8">
                你完成了 {totalExercises} 道练习题,答对了 {correctCount} 道
              </p>
              
              <div className="max-w-md mx-auto mb-8">
                <div className="p-6 bg-secondary-50 rounded-xl">
                  <p className="text-4xl font-bold text-secondary-600 mb-2">
                    {Math.round((correctCount / totalExercises) * 100)}%
                  </p>
                  <p className="text-gray-600">正确率</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  返回学习中心
                </Button>
                <Button onClick={() => navigate(`/speaking/${courseId}`)}>
                  继续口语练习
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
                    <p className="text-sm text-gray-600">获得 XP +{correctCount * 5}</p>
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
