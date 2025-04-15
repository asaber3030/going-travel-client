"use client";

import Image from "next/image";

import { Limousine } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { diffForHumans } from "@/lib/utils";
import { LimousinesActions } from "./actions";

type Props = {
  limousines: Limousine[];
};

export const LimousinesTable = ({ limousines }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Price Per Hour</TableHead>
          <TableHead>Max Passengers</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {limousines.map((limousine, index) => (
          <TableRow key={index}>
            <TableCell>{limousine.id}</TableCell>
            <TableCell>{limousine.translations ? limousine.translations[0].name : "N/A"}</TableCell>
            <TableCell>{limousine.type}</TableCell>

            <TableCell>{limousine.price_per_hour}</TableCell>
            <TableCell>{limousine.max_passengers}</TableCell>
            <TableCell>
              <Image className="rounded-md object-cover" src={"/placeholder.png"} alt={"Placeholder image"} width={50} height={50} />
            </TableCell>
            <TableCell>{diffForHumans(limousine.created_at)}</TableCell>
            <TableCell>
              <LimousinesActions isDeleted={!!limousine.deleted_at} limousineId={limousine.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
