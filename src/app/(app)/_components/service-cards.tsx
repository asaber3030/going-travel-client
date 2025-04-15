"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Map, Building2, Car } from "lucide-react";
import Link from "next/link";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  link: string;
};

export default function ServiceCards() {
  const services: Service[] = [
    {
      id: "tours",
      title: "Tour Packages",
      description: "Explore our curated tour packages designed to showcase the best destinations around the world.",
      icon: <Map className="h-8 w-8" />,
      image: "/service1.png",
      link: "/tours",
    },
    {
      id: "hotels",
      title: "Hotel Booking",
      description: "Discover comfortable accommodations worldwide, from luxury resorts to cozy boutique hotels.",
      icon: <Building2 className="h-8 w-8" />,
      image: "/service2.png",
      link: "/hotels",
    },
    {
      id: "limo",
      title: "Limousine Service",
      description: "Travel in style with our premium limousine services for airport transfers and special occasions.",
      icon: <Car className="h-8 w-8" />,
      image: "/service1.png",
      link: "/limousines",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {services.map((service) => (
        <motion.div
          key={service.id}
          variants={item}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          className="bg-white rounded-xl overflow-hidden shadow-lg group"
        >
          <Link href={service.link} className="block">
            <div className="h-48 bg-teal-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-teal-500/20 to-teal-600/60 z-10"></div>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>
              <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-full z-20">
                <div className="text-teal-600">{service.icon}</div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>

              <div className="flex items-center text-teal-600 font-medium">
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
