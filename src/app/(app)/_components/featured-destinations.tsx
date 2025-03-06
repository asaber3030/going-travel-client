"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

export default function FeaturedDestinations() {
  const destinations = [
    {
      id: 1,
      name: "Sainai",
      location: "Egypt",
      image: "/Sainai.jpg?height=600&width=800",
      tours: 12,
    },
    {
      id: 2,
      name: "Hurghada",
      location: "Egypt",
      image: "/Hurghada.jpg?height=600&width=800",
      tours: 8,
    },
    {
      id: 3,
      name: "Luxor",
      location: "Egypt",
      image: "/Luxor.JPG?height=600&width=800",
      tours: 10,
    },
    {
      id: 4,
      name: "Aswan",
      location: "Egypt",
      image: "/Aswan.jpg?height=600&width=800",
      tours: 6,
    },
    {
      id: 5,
      name: "Cairo",
      location: "Egypt",
      image: "/Cairo.jpg?height=600&width=800",
      tours: 9,
    },
    {
      id: 6,
      name: "Alexandria",
      location: "Egypt",
      image: "/Alexandria.jpg?height=600&width=800",
      tours: 7,
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination, index) => (
        <motion.div
          key={destination.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative group rounded-xl overflow-hidden h-[300px]"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image
            src={destination.image || "/placeholder.svg"}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center text-white/90 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{destination.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl font-bold mb-2">
                  {destination.name}
                </h3>
                <Link
                  href={`#${destination.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-white flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {hoveredIndex === index && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 border-4 border-white/30 rounded-xl pointer-events-none"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
