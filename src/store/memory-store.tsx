import { create } from 'zustand'
import { cardsData as initialCards } from '../data/cardsData'
import type { MemoryCard } from '../types/memory'

interface CardItem {
    imgCard: string;
    id: number;
}

interface GameStore {
    cards: MemoryCard[];
    setCards: (cards: MemoryCard[]) => void;
    currentTurn: CardItem[];
    setCurrentTurn: (currentTurn: CardItem[] | ((prev: CardItem[]) => CardItem[])) => void;
}

export const useGameStore = create<GameStore>((set) => ({
    cards: [...initialCards].sort(() => Math.random() - 0.5),
    currentTurn: [],
    setCards: (cards) => set({ cards }),
    setCurrentTurn: (updater) =>
        set((state) => ({
            currentTurn: typeof updater === 'function'
                ? updater(state.currentTurn)
                : updater
        })),
}));


/*
я хочу клікнути на картинку і цей елемент додався в масив ["/memory-img1.jpg", ""], і чекав наступний елемент, ["/memory-img1.jpg", "/memory-img1.jpg"], якщо два елементи однакові то зробити їм isMatch true
*/