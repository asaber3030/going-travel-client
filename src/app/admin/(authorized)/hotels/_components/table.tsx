"use client"

import { PaginatedData } from "@/types"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { diffForHumans } from "@/lib/utils"

type Props = {
  data: PaginatedData<any>
}

export const HotelsTable = ({ data }: Props) => {
  if (data?.data?.length === 0) return "Empty"

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
          {data?.data?.map((hotel) => (
            <TableRow key={hotel.id}>
              <TableCell className='font-medium pl-8'>{hotel.id}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={hotel?.banner || "/placeholder.svg"} />
                  <AvatarFallback>{hotel?.name?.[0] ?? "N/A"}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{hotel?.name || "N/A"}</TableCell>
              <TableCell>{diffForHumans(hotel?.created_at)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
