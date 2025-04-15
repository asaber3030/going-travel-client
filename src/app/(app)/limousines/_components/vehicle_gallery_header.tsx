"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Heart, Share, Users, Luggage, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UILimousine, UILimousineImage } from "@/types/ui";
import { Badge } from "@/components/ui/badge";

const images = ["/lemo1.jpg", "/lemo1.jpg", "/lemo1.jpg", "/lemo1.jpg"];

type Props = {
  images: UILimousineImage[];
};

export default function VehicleGalleryHeader({ images }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div>
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image src={images?.[currentImageIndex]?.url || "/placeholder.svg"} alt={"limousine.name"} fill className="object-cover" priority />

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_: any, index: number) => (
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
