import { User } from "@/types/index"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { CreateUserModal } from "./create"
import { UpdateUserModal } from "./update"

import { DeleteModal } from "../../_components/delete-modal"
import { RestoreModal } from "@/components/common/restore-modal"

import { diffForHumans } from "@/lib/utils"
import { deleteUser } from "../_helpers/actions"
import { EmptyTableState } from "@/components/common/empty-table"

type Props = {
  users: User[]
}

export const UsersTable = ({ users }: Props) => {
  if (users.length === 0) {
    return (
      <EmptyTableState>
        <CreateUserModal />
      </EmptyTableState>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={`user-row-${user.id}`}>
            <TableCell className='font-bold'>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{diffForHumans(user.created_at)}</TableCell>
            <TableCell className='flex gap-2'>
              <UpdateUserModal user={user} />
              <DeleteModal id={user.id} action={deleteUser} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
