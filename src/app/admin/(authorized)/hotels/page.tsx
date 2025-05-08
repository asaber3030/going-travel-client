import { getHotels } from "./_helpers/actions"
import { HotelsTable } from "./_components/table"
import { PaginationLinks } from "@/components/common/pagination"
import { LinkBtn } from "@/components/common/button-link"
import { PageTitle } from "@/components/common/page-title"

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>
}

export default async function HajsPage({ searchParams }: Props) {
  const params = await searchParams
  const hotels = await getHotels(params.page ? parseInt(params.page) : 1)

  return (
    <main className='space-y-6 '>
      <PageTitle label='Hotels'>
        <LinkBtn href={`/admin/hotels/create`}>Create</LinkBtn>
      </PageTitle>
      <HotelsTable data={hotels} />
      <PaginationLinks pagination={hotels} />
    </main>
  )
}
