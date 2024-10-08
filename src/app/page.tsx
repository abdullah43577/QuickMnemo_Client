"use client";

import WindowMain from "@/_components/main/main";
import { Container } from "@/_components/ui/Container";
import { useHeaderState } from "@/hooks/useStore";

export default function Home() {
  const { isScrolled } = useHeaderState();

  return (
    <main>
      <Container
        // the headers height + 53px 2xl:px-[162px]
        className={isScrolled ? "pt-[152px]" : "pt-[53px]"}
      >
        <h1 className="excon mx-auto mb-[25px] text-center text-[40px] font-bold leading-[36px] tracking-[-5.5%] text-black md:text-[48px]">
          Your
          <span className="excon bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-transparent">
            {" "}
            Memories{" "}
          </span>
          New Best Friend
        </h1>

        <p className="mx-auto mb-[67px] max-w-[600px] text-center leading-[24px] lg:text-[24px]">
          Unlock the power of mnemonics and turn forgettable information into
          unforgettable memories.
        </p>

        <WindowMain />
      </Container>
    </main>
  );
}
