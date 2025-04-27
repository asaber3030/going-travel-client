"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "@/components/common/language-switcher"

export default function LandingHeroSection() {
  const t = useTranslations()
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return

      const { clientX, clientY } = e
      const { width, height } = parallaxRef.current.getBoundingClientRect()

      const x = (clientX / width - 0.5) * 20
      const y = (clientY / height - 0.5) * 20

      const elements = parallaxRef.current.querySelectorAll(".parallax-element")
      elements.forEach((el, index) => {
        const depth = index * 0.2 + 0.5
        const translateX = x * depth
        const translateY = y * depth
        ;(el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative bg-teal-600 overflow-hidden">
      <div className="absolute top-4 right-12 z-50">
        <LanguageSwitcher />
      </div>

      <div ref={parallaxRef} className="relative h-[350px] flex items-center justify-center">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-400/30 rounded-full blur-3xl parallax-element"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl parallax-element"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl parallax-element"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <img src="/logo.svg" alt="Logo" className="mx-auto mb-6 w-24 h-24" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{t("homePageLandingTitle")}</h1>
            <p className="text-xl text-teal-50 mb-8">{t("homePageLandingDescription")}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
