import { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Check, X as XIcon, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface FlashCardProps {
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  onKnow?: () => void;
  onDontKnow?: () => void;
  onFuzzy?: () => void;
}

export function FlashCard({
  word,
  translation,
  pronunciation,
  example,
  exampleTranslation,
  onKnow,
  onDontKnow,
  onFuzzy,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  const handleFlip = () => {
    setAnimationClass('animate-scale-in');
    setIsFlipped(!isFlipped);
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const speakExample = () => {
    const utterance = new SpeechSynthesisUtterance(example);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="perspective-1000">
      <div
        className={clsx(
          'relative w-full h-96 cursor-pointer transition-transform duration-500 transform-style-preserve-3d',
          isFlipped && 'rotate-y-180'
        )}
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        onClick={handleFlip}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-white backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              speakWord();
            }}
            className="absolute top-6 right-6 p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <Volume2 size={24} />
          </button>
          
          <h2 className="text-5xl font-bold mb-4">{word}</h2>
          <p className="text-xl text-white/80 mb-2">/{pronunciation}/</p>
          
          <div className="mt-8 flex items-center space-x-2 text-white/60">
            <HelpCircle size={20} />
            <span className="text-sm">点击卡片查看释义</span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center border-2 border-primary-100"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-primary-600 mb-2">{translation}</h2>
            <p className="text-lg text-gray-500">/{pronunciation}/</p>
          </div>
          
          <div className="w-full bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-gray-700 text-lg mb-2">{example}</p>
            <p className="text-gray-500">{exampleTranslation}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                speakExample();
              }}
              className="mt-3 flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <Volume2 size={18} />
              <span className="text-sm">播放例句</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-gray-400">
            <RotateCcw size={16} />
            <span className="text-sm">点击卡片返回</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={onDontKnow}
          className="flex items-center space-x-2 px-6 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
        >
          <XIcon size={20} />
          <span>不认识</span>
        </button>
        <button
          onClick={onFuzzy}
          className="flex items-center space-x-2 px-6 py-3 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition-colors"
        >
          <span className="text-xl">😐</span>
          <span>模糊</span>
        </button>
        <button
          onClick={onKnow}
          className="flex items-center space-x-2 px-6 py-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors"
        >
          <Check size={20} />
          <span>认识</span>
        </button>
      </div>
    </div>
  );
}
