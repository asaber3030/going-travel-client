"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

import { TabsContent } from "@/components/ui/tabs"
import { UIFullTour } from "@/types/ui"

import TourGallery from "./tour-gallery"
import { NoDataLabel } from "@/components/common/no-data-label"

export default function TourGalleryTab({ tour }: { tour: UIFullTour }) {
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
    <TabsContent value='gallery'>
      <motion.div initial='hidden' animate='visible' variants={fadeIn}>
        <h2 className='text-2xl font-bold mb-6'>{t("tourGallery")}</h2>
        {tour.images.length == 0 ? <NoDataLabel /> : <TourGallery images={tour.images} />}
      </motion.div>
    </TabsContent>
  )
}
