"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

import { UIHotel } from "@/types/ui"
import { ArrowLeft, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"

type Props = {
  hotel: UIHotel
}
export function HotelDetailsHeader({ hotel }: Props) {
  const t = useTranslations()

  return (
    <div className="relative h-[50vh] md:h-[60vh]">
      <Image src={hotel.banner || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white" asChild>
              <Link href="/hotels" className="flex gap-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                {t("hotelsPage.backToHotels")}
              </Link>
            </Button>
          </div>
          <Badge className="mb-2 bg-primary hover:bg-primary w-fit">
            {hotel.stars} {t("hotelsPage.starsHotel")}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{hotel.name}</h1>
          <div className="flex items-center gap-2 text-white/90 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{hotel.location.name}</span>
          </div>
          <div className="flex items-center gap-1 text-white/90">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < hotel.stars ? "fill-amber-500 text-amber-500" : "text-white/50"}`} />
              ))}
            </div>
            <span className="ml-1">
              {hotel.stars} {t("stars")}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"></div>
    </div>
  )
}
