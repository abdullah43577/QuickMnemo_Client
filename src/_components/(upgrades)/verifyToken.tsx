"use client";

import { useModalStore } from "@/hooks/useStore";

export default function VerifyToken() {
  const { setCurrentModalstep } = useModalStore();

  return (
    <div className="p-5 lg:pl-[57px] lg:pr-[58px]">
      <h2 className="excon mb-5 max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Verify Token,
      </h2>

      <p className="mb-[27.5px] text-base leading-5 md:text-[24px] lg:mb-[40px] lg:leading-[25px]">
        After successful payment on flutterwave, you'll be sent a token for
        verification.
      </p>

      <input
        type="number"
        className="focus:shadow-inputDrop mb-6 h-[60px] w-full rounded-[15px] border border-[#EDEAE7] px-5 text-center uppercase text-black outline-none focus:border-[#8338EC] lg:mb-[63.78px] lg:min-w-full"
      />

      <button
        className="mb-[25px] h-[60px] w-full rounded-[15px] border border-[#4D10A3] bg-[#8338EC] text-base font-medium text-white lg:text-xl"
        onClick={() => setCurrentModalstep("Success")}
      >
        Validate token
      </button>

      <p className="cursor-pointer bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text pb-[66px] text-center text-sm font-[500] text-transparent underline decoration-[#8338EC] underline-offset-[6px] md:text-[24px]">
        Have any issues? Report here
      </p>
    </div>
  );
}
