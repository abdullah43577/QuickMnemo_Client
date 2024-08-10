"use client";

import { useModalStore } from "@/hooks/useStore";

export default function CancelSubscription() {
  const { setIsModalOpen } = useModalStore();

  return (
    <div className="p-5 lg:pl-[57px] lg:pr-[58px]">
      <h2 className="excon mb-5 max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Cancel Sub
      </h2>
      <p className="mb-[27.5px] text-base font-[500] leading-5 md:text-[24px] md:leading-[25px] lg:mb-[37px]">
        Are you sure you want to cancel your subscription?
      </p>

      <div className="flex items-center justify-between">
        <button className="bg-CTA border-btnBorder h-[50px] w-[150px] rounded-[15px] border font-semibold text-white">
          Yes, go ahead
        </button>

        <button
          className="h-[50px] w-[150px] rounded-[15px] border border-[#EDEDED] font-semibold text-black"
          onClick={() => setIsModalOpen("close")}
        >
          Not yet abeg
        </button>
      </div>
    </div>
  );
}
