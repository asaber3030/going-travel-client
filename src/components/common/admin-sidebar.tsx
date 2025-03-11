import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  ImageIcon,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Globe,
  Compass,
  Star,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    current: (pathname: string) => pathname === "/admin",
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
      { name: "Categories", href: "/admin/tours/categories" },
    ],
  },
  {
    name: "Destinations",
    href: "/admin/destinations",
    icon: Globe,
    current: (pathname: string) =>
      pathname === "/admin/destinations" ||
      pathname.startsWith("/admin/destinations/"),
  },
  {
    name: "Galleries",
    href: "/admin/galleries",
    icon: ImageIcon,
    current: (pathname: string) => pathname === "/admin/galleries",
  },
  {
    name: "Maps",
    href: "/admin/maps",
    icon: Map,
    current: (pathname: string) => pathname === "/admin/maps",
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquare,
    current: (pathname: string) => pathname === "/admin/reviews",
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: Star,
    current: (pathname: string) => pathname === "/admin/testimonials",
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    current: (pathname: string) => pathname === "/admin/users",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    current: (pathname: string) => pathname === "/admin/settings",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="hidden md:flex">
      <SidebarHeader className="border-b border-border/40 p-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="bg-primary p-1 rounded-md">
            <Compass className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-lg">Alpine Admin</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((item) => (
          <SidebarGroup key={item.name}>
            {!item.children ? (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={item.current(pathname)}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ) : (
              <div className="group/collapsible">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={item.current(pathname)}
                      className="group-data-[state=open]/collapsible:bg-sidebar-accent group-data-[state=open]/collapsible:text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {item.children.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.name}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.href}
                          >
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

      <SidebarFooter className="border-t border-border/40 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Admin User"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full p-2">
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
