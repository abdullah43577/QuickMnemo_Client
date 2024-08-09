"use client";

import { useCallback, useEffect } from "react";
import UpgradeLayout from "../(upgrades)/upgradeLayout";
import { useModalStore, useAuthenticatedState } from "@/hooks/useStore";
import { useSearchParams } from "next/navigation";
import { GenerateMnemonics } from "./generator";
import { GeneratedMnemonics } from "./generated";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useOAuthValidation } from "@/hooks/useOAuthValidation";
import { usePaymentValidation } from "@/hooks/usePaymentValidation";

// ? FLOW
// * WHEN A USER LOGS IN AN SESSION COOKIES ARE SET, COOKIES ARE SENTS WITH CREDENTIALS FOR ANY REQUESTS.
// * WHEN A USER PAYS TO BECOME A PREMIUM MEMBER, ALL LOCKED INSTANCES OF THE FEATURES OF THE WEB APP ARE UNLOCKED.
// * WHEN THE ACCESSTOKEN EXPIRES, ALL LOCKED INSTANCES THAT ARE CURRENTLY UNLOCKED STAYS THE SAME WAY.
// * WHEN A ASYNC REQUEST IS MADE TO SOME SPECIFIC API, WE CHECK TO SEE ON THE SERVER SIDE TO SEE IF THE USER IS STILL A PREMIUM USER, IF HE IS, WE LEAVE THE STATE AS IT IS AS ALL INSTANCES ARE UNLOCKED, IF IT IS NOT, WE UPDATE THE STATE TO REFLECT TO THIS INSTANCES STAY LOCKED.

export default function WindowMain() {
  useGetProfile();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const flw_status = searchParams.get("status");
  const flw_tx_ref = searchParams.get("tx_ref");
  const flw_transact_id = searchParams.get("transaction_id");

  const { isAuthenticated, isPremium } = useAuthenticatedState();

  const { setIsModalOpen, setCurrentModalstep } = useModalStore();

  //* CONDITIONALLY RENDER CURRENT WINDOW STEP
  const cachedFn = useCallback(() => {
    if (isAuthenticated && isPremium) return setIsModalOpen("close");

    if (isAuthenticated) {
      setCurrentModalstep("Payment");
      setIsModalOpen("open");
    }
  }, [isAuthenticated, isPremium, setIsModalOpen, setCurrentModalstep]);

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

      {/* Modal Window */}
      <UpgradeLayout />
    </>
  );
}
