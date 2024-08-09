import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthenticatedState, useModalStore } from "./useStore";
import { useRouter } from "next/navigation";
import api from "@/app/axiosInstance";

export const usePaymentValidation = function (
  flw_status: string | null,
  flw_tx_ref: string | null,
  flw_transact_id: string | null,
) {
  const { setIsPremium } = useAuthenticatedState();
  const { setCurrentModalstep } = useModalStore();
  const router = useRouter();

  useEffect(() => {
    if (flw_status?.length && flw_tx_ref?.length && flw_transact_id?.length) {
      //* VALIDATE SUBSCRIPTION
      const validatePayment = async function () {
        try {
          const response = await api.post("/subscribe/callback", {
            status: flw_status,
            tx_ref: flw_tx_ref,
            transaction_id: flw_transact_id,
          });

          if (response.status === 200) {
            toast(response.data.message);
            setIsPremium(true);
            setCurrentModalstep("Success");
            router.push("/");
          }
        } catch (error) {
          console.error((error as any).response?.data?.error);
        }
      };

      validatePayment();
    }
  }, [
    flw_status,
    flw_tx_ref,
    flw_transact_id,
    router,
    setIsPremium,
    setCurrentModalstep,
  ]);
};
