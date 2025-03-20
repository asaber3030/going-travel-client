import { routes } from "@/lib/route";
import Link from "next/link";

export const UpdateTabs = ({ tourId }: { tourId: number }) => {
  return (
    <div className='flex gap-2 mb-4'>
      <Link
        className='p-1 px-4 rounded-md bg-white shadow-xs border hover:bg-gray-50 text-sm font-medium'
        href={routes.tours.changeDetails(tourId, "")}
      >
        Details & Translations
      </Link>

      <Link
        className='p-1 px-4 rounded-md bg-white shadow-xs border hover:bg-gray-50 text-sm font-medium'
        href={routes.tours.changeDetails(tourId, "itineraries")}
      >
        Itineraries
      </Link>

      <Link
        className='p-1 px-4 rounded-md bg-white shadow-xs border hover:bg-gray-50 text-sm font-medium'
        href={routes.tours.changeDetails(tourId, "highlights")}
      >
        Highlights
      </Link>
      <Link
        className='p-1 px-4 rounded-md bg-white shadow-xs border hover:bg-gray-50 text-sm font-medium'
        href={routes.tours.changeDetails(tourId, "reviews")}
      >
        Reviews
      </Link>
      <Link
        className='p-1 px-4 rounded-md bg-white shadow-xs border hover:bg-gray-50 text-sm font-medium'
        href={routes.tours.changeDetails(tourId, "inclusions-exclusions")}
      >
        Inclusions & Exclusions
      </Link>
      <Link
        className='p-1 px-4 rounded-md bg-white shadow-xs border hover:bg-gray-50 text-sm font-medium'
        href={routes.tours.changeDetails(tourId, "images")}
      >
        Images
      </Link>
    </div>
  );
};
