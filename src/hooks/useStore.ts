import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ModalSteps =
  | "Upgrade"
  | "Signup"
  | "SignupTemplate"
  | "Login"
  | "VerifyOAuth"
  | "LoginTemplate"
  | "Payment"
  | "VerifyPayment"
  | "Success"
  | "Cancel Sub"
  | "Cancel Sub Success"
  | "Delete Mnemonics";

interface ModalState {
  isModalOpen: boolean;
  setIsModalOpen: (arg: "open" | "close") => void;
  currentModalStep: ModalSteps;
  setCurrentModalstep: (arg: ModalSteps) => void;
  previousModalStep: ModalSteps | "";
  setPreviousModalStep: (arg: ModalSteps) => void;
  toast: {
    show: boolean;
    msg: string;
    type: "error" | "msg" | "";
  };
  setShowToast: (arg: {
    show: boolean;
    msg: string;
    type: "error" | "msg" | "";
  }) => void;
  toBeDeletedMnemonic: string;
  setToBeDeletedMnemonic: (arg: string) => void;
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
  previousModalStep: "",
  setPreviousModalStep: (arg) => set((_) => ({ previousModalStep: arg })),
  toast: { show: false, msg: "", type: "" },
  toBeDeletedMnemonic: "",
  setShowToast: (arg) => set((_) => ({ toast: arg })),
  setToBeDeletedMnemonic: (arg) => set((_) => ({ toBeDeletedMnemonic: arg })),
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
  savedMnemonics: string[];
  setIsAuthenticated: (auth: boolean) => void;
  setIsPremium: (arg: boolean) => void;
  setSavedMnemonics: (arg: string[]) => void;
}
export const useAuthenticatedState = create<Authenticated>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isPremium: false,
      savedMnemonics: [],
      setIsAuthenticated: (auth) =>
        set((state) => ({
          isAuthenticated: (state.isAuthenticated = auth),
        })),
      setIsPremium: (arg) => set((_) => ({ isPremium: arg })),
      setSavedMnemonics: (arg) => set((_) => ({ savedMnemonics: arg })),
    }),

    {
      name: "storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
