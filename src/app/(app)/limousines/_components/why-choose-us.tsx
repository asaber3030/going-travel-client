"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"

import { whyChooseUs } from "./data"
import { motion } from "framer-motion"

import { ChevronRight, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ToursWhyChooseUs() {
  const t = useTranslations()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={fadeIn}
            className='relative h-[500px] rounded-xl overflow-hidden'
          >
            <Image
              src='/Cairo2.jpg?height=600&width=800'
              alt='Travel experience'
              fill
              className='object-cover'
            />

            <div className='absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg'>
              <div className='flex items-start gap-4'>
                <div className='bg-primary/10 rounded-full p-3'>
                  <Calendar className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-bold mb-1'>{t("toursPage.whyChooseUs.10YearsExperience")}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {t("toursPage.whyChooseUs.craftUnforgettable")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={fadeIn}
            className='space-y-6'
          >
            <Badge>{t("toursPage.whyChooseUs.aboutUs")}</Badge>
            <h2 className='text-3xl md:text-4xl font-bold'>
              {t("toursPage.whyChooseUs.craftUnforgettable")}
            </h2>
            <p className='text-muted-foreground'>{t("toursPage.whyChooseUs.description")}</p>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8'>
              {whyChooseUs.map((item, index) => (
                <Card key={index} className='border-none shadow-none bg-muted/50'>
                  <CardContent className='p-4'>
                    <h3 className='font-bold mb-2'>{item.title}</h3>
                    <p className='text-sm text-muted-foreground'>{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button>
              {t("toursPage.whyChooseUs.learnMoreAboutUs")}{" "}
              <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
