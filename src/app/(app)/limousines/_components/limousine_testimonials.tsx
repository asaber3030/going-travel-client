import React from "react"
import { useTranslations } from "next-intl"

import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Zurich, Switzerland",
    commentKey: "testimonials.0.comment",
    serviceKey: "testimonials.0.service"
  },
  {
    name: "Michael Chen",
    location: "Geneva, Switzerland",
    commentKey: "testimonials.1.comment",
    serviceKey: "testimonials.1.service"
  },
  {
    name: "Emma Wilson",
    location: "Lucerne, Switzerland",
    commentKey: "testimonials.2.comment",
    serviceKey: "testimonials.2.service"
  }
]

export function LimousineTestimonials() {
  const t = useTranslations()

  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <Badge className='mb-2'>{t("testimonials.badge")}</Badge>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>{t("testimonials.title")}</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>{t("testimonials.subtitle")}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='border-none shadow-md'>
              <CardContent className='p-6'>
                <div className='flex flex-col h-full'>
                  <div className='mb-4'>
                    <div className='flex items-center gap-1 mb-4'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className='h-4 w-4 fill-amber-500 text-amber-500' />
                      ))}
                    </div>
                    <p className='italic text-muted-foreground'>"{t(testimonial.commentKey)}"</p>
                  </div>
                  <div className='mt-auto pt-4 border-t'>
                    <p className='font-bold'>{testimonial.name}</p>
                    <p className='text-sm text-muted-foreground'>{testimonial.location}</p>
                    <Badge variant='outline' className='mt-2'>
                      {t(testimonial.serviceKey)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
