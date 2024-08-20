"use client";

import api from "@/app/axiosInstance";
import { useModalStore } from "@/hooks/useStore";
import { useHandleErrors } from "@/utils/useHandleErrors";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CancelSubscription() {
  const router = useRouter();
  const { setIsModalOpen, setShowToast } = useModalStore();
  const [isCancelled, setIsCancelled] = useState(false);
  const handleErrors = useHandleErrors();

  const handleSubscription = async function () {
    try {
      const { data } = await api.get("/subscribe");

      if (data.type === "subscription_activated") {
        setShowToast({ show: true, msg: data.message, type: "msg" });
      } else {
        const paymentLink = data.message;
        window.open(paymentLink, "_self");
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleCancelSubscription = async function () {
    try {
      setIsCancelled(true);
      const { data } = await api.put("subscription/cancel");
      setShowToast({ show: true, msg: data.message, type: "msg" });
    } catch (error) {
      setIsCancelled(false);
      handleErrors(error);
    }
  };

  const handleGoHome = function () {
    setIsModalOpen("close");
    router.push("/");
  };

  return (
    <>
      <h2 className="excon mb-5 text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Cancel Sub
      </h2>
      <p className="mb-[27.5px] text-base font-[500] leading-5 md:text-[24px] md:leading-[25px] lg:mb-[37px]">
        {isCancelled
          ? "You have successfully cancelled your subscription"
          : "Are you sure you want to cancel your subscription?"}
      </p>

      <div className="flex gap-[28px]">
        <button
          className="h-[50px] w-full rounded-[15px] border border-btnBorder bg-CTA font-semibold text-white lg:h-[85px] lg:text-2xl lg:font-medium"
          onClick={isCancelled ? handleGoHome : handleCancelSubscription}
        >
          {isCancelled ? "Go Home" : "Yes, go ahead"}
        </button>

        <button
          className="h-[50px] w-full rounded-[15px] border border-[#EDEDED] font-semibold text-black lg:h-[85px] lg:text-2xl lg:font-medium"
          onClick={() =>
            isCancelled ? handleSubscription() : setIsModalOpen("close")
          }
        >
          {isCancelled ? "Sub Again" : " Not yet abeg"}
        </button>
      </div>
    </>
  );
}
