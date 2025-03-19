import React from "react";
import { Category, PaginatedData } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  data: PaginatedData<Category>;
  paginationBase: string;
};

export const CategoryPagination = ({ data, paginationBase }: Props) => {
  const { current_page, last_page, prev_page_url, next_page_url } = data;

  const renderPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          href={`${paginationBase}?page=1`}
          isActive={current_page === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Calculate middle pages
    let startPage = Math.max(2, current_page - 1);
    let endPage = Math.min(last_page - 1, current_page + 1);

    // Adjust if near start or end
    if (current_page <= 2) {
      endPage = Math.min(4, last_page - 1);
    }
    if (current_page >= last_page - 1) {
      startPage = Math.max(2, last_page - 2);
    }

    // Add ellipsis if there's a gap after first page
    if (startPage > 2) {
      pages.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`${paginationBase}?page=${i}`}
            isActive={current_page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis if there's a gap before last page
    if (endPage < last_page - 1) {
      pages.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if more than 1 page
    if (last_page > 1) {
      pages.push(
        <PaginationItem key={last_page}>
          <PaginationLink
            href={`${paginationBase}?page=${last_page}`}
            isActive={current_page === last_page}
          >
            {last_page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={prev_page_url || "#"}
            aria-disabled={!prev_page_url}
          />
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <PaginationNext
            href={next_page_url || "#"}
            aria-disabled={!next_page_url}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
