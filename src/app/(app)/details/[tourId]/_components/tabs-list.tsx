"use client"

import { useTranslations } from "next-intl"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TourTabsList() {
  const t = useTranslations()

  return (
    <TabsList className='w-full justify-start mb-6 overflow-x-auto'>
      <TabsTrigger value='overview'>{t("overview")}</TabsTrigger>
      <TabsTrigger value='itinerary'>{t("itineraries")}</TabsTrigger>
      <TabsTrigger value='gallery'>{t("gallery")}</TabsTrigger>
      <TabsTrigger value='reviews'>{t("reviews")}</TabsTrigger>
    </TabsList>
  )
}
