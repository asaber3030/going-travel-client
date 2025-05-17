import { LayoutDashboard, Users, Globe, Compass, CarIcon, CogIcon, CheckCheck, Building, CuboidIcon, Plane, Users2 } from "lucide-react"

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
    current: (pathname: string) => pathname === "/admin/tours" || pathname.startsWith("/admin/tours/"),
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
    current: (pathname: string) => pathname === "/admin/locations" || pathname.startsWith("/admin/locations/")
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users2,
    current: (pathname: string) => pathname === "/admin/users" || pathname.startsWith("/admin/users/")
  },
  {
    name: "Limousines",
    href: "/admin/limousines",
    icon: CarIcon,
    current: (pathname: string) => pathname === "/admin/limousines" || pathname.startsWith("/admin/limousines/")
  },
  {
    name: "Hajs",
    href: "/admin/hajs",
    icon: Plane,
    current: (pathname: string) => pathname === "/admin/hajs" || pathname.startsWith("/admin/hajs")
  },
  {
    name: "Hotels",
    href: "/admin/hotels",
    icon: Building,
    current: (pathname: string) => pathname === "/admin/hotels" || pathname.startsWith("/admin/hotels")
  },
  {
    name: "Service Cards",
    href: "/admin/settings/service-cards",
    icon: CheckCheck,
    current: (pathname: string) => pathname === "/admin/settings/service-cards" || pathname.startsWith("/admin/settings/service-cards")
  }
]
