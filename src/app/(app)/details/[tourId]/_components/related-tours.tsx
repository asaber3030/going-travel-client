"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RelatedTours() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Sample related tours
  const relatedTours = [
    
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
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {relatedTours.map((tour) => (
          <motion.div
            key={tour.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="min-w-[280px] max-w-[280px]"
          >
            <Card className="overflow-hidden h-full">
              <div className="relative h-40">
                <Badge className="absolute top-2 left-2 z-10">
                  {tour.duration}
                </Badge>
                <Image
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {tour.location}
                </div>
                <h3 className="font-bold mb-2 line-clamp-2">{tour.title}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{tour.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({tour.reviews} reviews)
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-bold text-primary">${tour.price}</p>
                </div>
                <Button size="sm" variant="outline">
                  View Tour
                </Button>
              </CardFooter>
            </Card>
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
