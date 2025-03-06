"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Plane,
  Map,
  Building2,
  Car,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  hoverGradient: string;
  shape: string;
  features: string[];
};

export default function ServiceShapes() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const services: Service[] = [
    {
      id: "tours",
      title: "Tour Packages",
      description:
        "Explore our curated tour packages designed to showcase the best destinations around the world. From cultural experiences to adventure trips, we have something for everyone.",
      icon: <Map className="h-10 w-10" />,
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
      hoverGradient: "bg-gradient-to-br from-emerald-400 to-teal-500",
      shape: "rounded-tl-[60px] rounded-br-[60px]",
      features: [
        "Guided tours",
        "Cultural experiences",
        "Adventure packages",
        "Group discounts",
      ],
    },
    {
      id: "flights",
      title: "Airplane Booking",
      description:
        "Find the best flight deals with our comprehensive search engine. Compare prices, schedules, and amenities from hundreds of airlines to book your perfect flight.",
      icon: <Plane className="h-10 w-10" />,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
      hoverGradient: "bg-gradient-to-br from-blue-400 to-cyan-500",
      shape: "rounded-full",
      features: [
        "Price comparison",
        "Flexible dates",
        "Premium seats",
        "Loyalty rewards",
      ],
    },
    {
      id: "hotels",
      title: "Hotel Booking",
      description:
        "Discover comfortable accommodations worldwide, from luxury resorts to cozy boutique hotels. Read verified reviews and book with confidence.",
      icon: <Building2 className="h-10 w-10" />,
      gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
      hoverGradient: "bg-gradient-to-br from-amber-400 to-orange-500",
      shape: "rounded-tr-[60px] rounded-bl-[60px]",
      features: [
        "Luxury resorts",
        "Budget options",
        "Last-minute deals",
        "Extended stays",
      ],
    },
    {
      id: "limo",
      title: "Limousine Booking",
      description:
        "Travel in style with our premium limousine services. Perfect for airport transfers, special occasions, or exploring your destination with comfort and elegance.",
      icon: <Car className="h-10 w-10" />,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
      hoverGradient: "bg-gradient-to-br from-purple-400 to-pink-500",
      shape: "rounded-[40px]",
      features: [
        "Airport transfers",
        "Hourly rentals",
        "Special events",
        "Corporate services",
      ],
    },
  ];

  useEffect(() => {
    if (containerRef.current) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: "easeOut",
        },
      }));
    }
  }, [controls]);

  const handleServiceClick = (id: string) => {
    if (activeService === id) {
      setActiveService(null);
    } else {
      setActiveService(id);
      const index = services.findIndex((service) => service.id === id);
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % services.length;
    setCurrentIndex(nextIndex);
    setActiveService(services[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + services.length) % services.length;
    setCurrentIndex(prevIndex);
    setActiveService(services[prevIndex].id);
  };

  return (
    <div className="relative" ref={containerRef}>
      <AnimatePresence mode="wait">
        {activeService ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 md:p-8 max-w-3xl mx-auto mb-12 border border-white/20"
          >
            {services.map(
              (service) =>
                service.id === activeService && (
                  <div key={service.id}>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`${service.gradient} p-3 rounded-xl`}>
                          {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {service.title}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setActiveService(null)}
                        className="h-8 w-8 text-white hover:bg-white/20"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-white/90 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">
                        Features:
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 text-white/80"
                          >
                            <div
                              className={`h-2 w-2 rounded-full ${service.gradient}`}
                            ></div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        onClick={() => setActiveService(null)}
                        className="border-white/20 hover:bg-white/10"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => router.push(`/${service.id}`)}
                        className={service.gradient.replace("bg-", "")}
                      >
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            custom={i}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            className={`${service.gradient} ${service.shape} cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-6 md:p-8 aspect-square flex flex-col items-center justify-center text-white relative overflow-hidden group`}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleServiceClick(service.id)}
          >
            {/* Background animation */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 100%" }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                background: `linear-gradient(45deg, ${service.hoverGradient
                  .replace("bg-gradient-to-br from-", "")
                  .replace(" to-", ", ")})`,
                filter: "brightness(1.1)",
              }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {[...Array(10)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-2 h-2 rounded-full bg-white/30"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: "120%",
                    opacity: 0,
                  }}
                  animate={{
                    y: "-20%",
                    opacity: [0, 1, 0],
                    transition: {
                      duration: Math.random() * 2 + 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    },
                  }}
                />
              ))}
            </div>

            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ y: 0 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="mb-4 bg-white/20 p-4 rounded-full backdrop-blur-sm"
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 },
                }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-lg md:text-xl font-bold text-center">
                {service.title}
              </h3>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {activeService && (
        <motion.div
          className="flex justify-center mt-8 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="rounded-full border-white/20 text-white hover:bg-white/10 h-12 w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? "bg-white" : "bg-white/30"
                }`}
                whileHover={{ scale: 1.5 }}
                onClick={() => {
                  setCurrentIndex(index);
                  setActiveService(services[index].id);
                }}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="rounded-full border-white/20 text-white hover:bg-white/10 h-12 w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
