import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { TabsContent } from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Car, Fuel, Gauge, Music, Shield, Snowflake, Wifi, Wine } from "lucide-react";
import React from "react";

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

export function SpecificationTab() {
  return (
    <TabsContent value="specifications">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Vehicle Specifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Make</span>
                  <span className="font-medium">{limousine.specifications.make}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-medium">{limousine.specifications.model}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium">{limousine.specifications.year}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Engine</span>
                  <span className="font-medium">{limousine.specifications.engine}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transmission</span>
                  <span className="font-medium">{limousine.specifications.transmission}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interior & Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interior</span>
                  <span className="font-medium">{limousine.specifications.interior}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entertainment</span>
                  <span className="font-medium">{limousine.specifications.entertainment}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Safety</span>
                  <span className="font-medium">{limousine.specifications.safety}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Passenger Capacity</span>
                  <span className="font-medium">{limousine.passengers} passengers</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Luggage Capacity</span>
                  <span className="font-medium">{limousine.luggage} pieces</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg">
            <Fuel className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-bold mb-1">Fuel Efficiency</h3>
            <p className="text-sm text-muted-foreground">Premium fuel with excellent efficiency for a luxury vehicle</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg">
            <Gauge className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-bold mb-1">Performance</h3>
            <p className="text-sm text-muted-foreground">Powerful engine with smooth acceleration and handling</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg">
            <Shield className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-bold mb-1">Safety</h3>
            <p className="text-sm text-muted-foreground">Comprehensive safety features and regular maintenance</p>
          </div>
        </div>
      </motion.div>
    </TabsContent>
  );
}
