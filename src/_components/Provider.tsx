"use client";

import { useGetProfile } from "@/hooks/useGetProfile";

interface Children {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: Children) {
  useGetProfile(); // get and sets current user status

  return <>{children}</>;
}
