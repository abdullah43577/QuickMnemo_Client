export interface Props {
  pathname: string;
}

export const SavedMnemoIcon = function ({ pathname }: Props) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.625 6.07812C19.625 12.0938 10.7055 16.963 10.3257 17.1641C10.2256 17.2179 10.1137 17.2461 10 17.2461C9.88632 17.2461 9.77441 17.2179 9.6743 17.1641C9.29445 16.963 0.375 12.0938 0.375 6.07812C0.376592 4.66551 0.938458 3.3112 1.93733 2.31233C2.9362 1.31346 4.29051 0.751592 5.70312 0.75C7.47773 0.75 9.03148 1.51312 10 2.80305C10.9685 1.51312 12.5223 0.75 14.2969 0.75C15.7095 0.751592 17.0638 1.31346 18.0627 2.31233C19.0615 3.3112 19.6234 4.66551 19.625 6.07812Z"
        className={` ${pathname === "/saved-mnemo" ? "fill-current text-[#8338EC]" : "group-hover:fill-current group-hover:text-[#8338EC]"}`}
        fill="#8E8E93"
      />
    </svg>
  );
};
