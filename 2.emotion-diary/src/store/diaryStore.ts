import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import mockData from "../data/mockData.json"
import type { Diary } from "../types/diray"

interface DiaryState {
    diaries: Diary[];
    addDiary: (content: string, emotionId: number, createdAt: string) => void;
    updateDiary: (id: number, content: string, emotionId: number, createdAt: string) => void;
    deleteDiary: (id: number) => void;
    getDiaryById: (id: number) => Diary | undefined;
}

const useDiaryStore = create<DiaryState>()(
    persist(
        (set, get) => ({
            //1. 초기상태
            diaries: mockData,

            // 2. 상태를 변경하는 액션(Action)
            addDiary: (content, emotionId, createdAt) =>
                set((state) => ({
                    diaries: [
                        {
                            id: Date.now(),
                            emotionId,
                            content,
                            createdAt,
                        },
                        ...state.diaries,
                    ],
                })),

            updateDiary: (id, content, emotionId, createdAt) =>
                set((state) => ({
                    diaries: state.diaries.map((diary) =>
                        diary.id === id ? { ...diary, content, emotionId, createdAt } : diary
                    ),
                })),

            deleteDiary: (id) =>
                set((state) => ({
                    diaries: state.diaries.filter((diary) => diary.id !== id),
                })),

            getDiaryById: (id) => get().diaries.find((diary) => diary.id === id),
        }),
        {
            // 3. persist 미들웨어 설정 옵션
            name: 'diaries', // LocalStorage에 저장될 Key 이름
            storage: createJSONStorage(() => localStorage), // 생략 가능 (기본값)
        }
    )
)

export default useDiaryStore