"use client"

import { UICategory } from "@/types/ui"
import { useTranslations } from "next-intl"

export default function CategoryIDHeader({ category }: { category: UICategory }) {
  const t = useTranslations()
  return (
    <header className='h-40 relative'>
      <img src={category.image} className='absolute w-full h-full -z-20 object-cover' />
      <div className='bg-black bg-opacity-60 absolute w-full h-full -z-10' />
      <div className='z-20 container mx-auto text-white text-center flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold pt-10'>
          {t("categories")} - <b>{category.name}</b>
        </h1>
      </div>
    </header>
  )
}
