"use client";

import { useModalStore } from "@/hooks/useStore";

export default function Success() {
  const { setIsModalOpen } = useModalStore();
  return (
    <div className="p-5 lg:pb-[58px] lg:pl-[57px] lg:pr-[58px] lg:pt-0">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-10"
      >
        <path
          d="M30 55C16.1925 55 5 43.8075 5 30C5 16.1925 16.1925 5 30 5C43.8075 5 55 16.1925 55 30C55 43.8075 43.8075 55 30 55ZM27.5075 40L45.1825 22.3225L41.65 18.7875L27.5075 32.93L20.435 25.8575L16.9 29.3925L27.5075 40Z"
          fill="url(#paint0_linear_982_365)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_982_365"
            x1="4.13969"
            y1="38.1504"
            x2="56.7956"
            y2="25.855"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.15625" stopColor="#C79FFF" stopOpacity="0.47" />
            <stop offset="0.967477" stopColor="#8338EC" />
          </linearGradient>
        </defs>
      </svg>

      <h2 className="excon mb-5 text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        You're all set!,
      </h2>

      <p className="mb-[27.5px] text-base leading-5 md:text-[24px] lg:mb-[40px] lg:leading-[25px]">
        As a pro plan user, you will get access to the full power of QuickMnemo
        to help you memorize and study better.
      </p>

      <button
        className="h-[60px] w-full rounded-[15px] border border-btnBorder bg-CTA text-base font-medium text-white lg:h-[85px] lg:text-xl"
        onClick={() => setIsModalOpen("close")}
      >
        Start memorizing now
      </button>
    </div>
  );
}
