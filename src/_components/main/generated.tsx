"use client";

import Image from "next/image";
import ellipse from "../../../public/ellipse.png";
import { useEffect, useState } from "react";
import api from "@/app/axiosInstance";
import { toast } from "react-toastify";
import { useAuthenticatedState } from "@/hooks/useStore";
import { handleErrors } from "@/utils/handleErrors";

interface Mnemonics {
  id: number;
  title: string;
  isClicked: boolean;
}

export function GeneratedMnemonics() {
  const [mnemo, setMnemo] = useState<Mnemonics[]>([
    { id: 0, title: "Harry Swiftly Raced Zebras", isClicked: false },
    { id: 1, title: "John Swiftly Raced Zebras", isClicked: false },
    { id: 2, title: "Potter Swiftly Raced Zebras", isClicked: false },
    { id: 3, title: "Johson Swiftly Raced Zebras", isClicked: false },
    { id: 4, title: "Johanna Swiftly Raced Zebras", isClicked: false },
    { id: 5, title: "Abdul Swiftly Raced Zebras", isClicked: false },
    { id: 6, title: "Ayoola Swiftly Raced Zebras", isClicked: false },
    { id: 7, title: "Roman Swiftly Raced Zebras", isClicked: false },
  ]);
  const { setSavedMnemonics, isAuthenticated } = useAuthenticatedState();

  const handleMnemoClick = function (index: number) {
    setMnemo((prevValue) =>
      prevValue.map((item) =>
        item.id === index ? { ...item, isClicked: !item.isClicked } : item,
      ),
    );
  };

  const saveMnemoToDB = async function (savedMnemonics: string[]) {
    try {
      const response = await api.put("/save-mnemonics", {
        savedMnemonics,
      });
      if (response.status === 200) toast.success(response.data.message);
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
  }, [mnemo, setSavedMnemonics, isAuthenticated]);

  return (
    <aside className="max-h-[200px] w-full overflow-scroll pr-1 lg:max-h-full lg:w-auto">
      {mnemo.length
        ? mnemo.map((obj, index) => (
            <div
              key={index}
              className={`relative ${index !== mnemo.length - 1 && "mb-[25px]"} flex h-[85px] cursor-pointer items-center justify-center overflow-hidden truncate rounded-[15px] border border-[#EDEAE7] font-[500] leading-[20px] lg:w-[440px] lg:text-xl ${obj.isClicked && "generated_mnemo_active"}`}
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
  );
}
