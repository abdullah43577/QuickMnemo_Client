"use client";

import Image from "next/image";
import ellipse from "../../../public/ellipse.png";
import { useEffect, useLayoutEffect, useState } from "react";
import UpgradeLayout from "../(upgrades)/upgradeLayout";
import { useModalStore, useAuthenticatedState } from "@/hooks/useStore";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/app/axiosInstance";
import { toast } from "react-toastify";

interface Mnemonics {
  id: number;
  title: string;
  isClicked: boolean;
}

// ? FLOW
// * WHEN A USER LOGS IN AN SESSION COOKIES ARE SET, COOKIES ARE SENTS WITH CREDENTIALS FOR ANY REQUESTS.
// * WHEN A USER PAYS TO BECOME A PREMIUM MEMBER, ALL LOCKED INSTANCES OF THE FEATURES OF THE WEB APP ARE UNLOCKED.
// * WHEN THE ACCESSTOKEN EXPIRES, ALL LOCKED INSTANCES THAT ARE CURRENTLY UNLOCKED STAYS THE SAME WAY.
// * WHEN A ASYNC REQUEST IS MADE TO SOME SPECIFIC API, WE CHECK TO SEE ON THE SERVER SIDE TO SEE IF THE USER IS STILL A PREMIUM USER, IF HE IS, WE LEAVE THE STATE AS IT IS AS ALL INSTANCES ARE UNLOCKED, IF IT IS NOT, WE UPDATE THE STATE TO REFLECT TO THIS INSTANCES STAY LOCKED.

