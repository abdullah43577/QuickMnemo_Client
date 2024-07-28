import { create } from "zustand";

interface ModalState {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  currentModalStep: number;
  setCurrentModalstep: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isModalOpen: false,
  setIsModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  currentModalStep: 1,
  setCurrentModalstep: () => set((state) => ({})),
}));
