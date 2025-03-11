"use client";

import React from "react";

import AdminSidebar from "../../../components/common/admin-sidebar";
import MobileSidebar from "../../../components/common/mobile-admin-sidebar";
import AdminHeader from "../../../components/common/admin-header";

import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900">
        <AdminSidebar />
        <MobileSidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Navigation */}
          <AdminHeader />
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
