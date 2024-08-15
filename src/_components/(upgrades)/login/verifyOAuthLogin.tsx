export default function VerifyOAuthLogin() {
  return (
    <>
      <h2 className="excon mb-5 text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Verifying Credentials
      </h2>

      <p className="text-base leading-5 md:text-[24px] lg:leading-[25px]">
        Please hold on a little while. We will automaticallly redirect you to
        the homescreen after successfully verifying your login credentials. Do
        not leave this screen.
      </p>
    </>
  );
}
