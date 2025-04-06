"use client"

import { useTranslations } from "next-intl"

import { UIFullTour } from "@/types/ui"
import { Button } from "@/components/ui/button"

export default function TourStickyBar({ tour }: { tour: UIFullTour }) {
  const t = useTranslations()

  return (
    <div className={`z-50 bg-white border-b shadow-sm transition-all duration-300`}>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <div>
          <h2 className='font-bold text-lg'>{tour.title}</h2>
          <p className='text-primary font-bold'>${tour.price_start}</p>
        </div>
        <div className='flex gap-2'>
          <Button size='sm'>{t("bookNow")}</Button>
        </div>
      </div>
    </div>
  )
}
