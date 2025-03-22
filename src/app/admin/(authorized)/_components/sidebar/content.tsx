"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { navigation } from "./navigation-data";

import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";

import { ChevronDown } from "lucide-react";

export const AdminSidebarContent = () => {
  const pathname = usePathname();

  return (
    <SidebarContent>
      {navigation.map((item) => (
        <SidebarGroup key={item.name}>
          {!item.children ? (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={item.current(pathname)}>
                  <Link href={item.href}>
                    <item.icon className='h-5 w-5' />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ) : (
            <div className='group/collapsible'>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={item.current(pathname)}
                    className='group-data-[state=open]/collapsible:bg-sidebar-accent group-data-[state=open]/collapsible:text-sidebar-accent-foreground'
                  >
                    <item.icon className='h-5 w-5' />
                    <span>{item.name}</span>
                    <ChevronDown className='ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180' />
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.children.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.name}>
                        <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                          <Link href={subItem.href}>{subItem.name}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          )}
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
};
