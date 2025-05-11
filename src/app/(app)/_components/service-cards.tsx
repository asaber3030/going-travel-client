"use client"

import Image from "next/image"

import Link from "next/link"
import type React from "react"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { UIServiceCard } from "@/types/ui"
import { MoveLeft, MoveRight } from "lucide-react"
import Cookies from "js-cookie"

type Props = {
  services: UIServiceCard[]
}

export default function ServiceCards({ services }: Props) {
  const t = useTranslations()
  const language = Cookies.get("language") || "en"
  console.log("Language from cookies:", language)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8' variants={container} initial='hidden' whileInView='show' viewport={{ once: true, margin: "-100px" }}>
      {services
        .filter((service) => service.enabled)
        .map((service) => (
          <motion.div key={service.id} variants={item} whileHover={{ y: -10, transition: { duration: 0.3 } }} className='bg-white rounded-xl overflow-hidden shadow-lg group'>
            <Link href={service.url} className='block'>
              <div className='h-48  relative overflow-hidden'>
                <div className='absolute inset-0 '></div>
                <Image alt='image' width={1000} height={1000} src={service.image} className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110' />
              </div>

              <div className='p-6'>
                <h3 className='text-2xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors'>{service.title}</h3>
                <p className='text-gray-600 mb-4'>{service.description}</p>

                <div className='flex items-center text-teal-600 font-medium'>
                  {t("services.explore")}
                  {language === "ar" ? <MoveLeft className='h-5 w-5 mr-2 group-hover:-translate-x-2 transition-transform' /> : <MoveRight className='h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform' />}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
    </motion.div>
  )
}
