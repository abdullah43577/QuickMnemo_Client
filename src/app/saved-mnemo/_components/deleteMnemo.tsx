"use client";

import api from "@/app/axiosInstance";
import { useAuthenticatedState, useModalStore } from "@/hooks/useStore";
import { useHandleErrors } from "@/utils/useHandleErrors";

export const DeleteMnemo = function () {
  const { toBeDeletedMnemonic, setShowToast, setIsModalOpen } = useModalStore();
  const { savedMnemonics, setSavedMnemonics, isAuthenticated } =
    useAuthenticatedState();
  const handleErrors = useHandleErrors();

  const handleDeleteMnemonic = async function () {
    if (!toBeDeletedMnemonic.length) return;

    const initialState = savedMnemonics;

    try {
      //* filter out the deleted mnemonics from the savedMnemonics array
      const filteredMnemonics = savedMnemonics.filter(
        (txt) => txt.toLowerCase() !== toBeDeletedMnemonic.toLowerCase(),
      );
      setSavedMnemonics(filteredMnemonics);
      setIsModalOpen("close");

      if (isAuthenticated) {
        //* delete the mnemonic from the database
        const response = await api.put("/delete-mnemonics", {
          txt: toBeDeletedMnemonic,
        });

        setShowToast({ show: true, msg: response.data.message, type: "msg" });
      }
    } catch (error) {
      handleErrors(error);
      setSavedMnemonics(initialState);
      setIsModalOpen("open");
    }
  };

  return (
    <>
      <h2 className="excon mb-5 text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Remove Item
      </h2>

      <p className="mb-[27.5px] text-base leading-5 md:text-[24px] lg:mb-[74px] lg:leading-[25px]">
        Are you sure you want to delete this item?
      </p>

      <div className="flex gap-[28px]">
        <button
          className="h-[50px] w-full rounded-[15px] border border-btnBorder bg-CTA font-semibold text-white lg:h-[85px] lg:text-2xl lg:font-medium"
          onClick={handleDeleteMnemonic}
        >
          Remove item
        </button>

        <button
          className="h-[50px] w-full rounded-[15px] border border-[#EDEDED] font-semibold text-black lg:h-[85px] lg:text-2xl lg:font-medium"
          onClick={() => setIsModalOpen("close")}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
