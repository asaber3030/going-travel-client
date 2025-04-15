import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Car, Check, Fuel, Gauge, Music, Shield, Snowflake, Wifi, Wine } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";

const limousine = {
  id: 1,
  name: "Mercedes-Benz S-Class",
  type: "Luxury Sedan",
  description:
    "Experience the epitome of luxury and comfort with our Mercedes-Benz S-Class. This premium sedan combines elegant design with cutting-edge technology to provide an exceptional travel experience.",
  longDescription:
    "The Mercedes-Benz S-Class represents the pinnacle of automotive luxury. With its spacious interior, premium leather seats, and advanced climate control, every journey becomes a pleasure. The vehicle features state-of-the-art entertainment systems, ambient lighting, and noise insulation to ensure a serene environment. Our professional chauffeurs are trained to provide discreet, attentive service, making this the perfect choice for business travel, airport transfers, or special occasions.",
  passengers: 3,
  luggage: 3,
  transferPrice: 150,
  hourlyPrice: 120,
  minHours: 3,
  discount: 10,
  images: ["/lemo.jpg", "/lemo.jpg", "/lemo.jpg", "/lemo.jpg", "/lemo.jpg"],
  features: [
    { name: "Free WiFi", icon: Wifi },
    { name: "Premium Sound System", icon: Music },
    { name: "Climate Control", icon: Snowflake },
    { name: "Leather Seats", icon: Car },
    { name: "Complimentary Water", icon: Wine },
    { name: "USB Charging", icon: Fuel },
    { name: "Professional Chauffeur", icon: Shield },
    { name: "Flight Tracking", icon: Gauge },
  ],
  extras: [
    { id: "champagne", name: "Champagne", price: 50, description: "Premium champagne for your journey" },
    { id: "redCarpet", name: "Red Carpet Service", price: 30, description: "VIP red carpet welcome" },
    { id: "childSeat", name: "Child Seat", price: 15, description: "Safety-approved child seat" },
    { id: "flowers", name: "Flower Decoration", price: 40, description: "Elegant floral arrangement" },
  ],
  specifications: {
    make: "Mercedes-Benz",
    model: "S-Class",
    year: 2023,
    engine: "3.0L Inline-6 Turbo",
    transmission: "9-Speed Automatic",
    interior: "Premium Nappa Leather",
    entertainment: "MBUX Infotainment System",
    safety: "Comprehensive Safety Package",
  },
  services: [
    {
      name: "Airport Transfer",
      description:
        "Our airport transfer service ensures a smooth transition to or from the airport. Your chauffeur will track your flight and adjust for any delays. The service includes meet and greet, luggage assistance, and a comfortable ride to your destination.",
    },
    {
      name: "Hourly Charter",
      description:
        "For those who need flexibility, our hourly charter service allows you to have a luxury vehicle and chauffeur at your disposal. Perfect for business meetings, sightseeing, shopping, or any occasion requiring multiple stops.",
    },
    {
      name: "Special Occasions",
      description:
        "Make your special day even more memorable with our luxury transportation. Whether it's a wedding, anniversary, prom, or corporate event, we provide elegant vehicles and professional service to enhance your experience.",
    },
  ],
  reviews: [
    {
      name: "James Wilson",
      date: "October 2023",
      rating: 5,
      comment:
        "Exceptional service from start to finish. The S-Class was immaculate, and our chauffeur was professional and courteous. Made our anniversary celebration truly special.",
    },
    {
      name: "Sarah Thompson",
      date: "September 2023",
      rating: 5,
      comment:
        "Used the airport transfer service and was extremely impressed. The driver tracked our flight, which was delayed, and was waiting for us when we arrived. The vehicle was luxurious and comfortable after a long flight.",
    },
    {
      name: "Michael Chen",
      date: "August 2023",
      rating: 4,
      comment:
        "Great experience overall. The vehicle was beautiful and the driver was professional. Only giving 4 stars because the WiFi was a bit slow, but everything else was perfect.",
    },
  ],
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function ServicesTab() {
  return (
    <TabsContent value="services">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>

        <div className="space-y-6">
          {limousine.services.map((service, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>

                {service.name === "Airport Transfer" && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">What's Included:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Flight monitoring</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Meet & greet service</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Luggage assistance</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>60 minutes waiting time</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Door-to-door service</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>All taxes and fees</span>
                      </div>
                    </div>
                  </div>
                )}

                {service.name === "Hourly Charter" && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">What's Included:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Professional chauffeur</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Multiple stops</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Flexible itinerary</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Waiting time included</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Fuel and tolls</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>All taxes and fees</span>
                      </div>
                    </div>
                  </div>
                )}

                {service.name === "Special Occasions" && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Perfect For:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-muted/30 border-none">
                        <CardContent className="p-4 text-center">
                          <h5 className="font-medium">Weddings</h5>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30 border-none">
                        <CardContent className="p-4 text-center">
                          <h5 className="font-medium">Anniversaries</h5>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30 border-none">
                        <CardContent className="p-4 text-center">
                          <h5 className="font-medium">Proms</h5>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30 border-none">
                        <CardContent className="p-4 text-center">
                          <h5 className="font-medium">Corporate Events</h5>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30 border-none">
                        <CardContent className="p-4 text-center">
                          <h5 className="font-medium">Bachelor/Bachelorette</h5>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30 border-none">
                        <CardContent className="p-4 text-center">
                          <h5 className="font-medium">Night Out</h5>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </TabsContent>
  );
}
