"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"

import { motion, AnimatePresence } from "framer-motion"

import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UIReview } from "@/types/ui"

export default function ToursTestimonialSlider({ reviews }: { reviews: UIReview[] }) {
  const t = useTranslations()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  }

  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <Badge className='mb-2'>{t("toursPage.testimonials.title")}</Badge>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            {t("toursPage.testimonials.subtitle")}
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            {t("toursPage.testimonials.description")}
          </p>
        </div>

        <div className='relative max-w-4xl mx-auto'>
          <div className='absolute -left-4 top-1/2 -translate-y-1/2 z-10'>
            <Button
              variant='outline'
              size='icon'
              className='rounded-full bg-background shadow-md'
              onClick={prevTestimonial}
            >
              <ChevronLeft className='h-5 w-5' />
            </Button>
          </div>

          <div className='overflow-hidden py-12'>
            <AnimatePresence custom={direction} mode='wait'>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{ duration: 0.5 }}
                className='px-4'
              >
                <Card className='border-none shadow-xl'>
                  <CardContent className='p-8'>
                    <div className='flex flex-col md:flex-row gap-6 items-center md:items-start'>
                      <Image
                        src={"/placeholder.svg"}
                        alt={reviews?.[currentIndex].client_name}
                        width={80}
                        height={80}
                        className='rounded-full'
                      />
                      <div className='flex-1 text-center md:text-left'>
                        <div className='flex items-center justify-center md:justify-start mb-2'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < 5
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <p className='italic mb-6 text-lg'>
                          "{reviews?.[currentIndex].description}"
                        </p>
                        <div>
                          <h4 className='font-bold'>{reviews?.[currentIndex].client_name}</h4>

                          <p className='text-sm text-primary mt-1'>
                            {t("tour")}: {reviews?.[currentIndex].tour.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className='absolute -right-4 top-1/2 -translate-y-1/2 z-10'>
            <Button
              variant='outline'
              size='icon'
              className='rounded-full bg-background shadow-md'
              onClick={nextTestimonial}
            >
              <ChevronRight className='h-5 w-5' />
            </Button>
          </div>

          <div className='flex justify-center gap-2 mt-4'>
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
