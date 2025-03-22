"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { AdminSidebarHeader } from "./header";
import { AdminSidebarContent } from "./content";
import { AdminSidebarFooter } from "./footer";

export default function AdminSidebar() {
  return (
    <Sidebar className='hidden md:flex'>
      <AdminSidebarHeader />
      <AdminSidebarContent />
      <AdminSidebarFooter />
    </Sidebar>
  );
}
