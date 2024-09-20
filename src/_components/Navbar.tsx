"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useHeaderState } from "@/hooks/useStore";
import { containerStyles } from "./ui/containerStyles";
import { SavedMnemoIcon } from "./ui/svg/savedMnemo";
import { SubscriptionIcon } from "./ui/svg/subscription";
import { SupportIcon } from "./ui/svg/support";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const { isScrolled, setIsScrolled } = useHeaderState();

  const handleNavClick = function () {
    setIsNavOpen(!isNavOpen);
  };

  const handleScroll = function () {
    if (window.scrollY > 0) setIsScrolled(true);
    else setIsScrolled(false);
  };

  useEffect(() => {
    //* handle scroll event
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`border-b border-navBorder ${isScrolled ? "fixed left-0 top-0 z-10 w-full bg-white" : "relative"}`}
    >
      <nav
        className={`${containerStyles} flex items-center justify-between pb-5 pt-6 md:pb-5 md:pt-[41px]`}
      >
        <Link
          href="/"
          className="excon bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-[25px] font-[900] text-transparent"
          onClick={() => setIsNavOpen(false)}
        >
          QuickMnemo
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/saved-mnemo"
            className="group flex cursor-pointer items-center gap-[10px]"
          >
            <SavedMnemoIcon pathname={pathname} />

            <span
              className={`text-lg font-bold leading-5 ${pathname === "/saved-mnemo" ? "bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-transparent" : "group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent"}`}
            >
              Saved Mnemo
            </span>
          </Link>

          <Link
            href="/subscription"
            className="group flex cursor-pointer items-center gap-[10px]"
          >
            <SubscriptionIcon pathname={pathname} />

            <span
              className={`text-lg font-bold leading-5 ${pathname === "/subscription" ? "bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-transparent" : "group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent"}`}
            >
              Subscription
            </span>
          </Link>

          <Link
            href="/support"
            className="group flex cursor-pointer items-center gap-[10px]"
          >
            <SupportIcon pathname={pathname} />

            <span
              className={`text-lg font-bold leading-5 ${pathname === "/support" ? "bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-transparent" : "group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent"}`}
            >
              Support Us
            </span>
          </Link>

          <Link
            href="/privacy-policy"
            className="group flex cursor-pointer items-center gap-[10px]"
          >
            <span
              className={`text-lg font-bold leading-5 ${pathname === "/privacy-policy" ? "bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-transparent" : "group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent"}`}
            >
              Privacy Policy
            </span>
          </Link>
        </div>

        {/* hamburger */}
        <div
          className="flex flex-col items-center gap-1 lg:hidden"
          onClick={handleNavClick}
        >
          <div className="h-[2px] w-[19.26px] rounded-lg bg-black"></div>
          <div className="h-[2px] w-[19.26px] rounded-lg bg-black"></div>
          <div className="h-[2px] w-[19.26px] rounded-lg bg-black"></div>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, height: "0" }}
        animate={{
          opacity: isNavOpen ? 1 : 0,
          height: isNavOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute z-50 w-full overflow-hidden bg-white lg:hidden"
      >
        <nav className="mt-[33px] flex flex-col gap-[18px] px-5 pb-[25px]">
          <Link
            href="/saved-mnemo"
            className="group flex cursor-pointer items-center gap-[10px]"
            onClick={handleNavClick}
          >
            <SavedMnemoIcon pathname={pathname} />

            <span
              className={`text-lg font-bold leading-5 ${pathname === "/saved-mnemo" ? "bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-transparent" : "group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent"}`}
            >
              Saved Mnemo
            </span>
          </Link>

          <Link
            href="/subscription"
            className="group flex cursor-pointer items-center gap-[10px]"
            onClick={handleNavClick}
          >
            <SubscriptionIcon pathname={pathname} />

            <span
              className={`text-lg font-bold leading-5 ${pathname === "/subscription" ? "bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-transparent" : "group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent"}`}
            >
              Subscription
            </span>
          </Link>

          <Link
            href="/support"
            className="group flex cursor-pointer items-center gap-[10px]"
            onClick={handleNavClick}
          >
            <SupportIcon pathname={pathname} />

            <span
              className={`text-lg font-bold leading-5 ${pathname === "/support" ? "bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-transparent" : "group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent"}`}
            >
              Support Us
            </span>
          </Link>

          <Link
            href="/privacy-policy"
            className="group flex cursor-pointer items-center gap-[10px]"
            onClick={handleNavClick}
          >
            <span
              className={`text-lg font-bold leading-5 ${pathname === "/privacy-policy" ? "bg-gradient-to-r from-[#8338EC] to-[#CB38E7] bg-clip-text text-transparent" : "group-hover:bg-gradient-to-r group-hover:from-[#8338EC] group-hover:to-[#CB38E7] group-hover:bg-clip-text group-hover:text-transparent"}`}
            >
              Privacy Policy
            </span>
          </Link>
        </nav>
      </motion.div>
    </header>
  );
}
