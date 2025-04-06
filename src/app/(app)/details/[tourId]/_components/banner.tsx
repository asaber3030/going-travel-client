"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"

import { MapPin, Calendar, Clock, Users, Star } from "lucide-react"
import { UIFullTour } from "@/types/ui"
import { Badge } from "@/components/ui/badge"

export default function TourDetailsBanner({ tour }: { tour: UIFullTour }) {
  const t = useTranslations()

  return (
    <div className='relative h-[50vh] md:h-[60vh] lg:h-[70vh]'>
      <Image src={tour.banner} alt='Cairo, Egypt' fill className='object-cover' priority />
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'>
        <div className='container mx-auto px-4 h-full flex flex-col justify-end pb-8'>
          <Badge className='mb-4 w-fit bg-primary hover:bg-primary'>
            {tour.duration} {t("daysTour")}
          </Badge>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2'>
            {tour.title}
          </h1>
          <div className='flex items-center gap-2 text-white/90 mb-4'>
            <MapPin className='h-4 w-4' />
            <span>{tour.location.name}</span>
          </div>
          <div className='flex flex-wrap gap-4 text-white/90'>
            <div className='flex items-center gap-1'>
              <Calendar className='h-4 w-4' />
              <span>{tour.availability}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Clock className='h-4 w-4' />
              <span>
                {tour.duration} {t("days")}
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <Users className='h-4 w-4' />
              <span>
                {tour.max_people} {t("people")}
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
              <span>
                {tour.reviews_count} {t("reviews")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
