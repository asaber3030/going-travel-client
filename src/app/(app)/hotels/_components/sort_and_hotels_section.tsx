"use client";

import Image from "next/image";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UIHotel } from "@/types/ui";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Props = {
  hotels: UIHotel[];
};

export function SortAndHotelsSection({ hotels }: Props) {
  const [sortOption, setSortOption] = useState("recommended");
  const t = useTranslations();
  // Sort hotels based on selected option
  const sortedHotels = [...hotels].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.stars - a.stars;
      default:
        return b.stars - a.stars;
    }
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="lg:col-span-3 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{t("hotelsPage.availableHotels")}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap">{t("hotelsPage.sortBy")}</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">{t("hotelsPage.recommended")}</SelectItem>
                <SelectItem value="price-low">{t("hotelsPage.priceLowToHigh")}</SelectItem>
                <SelectItem value="price-high">{t("hotelsPage.priceHighToLow")}</SelectItem>
                <SelectItem value="rating">{t("hotelsPage.rating")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {sortedHotels.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <h3 className="text-lg font-medium mb-2">{t("hotelsPage.noHotelsFound")}</h3>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/3 h-[200px] md:h-auto">
                      <Image src={hotel.thumbnail || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold">{hotel.translations?.[0]?.name ?? "N/A"}</h3>
                            <div className="flex items-center">
                              <Star className="h-5 w-5 fill-amber-500 text-amber-500 mr-1" />
                              <span className="font-medium">{hotel.stars}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-muted-foreground mb-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{hotel.location_id ?? "N/A"}</span>
                          </div>
                          <p className="text-muted-foreground mb-4">{hotel.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(hotel.amenity)
                              .filter(([key, value]) => value === 1 && key !== "id" && key !== "hotel_id")
                              .map(([key]) => (
                                <Badge key={key} variant="outline" className="flex items-center gap-1">
                                  <Check className="h-4 w-4 text-primary" />
                                  <span className="capitalize">{key.replace(/_/g, " ")}</span>
                                </Badge>
                              ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">{t("hotelsPage.pricePerNight")}</p>
                            <div className="flex items-baseline">
                              {<span className="text-2xl font-bold text-primary">${hotel.price}</span>}
                            </div>
                          </div>
                          <Button asChild>
                            <Link href={`/hotels/${hotel.id}`}>{t("hotelsPage.viewDetails")}</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
