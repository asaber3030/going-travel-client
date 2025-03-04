import TourismNavbar from "@/components/common/navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TourismNavbar />
      {children}
    </div>
  );
}
