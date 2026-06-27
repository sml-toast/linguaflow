import { useState } from 'react';
import { Check, X as XIcon, Lightbulb } from 'lucide-react';
import { clsx } from 'clsx';

interface QuizQuestionProps {
  question: string;
  type: 'multiple-choice' | 'fill-blank';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuizQuestion({
  question,
  type,
  options,
  correctAnswer,
  explanation,
  onAnswer,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (type === 'fill-blank') {
      const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
      setIsSubmitted(true);
      onAnswer(isCorrect);
    } else {
      const isCorrect = selectedAnswer === correctAnswer;
      setIsSubmitted(true);
      onAnswer(isCorrect);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setUserAnswer('');
    setIsSubmitted(false);
  };

  const getOptionClass = (option: string) => {
    if (!isSubmitted) {
      return selectedAnswer === option
        ? 'border-primary-500 bg-primary-50'
        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50';
    }
    if (option === correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-700';
    }
    if (option === selectedAnswer && option !== correctAnswer) {
      return 'border-red-500 bg-red-50 text-red-700';
    }
    return 'border-gray-200 opacity-50';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <p className="text-lg text-gray-700 mb-4">{question}</p>

        {type === 'multiple-choice' && options && (
          <div className="space-y-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => !isSubmitted && setSelectedAnswer(option)}
                disabled={isSubmitted}
                className={clsx(
                  'w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                  getOptionClass(option)
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {isSubmitted && option === correctAnswer && (
                    <Check className="text-green-500" size={20} />
                  )}
                  {isSubmitted && option === selectedAnswer && option !== correctAnswer && (
                    <XIcon className="text-red-500" size={20} />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {type === 'fill-blank' && (
          <div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => !isSubmitted && setUserAnswer(e.target.value)}
              disabled={isSubmitted}
              placeholder="输入你的答案..."
              className={clsx(
                'w-full p-4 rounded-xl border-2 outline-none transition-all duration-200',
                isSubmitted
                  ? userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 focus:border-primary-500'
              )}
            />
            {isSubmitted && userAnswer.trim().toLowerCase() !== correctAnswer.toLowerCase() && (
              <p className="mt-2 text-green-600 font-medium">
                正确答案: {correctAnswer}
              </p>
            )}
          </div>
        )}
      </div>

      {isSubmitted && (
        <div className="p-4 bg-accent-50 rounded-xl mb-4">
          <div className="flex items-start space-x-3">
            <Lightbulb className="text-accent-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-accent-700 mb-1">解析</p>
              <p className="text-gray-700">{explanation}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        {isSubmitted ? (
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-semibold"
          >
            下一题
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer && !userAnswer.trim()}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            提交答案
          </button>
        )}
      </div>
    </div>
  );
}
