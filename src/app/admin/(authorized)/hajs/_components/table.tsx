"use client"

import { PaginatedData } from "@/types"
import { HajActions } from "./actions"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { diffForHumans } from "@/lib/utils"

type Props = {
  data: PaginatedData<any>
}

export const HajsTable = ({ data }: Props) => {
  if (data?.data?.length === 0) return "Empty"

  return (
    <div>
      <Table className='w-full h-full'>
        <TableHeader>
          <TableRow>
            <TableHead className='pl-8'>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((Haj) => (
            <TableRow key={Haj.id}>
              <TableCell className='font-medium pl-8'>{Haj.id}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={Haj?.banner || "/placeholder.svg"} />
                  <AvatarFallback>{Haj?.title?.[0] ?? "N/A"}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{Haj?.title || "N/A"}</TableCell>
              <TableCell>{diffForHumans(Haj?.created_at)}</TableCell>
              <TableCell>
                <HajActions data={Haj} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
