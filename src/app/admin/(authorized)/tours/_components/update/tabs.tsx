"use client";

import { routes } from "@/lib/route";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const UpdateTabs = ({ tourId }: { tourId: number }) => {
  const pathname = usePathname();
  const isActive = (tab: string) => pathname.endsWith(tab);
  console.log({ pathname });

  return (
    <div className='flex gap-2 mb-4'>
      <Link
        className={cn(
          "p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium",
          pathname === `/admin/tours/${tourId}/update` && "bg-blue-500 text-white hover:bg-blue-500"
        )}
        href={routes.tours.changeDetails(tourId, "")}
      >
        Details & Translations
      </Link>

      <Link
        className={cn(
          "p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium",
          isActive("itineraries") && "bg-blue-500 text-white hover:bg-blue-500"
        )}
        href={routes.tours.changeDetails(tourId, "itineraries")}
      >
        Itineraries
      </Link>

      <Link
        className={cn(
          "p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium",
          isActive("highlights") && "bg-blue-500 text-white hover:bg-blue-500"
        )}
        href={routes.tours.changeDetails(tourId, "highlights")}
      >
        Highlights
      </Link>
      <Link
        className={cn(
          "p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium",
          isActive("reviews") && "bg-blue-500 text-white hover:bg-blue-500"
        )}
        href={routes.tours.changeDetails(tourId, "reviews")}
      >
        Reviews
      </Link>
      <Link
        className={cn(
          "p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium",
          isActive("exclusions") && "bg-blue-500 text-white hover:bg-blue-500"
        )}
        href={routes.tours.changeDetails(tourId, "exclusions")}
      >
        Inclusions & Exclusions
      </Link>
      <Link
        className={cn(
          "p-1 px-4 rounded-md bg-white shadow-md hover:bg-gray-50 text-sm font-medium",
          isActive("images") && "bg-blue-500 text-white hover:bg-blue-500"
        )}
        href={routes.tours.changeDetails(tourId, "images")}
      >
        Images
      </Link>
    </div>
  );
};
