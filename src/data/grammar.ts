export interface GrammarRule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  examples: {
    sentence: string;
    translation: string;
    highlight?: string;
  }[];
  exercises: {
    id: string;
    type: 'multiple-choice' | 'fill-blank';
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export const grammarData: Record<string, GrammarRule[]> = {
  'en-a1-1': [
    {
      id: 'g1',
      courseId: 'en-a1-1',
      title: 'Be动词的用法',
      description: '学习be动词am, is, are的基本用法',
      examples: [
        { sentence: 'I am a student.', translation: '我是一个学生。', highlight: 'am' },
        { sentence: 'She is my teacher.', translation: '她是我的老师。', highlight: 'is' },
        { sentence: 'They are from China.', translation: '他们来自中国。', highlight: 'are' },
      ],
      exercises: [
        {
          id: 'ge1',
          type: 'multiple-choice',
          question: '选择正确的be动词: He ___ a doctor.',
          options: ['am', 'is', 'are'],
          correctAnswer: 'is',
          explanation: 'He是第三人称单数，用is。',
        },
        {
          id: 'ge2',
          type: 'fill-blank',
          question: '填空: I ___ happy today.',
          correctAnswer: 'am',
          explanation: 'I后用am。',
        },
      ],
    },
    {
      id: 'g2',
      courseId: 'en-a1-1',
      title: '人称代词',
      description: '学习主格人称代词的用法',
      examples: [
        { sentence: 'I love learning English.', translation: '我喜欢学英语。', highlight: 'I' },
        { sentence: 'You are my friend.', translation: '你是我的朋友。', highlight: 'You' },
        { sentence: 'He plays basketball.', translation: '他打篮球。', highlight: 'He' },
      ],
      exercises: [
        {
          id: 'ge3',
          type: 'multiple-choice',
          question: '___ is a girl. (她是一个女孩)',
          options: ['He', 'She', 'It'],
          correctAnswer: 'She',
          explanation: '女孩用She。',
        },
      ],
    },
  ],
  'en-a1-2': [
    {
      id: 'g3',
      courseId: 'en-a1-2',
      title: '基数词',
      description: '学习1-100的数字表达',
      examples: [
        { sentence: 'There are twenty students in the class.', translation: '班里有20个学生。', highlight: 'twenty' },
        { sentence: 'I have fifty books.', translation: '我有50本书。', highlight: 'fifty' },
        { sentence: 'The price is one hundred dollars.', translation: '价格是100美元。', highlight: 'one hundred' },
      ],
      exercises: [
        {
          id: 'ge4',
          type: 'multiple-choice',
          question: '"15" 用英语怎么说?',
          options: ['five', 'fifteen', 'fifty'],
          correctAnswer: 'fifteen',
          explanation: '15是fifteen，5是five。',
        },
      ],
    },
  ],
  'jp-a1-1': [
    {
      id: 'jg1',
      courseId: 'jp-a1-1',
      title: '判断词「です」',
      description: '学习日语判断句的基本结构',
      examples: [
        { sentence: 'わたし は がくせい です。', translation: '我是学生。', highlight: 'です' },
        { sentence: 'これ は ほん です。', translation: '这是书。', highlight: 'です' },
        { sentence: 'にほん は アジア です。', translation: '日本在亚洲。', highlight: 'です' },
      ],
      exercises: [
        {
          id: 'jge1',
          type: 'multiple-choice',
          question: '"那是桌子" 怎么说?',
          options: ['これは 机 です', 'これ は 椅子 です', 'それ は つくえ です'],
          correctAnswer: 'それ は つくえ です',
          explanation: '"那"用それ，书桌是つくえ。',
        },
      ],
    },
  ],
  'kr-a1-1': [
    {
      id: 'kg1',
      courseId: 'kr-a1-1',
      title: '助词「은/는」',
      description: '学习韩语主语助词的用法',
      examples: [
        { sentence: '저는 학생입니다.', translation: '我是学生。', highlight: '는' },
        { sentence: '언니는 선생님입니다.', translation: '姐姐是老师。', highlight: '은' },
        { sentence: '우리는 친구입니다.', translation: '我们是朋友。', highlight: '는' },
      ],
      exercises: [
        {
          id: 'kge1',
          type: 'multiple-choice',
          question: '"他是医生" 怎么说?',
          options: ['저는 의립니다', '그는 의립니다', '우리는 의사입니다'],
          correctAnswer: '그는 의립니다',
          explanation: '男性第三人称主语用그는。',
        },
      ],
    },
  ],
};

export const getGrammarByUnit = (unitId: string): GrammarRule[] => {
  return grammarData[unitId] || [];
};
