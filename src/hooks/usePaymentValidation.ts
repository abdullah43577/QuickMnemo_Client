import { useEffect, useState } from "react";
import { useAuthenticatedState, useModalStore } from "./useStore";
import { useRouter } from "next/navigation";
import api from "@/app/axiosInstance";
import { useHandleErrors } from "@/utils/useHandleErrors";

export const usePaymentValidation = function (
  flw_status: string | null,
  flw_tx_ref: string | null,
  flw_transact_id: string | null,
) {
  const { setIsPremium } = useAuthenticatedState();
  const { setShowToast, setIsModalOpen, setCurrentModalstep } = useModalStore();
  const router = useRouter();
  const handleErrors = useHandleErrors();

  // * VERIFY PAYMENT MADE ON REDIRECT
  const validatePayment = async function () {
    setCurrentModalstep("VerifyPayment");
    setIsModalOpen("open");

    try {
      const response = await api.post("/subscribe/callback", {
        status: flw_status,
        tx_ref: flw_tx_ref,
        transaction_id: flw_transact_id,
      });

      if (response.status === 200) {
        setShowToast({
          show: true,
          msg: response.data.message,
          type: "msg",
        });

        setCurrentModalstep("Success");
        setIsModalOpen("open");

        const timeout = setTimeout(() => {
          setIsPremium(true);
          router.push("/");
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  useEffect(() => {
    if (flw_status?.length && flw_tx_ref?.length && flw_transact_id?.length)
      validatePayment();
  }, [flw_status, flw_tx_ref, flw_transact_id]);
};
