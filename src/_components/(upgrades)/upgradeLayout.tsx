"use client";

import { ModalSteps, useModalStore } from "@/hooks/useStore";
import Upgrade from "./upgrade";
import SignUp from "./signup/signup";
import Login from "./login/login";
import Payment from "./payment/payment";
import Success from "./success";
import SignUpTemplate from "./signup/_template";
import LoginTemplate from "./login/_template";
import CancelSubscription from "@/app/subscription/_components/cancel-sub";
import VerifyPayment from "./payment/verifyPayment";
import { DeleteMnemo } from "@/app/saved-mnemo/_components/deleteMnemo";
import VerifyOAuthLogin from "./login/verifyOAuthLogin";

export default function UpgradeLayout() {
  const {
    isModalOpen,
    setIsModalOpen,
    currentModalStep,
    setCurrentModalstep,
    previousModalStep,
  } = useModalStore();

  const modalSteps: ModalSteps[] = [
    "Upgrade",
    "Signup",
    "Login",
    "VerifyOAuth",
    "Payment",
    "VerifyPayment",
    "Success",
    "Cancel Sub",
    "Cancel Sub Success",
    "Delete Mnemonics",
  ];

  return (
    <>
      <div
        className={`fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[644px] -translate-x-1/2 -translate-y-1/2 rounded-[25px] bg-white lg:w-auto lg:rounded-[20px] ${isModalOpen ? "block" : "hidden"}`}
      >
        <div
          className={`mt-5 flex items-center lg:pl-6 ${!modalSteps.includes(currentModalStep) ? "justify-between lg:ml-[21px] lg:mt-[21px]" : "justify-end"}`}
        >
          {!modalSteps.includes(currentModalStep) && (
            <div
              className="ml-5 flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#EDEAE7] lg:size-[50px]"
              onClick={() =>
                setCurrentModalstep(previousModalStep as ModalSteps)
              }
            >
              <svg
                width="12"
                height="18"
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.41709 9.00004L11.2891 15.872L9.32465 17.835L0.489649 9.00004L9.32465 0.165039L11.2877 2.12806L4.41709 9.00004Z"
                  fill="black"
                />
              </svg>
            </div>
          )}

          <div
            className="mr-5 flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#EDEAE7] lg:mr-[21px] lg:size-[50px]"
            onClick={() => setIsModalOpen("close")}
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-[14.69px] lg:size-5"
            >
              <path
                d="M1.33759 1.33753C1.49701 1.17788 1.68634 1.05123 1.89475 0.964815C2.10316 0.878402 2.32656 0.833923 2.55217 0.833923C2.77779 0.833923 3.00119 0.878402 3.2096 0.964815C3.41801 1.05123 3.60733 1.17788 3.76675 1.33753L10.0001 7.56857L16.2334 1.33753C16.3929 1.17803 16.5823 1.0515 16.7907 0.965181C16.9991 0.878859 17.2224 0.83443 17.448 0.83443C17.6736 0.83443 17.8969 0.878859 18.1053 0.965181C18.3137 1.0515 18.5031 1.17803 18.6626 1.33753C18.8221 1.49703 18.9486 1.68638 19.0349 1.89478C19.1213 2.10318 19.1657 2.32654 19.1657 2.55211C19.1657 2.77768 19.1213 3.00104 19.0349 3.20944C18.9486 3.41784 18.8221 3.60719 18.6626 3.76669L12.4315 10L18.6626 16.2334C18.9847 16.5555 19.1657 16.9924 19.1657 17.4479C19.1657 17.9035 18.9847 18.3404 18.6626 18.6625C18.3405 18.9846 17.9036 19.1656 17.448 19.1656C16.9924 19.1656 16.5555 18.9846 16.2334 18.6625L10.0001 12.4315L3.76675 18.6625C3.44463 18.9846 3.00773 19.1656 2.55217 19.1656C2.09661 19.1656 1.65972 18.9846 1.33759 18.6625C1.01546 18.3404 0.834491 17.9035 0.834491 17.4479C0.834491 16.9924 1.01546 16.5555 1.33759 16.2334L7.56863 10L1.33759 3.76669C1.17794 3.60727 1.05129 3.41794 0.964876 3.20953C0.878463 3.00113 0.833984 2.77772 0.833984 2.55211C0.833984 2.3265 0.878463 2.1031 0.964876 1.89469C1.05129 1.68628 1.17794 1.49695 1.33759 1.33753Z"
                fill="black"
              />
            </svg>
          </div>
        </div>

        <div className="p-5 md:pb-[58px] md:pl-[57px] md:pr-[58px] md:pt-0">
          {currentModalStep === "Upgrade" && <Upgrade />}
          {currentModalStep === "Signup" && <SignUp />}
          {currentModalStep === "SignupTemplate" && <SignUpTemplate />}
          {currentModalStep === "Login" && <Login />}
          {currentModalStep === "VerifyOAuth" && <VerifyOAuthLogin />}
          {currentModalStep === "LoginTemplate" && <LoginTemplate />}
          {currentModalStep === "Payment" && <Payment />}
          {currentModalStep === "VerifyPayment" && <VerifyPayment />}
          {currentModalStep === "Success" && <Success />}
          {currentModalStep === "Cancel Sub" && <CancelSubscription />}
          {currentModalStep === "Delete Mnemonics" && <DeleteMnemo />}
        </div>
      </div>

      <div
        className={`absolute left-0 top-0 z-10 h-full w-full bg-overlay ${isModalOpen ? "block" : "hidden"}`}
        onClick={() => setIsModalOpen("close")}
      />
    </>
  );
}
