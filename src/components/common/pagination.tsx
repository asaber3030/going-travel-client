import { PaginatedData } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  pagination: PaginatedData<any>;
};

export const PaginationLinks = ({ pagination }: Props) => {
  const links = pagination.links.slice(1, pagination.links.length - 1);
  const currentPage = Number(pagination.current_page) || 1;

  return (
    <div className='mx-auto w-fit flex space-x-2 mt-4'>
      {pagination.prev_page_url && (
        <Link
          href={`?page=${currentPage - 1}`}
          className={cn(
            "px-4 py-2 border rounded-md text-sm font-medium bg-white",
            "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <ArrowLeft size={16} className='inline-block mr-1' />
          Previous
        </Link>
      )}

      {links.map((link, index) => (
        <Link
          key={index}
          href={`?page=${link.label}`}
          className={cn(
            "px-4 py-2 border rounded-md text-sm font-medium bg-white",
            link.active && "bg-gray-100 dark:bg-gray-800"
          )}
        >
          {link.label}
        </Link>
      ))}

      {pagination.next_page_url && (
        <Link
          href={`?page=${currentPage + 1}`}
          className={cn(
            "px-4 py-2 border rounded-md text-sm font-medium bg-white",
            "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          Next
          <ArrowRight size={16} className='inline-block ml-1' />
        </Link>
      )}
    </div>
  );
};
