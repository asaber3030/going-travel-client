"use client"

import Link from "next/link"

import { usePathname } from "next/navigation"

import { routes } from "@/lib/route"
import { cn } from "@/lib/utils"

export const UpdateTabs = ({ limousineId }: { limousineId: number }) => {
  const pathname = usePathname()
  const isActive = (tab: string) => pathname.endsWith(tab)

  return (
    <div className='flex gap-2 mb-4'>
      <Link className={cn("p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium", pathname === `/admin/limousines/${limousineId}/update` && "bg-blue-500 text-white hover:bg-blue-500")} href={routes.limousines.changeDetails(limousineId, "")}>
        Details & Translations
      </Link>
      <Link className={cn("p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium", isActive("images") && "bg-blue-500 text-white hover:bg-blue-500")} href={routes.limousines.changeDetails(limousineId, "images")}>
        Images
      </Link>
      <Link className={cn("p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium", isActive("reviews") && "bg-blue-500 text-white hover:bg-blue-500")} href={routes.limousines.changeDetails(limousineId, "reviews")}>
        Reviews
      </Link>
      <Link className={cn("p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium", isActive("overviews") && "bg-blue-500 text-white hover:bg-blue-500")} href={routes.limousines.changeDetails(limousineId, "overviews")}>
        Overviews
      </Link>
      <Link className={cn("p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium", isActive("specifications") && "bg-blue-500 text-white hover:bg-blue-500")} href={routes.limousines.changeDetails(limousineId, "specifications")}>
        Specifications
      </Link>
      <Link className={cn("p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium", isActive("features") && "bg-blue-500 text-white hover:bg-blue-500")} href={routes.limousines.changeDetails(limousineId, "features")}>
        Features
      </Link>
      <Link className={cn("p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium", isActive("services") && "bg-blue-500 text-white hover:bg-blue-500")} href={routes.limousines.changeDetails(limousineId, "services")}>
        Services
      </Link>
    </div>
  )
}
