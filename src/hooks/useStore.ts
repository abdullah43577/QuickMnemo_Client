import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ModalSteps =
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
  toast: {
    show: boolean;
    msg: string;
  };
  setShowToast: (arg: { show: boolean; msg: string }) => void;
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
  toast: { show: false, msg: "" },
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
  isSuccessShownAlready: boolean;
  hasPaid: boolean;
  savedMnemonics: string[];
  setIsAuthenticated: (auth: boolean) => void;
  setIsPremium: (arg: boolean) => void;
  setIsSuccessShownAlready: (arg: boolean) => void;
  setSavedMnemonics: (arg: string[]) => void;
  setHasPaid: (arg: boolean) => void;
}
export const useAuthenticatedState = create<Authenticated>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isPremium: false,
      isSuccessShownAlready: false,
      savedMnemonics: [],
      hasPaid: false,
      setIsAuthenticated: (auth) =>
        set((state) => ({
          isAuthenticated: (state.isAuthenticated = auth),
        })),
      setIsPremium: (arg) => set((_) => ({ isPremium: arg })),
      setIsSuccessShownAlready: (arg) =>
        set((_) => ({ isSuccessShownAlready: arg })),
      setSavedMnemonics: (arg) => set((_) => ({ savedMnemonics: arg })),
      setHasPaid: (arg) => set((_) => ({ hasPaid: arg })),
    }),

    {
      name: "isAuthenticated",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
