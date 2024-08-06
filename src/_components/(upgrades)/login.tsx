"use client";

import { useModalStore } from "@/hooks/useStore";
import Link from "next/link";

export default function Login() {
  const { setCurrentModalstep } = useModalStore();

  return (
    <div className="p-5 lg:pl-[57px] lg:pr-[58px]">
      <h2 className="excon mb-5 max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Welcome,
      </h2>

      <p className="mb-[27.5px] text-base leading-5 md:text-[24px] lg:mb-[37px] lg:leading-[25px]">
        Sign in to your QuickMnemo account and continue your memorization
        journey
      </p>

      <Link href={`${process.env.NEXT_PUBLIC_API_URL}/google`}>
        <div className="mb-[30px] flex h-[60px] w-full cursor-pointer items-center justify-center gap-[7.5px] rounded-[15px] border border-[#EDEAE7] lg:h-[85px]">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4883 14.4791V10.6041H22.2383C22.3841 11.2603 22.4987 11.8749 22.4987 12.7395C22.4987 18.6874 18.5091 22.9166 12.4987 22.9166C6.7487 22.9166 2.08203 18.2499 2.08203 12.4999C2.08203 6.74992 6.7487 2.08325 12.4987 2.08325C15.3112 2.08325 17.6654 3.1145 19.4674 4.802L16.5091 7.677C15.7591 6.96867 14.4466 6.13534 12.4987 6.13534C9.05078 6.13534 6.23828 8.99992 6.23828 12.5103C6.23828 16.0208 9.05078 18.8853 12.4987 18.8853C16.4883 18.8853 17.957 16.1249 18.2279 14.4895H12.4883V14.4791Z"
              fill="url(#paint0_linear_740_539)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_740_539"
                x1="8.405"
                y1="7.02603"
                x2="16.3478"
                y2="7.02603"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8338EC" />
                <stop offset="1" stopColor="#CB38E7" />
              </linearGradient>
            </defs>
          </svg>

          <span className="text-base font-[500] leading-5 md:text-[25px]">
            Continue with Google
          </span>
        </div>
      </Link>

      <div className="mb-[30px] flex h-[60px] w-full cursor-pointer items-center justify-center gap-[7.5px] rounded-[15px] border border-[#EDEAE7] lg:h-[85px]">
        <svg
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.75016 3.25H19.2502C19.4933 3.25 19.7264 3.34658 19.8983 3.51849C20.0703 3.69039 20.1668 3.92355 20.1668 4.16667V18.8333C20.1668 19.0764 20.0703 19.3096 19.8983 19.4815C19.7264 19.6534 19.4933 19.75 19.2502 19.75H2.75016C2.50705 19.75 2.27389 19.6534 2.10198 19.4815C1.93007 19.3096 1.8335 19.0764 1.8335 18.8333V4.16667C1.8335 3.92355 1.93007 3.69039 2.10198 3.51849C2.27389 3.34658 2.50705 3.25 2.75016 3.25ZM11.0552 11.2094L5.1775 6.21817L3.99041 7.61517L11.0671 13.6239L18.0163 7.61058L16.8173 6.22367L11.0552 11.2094Z"
            fill="url(#paint0_linear_986_371)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_986_371"
              x1="7.51126"
              y1="7.16468"
              x2="14.6436"
              y2="7.16468"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8338EC" />
              <stop offset="1" stopColor="#CB38E7" />
            </linearGradient>
          </defs>
        </svg>

        <span className="text-base font-[500] leading-5 md:text-[25px]">
          Continue with Mail
        </span>
      </div>

      <p
        className="cursor-pointer bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text pb-[66px] text-center text-sm font-[500] text-transparent underline decoration-[#8338EC] underline-offset-[6px] md:text-[24px]"
        onClick={() => setCurrentModalstep("Signup")}
      >
        Don't have an account? Signup here
      </p>
    </div>
  );
}
