export default function PrivacyPolicty() {
  return (
    <section className="p-5 pt-[18px] lg:p-[64px] lg:pt-[43px]">
      <div className="mx-auto w-full max-w-[1116px] rounded-[35px] border border-[#EDEAE7] p-5 shadow-mainDrop lg:p-[64px]">
        <h2 className="text-center text-2xl font-medium text-black xl:text-4xl">
          Privacy Policy
        </h2>
        <p className="mt-4 text-xs italic lg:text-sm">
          Last Updated: Wednesday Aug 21, 2024
        </p>

        <div className="mt-4 space-y-4">
          <p className="text-center font-medium text-black">Introduction</p>
          <p className="text-sm md:text-base">
            Welcome to QuickMnemo. We value your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            what information we collect, how we use it, and your rights
            regarding your data.
          </p>

          <p className="text-center font-medium text-black">
            Information We Collect
          </p>
          <p className="text-sm md:text-base">
            <span className="font-medium">Personal Information: </span>
            When you create an account on our website, we collect personal
            information such as your email address.
          </p>

          <p className="text-center font-medium text-black">
            How We Use Your Information
          </p>
          <p className="text-sm md:text-base">
            <span className="font-medium">Account Management: </span>
            We use your email to manage your account, provide access to our
            services, and communicate with you regarding your subscription.
          </p>

          <p className="text-sm md:text-base">
            <span className="font-medium">Payment Processing: </span>
            Payments for our services are processed through Flutterwave API. We
            do not store your payment information. Your email may be used to
            send you payment confirmations and subscription details.
          </p>

          <p className="text-center font-medium text-black">
            Subscription and Cancellation
          </p>
          <p className="text-sm md:text-base">
            <span className="font-medium">Monthly Subscription: </span>
            Upon successful payment, you are subscribed to a monthly plan that
            grants full access to our mnemonics generation services.
          </p>
          <p className="text-sm md:text-base">
            <span className="font-medium">Cancellation: </span>
            You can cancel your subscription at any time via your dashboard.
            Upon cancellation, your access to premium features will continue
            until the end of the current billing cycle.
          </p>

          <p className="text-center font-medium text-black">Data Security</p>
          <p className="text-sm md:text-base">
            We take reasonable measures to protect your personal information.
            However, please be aware that no method of transmission over the
            internet or method of electronic storage is 100% secure.
          </p>

          <p className="text-center font-medium text-black">Your Rights</p>
          <p className="text-sm md:text-base">
            <span className="font-medium">Access and Update: </span>
            You have the right to access and update your personal information
            through your account settings.
          </p>
          <p className="text-sm md:text-base">
            <span className="font-medium">Deletion: </span>
            If you wish to delete your account and associated data, you can do
            so via your dashboard or by contacting us directly.
          </p>
        </div>
      </div>
    </section>
  );
}
