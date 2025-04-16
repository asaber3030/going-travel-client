"use client"

import Image from "next/image"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UITour } from "@/types/ui"
import { LinkBtn } from "@/components/common/button-link"

export default function RelatedTours({ relatedTours }: { relatedTours: UITour[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className='relative'>
      <div className='absolute -left-4 top-1/2 -translate-y-1/2 z-10'>
        <Button variant='outline' size='icon' className='rounded-full bg-background shadow-md' onClick={scrollLeft}>
          <ChevronLeft className='h-5 w-5' />
        </Button>
      </div>

      <div ref={scrollContainerRef} className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4' style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {relatedTours.map((tour) => (
          <motion.div key={tour.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className='min-w-[280px] max-w-[280px]'>
            <Card className='overflow-hidden h-full'>
              <div className='relative h-40'>
                <Badge className='absolute top-2 left-2 z-10'>{tour.duration}</Badge>
                <Image src={tour.thumbnail || "/placeholder.svg"} alt={tour.title} fill className='object-cover' />
              </div>
              <CardContent className='p-4'>
                <div className='flex items-center text-sm text-muted-foreground mb-2'>
                  <MapPin className='h-4 w-4 mr-1' />
                  {tour.location?.name || "Egypt"}
                </div>
                <h3 className='font-bold mb-2 line-clamp-2'>{tour.title}</h3>
                <div className='flex items-center gap-1 mb-2'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  <span className='text-sm'>{tour.reviews_count}</span>
                  <span className='text-sm text-muted-foreground'>
                    ({tour.reviews_count} {t("reviews")})
                  </span>
                </div>
              </CardContent>
              <CardFooter className='p-4 pt-0 flex items-center justify-between'>
                <div>
                  <p className='text-sm text-muted-foreground'>{t("from")}</p>
                  <p className='font-bold text-primary'>${tour.price_start}</p>
                </div>
                <LinkBtn href={`/details/${tour.id}`} size='sm' variant='outline'>
                  {t("viewTour")}
                </LinkBtn>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className='absolute -right-4 top-1/2 -translate-y-1/2 z-10'>
        <Button variant='outline' size='icon' className='rounded-full bg-background shadow-md' onClick={scrollRight}>
          <ChevronRight className='h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}
