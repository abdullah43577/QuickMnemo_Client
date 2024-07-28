import WindowMain from "@/_components/main/main";

export default function Home() {
  return (
    <main>
      <section className="mx-auto mt-[53px] max-w-[1440px] px-5 2xl:px-[162px]">
        <h1 className="excon mx-auto mb-[25px] text-center text-[40px] font-bold leading-[36px] tracking-[-5.5px] text-black md:text-[48px]">
          Your
          <span className="excon bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-transparent">
            {" "}
            Memory's{" "}
          </span>
          New Best Friend
        </h1>

        <p className="mx-auto mb-[67px] max-w-[600px] text-center text-[24px] leading-5">
          Unlock the power of mnemonics and turn forgettable information into
          unforgettable memories.
        </p>

        <WindowMain />
      </section>
    </main>
  );
}
