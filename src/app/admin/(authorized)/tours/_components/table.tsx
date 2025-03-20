"use client";

import Image from "next/image";

import { Tour } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { diffForHumans } from "@/lib/utils";
import { TourActions } from "./actions";

type Props = {
  tours: Tour[];
};

export const ToursTable = ({ tours }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Thumbnail</TableHead>
          <TableHead>Max People</TableHead>
          <TableHead>Price Start</TableHead>
          <TableHead>Has Offer</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tours.map((tour, index) => (
          <TableRow key={index}>
            <TableCell>{tour.id}</TableCell>
            <TableCell>{tour.title || "N/A"}</TableCell>
            <TableCell>{tour.duration} days</TableCell>
            <TableCell>{tour.availability}</TableCell>
            <TableCell className='capitalize'>{tour.type}</TableCell>
            <TableCell>
              <Image
                className='rounded-md object-cover'
                src={tour.thumbnail}
                alt={tour.title}
                width={50}
                height={50}
              />
            </TableCell>
            <TableCell>{tour.max_people}</TableCell>
            <TableCell>${tour.price_start}</TableCell>
            <TableCell>{tour.has_offer ? "Yes" : "No"}</TableCell>
            <TableCell>{diffForHumans(tour.created_at)}</TableCell>
            <TableCell>
              <TourActions isDeleted={!!tour.deleted_at} tourId={tour.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
