export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'skill' | 'social' | 'milestone';
  requirement: {
    type: string;
    value: number;
  };
  rewardXP: number;
}

export interface UserAchievement extends Achievement {
  unlockedAt?: string;
  progress?: number;
}

export const achievements: Achievement[] = [
  {
    id: 'streak-7',
    title: '坚持不懈',
    description: '连续学习7天',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', value: 7 },
    rewardXP: 100,
  },
  {
    id: 'streak-30',
    title: '学习达人',
    description: '连续学习30天',
    icon: '⭐',
    category: 'streak',
    requirement: { type: 'streak', value: 30 },
    rewardXP: 500,
  },
  {
    id: 'streak-100',
    title: '语言大师',
    description: '连续学习100天',
    icon: '👑',
    category: 'streak',
    requirement: { type: 'streak', value: 100 },
    rewardXP: 2000,
  },
  {
    id: 'vocab-100',
    title: '词汇新手',
    description: '学习100个单词',
    icon: '📚',
    category: 'skill',
    requirement: { type: 'words', value: 100 },
    rewardXP: 150,
  },
  {
    id: 'vocab-500',
    title: '词汇达人',
    description: '学习500个单词',
    icon: '📖',
    category: 'skill',
    requirement: { type: 'words', value: 500 },
    rewardXP: 500,
  },
  {
    id: 'vocab-1000',
    title: '词汇专家',
    description: '学习1000个单词',
    icon: '🎓',
    category: 'skill',
    requirement: { type: 'words', value: 1000 },
    rewardXP: 1000,
  },
  {
    id: 'grammar-50',
    title: '语法入门',
    description: '完成50个语法练习',
    icon: '✏️',
    category: 'skill',
    requirement: { type: 'grammar', value: 50 },
    rewardXP: 100,
  },
  {
    id: 'grammar-200',
    title: '语法高手',
    description: '完成200个语法练习',
    icon: '📝',
    category: 'skill',
    requirement: { type: 'grammar', value: 200 },
    rewardXP: 400,
  },
  {
    id: 'speaking-30',
    title: '开口说',
    description: '完成30次口语练习',
    icon: '🎤',
    category: 'skill',
    requirement: { type: 'speaking', value: 30 },
    rewardXP: 120,
  },
  {
    id: 'speaking-100',
    title: '口语达人',
    description: '完成100次口语练习',
    icon: '🎙️',
    category: 'skill',
    requirement: { type: 'speaking', value: 100 },
    rewardXP: 400,
  },
  {
    id: 'listening-50',
    title: '听力入门',
    description: '完成50次听力练习',
    icon: '🎧',
    category: 'skill',
    requirement: { type: 'listening', value: 50 },
    rewardXP: 100,
  },
  {
    id: 'listening-150',
    title: '听力高手',
    description: '完成150次听力练习',
    icon: '👂',
    category: 'skill',
    requirement: { type: 'listening', value: 150 },
    rewardXP: 350,
  },
  {
    id: 'first-course',
    title: '初学者',
    description: '完成第一门课程',
    icon: '🎯',
    category: 'milestone',
    requirement: { type: 'courses', value: 1 },
    rewardXP: 200,
  },
  {
    id: 'three-courses',
    title: '学习之旅',
    description: '完成3门课程',
    icon: '🚀',
    category: 'milestone',
    requirement: { type: 'courses', value: 3 },
    rewardXP: 600,
  },
  {
    id: 'first-post',
    title: '社区新人',
    description: '发布第一条动态',
    icon: '✍️',
    category: 'social',
    requirement: { type: 'posts', value: 1 },
    rewardXP: 50,
  },
  {
    id: 'ten-posts',
    title: '活跃达人',
    description: '发布10条动态',
    icon: '📢',
    category: 'social',
    requirement: { type: 'posts', value: 10 },
    rewardXP: 200,
  },
  {
    id: 'first-comment',
    title: '互动开始',
    description: '发表评论',
    icon: '💬',
    category: 'social',
    requirement: { type: 'comments', value: 1 },
    rewardXP: 30,
  },
];

export const getAchievementsByCategory = (category: Achievement['category']): Achievement[] => {
  return achievements.filter(a => a.category === category);
};

export const getUserLevel = (totalXP: number): { level: number; title: string; nextLevelXP: number; currentXP: number } => {
  const levels = [
    { level: 1, title: '语言探险家', xp: 0 },
    { level: 2, title: '词汇学徒', xp: 100 },
    { level: 3, title: '语法新手', xp: 300 },
    { level: 4, title: '学习者', xp: 600 },
    { level: 5, title: '语言爱好者', xp: 1000 },
    { level: 6, title: '中级学习者', xp: 1500 },
    { level: 7, title: '进阶者', xp: 2200 },
    { level: 8, title: '语言探索者', xp: 3000 },
    { level: 9, title: '文化使者', xp: 4000 },
    { level: 10, title: '语言大师', xp: 5000 },
  ];

  let currentLevel = levels[0];
  let nextLevel = levels[1];

  for (let i = 0; i < levels.length; i++) {
    if (totalXP >= levels[i].xp) {
      currentLevel = levels[i];
      nextLevel = levels[i + 1] || levels[i];
    }
  }

  const currentLevelXP = totalXP - currentLevel.xp;
  const xpNeeded = nextLevel.xp - currentLevel.xp;

  return {
    level: currentLevel.level,
    title: currentLevel.title,
    nextLevelXP: nextLevel.xp,
    currentXP: currentLevelXP,
  };
};
