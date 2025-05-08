"use client"

import { useLocale, useTranslations } from "next-intl"
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
      transition: { duration: 0.6 },
    },
  }

  const locale = useLocale()

  return (
    <TabsContent value="overview" dir={locale === "ar" ? "rtl" : "ltr"}>
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-8">
        {/* Tour Description */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{t("tourOverview")}</h2>
          <p className="text-muted-foreground mb-4">{tour.description}</p>
          <h2 className="text-2xl font-bold mb-4">{t("distanceDescription")}</h2>
          <p className="text-muted-foreground mb-4">{tour.distance_description}</p>
        </section>

        {/* Tour Highlights */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{t("tourHighlights")}</h2>
          {tour.highlights.length === 0 ? (
            <NoDataLabel />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tour.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <p>{highlight.title}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Inclusions & Exclusions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("what'sIncluded")}</h2>
            {tour.inclusions_exclusions.filter((t) => t.type === "inclusion").length === 0 ? (
              <NoDataLabel />
            ) : (
              <ul className="space-y-2">
                {tour.inclusions_exclusions
                  .filter((t) => t.type === "inclusion")
                  .map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item.title}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("what'sNotIncluded")}</h2>
            {tour.inclusions_exclusions.filter((t) => t.type === "exclusion").length === 0 ? (
              <NoDataLabel />
            ) : (
              <ul className="space-y-2">
                {tour.inclusions_exclusions
                  .filter((t) => t.type === "exclusion")
                  .map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      <span>{item.title}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </section>
      </motion.div>
    </TabsContent>
  )
}
