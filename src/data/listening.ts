export interface ListeningItem {
  id: string;
  courseId: string;
  title: string;
  transcript: string;
  translation: string;
  audioUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
}

export const listeningData: Record<string, ListeningItem[]> = {
  'en-a1-1': [
    {
      id: 'l1',
      courseId: 'en-a1-1',
      title: '初次见面',
      transcript: 'Hello, my name is John. Nice to meet you!',
      translation: '你好，我叫约翰。很高兴认识你！',
      difficulty: 'easy',
      duration: 30,
    },
    {
      id: 'l2',
      courseId: 'en-a1-1',
      title: '日常问候',
      transcript: 'Good morning! How are you today? I am fine, thank you.',
      translation: '早上好！你今天好吗？我很好，谢谢。',
      difficulty: 'easy',
      duration: 25,
    },
    {
      id: 'l3',
      courseId: 'en-a1-1',
      title: '告别对话',
      transcript: 'Goodbye! See you tomorrow. Have a nice day!',
      translation: '再见！明天见。祝你有美好的一天！',
      difficulty: 'easy',
      duration: 20,
    },
  ],
  'en-a1-2': [
    {
      id: 'l4',
      courseId: 'en-a1-2',
      title: '时间问答',
      transcript: 'What time is it now? It is three o clock. Oh, I have a meeting at four.',
      translation: '现在几点？三点。哦，我四点有个会议。',
      difficulty: 'medium',
      duration: 35,
    },
    {
      id: 'l5',
      courseId: 'en-a1-2',
      title: '日期表达',
      transcript: 'Today is Monday, January fifth. Tomorrow is Tuesday.',
      translation: '今天是星期一，一月五日。明天是星期二。',
      difficulty: 'medium',
      duration: 30,
    },
  ],
  'jp-a1-1': [
    {
      id: 'jl1',
      courseId: 'jp-a1-1',
      title: '自我介绍',
      transcript: 'はじめまして。わたし は たなか です。にほんごを べんきょうして います。',
      translation: '初次见面。我叫田中。我正在学习日语。',
      difficulty: 'easy',
      duration: 40,
    },
    {
      id: 'jl2',
      courseId: 'jp-a1-1',
      title: '早上对话',
      transcript: 'おはよう ございます。 오늘은 날씨가 좋네요。',
      translation: '早上好。今天天气真好。',
      difficulty: 'easy',
      duration: 25,
    },
  ],
  'kr-a1-1': [
    {
      id: 'kl1',
      courseId: 'kr-a1-1',
      title: '问候对话',
      transcript: '안녕하세요? 저는 김철수입니다. 만나서 반갑습니다.',
      translation: '你好？我是金哲秀。很高兴见到你。',
      difficulty: 'easy',
      duration: 35,
    },
    {
      id: 'kl2',
      courseId: 'kr-a1-1',
      title: '自我介绍',
      transcript: '저는 학생입니다. 한국어를 공부하고 있습니다.',
      translation: '我是学生。我正在学习韩语。',
      difficulty: 'easy',
      duration: 30,
    },
  ],
};

export const getListeningByUnit = (unitId: string): ListeningItem[] => {
  return listeningData[unitId] || [];
};
