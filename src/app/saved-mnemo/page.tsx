"use client";

import Image from "next/image";
import ellipse from "../../../public/ellipse.png";
import { useAuthenticatedState } from "@/hooks/useStore";

export default function SavedMnemonics() {
  const { savedMnemonics } = useAuthenticatedState();

  return (
    <section>
      <div className="mx-auto max-w-[1440px] items-center px-5 pt-[43px] 2xl:px-[162px]">
        <div className="group mb-[53px] flex cursor-pointer items-center gap-[10px]">
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.625 6.07812C19.625 12.0938 10.7055 16.963 10.3257 17.1641C10.2256 17.2179 10.1137 17.2461 10 17.2461C9.88632 17.2461 9.77441 17.2179 9.6743 17.1641C9.29445 16.963 0.375 12.0938 0.375 6.07812C0.376592 4.66551 0.938458 3.3112 1.93733 2.31233C2.9362 1.31346 4.29051 0.751592 5.70312 0.75C7.47773 0.75 9.03148 1.51312 10 2.80305C10.9685 1.51312 12.5223 0.75 14.2969 0.75C15.7095 0.751592 17.0638 1.31346 18.0627 2.31233C19.0615 3.3112 19.6234 4.66551 19.625 6.07812Z"
              className="group-hover:fill-current group-hover:text-[#8338EC]"
              fill="#8E8E93"
            />
          </svg>
          <span className="text-lg font-bold leading-5 group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent">
            Saved Mnemo
          </span>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 overflow-scroll pr-1 lg:grid-cols-2">
          {savedMnemonics.length
            ? savedMnemonics.map((str, index) => (
                <div
                  key={index}
                  className="generated_mnemo_active relative flex h-[85px] cursor-pointer items-center justify-center overflow-hidden truncate rounded-[15px] border border-[#EDEAE7] font-[500] leading-[20px] lg:w-[440px] lg:text-xl"
                  // onClick={() => handleMnemoClick(index)}
                >
                  <div className="absolute left-0 top-0">
                    <Image src={ellipse} alt="ellipse" />

                    {/* when not active svg */}

                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-[8.2px] top-[10px]"
                    >
                      <path
                        d="M22.6953 9.01251C22.6953 15.575 12.965 20.8869 12.5506 21.1063C12.4414 21.165 12.3193 21.1958 12.1953 21.1958C12.0713 21.1958 11.9492 21.165 11.84 21.1063C11.4256 20.8869 1.69531 15.575 1.69531 9.01251C1.69705 7.47148 2.30999 5.99405 3.39967 4.90437C4.48935 3.81469 5.96678 3.20175 7.50781 3.20001C9.44375 3.20001 11.1388 4.03251 12.1953 5.4397C13.2519 4.03251 14.9469 3.20001 16.8828 3.20001C18.4239 3.20175 19.9013 3.81469 20.991 4.90437C22.0806 5.99405 22.6936 7.47148 22.6953 9.01251Z"
                        fill="url(#paint0_linear_714_3624)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_714_3624"
                          x1="8.19894"
                          y1="7.46956"
                          x2="16.3687"
                          y2="7.46957"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#8338EC" />
                          <stop offset="1" stopColor="#CB38E7" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* when active svg */}
                  </div>
                  {str}
                </div>
              ))
            : ""}
        </div>
      </div>
    </section>
  );
}
