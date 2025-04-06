"use client"

import { UILocation } from "@/types/ui"
import { useTranslations } from "next-intl"

export default function LocationIDHeader({ location }: { location: UILocation }) {
  const t = useTranslations()
  return (
    <header className='h-40 relative'>
      <img src={location.image} className='absolute w-full h-full -z-20 object-cover' />
      <div className='bg-black bg-opacity-60 absolute w-full h-full -z-10' />
      <div className='z-20 container mx-auto text-white text-center flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold pt-10'>
          {t("locationTours")} - <b>{location.name}</b>
        </h1>
      </div>
    </header>
  )
}
