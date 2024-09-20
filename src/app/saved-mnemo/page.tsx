"use client";

import Image from "next/image";
import ellipse from "../../../public/ellipse.png";
import { useAuthenticatedState, useModalStore } from "@/hooks/useStore";
import { Container } from "@/_components/ui/Container";
import activeHeartIcon from "../../../public/activeHeart.svg";
import { SavedMnemoIcon } from "@/_components/ui/svg/savedMnemo";
import { usePathname } from "next/navigation";

export default function SavedMnemonics() {
  const { savedMnemonics } = useAuthenticatedState();
  const { setIsModalOpen, setCurrentModalstep, setToBeDeletedMnemonic } =
    useModalStore();
  const pathname = usePathname();

  const handleDeleteMnemonic = function (str: string) {
    setCurrentModalstep("Delete Mnemonics");
    setIsModalOpen("open");
    setToBeDeletedMnemonic(str);
  };

  return (
    <section>
      <Container className="items-center pt-[18px] lg:pt-[43px]">
        <div className="mx-auto h-[75vh] max-w-[568px] md:h-auto">
          <div className="group mb-[53px] flex cursor-pointer items-center gap-[10px]">
            <SavedMnemoIcon pathname={pathname} />
            <span className="text-lg font-bold leading-5 group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent">
              Saved Mnemo
            </span>
          </div>

          <div className="max-h-[653px] min-h-full overflow-scroll rounded-[35px] border border-[#EDEAE7] p-5 shadow-mainDrop lg:p-[64px]">
            {savedMnemonics.length ? (
              savedMnemonics.map((str, index) => (
                <div
                  key={index}
                  className={`generated_mnemo_active relative flex h-[85px] min-h-[85px] cursor-pointer items-center justify-center overflow-hidden rounded-[15px] border border-[#EDEAE7] px-[49px] font-medium leading-5 md:px-[99px] lg:text-xl ${index !== savedMnemonics.length - 1 && "mx-auto mb-[25px]"}`}
                  onClick={() => handleDeleteMnemonic(str)}
                >
                  <div className="absolute left-0 top-0">
                    <Image src={ellipse} alt="ellipse" />

                    <Image
                      src={activeHeartIcon}
                      alt="active heart icon"
                      className="absolute left-[8.2px] top-[8.2px]"
                    />
                  </div>
                  {str}
                </div>
              ))
            ) : (
              <p className="text-center font-medium">
                You don't have any mnemonics saved at this time
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
