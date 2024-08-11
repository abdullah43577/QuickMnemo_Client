"use client";

import { useModalStore } from "@/hooks/useStore";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const Toast = function () {
  const { toast, setShowToast } = useModalStore();

  useEffect(() => {
    if (toast) {
      const interval = setInterval(() => {
        setShowToast({ show: false, msg: toast.msg });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [toast, setShowToast]);

  return (
    <motion.div
      initial={{ opacity: 0, visibility: "hidden" }}
      animate={{
        opacity: toast.show ? 1 : 0,
        visibility: toast.show ? "visible" : "hidden",
      }}
      className="absolute left-0 top-0 z-10 flex h-full w-full items-start justify-center bg-overlay"
    >
      <motion.div
        initial={{ opacity: 0, visibility: "hidden", y: "-100%" }}
        animate={{
          opacity: toast.show ? 1 : 0,
          visibility: toast.show ? "visible" : "hidden",
          y: toast.show ? "-50%" : "-100%",
        }}
        transition={{ duration: 0.5 }}
        //fixed left-1/2 top-[120px] -translate-x-1/2
        className="relative top-[120px] z-50 flex max-h-full items-center gap-[10px] rounded-[33px] border bg-white px-[12.5px] py-[9.5px] shadow-md"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 25.5C6.09625 25.5 0.5 19.9037 0.5 13C0.5 6.09625 6.09625 0.5 13 0.5C19.9037 0.5 25.5 6.09625 25.5 13C25.5 19.9037 19.9037 25.5 13 25.5ZM11.7537 18L20.5912 9.16125L18.825 7.39375L11.7537 14.465L8.2175 10.9288L6.45 12.6962L11.7537 18Z"
            fill="url(#paint0_linear_1127_618)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1127_618"
              x1="0.0698441"
              y1="17.0752"
              x2="26.3978"
              y2="10.9275"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.15625" stopColor="#C79FFF" stopOpacity="0.47" />
              <stop offset="0.967477" stopColor="#8338EC" />
            </linearGradient>
          </defs>
        </svg>

        <span className="font-[500] leading-5 text-black md:text-[24px] lg:leading-[25px]">
          {toast.msg}
        </span>
      </motion.div>
    </motion.div>
  );
};
