import api from "@/app/axiosInstance";
import { useLayoutEffect } from "react";
import { useAuthenticatedState } from "./useStore";
import { toast } from "react-toastify";

interface UserProfile {
  email: string;
  isPremium: boolean;
  subscription: {
    id: string;
    status: "active" | "pending" | "cancelled";
  };
}

export const useGetProfile = function () {
  const { setIsPremium, isAuthenticated, setIsAuthenticated } =
    useAuthenticatedState();

  useLayoutEffect(() => {
    if (!isAuthenticated) return;

    const getUserProfile = async () => {
      try {
        const response = await api.get<UserProfile>("/user-info");
        if (response.data.isPremium) setIsPremium(true);
      } catch (error) {
        if ((error as any).response.data.message) {
          toast((error as any).response.data.message);
          setIsPremium(false);
          setIsAuthenticated(false);
          return;
        }
        toast((error as any).response?.data?.error);
        return {};
      }
    };

    getUserProfile();
  }, [isAuthenticated, setIsPremium, setIsAuthenticated]);
};
