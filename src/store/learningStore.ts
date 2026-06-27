import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CourseProgress {
  courseId: string;
  unitId: string;
  completedLessons: string[];
  vocabularyProgress: number;
  grammarProgress: number;
  speakingProgress: number;
  listeningProgress: number;
  lastAccessed: string;
  completionRate: number;
}

interface LearningState {
  currentCourse: string | null;
  currentUnit: string | null;
  progress: Record<string, CourseProgress>;
  startCourse: (courseId: string, unitId?: string) => void;
  completeLesson: (courseId: string, lessonType: 'vocabulary' | 'grammar' | 'speaking' | 'listening') => void;
  updateProgress: (courseId: string, updates: Partial<CourseProgress>) => void;
  getProgress: (courseId: string) => CourseProgress | undefined;
  resetProgress: () => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      currentCourse: null,
      currentUnit: null,
      progress: {},

      startCourse: (courseId: string, unitId?: string) => {
        const { progress } = get();
        if (!progress[courseId]) {
          set({
            currentCourse: courseId,
            currentUnit: unitId || null,
            progress: {
              ...progress,
              [courseId]: {
                courseId,
                unitId: unitId || '',
                completedLessons: [],
                vocabularyProgress: 0,
                grammarProgress: 0,
                speakingProgress: 0,
                listeningProgress: 0,
                lastAccessed: new Date().toISOString(),
                completionRate: 0,
              },
            },
          });
        } else {
          set({
            currentCourse: courseId,
            currentUnit: unitId || progress[courseId].unitId,
          });
        }
      },

      completeLesson: (courseId: string, lessonType: 'vocabulary' | 'grammar' | 'speaking' | 'listening') => {
        const { progress } = get();
        const courseProgress = progress[courseId];
        if (courseProgress) {
          const updates: Partial<CourseProgress> = {
            lastAccessed: new Date().toISOString(),
          };

          switch (lessonType) {
            case 'vocabulary':
              updates.vocabularyProgress = Math.min(100, courseProgress.vocabularyProgress + 5);
              break;
            case 'grammar':
              updates.grammarProgress = Math.min(100, courseProgress.grammarProgress + 5);
              break;
            case 'speaking':
              updates.speakingProgress = Math.min(100, courseProgress.speakingProgress + 5);
              break;
            case 'listening':
              updates.listeningProgress = Math.min(100, courseProgress.listeningProgress + 5);
              break;
          }

          const totalProgress = (
            updates.vocabularyProgress! +
            updates.grammarProgress! +
            updates.speakingProgress! +
            updates.listeningProgress!
          ) / 4;
          updates.completionRate = totalProgress;

          set({
            progress: {
              ...progress,
              [courseId]: {
                ...courseProgress,
                ...updates,
              },
            },
          });
        }
      },

      updateProgress: (courseId: string, updates: Partial<CourseProgress>) => {
        const { progress } = get();
        if (progress[courseId]) {
          set({
            progress: {
              ...progress,
              [courseId]: {
                ...progress[courseId],
                ...updates,
              },
            },
          });
        }
      },

      getProgress: (courseId: string) => {
        return get().progress[courseId];
      },

      resetProgress: () => {
        set({ currentCourse: null, currentUnit: null, progress: {} });
      },
    }),
    {
      name: 'linguaflow-progress',
    }
  )
);
