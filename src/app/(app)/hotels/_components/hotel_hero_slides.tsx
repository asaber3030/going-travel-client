"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const heroSlides = [
  {
    image: "/hotel.jpg",
    title: "hotelsHero01",
    subtitle: "hotelsHero01Description"
  },
  {
    image: "/hotel.jpg",
    title: "hotelsHero02",
    subtitle: "hotelsHero02Description"
  },
  {
    image: "/hotel.jpg",
    title: "hotelsHero03",
    subtitle: "hotelsHero03Description"
  }
]

export function HotelHeroSlides() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const t = useTranslations()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  return (
    <section className='relative h-[60vh]'>
      {heroSlides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
          <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className='object-cover' priority={index === 0} />
          <div className='absolute inset-0 bg-black/40'>
            <div className='container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white'>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 30 }} transition={{ duration: 0.8, delay: 0.2 }} className='max-w-3xl'>
                <h1 className='text-4xl md:text-6xl font-bold mb-4'>{t(slide.title)}</h1>
                <p className='text-xl md:text-2xl mb-8'>{t(slide.subtitle)}</p>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
