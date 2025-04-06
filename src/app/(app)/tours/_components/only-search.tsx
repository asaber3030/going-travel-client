"use client"

import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchIcon } from "lucide-react"

export function SearchOnlyBox() {
  const t = useTranslations()
  const sp = useSearchParams()
  const router = useRouter()

  const [search, setSearch] = useState(sp.get("search") || "")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(sp.toString())
    params.set("search", search)
    router.push(`?${params.toString()}`)
  }

  return (
    <form className='w-full' onSubmit={handleSearch}>
      <div className='flex gap-4'>
        <Input value={search} onChange={handleSearchChange} placeholder='Where do you want to go?' />
        <div className='flex items-end'>
          <Button size='icon' icon={SearchIcon} />
        </div>
      </div>
    </form>
  )
}
