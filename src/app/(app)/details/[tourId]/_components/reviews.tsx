"use client"

import TourReviews from "./tour-reviews"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

import { TabsContent } from "@/components/ui/tabs"
import { UIFullTour } from "@/types/ui"
import { NoDataLabel } from "@/components/common/no-data-label"

export default function TourReviewsTab({ tour }: { tour: UIFullTour }) {
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
    <TabsContent value='reviews'>
      <motion.div initial='hidden' animate='visible' variants={fadeIn}>
        <h2 className='text-2xl font-bold mb-6'>{t("tourReviews")}</h2>
        {tour.reviews.length == 0 ? <NoDataLabel /> : <TourReviews reviews={tour.reviews} />}
      </motion.div>
    </TabsContent>
  )
}
