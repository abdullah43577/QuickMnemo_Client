"use client";

import { useModalStore } from "@/hooks/useStore";

export default function Upgrade() {
  const { setCurrentModalstep } = useModalStore();
  const features = [
    {
      feature: "Generate more memorable answers",
    },

    { feature: "Make it sound anyhow you like, fun? educative?" },
    {
      feature: `Support the <span class="text-black underline">team</span> behind Quickmnemo`,
    },
  ];

  return (
    <div className="p-5 lg:pl-[57px] lg:pr-[58px]">
      <h2 className="excon mb-5 max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Upgrade to QuickMnemo{" "}
        <span className="excon relative -top-2 rounded-[11px] bg-gradient-to-r from-[#8338EC] to-[#CB38E7] px-[7px] py-[9px] text-xl leading-[36px] -tracking-[5.5%] text-white">
          Plus
        </span>
      </h2>

      <p className="mb-[27.5px] text-base font-[500] leading-5 lg:mb-[37px] lg:text-[24px] lg:leading-[25px]">
        Quickmnemo plus gives you access to exciting features to help you
        memorize better
      </p>

      <div className="mb-[36.5px]">
        {features.map((ft, i) => (
          <div
            key={ft.feature}
            className={`flex items-center gap-1 ${i % 2 === 0 ? "my-[20.5px]" : "my-0"}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="min-w-[18px]"
            >
              <g clipPath="url(#clip0_725_3839)">
                <mask
                  id="mask0_725_3839"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="18"
                  height="18"
                >
                  <path
                    d="M9.00098 16.5001C9.98608 16.5014 10.9617 16.308 11.8718 15.931C12.7819 15.554 13.6086 15.0009 14.3042 14.3034C15.0017 13.6077 15.5549 12.7811 15.9319 11.871C16.3088 10.9609 16.5023 9.98523 16.501 9.00013C16.5022 8.01503 16.3088 7.0394 15.9318 6.12929C15.5548 5.21918 15.0017 4.39254 14.3042 3.69688C13.6086 2.99939 12.7819 2.44625 11.8718 2.06926C10.9617 1.69227 9.98608 1.49885 9.00098 1.50013C8.01589 1.49887 7.04025 1.6923 6.13014 2.06929C5.22004 2.44628 4.3934 2.99941 3.69773 3.69688C3.00026 4.39254 2.44713 5.21918 2.07014 6.12929C1.69315 7.0394 1.49973 8.01503 1.50098 9.00013C1.49971 9.98523 1.69312 10.9609 2.07011 11.871C2.44711 12.7811 3.00024 13.6077 3.69773 14.3034C4.3934 15.0009 5.22004 15.554 6.13014 15.931C7.04025 16.308 8.01589 16.5014 9.00098 16.5001Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.00098 9L8.25098 11.25L12.751 6.75"
                    stroke="black"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </mask>
                <g mask="url(#mask0_725_3839)">
                  <path d="M0 0H18V18H0V0Z" fill="#8338EC" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_725_3839">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span
              className="text-base font-[500] leading-5 lg:text-[24px]"
              dangerouslySetInnerHTML={{ __html: ft.feature }}
            />
          </div>
        ))}
      </div>

      <button
        className="mb-[43px] h-[50px] w-full rounded-[15px] border border-[#4D10A3] bg-[#8338EC] text-base font-medium text-white lg:mb-[70px] lg:h-[85px] lg:text-xl"
        onClick={() => setCurrentModalstep("Signup")}
      >
        Upgrade for just ₦950 per month
      </button>
    </div>
  );
}
