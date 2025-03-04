"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "United States",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Our Swiss Alps Adventure was the trip of a lifetime! The itinerary was perfectly balanced between outdoor activities and cultural experiences. Our guide was incredibly knowledgeable and made the experience truly special. The views were breathtaking and the accommodations were excellent.",
      tour: "Swiss Alps Adventure Tour",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Canada",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      text: "The Italian Lakes & Alpine Adventure was a wonderful experience. The scenery was spectacular and the tour was well-organized. I especially enjoyed the boat cruise on Lake Como and the visit to the charming villages. The only reason for 4 stars instead of 5 is that one activity was canceled due to weather.",
      tour: "Italian Lakes & Alpine Adventure",
    },
    {
      id: 3,
      name: "Emma Wilson",
      location: "Australia",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "We took the Mont Blanc Trekking Experience as a family with two teenagers and it was perfect for all of us. There was enough adventure to keep the kids engaged and enough culture and relaxation for the adults. The guide was patient and accommodating, and the small group size meant we got personalized attention.",
      tour: "Mont Blanc Trekking Experience",
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, []) // Removed nextTestimonial from dependencies

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background shadow-md"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="overflow-hidden py-12">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="px-4"
          >
            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <Image
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <p className="italic mb-6 text-lg">"{testimonials[currentIndex].text}"</p>
                    <div>
                      <h4 className="font-bold">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex].location}</p>
                      <p className="text-sm text-primary mt-1">Tour: {testimonials[currentIndex].tour}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background shadow-md"
          onClick={nextTestimonial}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}

