"use client"

import { useTranslations } from "next-intl"

import Image from "next/image"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function ToursHeroSlides() {
  const t = useTranslations()

  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      image: "/Hurghada.jpg?height=1080&width=1920",
      title: "Discover Hurghada",
      subtitle: "Dive into the crystal-clear waters of the Red Sea",
    },
    {
      image: "/Aswan.jpg?height=1080&width=1920",
      title: "Explore Aswan's Timeless Beauty",
      subtitle: "Journey through ancient history and vibrant culture",
    },
    {
      image: "/Cairo.jpg?height=1080&width=1920",
      title: "Cairo's Mystical Adventures",
      subtitle: "Uncover the secrets of the pyramids and bustling bazaars",
    },
    {
      image: "/HurghadaSea.jpg?height=1080&width=1920",
      title: "Hurghada's Serene Escapes",
      subtitle: "Sail across the serene waters of the Red Sea",
    },
    {
      image: "/Cairo2.jpg?height=1080&width=1920",
      title: "Pharaonic Village Time Travel",
      subtitle: "Step back in time to the era of the Pharaohs",
    },
    {
      image: "/Alexandria2.jpg?height=1080&width=1920",
      title: "Alexandria's Legendary Legacy",
      subtitle: "Explore the legendary city of Alexander the Great",
    },
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
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority={index === 0} />

          <div className="absolute inset-0 bg-black/40">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  y: index === currentSlide ? 0 : 30,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
