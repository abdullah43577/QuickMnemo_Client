"use client";

import { useAuthenticatedState, useModalStore } from "@/hooks/useStore";
import api from "../axiosInstance";
import { handleErrors } from "@/utils/handleErrors";

export default function Subscription() {
  const { setCurrentModalstep, setIsModalOpen, setShowToast } = useModalStore();
  const { isPremium } = useAuthenticatedState();

  const handleSubscription = async function () {
    try {
      const response = await api.get("/subscribe");

      if (response.data.type === "subscription_activated") {
        setShowToast({ show: true, msg: response.data.message });
      } else {
        const paymentLink = response.data.message;
        window.open(paymentLink, "_self");
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleCancelSubscription = function () {
    setIsModalOpen("open");
    setCurrentModalstep("Cancel Sub");
  };

  return (
    <>
      <section>
        <div className="mx-auto max-w-[1440px] items-center px-5 pt-[18px] lg:pt-[43px] 2xl:px-[162px]">
          <div className="mx-auto max-w-[568px]">
            <div className="group mb-[53px] inline-flex cursor-pointer gap-[10px]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_722_3729)">
                  <path
                    d="M10.5287 8.58958C10.68 8.13583 11.3207 8.13583 11.472 8.58958L12.3588 11.253C12.5541 11.8384 12.883 12.3704 13.3195 12.8067C13.756 13.243 14.2881 13.5716 14.8737 13.7665L17.5357 14.6533C17.9895 14.8046 17.9895 15.4453 17.5357 15.5966L14.8723 16.4835C14.2869 16.6787 13.7549 17.0076 13.3186 17.4441C12.8823 17.8806 12.5537 18.4127 12.3588 18.9983L11.472 21.6603C11.4394 21.7597 11.3762 21.8462 11.2915 21.9076C11.2068 21.9689 11.1049 22.0019 11.0003 22.0019C10.8958 22.0019 10.7939 21.9689 10.7092 21.9076C10.6245 21.8462 10.5613 21.7597 10.5287 21.6603L9.64185 18.997C9.44678 18.4116 9.11809 17.8798 8.68182 17.4435C8.24554 17.0072 7.71368 16.6785 7.12835 16.4835L4.46497 15.5966C4.36562 15.564 4.27909 15.5008 4.21775 15.4161C4.15641 15.3314 4.12338 15.2295 4.12338 15.125C4.12338 15.0204 4.15641 14.9185 4.21775 14.8338C4.27909 14.7491 4.36562 14.6859 4.46497 14.6533L7.12835 13.7665C7.71368 13.5714 8.24554 13.2427 8.68182 12.8064C9.11809 12.3702 9.44678 11.8383 9.64185 11.253L10.5287 8.58958ZM5.2171 1.57846C5.23682 1.51891 5.2748 1.46709 5.32565 1.43037C5.3765 1.39364 5.43762 1.37387 5.50035 1.37387C5.56307 1.37387 5.6242 1.39364 5.67505 1.43037C5.7259 1.46709 5.76388 1.51891 5.7836 1.57846L6.31572 3.17621C6.5536 3.88846 7.11185 4.44671 7.8241 4.68458L9.42185 5.21671C9.48139 5.23642 9.53321 5.2744 9.56994 5.32525C9.60666 5.3761 9.62643 5.43723 9.62643 5.49996C9.62643 5.56268 9.60666 5.62381 9.56994 5.67466C9.53321 5.72551 9.48139 5.76349 9.42185 5.78321L7.8241 6.31533C7.47282 6.43237 7.15363 6.62961 6.89181 6.89142C6.63 7.15323 6.43276 7.47243 6.31572 7.82371L5.7836 9.42146C5.76388 9.481 5.7259 9.53282 5.67505 9.56954C5.6242 9.60627 5.56307 9.62604 5.50035 9.62604C5.43762 9.62604 5.3765 9.60627 5.32565 9.56954C5.2748 9.53282 5.23682 9.481 5.2171 9.42146L4.68497 7.82371C4.56794 7.47243 4.3707 7.15323 4.10889 6.89142C3.84707 6.62961 3.52788 6.43237 3.1766 6.31533L1.57885 5.78321C1.5193 5.76349 1.46749 5.72551 1.43076 5.67466C1.39404 5.62381 1.37427 5.56268 1.37427 5.49996C1.37427 5.43723 1.39404 5.3761 1.43076 5.32525C1.46749 5.2744 1.5193 5.23642 1.57885 5.21671L3.1766 4.68458C3.52788 4.56755 3.84707 4.37031 4.10889 4.10849C4.3707 3.84668 4.56794 3.52748 4.68497 3.17621L5.2171 1.57846ZM14.937 0.13608C14.9505 0.096929 14.976 0.0629797 15.0097 0.0389525C15.0435 0.0149253 15.0839 0.00201416 15.1253 0.00201416C15.1668 0.00201416 15.2072 0.0149253 15.241 0.0389525C15.2747 0.0629797 15.3001 0.096929 15.3137 0.13608L15.6685 1.20033C15.8266 1.67608 16.1992 2.04871 16.675 2.20683L17.7392 2.56158C17.7784 2.57515 17.8123 2.60059 17.8364 2.63435C17.8604 2.66811 17.8733 2.70852 17.8733 2.74996C17.8733 2.79139 17.8604 2.8318 17.8364 2.86556C17.8123 2.89932 17.7784 2.92476 17.7392 2.93833L16.675 3.29308C16.4405 3.37107 16.2275 3.50265 16.0528 3.67737C15.878 3.85209 15.7465 4.06513 15.6685 4.29958L15.3137 5.36383C15.3001 5.40298 15.2747 5.43693 15.241 5.46096C15.2072 5.48499 15.1668 5.4979 15.1253 5.4979C15.0839 5.4979 15.0435 5.48499 15.0097 5.46096C14.976 5.43693 14.9505 5.40298 14.937 5.36383L14.5822 4.29958C14.5042 4.06513 14.3727 3.85209 14.1979 3.67737C14.0232 3.50265 13.8102 3.37107 13.5757 3.29308L12.5128 2.93833C12.4737 2.92476 12.4397 2.89932 12.4157 2.86556C12.3917 2.8318 12.3788 2.79139 12.3788 2.74996C12.3788 2.70852 12.3917 2.66811 12.4157 2.63435C12.4397 2.60059 12.4737 2.57515 12.5128 2.56158L13.5771 2.20683C14.0528 2.04871 14.4255 1.67608 14.5836 1.20033L14.937 0.137455V0.13608Z"
                    className="group-hover:fill-current group-hover:text-[#8338EC]"
                    fill="#8E8E93"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_722_3729">
                    <rect width="22" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span className="text-lg font-bold leading-5 group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent">
                Subscription
              </span>
            </div>

            <div className="rounded-[35px] border border-[#EDEAE7] p-5 shadow-mainDrop lg:p-[64px]">
              <button
                className="mb-5 block h-[50px] min-w-full rounded-[15px] border-btnBorder bg-CTA font-semibold leading-[-0.8px] text-white md:w-[240px] lg:h-[85px]"
                onClick={handleSubscription}
              >
                Renew or subscribe
              </button>

              <button
                className={`h-[50px] min-w-full rounded-[15px] border border-[#EDEDED] font-semibold leading-[-0.8px] text-[#EC3838] md:w-[240px] lg:h-[85px] ${!isPremium ? "cursor-not-allowed text-opacity-50" : "cursor-pointer text-opacity-100"}`}
                onClick={() => (isPremium ? handleCancelSubscription() : null)}
              >
                Cancel subscription
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
