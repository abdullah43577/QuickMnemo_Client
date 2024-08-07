import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ModalSteps =
  | "Upgrade"
  | "Signup"
  | "SignupTemplate"
  | "Login"
  | "LoginTemplate"
  | "Payment"
  | "VerifyToken"
  | "Success";

interface ModalState {
  isModalOpen: boolean;
  setIsModalOpen: (arg: "open" | "close") => void;
  currentModalStep: ModalSteps;
  setCurrentModalstep: (arg: ModalSteps) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isModalOpen: false,
  setIsModalOpen: (arg) =>
    set((state) => ({
      isModalOpen: (state.isModalOpen = arg === "open" ? true : false),
    })),
  currentModalStep: "Upgrade",
  setCurrentModalstep: (arg) =>
    set((state) => ({ currentModalStep: (state.currentModalStep = arg) })),
}));

interface HeaderState {
  isScrolled: boolean;
  setIsScrolled: (arg: boolean) => void;
}

export const useHeaderState = create<HeaderState>()((set) => ({
  isScrolled: false,
  setIsScrolled: (arg) =>
    set((state) => ({ isScrolled: (state.isScrolled = arg) })),
}));

// persisted state
interface Authenticated {
  isAuthenticated: boolean;
  isPremium: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  setIsPremium: () => void;
}
export const useAuthenticatedState = create<Authenticated>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isPremium: false,
      setIsAuthenticated: (auth) =>
        set((state) => ({
          isAuthenticated: (state.isAuthenticated = auth),
        })),
      setIsPremium: () => set((state) => ({ isPremium: true })),
    }),
    {
      name: "isAuthenticated",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
