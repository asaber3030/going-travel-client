"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

export default function TourGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)

  // Sample gallery images
  const images = [
    { src: "/istockphoto-1405862444-612x612.jpg?height=800&width=1200", alt: "Swiss Alps mountain view" },
    { src: "/5_private-boat-trip-on-lake-lucerne-from-lucerne.jpg?height=800&width=1200", alt: "Lake Lucerne boat cruise" },
    { src: "/zermatt-matterhorn-best-view-1.jpg?height=800&width=1200", alt: "Zermatt village with Matterhorn" },
    { src: "/glacier_express.jpg?height=800&width=1200", alt: "Glacier Express train" },
    { src: "/hq720.jpg?height=800&width=1200", alt: "Traditional Swiss chalet" },
    { src: "/moonhoneytravel_Venediger-Stage-5-2-1024x683.jpg?height=800&width=1200", alt: "Alpine hiking trail" },
    { src: "/intro-1738015260.jpg?height=800&width=1200", alt: "Swiss chocolate and cheese" },
    { src: "/images2.jpg?height=800&width=1200", alt: "Montreux on Lake Geneva" },
    { src: "/istockphoto-507571728-612x612.jpg?height=800&width=1200", alt: "Chillon Castle" },
  ]

  const openViewer = (index: number) => {
    setCurrentIndex(index)
    setViewerOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeViewer = () => {
    setViewerOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg cursor-pointer ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
            onClick={() => openViewer(index)}
          >
            <div className="aspect-square w-full h-full">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Image Viewer */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={closeViewer}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={prevImage}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <div className="relative w-[80vw] h-[80vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <Image
                    src={images[currentIndex].src || "/placeholder.svg"}
                    alt={images[currentIndex].alt}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={nextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

