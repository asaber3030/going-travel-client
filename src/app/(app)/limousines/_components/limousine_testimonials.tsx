import React from "react";

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Zurich, Switzerland",
    comment:
      "The airport transfer service was exceptional. The driver was waiting for us despite our flight delay, and the Mercedes S-Class was immaculate. Will definitely use again!",
    service: "Airport Transfer",
  },
  {
    name: "Michael Chen",
    location: "Geneva, Switzerland",
    comment:
      "We hired a limousine for our wedding day and couldn't be happier. The chauffeur was professional, the car was beautifully decorated, and it made our special day even more memorable.",
    service: "Wedding Service",
  },
  {
    name: "Emma Wilson",
    location: "Lucerne, Switzerland",
    comment:
      "The hourly charter service was perfect for our business meetings. The driver was knowledgeable about the city and very accommodating with our changing schedule. Highly recommended!",
    service: "Hourly Charter",
  },
];

export default function LimousineTestimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-2">Client Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read what our satisfied customers have to say about their experience with our limousine service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="italic text-muted-foreground">"{testimonial.comment}"</p>
                  </div>
                  <div className="mt-auto pt-4 border-t">
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <Badge variant="outline" className="mt-2">
                      {testimonial.service}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
