"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function ToursParallaxBanner() {
  const t = useTranslations()

  return (
    <section
      className='relative h-[400px] bg-fixed bg-center bg-cover'
      style={{
        backgroundImage: "url('/Hurghada.jpg?height=1080&width=1920')"
      }}
    >
      <div className='absolute inset-0 bg-black/60'>
        <div className='container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>{t("toursPage.parallexBanner.subtitle")}</h2>
          <p className='text-xl mb-8 max-w-2xl'>{t("toursPage.parallexBanner.title")}</p>
          <Button size='lg' variant='outline' className='text-black border-white hover:bg-white hover:text-black'>
            {t("toursPage.parallexBanner.button")}
          </Button>
        </div>
      </div>
    </section>
  )
}
