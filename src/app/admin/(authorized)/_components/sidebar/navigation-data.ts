import { LayoutDashboard, Users, Globe, Compass } from "lucide-react";

export const navigation = [
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
      { name: "Add New Tour", href: "/admin/tours/create" },
      { name: "Categories", href: "/admin/categories" }
    ]
  },
  {
    name: "Locations",
    href: "/admin/locations",
    icon: Globe,
    current: (pathname: string) =>
      pathname === "/admin/locations" || pathname.startsWith("/admin/locations/")
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    current: (pathname: string) => pathname === "/admin/users"
  }
];
