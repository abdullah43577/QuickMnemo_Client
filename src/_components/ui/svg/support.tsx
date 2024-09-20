import { Props } from "./savedMnemo";

export const SupportIcon = function ({ pathname }: Props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.249 11.935L12.8335 14.6667H8.25016V13.75H11.9764C12.0593 13.75 12.1407 13.7274 12.2118 13.6848C12.2829 13.6422 12.3411 13.5811 12.3802 13.508C12.4194 13.4349 12.4379 13.3526 12.434 13.2698C12.43 13.187 12.4037 13.1068 12.3577 13.0378L11.5437 11.8167C11.3768 11.5654 11.1502 11.3593 10.8842 11.2168C10.6182 11.0743 10.3211 10.9998 10.0193 11H2.75016C2.50705 11 2.27389 11.0966 2.10198 11.2685C1.93007 11.4404 1.8335 11.6736 1.8335 11.9167V17.4167C1.8335 17.9029 2.02665 18.3692 2.37047 18.713C2.71428 19.0568 3.1806 19.25 3.66683 19.25H12.5026C12.8946 19.2501 13.282 19.1664 13.639 19.0045C13.996 18.8426 14.3142 18.6063 14.5724 18.3113L20.1668 11.9167L18.8358 11.473C18.4004 11.3278 17.9355 11.2941 17.4836 11.3748C17.0317 11.4555 16.6073 11.6481 16.249 11.935ZM17.6533 6.77417C18.0667 6.34792 18.3225 5.7585 18.3225 5.10767C18.3225 4.45683 18.0667 3.86742 17.6533 3.44117C17.4443 3.22298 17.1933 3.04929 16.9154 2.93052C16.6375 2.81175 16.3385 2.75035 16.0363 2.75C16.0363 2.75 14.896 2.74725 13.7502 3.92883C12.6043 2.74725 11.464 2.75 11.464 2.75C11.1619 2.75038 10.863 2.81171 10.5851 2.93032C10.3073 3.04892 10.0562 3.22236 9.847 3.44025C9.43358 3.86742 9.17783 4.45592 9.17783 5.10675C9.17783 5.75758 9.43358 6.34792 9.847 6.77325L13.7502 11L17.6533 6.77417Z"
        className={` ${pathname === "/support" ? "fill-current text-[#8338EC]" : "group-hover:fill-current group-hover:text-[#8338EC]"}`}
        fill="#8E8E93"
      />
      <defs>
        <linearGradient
          id="paint0_linear_722_3734"
          x1="7.51126"
          y1="6.66468"
          x2="14.6436"
          y2="6.66468"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8338EC" />
          <stop offset="1" stopColor="#CB38E7" />
        </linearGradient>
      </defs>
    </svg>
  );
};