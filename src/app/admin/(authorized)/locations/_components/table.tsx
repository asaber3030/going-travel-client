"use client";
import Image from "next/image";

import { PaginatedData, Location } from "@/types";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { LocationActions } from "./locations-actions";

type Props = {
  data: PaginatedData<Location>;
};

export const LocationsTable = ({ data }: Props) => {
  if (data?.data?.length === 0) return "Empty";

  return (
    <div>
      <Table className="w-full h-full">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {/* <TableHead className="pl-8">ID</TableHead> */}
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>

            <TableHead>Created At</TableHead>

            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((location) => (
            <TableRow key={location.id}>
              {/* <TableCell className="font-medium pl-8">{location.id}</TableCell> */}
              <TableCell className="w-1/6">
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={location.name || "location Image"}
                  width={150}
                  height={150}
                />
              </TableCell>
              <TableCell className="w-2/6">{location.name || "N/A"}</TableCell>

              <TableCell className="w-1/6">
                {location.created_at
                  ? new Date(location.created_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")
                  : "N/A"}
              </TableCell>

              <TableCell className="w-2/6">
                <div className="flex justify-center items-center space-x-4">
                  {!location.deleted_at && (
                    <Link
                      href={`/admin/categories/${location.id}`}
                      className="text-primary p-0 m-0 hover:underline"
                    >
                      View
                    </Link>
                  )}
                  {/* <LocationActions data={location} /> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
