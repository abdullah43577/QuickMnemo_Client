import api from "@/app/axiosInstance";
import { useLayoutEffect } from "react";
import { useAuthenticatedState } from "./useStore";
import { useHandleErrors } from "@/utils/useHandleErrors";

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
  const handleErrors = useHandleErrors();

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
      handleErrors(error);
      return {};
    }
  };

  useLayoutEffect(() => {
    if (isAuthenticated) getUserProfile();
  }, [isAuthenticated]);
};
