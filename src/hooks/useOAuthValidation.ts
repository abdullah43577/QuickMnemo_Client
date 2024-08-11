import api from "@/app/axiosInstance";
import { toast } from "react-toastify";
import { useAuthenticatedState, useModalStore } from "./useStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useOAuthValidation = function (token: string | null) {
  const { setIsAuthenticated } = useAuthenticatedState();
  const { setIsModalOpen, setCurrentModalstep } = useModalStore();
  const router = useRouter();
  const [hasValidated, setHasValidated] = useState(false);

  useEffect(() => {
    //* VALIDATE GOOGLE LOGIN
    if (token?.length && !hasValidated) {
      const validateOAuthSession = async function () {
        try {
          const response = await api.post("/google/callback/validate-session", {
            tokenId: token,
          });

          if (response.status === 200) {
            toast("user logged in successfully!");
            setIsAuthenticated(true);
            router.push("/");
            setIsModalOpen("open");
            setCurrentModalstep("Payment");
          }
        } catch (error) {
          console.error((error as any).response?.data?.error);
        }
      };

      validateOAuthSession();
      // Mark the validation as done to prevent re-execution
      setHasValidated(true);
    }
  }, [router, token, setIsAuthenticated, setIsModalOpen, setCurrentModalstep, hasValidated]);
};
