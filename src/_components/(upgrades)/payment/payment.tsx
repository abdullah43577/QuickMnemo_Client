"use client";

import { toast } from "react-toastify";
import api from "../../../app/axiosInstance";
import { useState } from "react";
import { customId, handleErrors } from "@/utils/handleErrors";

export default function Payment() {
  const [isFetching, setIsFetching] = useState(false);

  const handlePayment = async function () {
    try {
      setIsFetching(true);
      const response = api.get("/subscribe");

      toast.promise(
        response,
        {
          pending: "Payment link processing",
          success: "Payment link successfully processed",
        },
        { toastId: customId },
      );
      const { data } = await response;
      const paymentLink = data.message;
      window.open(paymentLink, "_self");

      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      handleErrors(error);
    }
  };

  return (
    <>
      <h2 className="excon mb-5 text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Payment,
      </h2>

      <p className="mb-[27.5px] text-base leading-5 md:text-[24px] lg:mb-[40px] lg:leading-[25px]">
        You’ll be redirected to flutterwave for payment after then you’ll be
        sent a token for verification
      </p>

      <button
        disabled={isFetching}
        className={`mb-5 h-[60px] w-full rounded-[15px] border text-base font-medium text-white lg:h-[85px] lg:text-xl ${isFetching ? "bg-gray-400" : "border-btnBorder bg-CTA"}`}
        onClick={handlePayment}
      >
        I want to proceed to payment
      </button>
    </>
  );
}
