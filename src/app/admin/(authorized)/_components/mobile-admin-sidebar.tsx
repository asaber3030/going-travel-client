"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  ImageIcon,
  MessageSquare,
  Users,
  Settings,
  ChevronDown,
  X,
  Globe,
  Compass,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    current: (pathname: string) => pathname === "/admin"
  },
  {
    name: "Tours",
    href: "/admin/tours",
    icon: Compass,
    current: (pathname: string) =>
      pathname === "/admin/tours" || pathname.startsWith("/admin/tours/"),
    children: [
      { name: "All Tours", href: "/admin/tours" },
      { name: "Add New Tour", href: "/admin/tours/new" },
      { name: "Categories", href: "/admin/tours/categories" }
    ]
  },
  {
    name: "Destinations",
    href: "/admin/destinations",
    icon: Globe,
    current: (pathname: string) =>
      pathname === "/admin/destinations" || pathname.startsWith("/admin/destinations/")
  },
  {
    name: "Galleries",
    href: "/admin/galleries",
    icon: ImageIcon,
    current: (pathname: string) => pathname === "/admin/galleries"
  },
  {
    name: "Maps",
    href: "/admin/maps",
    icon: Map,
    current: (pathname: string) => pathname === "/admin/maps"
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquare,
    current: (pathname: string) => pathname === "/admin/reviews"
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: Star,
    current: (pathname: string) => pathname === "/admin/testimonials"
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    current: (pathname: string) => pathname === "/admin/users"
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    current: (pathname: string) => pathname === "/admin/settings"
  }
];

export default function MobileSidebar() {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 md:hidden ${
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className='fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white dark:bg-gray-800 shadow-lg transform transition ease-in-out duration-300'>
        <div className='flex items-center justify-between p-4 border-b'>
          <Link href='/admin' className='flex items-center gap-2'>
            <div className='bg-primary p-1 rounded-md'>
              <Compass className='h-6 w-6 text-white' />
            </div>
            <span className='font-bold text-lg'>Alpine Admin</span>
          </Link>
          <Button variant='ghost' size='icon' onClick={() => setIsMobileMenuOpen(false)}>
            <X className='h-6 w-6' />
          </Button>
        </div>
        <div className='p-4 overflow-y-auto h-[calc(100vh-64px)]'>
          <nav className='space-y-1'>
            {navigation.map((item) => (
              <div key={item.name}>
                {!item.children ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                      item.current(pathname)
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className='h-5 w-5' />
                    {item.name}
                  </Link>
                ) : (
                  <div className='space-y-1'>
                    <button
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium ${
                        item.current(pathname)
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className='flex items-center gap-3'>
                        <item.icon className='h-5 w-5' />
                        {item.name}
                      </div>
                      <ChevronDown className='h-4 w-4' />
                    </button>
                    <div className='pl-10 space-y-1'>
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-3 py-2 rounded-md text-sm font-medium ${
                            pathname === subItem.href
                              ? "bg-primary/10 text-primary"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
