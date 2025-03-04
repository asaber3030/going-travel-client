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
      title: "Swiss Alps Adventure Tour",
      location: "Switzerland",
      duration: "7 Days",
      price: 1299,
      rating: 4.8,
      reviews: 124,
      image: "/zermatt-matterhorn-best-view-1.jpg?height=600&width=800",
      featured: true,
    },
    {
      id: 2,
      title: "Italian Lakes & Alpine Adventure",
      location: "Italy & Switzerland",
      duration: "10 Days",
      price: 1799,
      rating: 4.7,
      reviews: 86,
      image:
        "/Aiguille_du_Midi_en_hiver-Fabian_Bodet-1525.JPG?height=600&width=800",
      featured: false,
    },
    {
      id: 3,
      title: "Mont Blanc Trekking Experience",
      location: "France & Switzerland",
      duration: "8 Days",
      price: 1499,
      rating: 4.9,
      reviews: 112,
      image: "/p08fq4z7.jpg?height=600&width=800",
      featured: false,
    },
    {
      id: 4,
      title: "Swiss Chocolate & Cheese Tour",
      location: "Switzerland",
      duration: "5 Days",
      price: 999,
      rating: 4.8,
      reviews: 74,
      image:
        "/unesco-geirangerfjord-skagefla-waterfall-2-1_6cc6a64a-a204-432e-8753-01ef2080f24e.jpg?height=600&width=800",
      featured: false,
    },
    {
      id: 5,
      title: "Alpine Winter Wonderland",
      location: "Switzerland & Austria",
      duration: "7 Days",
      price: 1399,
      rating: 4.6,
      reviews: 58,
      image: "/q_70.jpg?height=600&width=800",
      featured: false,
    },
    {
      id: 6,
      title: "Norwegian Fjords Explorer",
      location: "Norway",
      duration: "9 Days",
      price: 1699,
      rating: 4.9,
      reviews: 92,
      image: "/placeholder.svg?height=600&width=800",
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
            <div className="p-5">
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
                <Link href={`/tour/${tour.id}`}>
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
