import { PaginationLinks } from "@/components/common/pagination"
import { LimousinesTable } from "./_components/table"
import { PageTitle } from "@/components/common/page-title"
import { LinkBtn } from "@/components/common/button-link"
import { Plus } from "lucide-react"

import { getLimousines } from "./_helpers/actions"
import { routes } from "@/lib/route"

type Props = {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function LimousinesPage({ searchParams }: Props) {
  const { page } = await searchParams
  const limousines = await getLimousines(Number(page))

  return (
    <div>
      <PageTitle label='Tours'>
        <LinkBtn href={routes.limousines.create} variant='outline' icon={Plus}>
          Create
        </LinkBtn>
      </PageTitle>

      <LimousinesTable limousines={limousines.data.data} />
      <PaginationLinks pagination={limousines.data} />
    </div>
  )
}
