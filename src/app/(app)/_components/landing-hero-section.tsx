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
    <div className='relative bg-goldish h-20 px-16  overflow-hidden flex justify-between items-center'>
      <img src='/white-logo.png' alt='Logo' className='w-16 h-26' />
      <LanguageSwitcher />
    </div>
  )
}
