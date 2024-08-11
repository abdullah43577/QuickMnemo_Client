"use client";

import api from "@/app/axiosInstance";
import { useModalStore } from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CancelSubscription() {
  const router = useRouter();
  const { setIsModalOpen } = useModalStore();
  const [isCancelled, setIsCancelled] = useState(false);

  const handleSubscription = async function () {
    try {
      const response = await api.get("/subscribe");

      if (response.data.type === "subscription_activated") {
        toast(response.data.message);
      } else {
        const paymentLink = response.data.message;
        window.open(paymentLink, "_self");
      }
    } catch (error) {
      console.error((error as any).response?.data?.error);
    }
  };

  const handleCancelSubscription = async function () {
    setIsCancelled(true);
  };

  const handleGoHome = function () {
    setIsModalOpen("close");
    router.push("/");
  };

  return (
    <div className="p-5 lg:pl-[57px] lg:pr-[58px]">
      <h2 className="excon mb-5 max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Cancel Sub
      </h2>
      <p className="mb-[27.5px] text-base font-[500] leading-5 md:text-[24px] md:leading-[25px] lg:mb-[37px]">
        {isCancelled
          ? "You have successfully cancelled your subscription"
          : "Are you sure you want to cancel your subscription?"}
      </p>

      <div className="flex items-center justify-between">
        <button
          className="bg-CTA border-btnBorder h-[50px] w-[150px] rounded-[15px] border font-semibold text-white"
          onClick={isCancelled ? handleGoHome : handleCancelSubscription}
        >
          {isCancelled ? "Go Home" : "Yes, go ahead"}
        </button>

        <button
          className="h-[50px] w-[150px] rounded-[15px] border border-[#EDEDED] font-semibold text-black"
          onClick={() =>
            isCancelled ? handleSubscription() : setIsModalOpen("close")
          }
        >
          {isCancelled ? "Sub Again" : " Not yet abeg"}
        </button>
      </div>
    </div>
  );
}
