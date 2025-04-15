"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Heart, Share, Users, Luggage, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UILimousine } from "@/types/ui";
import { Badge } from "@/components/ui/badge";

const images = ["/lemo1.jpg", "/lemo1.jpg", "/lemo1.jpg", "/lemo1.jpg"];

type Props = {
  limousine: UILimousine;
};

export default function VehicleGalleryHeader({ limousine }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div>
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image src={images[currentImageIndex] || "/placeholder.svg"} alt={"limousine.name"} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white" asChild>
                <Link href="/limousines">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Vehicles
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white">
                <Share className="h-4 w-4" />
              </Button>
            </div>
            <Badge className="mb-2 bg-primary hover:bg-primary w-fit">{limousine.type}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{limousine.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{limousine.maxPassengers} Passengers</span>
              </div>
              <div className="flex items-center gap-1">
                <Luggage className="h-4 w-4" />
                <span>{limousine.luggage} Luggage</span>
              </div>
              {limousine.discount > 0 && (
                <Badge variant="outline" className="text-white border-white">
                  {limousine.discount}% OFF
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {limousine.images.map((_: any, index: number) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"} transition-all`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
