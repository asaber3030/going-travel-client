"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

import { TabsContent } from "@/components/ui/tabs"
import { UIFullTour } from "@/types/ui"
import { Check, X } from "lucide-react"
import { NoDataLabel } from "@/components/common/no-data-label"

export default function TourDetailsOverviewTab({ tour }: { tour: UIFullTour }) {
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
    <TabsContent value='overview'>
      <motion.div initial='hidden' animate='visible' variants={fadeIn} className='space-y-8'>
        {/* Tour Description */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>{t("tourOverview")}</h2>
          <p className='text-muted-foreground mb-4'>{tour.description}</p>
        </section>

        {/* Tour Highlights */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>{t("tourHighlights")}</h2>
          {tour.highlights.length == 0 ? (
            <NoDataLabel />
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {tour.highlights.map((highlight, index) => (
                <div key={index} className='flex items-start gap-2'>
                  <div className='mt-1 bg-primary/10 rounded-full p-1'>
                    <Check className='h-4 w-4 text-primary' />
                  </div>
                  <p>{highlight.title}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Inclusions & Exclusions */}
        <section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h2 className='text-2xl font-bold mb-4'>{t("what'sIncluded")}</h2>
            {tour.inclusions_exclusions.filter((t) => t.type === "inclusion").length == 0 ? (
              <NoDataLabel />
            ) : (
              <ul className='space-y-2'>
                {tour.inclusions_exclusions
                  .filter((t) => t.type === "inclusion")
                  .map((item, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <Check className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                      <span>{item.title}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className='text-2xl font-bold mb-4'>{t("what'sNotIncluded")}</h2>

            {tour.inclusions_exclusions.filter((t) => t.type === "exclusion").length == 0 ? (
              <NoDataLabel />
            ) : (
              <ul className='space-y-2'>
                {tour.inclusions_exclusions
                  .filter((t) => t.type === "exclusion")
                  .map((item, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <X className='h-5 w-5 text-red-500 shrink-0 mt-0.5' />
                      <span>{item.title}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </section>

        {/* Essential Trip Information */}
        {/*         <section>
          <h2 className='text-2xl font-bold mb-4'>Essential Trip Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Card>
              <CardContent className='pt-6'>
                <h3 className='font-bold mb-2'>Best Time to Visit</h3>
                <p className='text-muted-foreground'>
                  The best time to visit Egypt and Giza is from October to April when the weather is
                  cooler and more comfortable for sightseeing. The summer months (May to September)
                  can be extremely hot.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='pt-6'>
                <h3 className='font-bold mb-2'>Physical Rating</h3>
                <p className='text-muted-foreground'>
                  Moderate - Some activities require a reasonable level of fitness. Hiking distances
                  range from 5-10km per day with moderate elevation gain.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='pt-6'>
                <h3 className='font-bold mb-2'>Accommodation</h3>
                <p className='text-muted-foreground'>
                  4-5 star hotels with modern amenities. All rooms have private bathrooms and air
                  conditioning.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='pt-6'>
                <h3 className='font-bold mb-2'>Transportation</h3>
                <p className='text-muted-foreground'>
                  Private air-conditioned minivan, comfortable coach rides, and occasional domestic
                  flights for longer distances.
                </p>
              </CardContent>
            </Card>
          </div>
        </section> */}

        {/* Read Before You Go */}
        {/*         <section>
          <h2 className='text-2xl font-bold mb-4'>Read Before You Go</h2>
          <Card>
            <CardContent className='pt-6 space-y-4'>
              <div>
                <h3 className='font-bold mb-1'>Packing Essentials</h3>
                <p className='text-muted-foreground'>
                  Comfortable walking shoes, lightweight clothing, sun hat, sunglasses, sunscreen,
                  reusable water bottle, travel adapter, and a camera. Detailed packing list will be
                  provided after booking.
                </p>
              </div>
              <div>
                <h3 className='font-bold mb-1'>Currency</h3>
                <p className='text-muted-foreground'>
                  The local currency is the Egyptian Pound (EGP). Credit cards are accepted in most
                  hotels and larger establishments, but it's advisable to carry some cash for small
                  purchases and tips.
                </p>
              </div>
              <div>
                <h3 className='font-bold mb-1'>Weather</h3>
                <p className='text-muted-foreground'>
                  Egypt has a desert climate with hot summers and mild winters. Be prepared for high
                  temperatures, especially from May to September. Always carry water and wear sun
                  protection.
                </p>
              </div>
              <div>
                <h3 className='font-bold mb-1'>Travel Insurance</h3>
                <p className='text-muted-foreground'>
                  Comprehensive travel insurance is strongly recommended, covering medical
                  emergencies, trip cancellation, and activities such as camel rides and excursions
                  to historical sites.
                </p>
              </div>
            </CardContent>
          </Card>
        </section> */}
      </motion.div>
    </TabsContent>
  )
}
