"use client"

import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { motion } from "framer-motion"

import { MapPin, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { UILocation } from "@/types/ui"

export default function ToursFeaturedDestinations({ locations }: { locations: UILocation[] }) {
  const t = useTranslations()

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className='pt-32 pb-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <Badge className='mb-2'>{t("toursPage.featuredDestinations.exploreTheWorld")}</Badge>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            {t("toursPage.featuredDestinations.featuredDestinations")}
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            {t("toursPage.featuredDestinations.description")}
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {locations.map((destination, index) => (
            <motion.div
              key={`destination-${destination.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='relative group rounded-xl overflow-hidden h-[300px]'
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'>
                <div className='absolute bottom-0 left-0 right-0 p-6'>
                  <div className='flex items-center text-white/90 mb-2'>
                    <MapPin className='h-4 w-4 mr-1' />
                    <span className='text-sm'>{destination.name}</span>
                  </div>

                  <div className='flex items-center justify-between'>
                    <h3 className='text-white text-xl font-bold mb-2'>{destination.name}</h3>
                    <Link
                      href={`/destinations/${destination.id}/tours`}
                      className='text-white flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      {t("toursPage.featuredDestinations.explore")}{" "}
                      <ArrowRight className='ml-1 h-4 w-4' />
                    </Link>
                  </div>
                </div>
              </div>

              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='absolute inset-0 border-4 border-white/30 rounded-xl pointer-events-none'
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
