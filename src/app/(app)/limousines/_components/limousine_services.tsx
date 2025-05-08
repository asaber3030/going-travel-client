import React from "react"

import { Badge, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"

const services = [
  {
    title: "limousineServicesHero01",
    description: "limousineServicesHero01Description",
    icon: Plane,
    features: ["Flight monitoring", "Meet & greet service", "Luggage assistance", "No hidden fees"]
  },
  {
    title: "limousineServicesHero02",
    description: "limousineServicesHero02Description",
    icon: Clock,
    features: ["Flexible duration", "Multiple stops", "Professional chauffeurs", "Luxury vehicles"]
  },
  {
    title: "limousineServicesHero03",
    description: "limousineServicesHero03Description",
    icon: Gift,
    features: ["Decorated vehicles", "Red carpet service", "Complimentary champagne", "Professional attire"]
  }
]

export function LimousineServices() {
  const t = useTranslations()
  return (
    <section className='bg-muted/30 py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <Badge className='mb-2'>{t("ourServices")}</Badge>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>{t("Premium Transportation Services")}</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>{t("Discover our range of luxury transportation options for every occasion")}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <Card key={index} className='border-none shadow-md'>
              <CardContent className='p-6'>
                <div className='flex flex-col items-center text-center'>
                  <div className='bg-primary/10 p-4 rounded-full mb-4'>
                    <service.icon className='h-8 w-8 text-primary' />
                  </div>
                  <h3 className='text-xl font-bold mb-2'>{t(service.title)}</h3>
                  <p className='text-muted-foreground mb-4'>{t(service.description)}</p>
                  <ul className='space-y-2 text-left w-full'>
                    {service.features.map((feature, i) => (
                      <li key={i} className='flex items-start gap-2'>
                        <Check className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Plane(props: any) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <path d='M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z' />
    </svg>
  )
}

function Gift(props: any) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <rect x='3' y='8' width='18' height='4' rx='1' />
      <path d='M12 8v13' />
      <path d='M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7' />
      <path d='M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5' />
    </svg>
  )
}

function Check(props: any) {
  return (
    <svg {...props} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <polyline points='20 6 9 17 4 12' />
    </svg>
  )
}
