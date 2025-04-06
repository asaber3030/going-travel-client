"use client"

import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ToursSearchBox() {
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
    <div className='absolute bottom-0 left-0 right-0 translate-y-1/2 z-10'>
      <div className='container mx-auto px-4'>
        <form className='bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto' onSubmit={handleSearch}>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>{t("destination")}</label>
              <Input value={search} onChange={handleSearchChange} placeholder='Where do you want to go?' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>{t("search")}</label>
              <Input type='date' />
            </div>
            <div className='flex items-end'>
              <Button className='w-full'>Search</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
