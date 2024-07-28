"use client";

import { useModalStore } from "@/hooks/useStore";

export default function Login() {
  const { setCurrentModalstep } = useModalStore();

  return (
    <div className="p-5 lg:pl-[57px] lg:pr-[58px]">
      <h2 className="excon mb-[30px] max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:text-[48px] lg:leading-[49px]">
        Welcome,
      </h2>

      <p className="mb-[37px] text-base leading-5 md:text-[24px] lg:leading-[25px]">
        Sign in to your QuickMnemo account and continue your memorization
        journey
      </p>

      <div className="mb-[30px] flex h-[85px] w-full cursor-pointer items-center justify-center gap-[7.5px] rounded-[15px] border border-[#EDEAE7]">
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
          Sign up with Google
        </span>
      </div>

      <div className="mb-[30px] flex h-[85px] w-full cursor-pointer items-center justify-center gap-[7.5px] rounded-[15px] border border-[#EDEAE7]">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.4581 22.2626C17.3025 23.3829 16.0407 23.206 14.8261 22.6754C13.5408 22.1329 12.3615 22.1093 11.0054 22.6754C9.30733 23.4065 8.41112 23.1942 7.39698 22.2626C1.64236 16.3311 2.4914 7.29827 9.02432 6.96808C10.6163 7.05063 11.7247 7.84071 12.6563 7.91146C14.0478 7.62845 15.3803 6.81479 16.8662 6.92092C18.6468 7.06242 19.9911 7.76996 20.8755 9.04352C17.1964 11.2487 18.069 16.0953 21.4416 17.4514C20.7694 19.2202 19.8968 20.9773 18.4463 22.2744L18.4581 22.2626ZM12.5384 6.89733C12.3615 4.26766 14.4959 2.09788 16.9487 1.88562C17.2907 4.92802 14.1893 7.19214 12.5384 6.89733Z"
            fill="url(#paint0_linear_740_545)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_740_545"
              x1="9.0952"
              y1="6.92221"
              x2="16.0533"
              y2="6.92221"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8338EC" />
              <stop offset="1" stopColor="#CB38E7" />
            </linearGradient>
          </defs>
        </svg>

        <span className="text-base font-[500] leading-5 md:text-[25px]">
          Sign up with Apple
        </span>
      </div>

      <p
        className="mb-[66px] cursor-pointer bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-center text-sm font-[500] text-transparent underline decoration-[#8338EC] underline-offset-[6px] md:text-[24px]"
        onClick={() => setCurrentModalstep("Signup")}
      >
        Dont't have an account? Signup here
      </p>
    </div>
  );
}