export default function WindowMain() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const flw_status = searchParams.get("status");
  const flw_tx_ref = searchParams.get("tx_ref");
  const flw_transact_id = searchParams.get("transaction_id");

  const { setIsAuthenticated, isAuthenticated, isPremium, setIsPremium } =
    useAuthenticatedState();

  const { setIsModalOpen, setCurrentModalstep } = useModalStore();
  const [categories, setCategories] = useState([
    {
      title: "Simple",
      isLocked: false,
      isSelected: false,
    },
    { title: "Educative", isLocked: true, isSelected: false },
    { title: "Funny", isLocked: true, isSelected: false },
  ]);

  const handleClick = function (key: string) {
    setCategories((prevValue) =>
      prevValue.map((item) =>
        !item.isLocked && item.title.toLowerCase() === key.toLowerCase()
          ? { ...item, isSelected: !item.isSelected }
          : { ...item, isSelected: false },
      ),
    );
  };

  const [mnemo, setMnemo] = useState<Mnemonics[]>([]);

  const handleMnemoClick = function (index: number) {
    setMnemo((prevValue) =>
      prevValue.map((item) =>
        item.id === index
          ? { ...item, isClicked: !item.isClicked }
          : { ...item, isClicked: false },
      ),
    );
  };

  //* conditionally render the current modal window step
  const authenticatedCallback = function () {
    if (isAuthenticated) {
      setCurrentModalstep("Payment");
    }

    setIsModalOpen();
  };

  // useEffect(() => authenticatedCallback(), [isAuthenticated]);

  //* Validate OAuth login, setting cookies...
  const validateOAuthSession = async function () {
    try {
      const response = await api.post("/google/callback/validate-session", {
        tokenId: token,
      });

      if (response.status === 200) {
        toast("user logged in successfully!");
        setIsAuthenticated(true);
        router.push("/");
      }
    } catch (error) {
      console.error((error as any).response?.data?.error);
    }
  };

  useEffect(() => {
    if (token?.length) validateOAuthSession();
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      setMnemo([
        { id: 0, title: "Harry Swiftly Raced Zebras", isClicked: false },
        { id: 1, title: "Harry Swiftly Raced Zebras", isClicked: false },
        { id: 2, title: "Harry Swiftly Raced Zebras", isClicked: false },
        { id: 3, title: "Harry Swiftly Raced Zebras", isClicked: false },
        { id: 4, title: "Harry Swiftly Raced Zebras", isClicked: false },
        { id: 5, title: "Harry Swiftly Raced Zebras", isClicked: false },
        { id: 6, title: "Harry Swiftly Raced Zebras", isClicked: false },
        { id: 7, title: "Harry Swiftly Raced Zebras", isClicked: false },
        { id: 8, title: "Harry Swiftly Raced Zebras", isClicked: false },
        { id: 9, title: "Harry Swiftly Raced Zebras", isClicked: false },
      ]);
    }, 7000);
  }, []);

  //* Validate Flutterwave payment
  const validatePayment = async function () {
    try {
      const response = await api.post("/payment/callback", {
        status: flw_status,
        tx_ref: flw_tx_ref,
        transaction_id: flw_transact_id,
      });

      if (response.status === 200) {
        toast(response.data.message);
        setIsPremium();
        router.push("/");
      }
    } catch (error) {
      console.error((error as any).response?.data?.error);
    }
  };

  useEffect(() => {
    if (flw_status?.length && flw_tx_ref?.length && flw_transact_id?.length)
      validatePayment();
  }, [flw_status, flw_tx_ref, flw_transact_id]);

  useLayoutEffect(() => {
    if (isPremium) {
      setCategories((prevValue) =>
        prevValue.map((cateogry) => ({ ...cateogry, isLocked: false })),
      );
    }
  }, [isPremium]);

  return (
    <>
      <section className="mx-auto flex max-w-[1116px] flex-col-reverse items-center gap-[53.5px] overflow-y-scroll rounded-[35px] border border-[#EDEAE7] p-5 shadow-mainDrop lg:h-[653px] lg:flex-row lg:overflow-hidden lg:p-[64px]">
        <aside className="max-w-full flex-1">
          <h5 className="mb-6 text-center lg:mb-5 lg:text-xl">
            What's your key-letters?
          </h5>

          <input
            type="text"
            className="mb-6 h-[50px] w-full rounded-[15px] border px-5 text-center uppercase text-black outline-none focus:border-[#8338EC] focus:shadow-inputDrop lg:mb-[63.78px] lg:h-[70px] lg:min-w-full"
            placeholder="HSRZ"
          />

          <h5 className="mb-6 text-center text-base lg:mb-5 lg:text-xl">
            How do you want it to sound?
          </h5>

          <div className="mx-auto mb-[15px] flex flex-wrap items-center justify-center gap-[10px] lg:mb-[61.61px] lg:gap-[25px]">
            {categories.map((category) => (
              <div
                key={category.title}
                className={`flex h-[50px] items-center justify-center rounded-[15px] border border-[#EDEAE7] ${category.isLocked ? "cursor-not-allowed items-center bg-[#EDEAE7]" : "cursor-pointer hover:bg-[#8338EC] hover:text-white"} flex-1 px-[31.5px] text-black lg:h-[65px] lg:px-[21.5px] ${category.isSelected && "border-[#4D10A3] bg-[#8338EC] text-white"}`}
                onClick={() => handleClick(category.title)}
              >
                {category.isLocked ? (
                  <div className="flex items-center justify-center gap-[5px]">
                    <svg
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.25 6.16666C4.25 5.03949 4.69777 3.95848 5.4948 3.16145C6.29183 2.36442 7.37283 1.91666 8.5 1.91666C9.62717 1.91666 10.7082 2.36442 11.5052 3.16145C12.3022 3.95848 12.75 5.03949 12.75 6.16666H13.4583C13.8341 6.16666 14.1944 6.31591 14.4601 6.58159C14.7257 6.84726 14.875 7.2076 14.875 7.58332V14.6667C14.875 15.0424 14.7257 15.4027 14.4601 15.6684C14.1944 15.9341 13.8341 16.0833 13.4583 16.0833H3.54167C3.16594 16.0833 2.80561 15.9341 2.53993 15.6684C2.27426 15.4027 2.125 15.0424 2.125 14.6667V7.58332C2.125 7.2076 2.27426 6.84726 2.53993 6.58159C2.80561 6.31591 3.16594 6.16666 3.54167 6.16666H4.25ZM8.5 3.33332C9.25145 3.33332 9.97212 3.63183 10.5035 4.16319C11.0348 4.69454 11.3333 5.41521 11.3333 6.16666H5.66667C5.66667 5.41521 5.96518 4.69454 6.49653 4.16319C7.02788 3.63183 7.74855 3.33332 8.5 3.33332ZM9.91667 10.4167C9.91666 10.6653 9.8512 10.9096 9.72686 11.125C9.60252 11.3403 9.42369 11.5192 9.20833 11.6435V12.5417C9.20833 12.7295 9.13371 12.9097 9.00087 13.0425C8.86803 13.1754 8.68786 13.25 8.5 13.25C8.31214 13.25 8.13197 13.1754 7.99913 13.0425C7.86629 12.9097 7.79167 12.7295 7.79167 12.5417V11.6435C7.52161 11.4876 7.31055 11.2469 7.19122 10.9588C7.07189 10.6706 7.05096 10.3512 7.13167 10.05C7.21238 9.74877 7.39023 9.4826 7.63763 9.29276C7.88503 9.10291 8.18815 9 8.5 8.99999C8.87572 8.99999 9.23606 9.14924 9.50173 9.41492C9.76741 9.6806 9.91667 10.0409 9.91667 10.4167Z"
                        fill="url(#paint0_linear_873_465)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_873_465"
                          x1="6.07363"
                          y1="5.27774"
                          x2="11.0338"
                          y2="5.27774"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#8338EC" />
                          <stop offset="1" stopColor="#CB38E7" />
                        </linearGradient>
                      </defs>
                    </svg>
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
              onClick={() => authenticatedCallback()}
            >
              <span className="max-w-[272px] bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text pl-[26px] text-[24px] leading-[26px] text-transparent">
                Upgrade to plus for more features
              </span>

              <svg
                width="75"
                height="73"
                viewBox="0 0 75 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 right-0"
              >
                <rect
                  x="0.163086"
                  y="0.386841"
                  width="88.6736"
                  height="88.4169"
                  rx="44.2084"
                  fill="url(#paint0_linear_714_3660)"
                />
                <path
                  d="M42.4603 69.8037C42.1946 69.8034 41.9309 69.7569 41.6811 69.6662C41.1993 69.4898 40.7906 69.1568 40.5205 68.7205C40.2505 68.2842 40.1346 67.7699 40.1915 67.26L41.9561 51.0121H28.4582C28.0419 51.0127 27.6333 50.8999 27.2762 50.6858C26.9191 50.4717 26.6272 50.1644 26.4316 49.7968C26.2361 49.4293 26.1443 49.0154 26.1663 48.5997C26.1882 48.1839 26.323 47.782 26.5561 47.4371L44.6374 20.3954C44.9233 19.9722 45.3425 19.6567 45.8283 19.4989C46.314 19.3411 46.8386 19.3502 47.3186 19.5246C47.7801 19.6959 48.1742 20.0113 48.4425 20.424C48.7107 20.8368 48.839 21.3249 48.8082 21.8162L47.0436 38.1787H60.5415C60.9579 38.1781 61.3665 38.2909 61.7235 38.505C62.0806 38.7191 62.3726 39.0264 62.5681 39.394C62.7637 39.7615 62.8554 40.1754 62.8335 40.5911C62.8115 41.0069 62.6768 41.4088 62.4436 41.7537L44.3624 68.7954C44.1522 69.1064 43.8688 69.361 43.5371 69.5368C43.2054 69.7126 42.8357 69.8043 42.4603 69.8037Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_714_3660"
                    x1="21.6131"
                    y1="0.38684"
                    x2="44.4999"
                    y2="88.8037"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.256853"
                      stopColor="#EC38E5"
                      stopOpacity="0.2"
                    />
                    <stop offset="1" stopColor="#8338EC" stopOpacity="0.75" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {/* mobile version */}
          {!isPremium && (
            <div
              className="mb-[26px] flex cursor-pointer items-center justify-center gap-[4.33px] md:hidden"
              onClick={() => authenticatedCallback()}
            >
              <svg
                width="11"
                height="14"
                viewBox="0 0 11 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.98065 13.4167C4.91301 13.4166 4.8459 13.4047 4.78232 13.3817C4.65967 13.3368 4.55565 13.252 4.4869 13.1409C4.41815 13.0299 4.38866 12.899 4.40316 12.7692L4.85232 8.63334H1.41649C1.31051 8.6335 1.2065 8.60479 1.11561 8.55029C1.02473 8.49579 0.950406 8.41756 0.900629 8.324C0.850852 8.23045 0.827502 8.1251 0.833086 8.01927C0.83867 7.91344 0.872976 7.81114 0.932322 7.72334L5.53482 0.840006C5.60761 0.732286 5.7143 0.651971 5.83795 0.611811C5.9616 0.571651 6.09513 0.573949 6.21732 0.618339C6.33479 0.661951 6.4351 0.74223 6.50339 0.847292C6.57168 0.952353 6.60432 1.07661 6.59649 1.20167L6.14732 5.36667H9.58316C9.68913 5.36651 9.79314 5.39522 9.88403 5.44972C9.97492 5.50422 10.0492 5.58245 10.099 5.67601C10.1488 5.76957 10.1721 5.87491 10.1666 5.98074C10.161 6.08657 10.1267 6.18887 10.0673 6.27667L5.46482 13.16C5.41131 13.2392 5.33918 13.304 5.25475 13.3487C5.17033 13.3935 5.07621 13.4168 4.98065 13.4167Z"
                  fill="#8338EC"
                />
              </svg>

              <span className="bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-sm leading-[19px] text-transparent underline decoration-[#8338EC] underline-offset-[3.5px]">
                Upgrade to plus for more features
              </span>
            </div>
          )}

          <button className="h-[50px] w-full rounded-[15px] border border-[#4D10A3] bg-[#8338EC] text-base font-medium text-white lg:h-[62.07px] lg:text-xl">
            Start generator
          </button>
        </aside>

        <div className="rotate-360 h-[1px] w-full bg-[#EDEDED] lg:h-full lg:w-[1px] lg:rotate-0" />

        <aside className="mnemonics_wrapper max-h-[200px] w-full overflow-scroll pr-1 lg:max-h-full lg:w-auto">
          {mnemo.length
            ? mnemo.map((obj, index) => (
                <div
                  key={index}
                  className={`relative mb-[25px] flex h-[85px] cursor-pointer items-center justify-center overflow-hidden truncate rounded-[15px] border border-[#EDEAE7] font-[500] leading-[20px] lg:w-[440px] lg:text-xl ${obj.isClicked && "generated_mnemo_active"}`}
                  onClick={() => handleMnemoClick(index)}
                >
                  <div className="absolute left-0 top-0">
                    <Image src={ellipse} alt="ellipse" />

                    {/* when not active svg */}

                    {obj.isClicked ? (
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
                    ) : (
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-[8.2px] top-[10px]"
                      >
                        <path
                          d="M16.8828 2.82495C14.9994 2.82495 13.3278 3.56839 12.1953 4.8462C11.0628 3.56839 9.39125 2.82495 7.50781 2.82495C5.8674 2.82694 4.29473 3.47947 3.13478 4.63942C1.97483 5.79937 1.3223 7.37203 1.32031 9.01245C1.32031 15.7943 11.24 21.2131 11.6619 21.4409C11.8258 21.5292 12.0091 21.5754 12.1953 21.5754C12.3815 21.5754 12.5648 21.5292 12.7288 21.4409C13.1506 21.2131 23.0703 15.7943 23.0703 9.01245C23.0683 7.37203 22.4158 5.79937 21.2558 4.63942C20.0959 3.47947 18.5232 2.82694 16.8828 2.82495ZM16.3681 16.1712C15.0624 17.2792 13.6667 18.2764 12.1953 19.1525C10.724 18.2764 9.32819 17.2792 8.0225 16.1712C5.99094 14.4284 3.57031 11.7706 3.57031 9.01245C3.57031 7.96816 3.98516 6.96664 4.72358 6.22822C5.462 5.48979 6.46352 5.07495 7.50781 5.07495C9.17656 5.07495 10.5734 5.9562 11.1538 7.37558C11.2382 7.58249 11.3824 7.75956 11.5679 7.8842C11.7534 8.00884 11.9718 8.0754 12.1953 8.0754C12.4188 8.0754 12.6372 8.00884 12.8227 7.8842C13.0082 7.75956 13.1524 7.58249 13.2369 7.37558C13.8172 5.9562 15.2141 5.07495 16.8828 5.07495C17.9271 5.07495 18.9286 5.48979 19.667 6.22822C20.4055 6.96664 20.8203 7.96816 20.8203 9.01245C20.8203 11.7706 18.3997 14.4284 16.3681 16.1712Z"
                          fill="#D8D8D8"
                        />
                      </svg>
                    )}

                    {/* when active svg */}
                  </div>
                  {obj.title || (
                    <svg
                      width="196"
                      height="18"
                      viewBox="0 0 196 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.713379"
                        y="0.317734"
                        width="195.287"
                        height="17.3645"
                        rx="8.68227"
                        fill="#E7E7E7"
                      />
                    </svg>
                  )}
                </div>
              ))
            : Array.from({ length: 5 }).map((obj, index) => (
                <div
                  key={index}
                  className="relative mb-[25px] flex h-[85px] cursor-pointer items-center justify-center overflow-hidden truncate rounded-[15px] border border-[#EDEAE7] font-[500] leading-[20px] lg:w-[440px] lg:text-xl"
                >
                  <div className="absolute left-0 top-0">
                    <Image src={ellipse} alt="ellipse" />
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-[8.2px] top-[10px]"
                    >
                      <path
                        d="M16.8828 2.82495C14.9994 2.82495 13.3278 3.56839 12.1953 4.8462C11.0628 3.56839 9.39125 2.82495 7.50781 2.82495C5.8674 2.82694 4.29473 3.47947 3.13478 4.63942C1.97483 5.79937 1.3223 7.37203 1.32031 9.01245C1.32031 15.7943 11.24 21.2131 11.6619 21.4409C11.8258 21.5292 12.0091 21.5754 12.1953 21.5754C12.3815 21.5754 12.5648 21.5292 12.7288 21.4409C13.1506 21.2131 23.0703 15.7943 23.0703 9.01245C23.0683 7.37203 22.4158 5.79937 21.2558 4.63942C20.0959 3.47947 18.5232 2.82694 16.8828 2.82495ZM16.3681 16.1712C15.0624 17.2792 13.6667 18.2764 12.1953 19.1525C10.724 18.2764 9.32819 17.2792 8.0225 16.1712C5.99094 14.4284 3.57031 11.7706 3.57031 9.01245C3.57031 7.96816 3.98516 6.96664 4.72358 6.22822C5.462 5.48979 6.46352 5.07495 7.50781 5.07495C9.17656 5.07495 10.5734 5.9562 11.1538 7.37558C11.2382 7.58249 11.3824 7.75956 11.5679 7.8842C11.7534 8.00884 11.9718 8.0754 12.1953 8.0754C12.4188 8.0754 12.6372 8.00884 12.8227 7.8842C13.0082 7.75956 13.1524 7.58249 13.2369 7.37558C13.8172 5.9562 15.2141 5.07495 16.8828 5.07495C17.9271 5.07495 18.9286 5.48979 19.667 6.22822C20.4055 6.96664 20.8203 7.96816 20.8203 9.01245C20.8203 11.7706 18.3997 14.4284 16.3681 16.1712Z"
                        fill="#D8D8D8"
                      />
                    </svg>
                  </div>
                  <svg
                    width="196"
                    height="18"
                    viewBox="0 0 196 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.713379"
                      y="0.317734"
                      width="195.287"
                      height="17.3645"
                      rx="8.68227"
                      fill="#E7E7E7"
                    />
                  </svg>
                </div>
              ))}
        </aside>
      </section>

      {/* Modal Window */}
      <UpgradeLayout />
    </>
  );
}
