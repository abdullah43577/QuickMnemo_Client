"use client";

import api from "@/app/axiosInstance";
import { useAuthenticatedState, useModalStore } from "@/hooks/useStore";
import { handleErrors } from "@/utils/handleErrors";

export const DeleteMnemo = function () {
  const { toBeDeletedMnemonic, setShowToast, setIsModalOpen } = useModalStore();
  const { savedMnemonics, setSavedMnemonics } = useAuthenticatedState();

  const handleDeleteMnemonic = async function () {
    if (!toBeDeletedMnemonic.length) return;

    const initialState = savedMnemonics;

    try {
      // filter out the deleted mnemonics from the savedMnemonics array
      const filteredMnemonics = savedMnemonics.filter(
        (txt) => txt.toLowerCase() !== toBeDeletedMnemonic.toLowerCase(),
      );
      setSavedMnemonics(filteredMnemonics);
      setIsModalOpen("close");

      // send a PUT request to the server to delete the mnemonic from the database
      const response = await api.put("/delete-mnemonics", {
        txt: toBeDeletedMnemonic,
      });

      setShowToast({ show: true, msg: response.data.message });
    } catch (error) {
      handleErrors(error);
      setSavedMnemonics(initialState);
      setIsModalOpen("open");
    }
  };

  return (
    <div className="p-5 lg:pl-[57px] lg:pr-[58px]">
      <h2 className="excon mb-5 max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Remove Item
      </h2>

      <p className="mb-[27.5px] text-base leading-5 md:text-[24px] lg:mb-[40px] lg:leading-[25px]">
        Are you sure you want to delete this item?
      </p>

      <div className="flex items-center justify-between">
        <button
          className="h-[50px] w-[150px] rounded-[15px] border border-btnBorder bg-CTA font-semibold text-white"
          onClick={handleDeleteMnemonic}
        >
          Remove item
        </button>

        <button
          className="h-[50px] w-[150px] rounded-[15px] border border-[#EDEDED] font-semibold text-black"
          onClick={() => setIsModalOpen("close")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
