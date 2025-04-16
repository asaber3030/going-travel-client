"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

const heroSlides = [
  {
    image: "/hotel.jpg",
    title: "Luxury Stays in Paradise",
    subtitle: "Discover our handpicked collection of premium hotels",
  },
  {
    image: "/hotel.jpg",
    title: "Urban Retreats",
    subtitle: "Find your perfect city escape",
  },
  {
    image: "/hotel.jpg",
    title: "Mountain Lodges",
    subtitle: "Wake up to breathtaking alpine views",
  },
];

export function HotelHeroSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative h-[60vh]">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority={index === 0} />
          <div className="absolute inset-0 bg-black/40">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
