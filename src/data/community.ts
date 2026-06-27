export interface Post {
  id: string;
  author: {
    id: string;
    username: string;
    avatar: string;
    level: number;
  };
  language: 'en' | 'jp' | 'kr' | 'all';
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  likes: number;
}

export const posts: Post[] = [
  {
    id: 'p1',
    author: { id: 'u1', username: '英语爱好者', avatar: '👨‍💻', level: 5 },
    language: 'en',
    title: '学习英语3个月的心得分享',
    content: '从零基础到现在能够进行简单对话,我总结了一些学习方法供大家参考...',
    likes: 128,
    comments: 45,
    createdAt: '2024-01-15',
    tags: ['英语', '学习方法', '经验分享'],
  },
  {
    id: 'p2',
    author: { id: 'u2', username: '日语小能手', avatar: '👩‍🎨', level: 3 },
    language: 'jp',
    title: '日语五十音图记忆技巧',
    content: '分享我学习五十音图时用到的一些联想记忆法,希望能帮助到刚开始学日语的同学们...',
    likes: 256,
    comments: 78,
    createdAt: '2024-01-14',
    tags: ['日语', '五十音图', '记忆技巧'],
  },
  {
    id: 'p3',
    author: { id: 'u3', username: '韩流达人', avatar: '🧑‍🎤', level: 4 },
    language: 'kr',
    title: '通过看韩剧学习韩语的心得',
    content: '我喜欢看韩剧,不知不觉中学会了很多日常用语,今天来分享一下我的学习方法...',
    likes: 189,
    comments: 56,
    createdAt: '2024-01-13',
    tags: ['韩语', '韩剧', '学习方法'],
  },
  {
    id: 'p4',
    author: { id: 'u4', username: '语言探索者', avatar: '🌟', level: 6 },
    language: 'all',
    title: '同时学习多种语言的经验',
    content: '很多人在学习多门语言时会感到困惑,今天来分享一下我是如何在一年内学习三门语言的...',
    likes: 312,
    comments: 89,
    createdAt: '2024-01-12',
    tags: ['多语言', '学习技巧', '经验分享'],
  },
  {
    id: 'p5',
    author: { id: 'u5', username: '英语口语王', avatar: '🎓', level: 7 },
    language: 'en',
    title: '提高英语口语的5个技巧',
    content: '很多同学觉得口语很难,其实只要掌握正确方法,口语提升并不难...',
    likes: 445,
    comments: 120,
    createdAt: '2024-01-11',
    tags: ['英语', '口语', '技巧'],
  },
];

export const comments: Comment[] = [
  {
    id: 'c1',
    postId: 'p1',
    author: { id: 'u6', username: '学习新手', avatar: '🐣' },
    content: '写得真好！请问你是怎么安排每天学习时间的？',
    createdAt: '2024-01-15',
    likes: 12,
  },
  {
    id: 'c2',
    postId: 'p1',
    author: { id: 'u1', username: '英语爱好者', avatar: '👨‍💻' },
    content: '我每天会安排2小时,早晚各一小时,坚持下来效果很好！',
    createdAt: '2024-01-15',
    likes: 8,
  },
];

export const getPostsByLanguage = (language: 'en' | 'jp' | 'kr' | 'all'): Post[] => {
  if (language === 'all') return posts;
  return posts.filter(post => post.language === language);
};

export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};
