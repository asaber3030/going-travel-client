"use client";

import TourismNavbar from "@/components/common/navbar";
import React from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/";

  return (
    <div>
      {showNavbar && <TourismNavbar />}
      {children}
    </div>
  );
}
