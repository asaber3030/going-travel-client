"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ToursHeroSlides() {
  const t = useTranslations("toursHeroSlides")
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      image: "/Hurghada.jpg?height=1080&width=1920",
      titleKey: "0.title",
      subtitleKey: "0.subtitle"
    },
    {
      image: "/Aswan.jpg?height=1080&width=1920",
      titleKey: "1.title",
      subtitleKey: "1.subtitle"
    },
    {
      image: "/Cairo.jpg?height=1080&width=1920",
      titleKey: "2.title",
      subtitleKey: "2.subtitle"
    },
    {
      image: "/HurghadaSea.jpg?height=1080&width=1920",
      titleKey: "3.title",
      subtitleKey: "3.subtitle"
    },
    {
      image: "/Cairo2.jpg?height=1080&width=1920",
      titleKey: "4.title",
      subtitleKey: "4.subtitle"
    },
    {
      image: "/Alexandria2.jpg?height=1080&width=1920",
      titleKey: "5.title",
      subtitleKey: "5.subtitle"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {heroSlides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
          <Image src={slide.image || "/placeholder.svg"} alt={t(slide.titleKey)} fill className='object-cover' priority={index === 0} />

          <div className='absolute inset-0 bg-black/40'>
            <div className='container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  y: index === currentSlide ? 0 : 30
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='max-w-3xl'
              >
                <h1 className='text-4xl md:text-6xl font-bold mb-4'>{t(slide.titleKey)}</h1>
                <p className='text-xl md:text-2xl mb-8'>{t(slide.subtitleKey)}</p>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
