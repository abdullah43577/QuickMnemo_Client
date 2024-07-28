"use client";

import { useModalStore } from "@/hooks/useStore";

export default function Payment() {
  const { setCurrentModalstep } = useModalStore();

  return (
    <div className="p-5 lg:pl-[57px] lg:pr-[58px]">
      <h2 className="excon mb-[30px] max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:text-[48px] lg:leading-[49px]">
        Payment,
      </h2>

      <p className="mb-[40px] text-base leading-5 md:text-[24px] lg:leading-[25px]">
        You’ll be redirected to flutterwave for payment after then you’ll be
        sent a token for verification
      </p>

      <button
        className="mb-[25px] h-[85px] w-full rounded-[15px] border border-[#4D10A3] bg-[#8338EC] text-base font-medium text-white lg:text-xl"
        onClick={() => setCurrentModalstep("Signup")}
      >
        I want to proceed to payment
      </button>

      <div className="mb-[90px] flex h-[85px] w-full cursor-pointer items-center justify-center gap-[7.5px] rounded-[15px] border border-[#EDEAE7] text-base font-[500] leading-5 hover:bg-gray-200 md:text-[25px]">
        I want to verify my token
      </div>
    </div>
  );
}
