import api from "@/app/axiosInstance";
import { useEffect } from "react";
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
  const { setIsPremium, isAuthenticated } = useAuthenticatedState();

  useEffect(() => {
    if (!isAuthenticated) return;

    const getUserProfile = async () => {
      try {
        const response = await api.get<UserProfile>("/user-info");
        if (response.data.isPremium) setIsPremium(true);
      } catch (error) {
        console.log(error);
        toast((error as any).response?.data?.error);
        return {};
      }
    };

    getUserProfile();
  }, [isAuthenticated, setIsPremium]);
};
