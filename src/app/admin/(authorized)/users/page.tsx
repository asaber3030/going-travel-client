import { TSearchParams } from "@/types"
import { Metadata } from "next"
import { UsersTable } from "./_components/table"
import { CreateUserModal } from "./_components/create"

import { LinkBtn } from "@/components/common/button-link"
import { ArchiveIcon } from "lucide-react"
import { getUsers } from "./_helpers/actions"
import { routes } from "@/lib/route"
import { PageTitle } from "@/components/common/page-title"
import { PaginationLinks } from "@/components/common/pagination"
import { SearchFilter } from "@/components/common/search"

export const metadata: Metadata = {
  title: "Users"
}

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function UsersPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getUsers(sp)

  return (
    <div>
      <PageTitle label='Users'>
        <CreateUserModal />
      </PageTitle>
      <section>
        <SearchFilter />
      </section>
      <section className='mt-4'>
        <UsersTable users={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
