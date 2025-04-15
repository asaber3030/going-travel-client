import { Button } from "@/components/ui/button";
import React from "react";

export default function CTASection() {
  return (
    <section className="relative py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury Transportation?</h2>
          <p className="mb-8">Book your premium limousine service today and travel in style and comfort</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              View Our Fleet
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
