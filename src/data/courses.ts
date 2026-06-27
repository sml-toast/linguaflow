export interface Course {
  id: string;
  language: 'en' | 'jp' | 'kr';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  description: string;
  units: Unit[];
  requiredXP: number;
  thumbnail: string;
}

export interface Unit {
  id: string;
  title: string;
  lessons: number;
  vocabulary: number;
  grammar: number;
  speaking: number;
  listening: number;
}

export const courses: Course[] = [
  {
    id: 'en-a1',
    language: 'en',
    level: 'A1',
    title: '英语入门级',
    description: '学习基础词汇和日常用语，开启英语学习之旅',
    requiredXP: 0,
    thumbnail: '🇬🇧',
    units: [
      { id: 'en-a1-1', title: '问候与介绍', lessons: 5, vocabulary: 20, grammar: 5, speaking: 10, listening: 8 },
      { id: 'en-a1-2', title: '数字与时间', lessons: 5, vocabulary: 25, grammar: 4, speaking: 8, listening: 10 },
      { id: 'en-a1-3', title: '家庭与朋友', lessons: 5, vocabulary: 22, grammar: 6, speaking: 10, listening: 7 },
    ],
  },
  {
    id: 'en-a2',
    language: 'en',
    level: 'A2',
    title: '英语初级',
    description: '掌握简单对话和基础语法，进行日常交流',
    requiredXP: 500,
    thumbnail: '🇬🇧',
    units: [
      { id: 'en-a2-1', title: '日常生活', lessons: 6, vocabulary: 30, grammar: 8, speaking: 12, listening: 10 },
      { id: 'en-a2-2', title: '购物与交易', lessons: 6, vocabulary: 28, grammar: 7, speaking: 10, listening: 12 },
      { id: 'en-a2-3', title: '旅行与交通', lessons: 6, vocabulary: 32, grammar: 6, speaking: 8, listening: 14 },
    ],
  },
  {
    id: 'en-b1',
    language: 'en',
    level: 'B1',
    title: '英语中级',
    description: '流利对话和阅读理解，深入了解英语文化',
    requiredXP: 1200,
    thumbnail: '🇬🇧',
    units: [
      { id: 'en-b1-1', title: '工作与职业', lessons: 7, vocabulary: 40, grammar: 10, speaking: 15, listening: 12 },
      { id: 'en-b1-2', title: '时事与社会', lessons: 7, vocabulary: 45, grammar: 12, speaking: 12, listening: 15 },
    ],
  },
  {
    id: 'jp-a1',
    language: 'jp',
    level: 'A1',
    title: '日语入门级',
    description: '学习日语五十音图和基础词汇',
    requiredXP: 0,
    thumbnail: '🇯🇵',
    units: [
      { id: 'jp-a1-1', title: '五十音图', lessons: 5, vocabulary: 50, grammar: 5, speaking: 8, listening: 6 },
      { id: 'jp-a1-2', title: '基础问候', lessons: 5, vocabulary: 30, grammar: 8, speaking: 12, listening: 8 },
      { id: 'jp-a1-3', title: '数字与时间', lessons: 5, vocabulary: 25, grammar: 6, speaking: 10, listening: 10 },
    ],
  },
  {
    id: 'jp-a2',
    language: 'jp',
    level: 'A2',
    title: '日语初级',
    description: '掌握基本语法和常用词汇，进行简单对话',
    requiredXP: 500,
    thumbnail: '🇯🇵',
    units: [
      { id: 'jp-a2-1', title: '日常会话', lessons: 6, vocabulary: 35, grammar: 10, speaking: 14, listening: 10 },
      { id: 'jp-a2-2', title: '购物与服务', lessons: 6, vocabulary: 32, grammar: 8, speaking: 12, listening: 12 },
    ],
  },
  {
    id: 'jp-b1',
    language: 'jp',
    level: 'B1',
    title: '日语中级',
    description: '能够进行较为流畅的日常交流',
    requiredXP: 1200,
    thumbnail: '🇯🇵',
    units: [
      { id: 'jp-b1-1', title: '社交场合', lessons: 7, vocabulary: 45, grammar: 12, speaking: 16, listening: 14 },
      { id: 'jp-b1-2', title: '工作交流', lessons: 7, vocabulary: 50, grammar: 10, speaking: 14, listening: 16 },
    ],
  },
  {
    id: 'kr-a1',
    language: 'kr',
    level: 'A1',
    title: '韩语入门级',
    description: '学习韩文字母表和基础发音',
    requiredXP: 0,
    thumbnail: '🇰🇷',
    units: [
      { id: 'kr-a1-1', title: '韩文字母', lessons: 5, vocabulary: 40, grammar: 5, speaking: 10, listening: 8 },
      { id: 'kr-a1-2', title: '基础问候', lessons: 5, vocabulary: 28, grammar: 8, speaking: 12, listening: 8 },
      { id: 'kr-a1-3', title: '自我介绍', lessons: 5, vocabulary: 30, grammar: 6, speaking: 10, listening: 10 },
    ],
  },
  {
    id: 'kr-a2',
    language: 'kr',
    level: 'A2',
    title: '韩语初级',
    description: '掌握日常用语和基础语法',
    requiredXP: 500,
    thumbnail: '🇰🇷',
    units: [
      { id: 'kr-a2-1', title: '日常生活', lessons: 6, vocabulary: 35, grammar: 10, speaking: 14, listening: 10 },
      { id: 'kr-a2-2', title: '饮食文化', lessons: 6, vocabulary: 38, grammar: 8, speaking: 12, listening: 12 },
    ],
  },
  {
    id: 'kr-b1',
    language: 'kr',
    level: 'B1',
    title: '韩语中级',
    description: '能够进行较为流畅的日常交流',
    requiredXP: 1200,
    thumbnail: '🇰🇷',
    units: [
      { id: 'kr-b1-1', title: '社交互动', lessons: 7, vocabulary: 45, grammar: 12, speaking: 16, listening: 14 },
      { id: 'kr-b1-2', title: '韩国文化', lessons: 7, vocabulary: 50, grammar: 10, speaking: 14, listening: 16 },
    ],
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCoursesByLanguage = (language: 'en' | 'jp' | 'kr'): Course[] => {
  return courses.filter(course => course.language === language);
};

export const languageNames: Record<string, { name: string; native: string; flag: string }> = {
  en: { name: '英语', native: 'English', flag: '🇬🇧' },
  jp: { name: '日语', native: '日本語', flag: '🇯🇵' },
  kr: { name: '韩语', native: '한국어', flag: '🇰🇷' },
};

export const levelNames: Record<string, { name: string; description: string }> = {
  A1: { name: '入门级', description: '基础词汇和日常用语' },
  A2: { name: '初级', description: '简单对话和基础语法' },
  B1: { name: '中级', description: '流利对话和阅读理解' },
  B2: { name: '中高级', description: '专业话题和文化深入' },
  C1: { name: '高级', description: '复杂文本和精准表达' },
  C2: { name: '精通级', description: '接近母语水平' },
};
