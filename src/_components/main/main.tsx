"use client";

import { useEffect } from "react";
import UpgradeLayout from "../(upgrades)/upgradeLayout";
import { useModalStore, useAuthenticatedState } from "@/hooks/useStore";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/app/axiosInstance";
import { toast } from "react-toastify";
import { GenerateMnemonics } from "./generator";
import { GeneratedMnemonics } from "./generated";

// ? FLOW
// * WHEN A USER LOGS IN AN SESSION COOKIES ARE SET, COOKIES ARE SENTS WITH CREDENTIALS FOR ANY REQUESTS.
// * WHEN A USER PAYS TO BECOME A PREMIUM MEMBER, ALL LOCKED INSTANCES OF THE FEATURES OF THE WEB APP ARE UNLOCKED.
// * WHEN THE ACCESSTOKEN EXPIRES, ALL LOCKED INSTANCES THAT ARE CURRENTLY UNLOCKED STAYS THE SAME WAY.
// * WHEN A ASYNC REQUEST IS MADE TO SOME SPECIFIC API, WE CHECK TO SEE ON THE SERVER SIDE TO SEE IF THE USER IS STILL A PREMIUM USER, IF HE IS, WE LEAVE THE STATE AS IT IS AS ALL INSTANCES ARE UNLOCKED, IF IT IS NOT, WE UPDATE THE STATE TO REFLECT TO THIS INSTANCES STAY LOCKED.

export default function WindowMain() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const flw_status = searchParams.get("status");
  const flw_tx_ref = searchParams.get("tx_ref");
  const flw_transact_id = searchParams.get("transaction_id");

  const { setIsAuthenticated, isAuthenticated, isPremium, setIsPremium } =
    useAuthenticatedState();

  const { setIsModalOpen, setCurrentModalstep } = useModalStore();

  //* CONDITIONALLY RENDER CURRENT WINDOW STEP
  const authenticatedCallback = function () {
    if (isAuthenticated && isPremium) return setIsModalOpen("close");

    if (isAuthenticated) {
      setCurrentModalstep("Payment");
      setIsModalOpen("open");
    }
  };

  useEffect(() => authenticatedCallback(), [isAuthenticated]);

  //* VALIDATE GOOGLE LOGIN
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

  useEffect(() => {
    if (token) validateOAuthSession();
  }, [token]);

  //* VALIDATE SUBSCRIPTION
  const validatePayment = async function () {
    try {
      const response = await api.post("/payment/callback", {
        status: flw_status,
        tx_ref: flw_tx_ref,
        transaction_id: flw_transact_id,
      });

      if (response.status === 200) {
        toast(response.data.message);
        setIsPremium();
        setCurrentModalstep("Success");
        router.push("/");
      }
    } catch (error) {
      console.error((error as any).response?.data?.error);
    }
  };

  useEffect(() => {
    if (flw_status?.length && flw_tx_ref?.length && flw_transact_id?.length)
      validatePayment();
  }, [flw_status, flw_tx_ref, flw_transact_id]);

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
