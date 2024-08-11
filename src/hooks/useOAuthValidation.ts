import api from "@/app/axiosInstance";
import { useAuthenticatedState, useModalStore } from "./useStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleErrors } from "@/utils/handleErrors";

export const useOAuthValidation = function (token: string | null) {
  const { setIsAuthenticated } = useAuthenticatedState();
  const { setShowToast } = useModalStore();
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
            setShowToast({ show: true, msg: "user logged in successfully" });
            setIsAuthenticated(true);

            const timeout = setTimeout(() => router.push("/"), 2000);
            return () => clearTimeout(timeout);
          }
        } catch (error) {
          handleErrors(error);
        }
      };

      validateOAuthSession();
      // Mark the validation as done to prevent re-execution
      setHasValidated(true);
    }
  }, [router, token, setIsAuthenticated, hasValidated, setShowToast]);
};
