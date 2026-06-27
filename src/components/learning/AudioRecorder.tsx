import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Volume2 } from 'lucide-react';
import { clsx } from 'clsx';

interface AudioRecorderProps {
  text: string;
  onRecordingComplete?: (audioBlob: Blob) => void;
  onScoreUpdate?: (score: number) => void;
  language?: 'en' | 'jp' | 'kr';
}

export function AudioRecorder({ text, onRecordingComplete, onScoreUpdate, language = 'en' }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete?.(blob);
        
        // Simulate score
        const simulatedScore = Math.floor(Math.random() * 30) + 70;
        setScore(simulatedScore);
        onScoreUpdate?.(simulatedScore);
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);
      
      timerRef.current = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const playOriginal = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : language === 'jp' ? 'ja-JP' : 'ko-KR';
    speechSynthesis.speak(utterance);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="text-center mb-6">
        <p className="text-xl text-gray-700 mb-2">跟读练习</p>
        <p className="text-2xl font-bold text-primary-600">{text}</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className={clsx(
          'w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300',
          isRecording 
            ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50' 
            : 'bg-primary-100'
        )}>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="w-full h-full rounded-full flex items-center justify-center"
          >
            {isRecording ? (
              <Square className="text-white" size={32} />
            ) : (
              <Mic className="text-primary-600" size={32} />
            )}
          </button>
        </div>
      </div>

      <div className="text-center mb-6">
        {isRecording ? (
          <p className="text-red-500 font-semibold animate-pulse">
            录音中... {formatTime(duration)}
          </p>
        ) : (
          <p className="text-gray-500">点击麦克风开始录音</p>
        )}
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={playOriginal}
          className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-xl hover:bg-secondary-200 transition-colors"
        >
          <Volume2 size={20} />
          <span>听原音</span>
        </button>
        
        {audioUrl && (
          <>
            <button
              onClick={playAudio}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-xl hover:bg-primary-200 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              <span>{isPlaying ? '暂停' : '播放录音'}</span>
            </button>
            <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
          </>
        )}
      </div>

      {score !== null && (
        <div className="text-center p-4 bg-gradient-to-r from-accent-50 to-accent-100 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">发音评分</p>
          <p className={clsx(
            'text-4xl font-bold',
            score >= 90 ? 'text-green-600' : score >= 70 ? 'text-yellow-600' : 'text-red-600'
          )}>
            {score}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {score >= 90 ? '太棒了！' : score >= 70 ? '不错，继续加油！' : '需要多练习哦！'}
          </p>
        </div>
      )}
    </div>
  );
}
