"use client"

import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"
import { useRef } from "react"

import { motion } from "framer-motion"

import { ChevronLeft, ChevronRight, MapPin, Calendar, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UITour } from "@/types/ui"
import { useRouter } from "next/navigation"

export default function ToursPopularTours({ popularTours }: { popularTours: UITour[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  const router = useRouter()

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-2">{t("toursPage.popularTours.bestSellingTours")}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("toursPage.popularTours.popularTourPackages")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("toursPage.popularTours.exploreOurMost")}</p>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button variant="outline" size="icon" className="rounded-full bg-background shadow-md" onClick={scrollLeft}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {popularTours.map((tour) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-w-[300px] max-w-[300px] bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative h-[200px]">
                  {tour.has_offer && <Badge className="absolute top-3 left-3 z-10">Featured</Badge>}
                  <Image src={tour.thumbnail || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
                </div>
                <div className="p-5 ">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {tour.location?.name ?? "Egypt"}
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{tour.title}</h3>
                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      <span>{tour.reviews_count}</span>
                      <span className="text-muted-foreground ml-1">({tour.reviews_count})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("from")}</p>
                      <p className="text-xl font-bold text-primary">${tour.price_start}</p>
                    </div>
                    <Link href={`/details/${tour.id}`}>
                      <Button>{t("viewDetails")}</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <Button variant="outline" size="icon" className="rounded-full bg-background shadow-md" onClick={scrollRight}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => router.push("/tours/all")}>
            {t("viewAllTours")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
