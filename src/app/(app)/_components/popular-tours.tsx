"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PopularTours() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const tours = [
    {
      id: 1,
      title: "Pyramids of Giza Adventure Tour",
      location: "Egypt",
      duration: "5 Days",
      price: 999,
      rating: 4.8,
      reviews: 124,
      image: "/Cairo2.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Nile River Cruise & Luxor Tour",
      location: "Egypt",
      duration: "7 Days",
      price: 1299,
      rating: 4.7,
      reviews: 86,
      image: "/Luxor.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "Cairo & Alexandria Historical Tour",
      location: "Egypt",
      duration: "6 Days",
      price: 1199,
      rating: 4.9,
      reviews: 112,
      image: "/Alexandria2.jpg",
      featured: false,
    },
    {
      id: 4,
      title: "Red Sea Diving & Snorkeling Tour",
      location: "Egypt",
      duration: "8 Days",
      price: 1399,
      rating: 4.8,
      reviews: 74,
      image: "/Hurghada.jpg",
      featured: false,
    },
    {
      id: 5,
      title: "Desert Safari & Bedouin Experience Tour",
      location: "Egypt",
      duration: "4 Days",
      price: 899,
      rating: 4.6,
      reviews: 58,
      image: "/Safari.jpg",
      featured: false,
    },
    {
      id: 6,
      title: "Aswan & Abu Simbel Temples Tour",
      location: "Egypt",
      duration: "5 Days",
      price: 1099,
      rating: 4.9,
      reviews: 92,
      image: "/Aswan.jpg",
      featured: true,
    },
  ];

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background shadow-md"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide -mx-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {tours.map((tour) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-w-[300px] max-w-[300px] bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <div className="relative h-[200px]">
              {tour.featured && (
                <Badge className="absolute top-3 left-3 z-10">Featured</Badge>
              )}
              <Image
                src={tour.image || "/placeholder.svg"}
                alt={tour.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 ">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {tour.location}
              </div>
              <h3 className="font-bold text-lg mb-2 line-clamp-2">
                {tour.title}
              </h3>
              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  {tour.duration}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  <span>{tour.rating}</span>
                  <span className="text-muted-foreground ml-1">
                    ({tour.reviews})
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="text-xl font-bold text-primary">
                    ${tour.price}
                  </p>
                </div>
                <Link href={`/details/${tour.id}`}>
                  <Button>View Details</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background shadow-md"
          onClick={scrollRight}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
