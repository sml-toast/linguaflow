import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  nativeLanguage: string;
  learningLanguages: ('en' | 'jp' | 'kr')[];
  currentLevel: Record<string, string>;
  stats: {
    totalXP: number;
    streakDays: number;
    totalMinutes: number;
    wordsLearned: number;
    grammarCompleted: number;
    speakingCompleted: number;
    listeningCompleted: number;
  };
  achievements: string[];
  joinDate: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addXP: (amount: number) => void;
  unlockAchievement: (achievementId: string) => void;
}

const mockUsers: Array<User & { password: string }> = [
  {
    id: 'demo',
    email: 'demo@linguaflow.com',
    password: 'demo123',
    username: '学习达人',
    avatar: '🎓',
    nativeLanguage: 'zh',
    learningLanguages: ['en', 'jp', 'kr'],
    currentLevel: { en: 'A1', jp: 'A1', kr: 'A1' },
    stats: {
      totalXP: 750,
      streakDays: 12,
      totalMinutes: 480,
      wordsLearned: 156,
      grammarCompleted: 28,
      speakingCompleted: 18,
      listeningCompleted: 22,
    },
    achievements: ['streak-7', 'vocab-100', 'first-course'],
    joinDate: '2024-01-01',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: async (userData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: userData.email || '',
          username: userData.username || '新用户',
          avatar: userData.avatar || '😊',
          nativeLanguage: 'zh',
          learningLanguages: userData.learningLanguages || ['en'],
          currentLevel: { en: 'A1', jp: 'A1', kr: 'A1' },
          stats: {
            totalXP: 0,
            streakDays: 0,
            totalMinutes: 0,
            wordsLearned: 0,
            grammarCompleted: 0,
            speakingCompleted: 0,
            listeningCompleted: 0,
          },
          achievements: [],
          joinDate: new Date().toISOString().split('T')[0],
        };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      addXP: (amount) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              stats: {
                ...user.stats,
                totalXP: user.stats.totalXP + amount,
              },
            },
          });
        }
      },

      unlockAchievement: (achievementId) => {
        const { user } = get();
        if (user && !user.achievements.includes(achievementId)) {
          set({
            user: {
              ...user,
              achievements: [...user.achievements, achievementId],
            },
          });
        }
      },
    }),
    {
      name: 'linguaflow-auth',
    }
  )
);
