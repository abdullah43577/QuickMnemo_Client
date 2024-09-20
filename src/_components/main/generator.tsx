"use client";

import api, { CustomAxiosRequestConfig } from "@/app/axiosInstance";
import {
  useAuthenticatedState,
  useMnemoState,
  useModalStore,
} from "@/hooks/useStore";
import { useHandleErrors } from "@/utils/useHandleErrors";
import { FormEvent, useLayoutEffect, useState } from "react";
import spinner from "../../../public/spinner.svg";
import Image from "next/image";
import { UpgradeSVGIcon } from "../ui/svg/upgradeSVG";
import { UpgradeSVGMobileIcon } from "../ui/svg/upgradeSVGMobile";
import { PadlockIcon } from "../ui/svg/padlock";

interface MnemonicReq {
  keyLetters: string;
  mnemonicType: string;
  reqType?: "mnemonic";
}

interface GeneratedMnemoResponse {
  message: string;
  mnemonic: string[];
}

type Key = "Simple" | "Educative" | "Funny";

type Categories = { title: Key; isLocked: boolean; isSelected: boolean }[];

export function GenerateMnemonics() {
  const { isAuthenticated, isPremium } = useAuthenticatedState();
  const { setIsModalOpen, setCurrentModalstep } = useModalStore();
  const { setMnemo, isGenerating, setIsGenerating } = useMnemoState();
  const [categories, setCategories] = useState<Categories>([
    {
      title: "Simple",
      isLocked: false,
      isSelected: false,
    },
    { title: "Educative", isLocked: true, isSelected: false },
    { title: "Funny", isLocked: true, isSelected: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const handleErrors = useHandleErrors();

  const handleClick = function (key: Key) {
    setCategories((prevValue) =>
      prevValue.map((item) =>
        !item.isLocked && item.title.toLowerCase() === key.toLowerCase()
          ? { ...item, isSelected: !item.isSelected }
          : { ...item, isSelected: false },
      ),
    );
  };

  useLayoutEffect(() => {
    if (isPremium) {
      setCategories((prevValue) =>
        prevValue.map((cateogry) => ({ ...cateogry, isLocked: false })),
      );
    } else {
      setCategories((prevValue) =>
        prevValue.map((category, i) => {
          if (i === 0) return category;
          return { ...category, isLocked: true };
        }),
      );
    }
  }, [isPremium]);

  const handleInputChange = function (e: FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    const CHAR_LIMIT = isPremium ? 20 : 6;
    const ERROR_MSG = isPremium
      ? "You've hit the character limit"
      : "Upgrade to unlock more characters";
    if (value.length > CHAR_LIMIT) return handleErrors({ message: ERROR_MSG });
    setInputValue(value);
  };

  const handleGenerateMnemonics = async function () {
    if (!inputValue.length)
      return handleErrors({ message: "Please enter your key-letters" });

    const selectedCategory = categories.find((category) => category.isSelected);

    if (selectedCategory === undefined)
      return handleErrors({ message: "Please select a category" });

    let requestType: MnemonicReq = {
      keyLetters: inputValue,
      mnemonicType: selectedCategory.title, //* selected category
    };

    if (!isAuthenticated) requestType.reqType = "mnemonic"; //* append this conditionally if user is authenticated i.e user already has an account

    try {
      setIsGenerating(true);
      const { data } = await api.post<GeneratedMnemoResponse>(
        "/generate-mnemonics",
        {
          ...requestType,
        },
        {
          skipAuth: true,
        } as CustomAxiosRequestConfig,
      );
      setMnemo(data.mnemonic);
      setIsGenerating(false);
    } catch (error) {
      handleErrors(error);
      setIsGenerating(false);
    }
  };

  return (
    // max-w-full flex-1
    <aside className="w-full md:w-[440px]">
      <h5 className="mb-6 text-center lg:mb-5 lg:text-xl">
        What's your key-letters?
      </h5>

      <input
        type="text"
        className="mb-6 h-[50px] w-full rounded-[15px] border px-5 text-center uppercase text-black outline-none focus:border-[#8338EC] focus:shadow-inputDrop lg:mb-[63.78px] lg:h-[70px] lg:min-w-full"
        placeholder="HSRZ"
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
      />

      <h5 className="mb-6 text-center text-base lg:mb-5 lg:text-xl">
        How do you want it to sound?
      </h5>

      <div className="mx-auto mb-[15px] flex flex-wrap items-center justify-center gap-[10px] lg:mb-[61.61px] lg:gap-[25px]">
        {categories.map((category) => (
          <div
            key={category.title}
            className={`flex h-[50px] items-center justify-center rounded-[15px] border border-[#EDEAE7] ${category.isLocked ? "cursor-not-allowed items-center bg-[#EDEAE7]" : "cursor-pointer hover:bg-CTA hover:text-white"} flex-1 px-[31.5px] text-black lg:h-[65px] lg:px-[21.5px] ${category.isSelected && "border-btnBorder bg-CTA text-white"}`}
            onClick={() => handleClick(category.title)}
          >
            {category.isLocked ? (
              <div className="flex items-center justify-center gap-[5px]">
                <PadlockIcon />
                {category.title}
              </div>
            ) : (
              category.title
            )}
          </div>
        ))}
      </div>

      {/* desktop version */}
      {!isPremium && (
        <div
          className="relative mb-[37.43px] hidden h-[95.11px] cursor-pointer items-center overflow-hidden rounded-[15px] border border-[#EDEAE7] md:flex"
          onClick={() => {
            setIsModalOpen("open");
            setCurrentModalstep(isAuthenticated ? "Payment" : "Upgrade");
          }}
        >
          <span className="max-w-[272px] bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text pl-[26px] text-[24px] leading-[26px] text-transparent">
            Upgrade to plus for more features
          </span>

          <UpgradeSVGIcon />
        </div>
      )}

      {/* mobile version */}
      {!isPremium && (
        <div
          className="mb-[26px] flex cursor-pointer items-center justify-center gap-[4.33px] md:hidden"
          onClick={() => {
            setIsModalOpen("open");
            setCurrentModalstep(isAuthenticated ? "Payment" : "Upgrade");
          }}
        >
          <UpgradeSVGMobileIcon />

          <span className="bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-sm leading-[19px] text-transparent underline decoration-[#8338EC] underline-offset-[3.5px]">
            Upgrade to plus for more features
          </span>
        </div>
      )}

      <button
        className="flex h-[50px] w-full items-center justify-center gap-2 rounded-[15px] border border-btnBorder bg-CTA text-base font-medium text-white lg:h-[62.07px] lg:text-xl"
        onClick={handleGenerateMnemonics}
        disabled={isGenerating}
      >
        {isGenerating && <Image src={spinner} alt="spinner icon" />}
        Start generator
      </button>
    </aside>
  );
}
