"use client";
import Image from "next/image";

import { PaginatedData, Location } from "@/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { LocationActions } from "./locations-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { diffForHumans } from "@/lib/utils";

type Props = {
  data: PaginatedData<Location>;
};

export const LocationsTable = ({ data }: Props) => {
  if (data?.data?.length === 0) return "Empty";

  return (
    <div>
      <Table className='w-full h-full'>
        <TableHeader>
          <TableRow>
            <TableHead className='pl-8'>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((location) => (
            <TableRow key={location.id}>
              <TableCell className='font-medium pl-8'>{location.id}</TableCell>
              <TableCell className='w-1/6'>
                <Avatar>
                  <AvatarImage src={location.image || "/placeholder.svg"} />
                  <AvatarFallback>{location.name[0] ?? "N/A"}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className='w-2/6'>{location.name || "N/A"}</TableCell>
              <TableCell className='w-1/6'>{diffForHumans(location.created_at)}</TableCell>
              <TableCell className='w-2/6'>
                <LocationActions data={location} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
