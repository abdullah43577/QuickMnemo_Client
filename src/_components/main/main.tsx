"use client";

import { useCallback, useEffect } from "react";
import { useModalStore, useAuthenticatedState } from "@/hooks/useStore";
import { useSearchParams } from "next/navigation";
import { GenerateMnemonics } from "./generator";
import { GeneratedMnemonics } from "./generated";
import { useOAuthValidation } from "@/hooks/useOAuthValidation";
import { usePaymentValidation } from "@/hooks/usePaymentValidation";

export default function WindowMain() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const flw_status = searchParams.get("status");
  const flw_tx_ref = searchParams.get("tx_ref");
  const flw_transact_id = searchParams.get("transaction_id");

  const {
    isAuthenticated,
    isPremium,
    isSuccessShownAlready,
    setIsSuccessShownAlready,
    hasPaid,
  } = useAuthenticatedState();

  const { setIsModalOpen, setCurrentModalstep } = useModalStore();

  //* CONDITIONALLY RENDER CURRENT WINDOW STEP
  const cachedFn = useCallback(() => {
    if (isAuthenticated) {
      setCurrentModalstep("Payment");
      setIsModalOpen("open");
    }

    if (isAuthenticated && hasPaid) {
      setCurrentModalstep("VerifyPayment");
      setIsModalOpen("open");
    }

    if (isAuthenticated && isPremium) {
      if (isSuccessShownAlready) {
        return setIsModalOpen("close");
      } else {
        setIsSuccessShownAlready(true);
        setCurrentModalstep("Success");
        setIsModalOpen("open");
      }
    }
  }, [
    isAuthenticated,
    isPremium,
    setIsModalOpen,
    setCurrentModalstep,
    isSuccessShownAlready,
    setIsSuccessShownAlready,
    hasPaid,
  ]);

  useEffect(() => cachedFn(), [isAuthenticated, cachedFn]);

  useOAuthValidation(token);
  usePaymentValidation(flw_status, flw_tx_ref, flw_transact_id);

  return (
    <>
      <section className="mx-auto flex max-w-[1116px] flex-col-reverse items-center gap-[53.5px] overflow-y-scroll rounded-[35px] border border-[#EDEAE7] p-5 shadow-mainDrop lg:h-[680px] lg:flex-row lg:overflow-hidden lg:p-[64px] 2xl:h-[680px]">
        <GenerateMnemonics />

        <div className="rotate-360 h-[1px] w-full bg-[#EDEDED] lg:h-full lg:w-[1px] lg:rotate-0" />

        <GeneratedMnemonics />
      </section>
    </>
  );
}
