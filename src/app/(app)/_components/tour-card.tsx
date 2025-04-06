"use client"

import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { MapPin, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UITour } from "@/types/ui"

export default function TourCard({ tour }: { tour: UITour }) {
  const t = useTranslations()

  return (
    <div key={tour.id} className='bg-white rounded-xl overflow-hidden shadow-lg'>
      <div className='relative h-[200px]'>
        {tour.has_offer && <Badge className='absolute top-3 left-3 z-10'>Featured</Badge>}
        <Image
          src={tour.thumbnail || "/placeholder.svg"}
          alt={tour.title}
          fill
          className='object-cover'
        />
      </div>
      <div className='p-5 '>
        <div className='flex items-center text-sm text-muted-foreground mb-2'>
          <MapPin className='h-4 w-4 mr-1' />
          {tour.location?.name ?? "Egypt"}
        </div>
        <h3 className='font-bold text-lg mb-2 line-clamp-2'>{tour.title}</h3>
        <div className='flex items-center gap-4 mb-3 text-sm'>
          <div className='flex items-center'>
            <Calendar className='h-4 w-4 mr-1 text-muted-foreground' />
            {tour.duration}
          </div>
          <div className='flex items-center'>
            <Star className='h-4 w-4 mr-1 fill-yellow-400 text-yellow-400' />
            <span>{tour.reviews_count}</span>
            <span className='text-muted-foreground ml-1'>({tour.reviews_count})</span>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-muted-foreground'>{t("from")}</p>
            <p className='text-xl font-bold text-primary'>${tour.price_start}</p>
          </div>
          <Link href={`/details/${tour.id}`}>
            <Button>{t("viewDetails")}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
