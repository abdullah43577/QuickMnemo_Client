import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthenticatedState, useModalStore } from "./useStore";
import { useRouter } from "next/navigation";
import api from "@/app/axiosInstance";
import { customId, handleErrors } from "@/utils/handleErrors";

export const usePaymentValidation = function (
  flw_status: string | null,
  flw_tx_ref: string | null,
  flw_transact_id: string | null,
) {
  const { setIsPremium } = useAuthenticatedState();
  const { setShowToast } = useModalStore();
  const router = useRouter();
  const [hasValidated, setHasValidated] = useState(false);

  useEffect(() => {
    if (
      flw_status?.length &&
      flw_tx_ref?.length &&
      flw_transact_id?.length &&
      !hasValidated
    ) {
      //* VALIDATE SUBSCRIPTION
      const validatePayment = async function () {
        try {
          const response = await api.post("/subscribe/callback", {
            status: flw_status,
            tx_ref: flw_tx_ref,
            transaction_id: flw_transact_id,
          });

          if (response.status === 200) {
            setShowToast({ show: true, msg: response.data.message });
            setIsPremium(true);
            router.push("/");
          }
        } catch (error) {
          handleErrors(error);
        }
      };

      validatePayment();
      // Mark the validation as done to prevent re-execution
      setHasValidated(true);
    }
  }, [
    flw_status,
    flw_tx_ref,
    flw_transact_id,
    router,
    setIsPremium,
    hasValidated,
    setShowToast,
  ]);
};
