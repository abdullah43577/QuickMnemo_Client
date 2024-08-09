import api from "@/app/axiosInstance";
import { toast } from "react-toastify";
import { useAuthenticatedState } from "./useStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useOAuthValidation = function (token: string | null) {
  const { setIsAuthenticated } = useAuthenticatedState();
  const router = useRouter();

  useEffect(() => {
    //* VALIDATE GOOGLE LOGIN
    if (token?.length) {
      const validateOAuthSession = async function () {
        try {
          const response = await api.post("/google/callback/validate-session", {
            tokenId: token,
          });

          if (response.status === 200) {
            toast("user logged in successfully!");
            setIsAuthenticated(true);
            router.push("/");
          }
        } catch (error) {
          console.error((error as any).response?.data?.error);
        }
      };
      validateOAuthSession();
    }
  }, [router, token, setIsAuthenticated]);
};
