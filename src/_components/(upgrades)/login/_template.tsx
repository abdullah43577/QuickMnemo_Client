"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/app/axiosInstance";
import { useAuthenticatedState } from "@/hooks/useStore";
import { toast } from "react-toastify";

const passwordValidationRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const credentialSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(
      passwordValidationRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

type FormValues = z.infer<typeof credentialSchema>;

export default function LoginTemplate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(credentialSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setIsAuthenticated } = useAuthenticatedState();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginUser = async function ({ email, password }: FormValues) {
    try {
      setIsLoggingIn(true);
      const response = await api.post("/register", { email, password });
      if (response.status === 200) {
        toast("user logged in successfully!");
        setIsAuthenticated(true);
        setIsLoggingIn(false);
      }
    } catch (error) {
      setIsLoggingIn(false);
      toast((error as any).response?.data?.error);
      console.error((error as any).response?.data?.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(loginUser)}
      className="p-5 lg:pl-[57px] lg:pr-[58px]"
    >
      <h2 className="excon mb-5 max-w-[370.2px] text-[40px] font-bold leading-[36px] -tracking-[5.5%] text-black lg:mb-[30px] lg:text-[48px] lg:leading-[49px]">
        Login,
      </h2>

      <p className="mb-[27.5px] text-base leading-5 md:text-[24px] lg:mb-[40px] lg:leading-[25px]">
        Login with email to continue using QuickMnemo
      </p>

      <div>
        <div>
          <label htmlFor="Email" className="lg:text-xl">
            Email
          </label>
          <div>
            <input
              type="email"
              className="focus:border-inputBorder mt-[15px] h-[60px] w-full rounded-[15px] border border-[#EDEAE7] px-5 text-center text-black outline-none focus:shadow-inputDrop lg:min-w-full"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="cabin text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-[19px]">
          <label htmlFor="Password" className="lg:text-xl">
            Password
          </label>
          <div className="relative">
            <div>
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="focus:border-inputBorder mt-[15px] h-[60px] w-full rounded-[15px] border border-[#EDEAE7] px-5 text-center text-black outline-none focus:shadow-inputDrop lg:min-w-full"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="cabin text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {isPasswordVisible ? (
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-[21.18px] top-[40px] cursor-pointer"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <path
                  d="M0.182129 9C1.12213 3.88 5.60813 0 11.0001 0C16.3921 0 20.8781 3.88 21.8191 9C20.8791 14.12 16.3921 18 11.0001 18C5.60813 18 1.12213 14.12 0.182129 9ZM11.0001 14C12.3262 14 13.598 13.4732 14.5357 12.5355C15.4733 11.5979 16.0001 10.3261 16.0001 9C16.0001 7.67392 15.4733 6.40215 14.5357 5.46447C13.598 4.52678 12.3262 4 11.0001 4C9.67405 4 8.40228 4.52678 7.46459 5.46447C6.52691 6.40215 6.00013 7.67392 6.00013 9C6.00013 10.3261 6.52691 11.5979 7.46459 12.5355C8.40228 13.4732 9.67405 14 11.0001 14ZM11.0001 12C10.2045 12 9.44142 11.6839 8.87881 11.1213C8.3162 10.5587 8.00013 9.79565 8.00013 9C8.00013 8.20435 8.3162 7.44129 8.87881 6.87868C9.44142 6.31607 10.2045 6 11.0001 6C11.7958 6 12.5588 6.31607 13.1214 6.87868C13.6841 7.44129 14.0001 8.20435 14.0001 9C14.0001 9.79565 13.6841 10.5587 13.1214 11.1213C12.5588 11.6839 11.7958 12 11.0001 12Z"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                width="22"
                height="13"
                viewBox="0 0 22 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-[21.18px] top-[40px] cursor-pointer"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <path
                  d="M9.12978 9.842L8.34278 12.782L6.41078 12.265L7.19778 9.325C6.01992 8.89062 4.92511 8.25781 3.96078 7.454L1.80778 9.607L0.393781 8.193L2.54678 6.039C1.33097 4.58269 0.514001 2.83572 0.175781 0.969L1.07578 0.805C3.96503 2.88801 7.43795 4.0061 10.9998 4C14.7038 4 18.1318 2.816 20.9238 0.805L21.8238 0.968C21.486 2.83498 20.6694 4.58229 19.4538 6.039L21.6068 8.193L20.1928 9.607L18.0388 7.454C17.0745 8.25817 15.9797 8.89131 14.8018 9.326L15.5898 12.265L13.6578 12.782L12.8698 9.842C11.6321 10.0535 10.3675 10.0535 9.12978 9.842Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <button
        disabled={isLoggingIn}
        className={`mb-[25px] mt-[53px] h-[60px] w-full rounded-[15px] border text-base font-medium text-white lg:text-xl ${isLoggingIn ? "border-gray-400" : "border-btnBorder bg-CTA"}`}
      >
        Login
      </button>

      <p className="cursor-pointer bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text pb-5 text-center text-sm font-[500] text-transparent underline decoration-[#8338EC] underline-offset-[6px] md:text-[24px]">
        Have any issues? Report here
      </p>
    </form>
  );
}
