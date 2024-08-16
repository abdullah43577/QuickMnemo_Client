import api from "@/app/axiosInstance";
import { useLayoutEffect } from "react";
import { useAuthenticatedState } from "./useStore";
import { HandleErrors } from "@/utils/handleErrors";

interface UserProfile {
  email: string;
  isPremium: boolean;
  subscription: {
    id: string;
    status: "active" | "pending" | "cancelled";
    subscribedAt: Date;
    nextPaymentDate: Date;
    cancelledAt: Date;
  };
  savedMnemonics: string[];
}

export const useGetProfile = function () {
  const {
    setIsPremium,
    isAuthenticated,
    setIsAuthenticated,
    setSavedMnemonics,
  } = useAuthenticatedState();

  useLayoutEffect(() => {
    if (!isAuthenticated) return;

    const getUserProfile = async () => {
      try {
        const response = await api.get<UserProfile>("/user-info");
        if (response.data.isPremium) {
          setIsPremium(true);
          setSavedMnemonics(response.data.savedMnemonics);
        }
      } catch (error) {
        setIsPremium(false);
        setIsAuthenticated(false);
        HandleErrors(error);
        return {};
      }
    };

    getUserProfile();
  }, [isAuthenticated, setIsPremium, setIsAuthenticated, setSavedMnemonics]);
};
