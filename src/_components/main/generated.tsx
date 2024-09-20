"use client";

import Image from "next/image";
import ellipse from "../../../public/ellipse.png";
import { useEffect } from "react";
import api from "@/app/axiosInstance";
import {
  useAuthenticatedState,
  useMnemoState,
  useModalStore,
} from "@/hooks/useStore";
import { useHandleErrors } from "@/utils/useHandleErrors";
import activeHeartIcon from "../../../public/activeHeart.svg";
import heartIcon from "../../../public/heartIcon.svg";
import isGeneratingIcon from "../../../public/isGenerating.svg";

export function GeneratedMnemonics() {
  const { mnemo, handleMnemoClick } = useMnemoState();

  const { setSavedMnemonics, isAuthenticated } = useAuthenticatedState();
  const { setShowToast } = useModalStore();
  const handleErrors = useHandleErrors();
  const { isGenerating } = useMnemoState();

  const saveMnemoToDB = async function (savedMnemonics: string[]) {
    try {
      const response = await api.put("/save-mnemonics", {
        savedMnemonics,
      });
      if (response.status === 200)
        setShowToast({ show: true, msg: response.data.message, type: "msg" });
    } catch (error) {
      handleErrors(error);
    }
  };

  useEffect(() => {
    if (mnemo.length) {
      const clickedMnemo = mnemo
        .filter((item) => item.isClicked === true)
        .map((obj) => obj.title);

      const timeout = setTimeout(() => {
        if (clickedMnemo.length) {
          setSavedMnemonics(clickedMnemo); // save to localStorage
          if (isAuthenticated) saveMnemoToDB(clickedMnemo); // conditionally save to DB
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [mnemo]);

  return (
    // max-h-[200px]
    <aside className="relative h-5 max-h-[200px] w-full overflow-scroll pr-1 md:h-full md:min-w-[440px] lg:max-h-full lg:w-auto xl:max-h-full">

      {isGenerating
        ? Array.from({ length: 5 }).map((obj, index) => (
            <div
              key={index}
              className="relative mb-[25px] flex h-[85px] cursor-pointer items-center justify-center overflow-hidden rounded-[15px] border border-[#EDEAE7] font-medium leading-5 lg:w-[440px] lg:text-xl"
            >
              <div className="absolute left-0 top-0">
                <Image src={ellipse} alt="ellipse" />
                <Image
                  src={heartIcon}
                  alt="heart icon"
                  className="absolute left-[8.2px] top-[8.2px]"
                />
              </div>
              <Image src={isGeneratingIcon} alt="is generating icon" />
            </div>
          ))
        : mnemo.map((obj, index) => (
            <div
              key={index}
              className={`relative ${index !== mnemo.length - 1 && "mb-[25px]"} flex h-[85px] min-h-[85px] cursor-pointer items-center justify-center overflow-hidden text-wrap rounded-[15px] border border-[#EDEAE7] px-[49px] text-center font-medium leading-5 md:px-[99px] lg:w-[440px] lg:text-xl ${obj.isClicked && "generated_mnemo_active"}`}
              onClick={() => handleMnemoClick(index)}
            >
              <div className="absolute left-0 top-0">
                <Image src={ellipse} alt="ellipse" />

                {obj.isClicked ? (
                  <Image
                    src={activeHeartIcon}
                    alt="active heart icon"
                    className="absolute left-[8.2px] top-[8.2px]"
                  />
                ) : (
                  <Image
                    src={heartIcon}
                    alt="heart icon"
                    className="absolute left-[8.2px] top-[8.2px]"
                  />
                )}
              </div>
              {obj.title}
            </div>
          ))}

      {!mnemo.length && !isGenerating && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-xl">
          "Your Mnemonics Here"
        </p>
      )}
      {/* inset-[1px] */}
      {mnemo.length ? (
        <div className="border-1 absolute right-[48%] top-[30%] z-[5] flex size-10 animate-bounce cursor-pointer items-center justify-center rounded-full border-[#EDEAE7] bg-white shadow-lg xl:bottom-[30%] xl:right-[25%] xl:top-[unset]">
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00004 7.58276L15.872 0.710789L17.835 2.6752L9.00004 11.5102L0.165039 2.6752L2.12806 0.712178L9.00004 7.58276Z"
              fill="black"
            />
          </svg>
        </div>
      ) : (
        ""
      )}
    </aside>
  );
}
