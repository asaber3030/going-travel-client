import { getHajs } from "./_helpers/actions"
import { HajsTable } from "./_components/table"
import { PaginationLinks } from "@/components/common/pagination"
import { LinkBtn } from "@/components/common/button-link"
import { PageTitle } from "@/components/common/page-title"

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>
}

export default async function HajsPage({ searchParams }: Props) {
  const params = await searchParams
  const Hajs = await getHajs(params.page ? parseInt(params.page) : 1)

  console.log({ Hajs })

  return (
    <main className='space-y-6 '>
      <PageTitle label='Hajs'>
        <LinkBtn href={`/admin/hajs/create`}>Create</LinkBtn>
      </PageTitle>
      <HajsTable data={Hajs} />
      <PaginationLinks pagination={Hajs} />
    </main>
  )
}
