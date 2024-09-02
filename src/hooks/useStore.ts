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

interface Mnemonics {
  mnemo: {
    id: number;
    title: string;
    isClicked: boolean;
  }[];
  handleMnemoClick: (index: number) => void;
  setMnemo: (arg: string[]) => void;
}
[];

export const useMnemoState = create<Mnemonics>()((set) => ({
  mnemo: [],
  handleMnemoClick: (index) =>
    set((state) => {
      if (!state.mnemo.length) return { mnemo: [] };

      const updatedMnemo = state.mnemo.map((item) =>
        item.id === index ? { ...item, isClicked: !item.isClicked } : item,
      );

      return { mnemo: updatedMnemo };
    }),
  setMnemo: (arg) =>
    set((_) => {
      //* format array of strings
      const formattedData = arg.map((item, i) => ({
        id: i,
        title: item,
        isClicked: false,
      }));

      return { mnemo: formattedData };
    }),
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
