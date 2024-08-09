"use client";

import { useModalStore } from "@/hooks/useStore";
import api from "../../app/axiosInstance";
import { useState } from "react";

export default function Payment() {
  const { setCurrentModalstep } = useModalStore();
  const [isFetching, setIsFetching] = useState(false);

  const handlePayment = async function () {
    try {
      setIsFetching(true);
      const response = await api.get("/subscribe");
      const paymentLink = response.data.message;

      window.open(paymentLink, "_self");

      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.error((error as any).response?.data?.error);
    }
  };

  return (
    <div className="p-5 lg:pl-[57px] lg:pr-[58px]">
      <h2 className="excon mb-5 max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Payment,
      </h2>

      <p className="mb-[27.5px] text-base leading-5 md:text-[24px] lg:mb-[40px] lg:leading-[25px]">
        You’ll be redirected to flutterwave for payment after then you’ll be
        sent a token for verification
      </p>

      <button
        disabled={isFetching}
        className={`mb-[25px] h-[60px] w-full rounded-[15px] border text-base font-medium text-white lg:h-[85px] lg:text-xl ${isFetching ? "bg-gray-400" : "border-[#4D10A3] bg-[#8338EC]"}`}
        onClick={handlePayment}
      >
        I want to proceed to payment
      </button>

      <div
        className="mb-[90px] flex h-[60px] w-full cursor-pointer items-center justify-center gap-[7.5px] rounded-[15px] border border-[#EDEAE7] text-base font-[500] leading-5 md:text-[25px] lg:h-[85px]"
        onClick={() => setCurrentModalstep("VerifyToken")}
      >
        I want to verify my token
      </div>
    </div>
  );
}
