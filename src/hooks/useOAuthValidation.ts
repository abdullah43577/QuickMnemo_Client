import api, { accessTokenExpiration } from "@/app/axiosInstance";
import { useAuthenticatedState, useModalStore } from "./useStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HandleErrors } from "@/utils/handleErrors";
import Cookies from "js-cookie";

export const useOAuthValidation = function (token: string | null) {
  const { setIsAuthenticated } = useAuthenticatedState();
  const { setShowToast, setCurrentModalstep, setIsModalOpen } = useModalStore();
  const router = useRouter();
  const [hasValidated, setHasValidated] = useState(false);

  useEffect(() => {
    //* VALIDATE GOOGLE LOGIN
    if (token?.length && !hasValidated) {
      const validateOAuthSession = async function () {
        try {
          setCurrentModalstep("VerifyOAuth");
          setIsModalOpen("open");
          const response = await api.post("/google/callback/validate-session", {
            tokenId: token,
          });

          if (response.status === 200) {
            Cookies.set("session_id", response.data.token.accessToken, {
              secure: true,
              sameSite: "strict",
              expires: accessTokenExpiration,
            });

            Cookies.set("session_id_ref", response.data.token.refreshToken, {
              secure: true,
              sameSite: "strict",
              expires: 7,
            });

            setShowToast({
              show: true,
              msg: "user logged in successfully",
              type: "msg",
            });
            setIsAuthenticated(true);

            const timeout = setTimeout(() => router.push("/"), 2000);
            return () => clearTimeout(timeout);
          }
        } catch (error) {
          HandleErrors(error);
        } finally {
          // Mark the validation as done to prevent re-execution
          setHasValidated(true);
        }
      };

      validateOAuthSession();
    }
  }, [
    router,
    token,
    setIsAuthenticated,
    hasValidated,
    setShowToast,
    setCurrentModalstep,
    setIsModalOpen,
  ]);
};
