"use client"

import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"

import { TabsContent } from "@/components/ui/tabs"
import { UIFullTour } from "@/types/ui"
import { NoDataLabel } from "@/components/common/no-data-label"

export default function TourItineraryTab({ tour }: { tour: UIFullTour }) {
  const t = useTranslations()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }
  const locale = useLocale()

  return (
    <TabsContent value="itinerary">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">{t("tourItineraries")}</h2>
        {tour.itineraries.length == 0 ? (
          <NoDataLabel />
        ) : (
          <section>
            {tour.itineraries.map((day, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l border-muted last:border-0 last:pb-0">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {day.day_number}: {day.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">{day.description}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </motion.div>
    </TabsContent>
  )
}
