"use client";

import Link from "next/link";

import { Compass } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";

export const AdminSidebarHeader = () => {
  return (
    <SidebarHeader className='border-b border-border/40 p-4'>
      <Link href='/admin' className='flex items-center gap-2'>
        <div className='bg-goldish p-1 rounded-md'>
          <Compass className='h-6 w-6 text-white' />
        </div>
        <span className='font-bold text-lg'>Kaza Travel</span>
      </Link>
    </SidebarHeader>
  );
};
