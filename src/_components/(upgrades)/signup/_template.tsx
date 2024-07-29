export default function SignUpTemplate() {
  return (
    <div className="p-5 lg:pl-[57px] lg:pr-[58px]">
      <h2 className="excon mb-5 max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Sign up,
      </h2>

      <p className="mb-[27.5px] text-base leading-5 md:text-[24px] lg:mb-[40px] lg:leading-[25px]">
        Sign up Sign in with email to continue using QuickMnemo
      </p>

      <div>
        <div>
          <label htmlFor="Email" className="lg:text-xl">
            Email
          </label>
          <input
            type="email"
            className="focus:shadow-inputDrop mt-[15px] h-[60px] w-full rounded-[15px] border border-[#EDEAE7] px-5 text-center text-black outline-none focus:border-[#8338EC] lg:min-w-full"
          />
        </div>

        <div className="mt-[19px]">
          <label htmlFor="Password" className="lg:text-xl">
            Password
          </label>
          <input
            type="password"
            className="focus:shadow-inputDrop mt-[15px] h-[60px] w-full rounded-[15px] border border-[#EDEAE7] px-5 text-center text-black outline-none focus:border-[#8338EC] lg:min-w-full"
          />
        </div>
      </div>

      <button
        className="mb-[25px] mt-[53px] h-[60px] w-full rounded-[15px] border border-[#4D10A3] bg-[#8338EC] text-base font-medium text-white lg:h-[85px] lg:text-xl"
        // onClick={() => setCurrentModalstep("Signup")}
      >
        Sign up
      </button>

      <p className="cursor-pointer bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text pb-5 text-center text-sm font-[500] text-transparent underline decoration-[#8338EC] underline-offset-[6px] md:text-[24px]">
        Have any issues? Report here
      </p>
    </div>
  );
}
