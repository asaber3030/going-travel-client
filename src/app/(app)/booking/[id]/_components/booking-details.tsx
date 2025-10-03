"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plane, Car, Bus, Star, Clock, Calendar, MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for bookings (same as listings but with more details)
const mockBookings = [
  {
    id: "car-1",
    type: "car",
    title: "Economy Car",
    description: "Compact and fuel-efficient car for city travel",
    price: 45,
    rating: 4.5,
    duration: "Unlimited",
    capacity: 4,
    image: "/images copy.jpg?height=300&width=500",
    from: "Downtown",
    to: "Airport",
    departureDate: "2023-08-15",
    departureTime: "10:00 AM",
    features: [
      "Air conditioning",
      "Automatic transmission",
      "Bluetooth",
      "GPS navigation",
    ],
  },
  {
    id: "car-2",
    type: "car",
    title: "SUV Rental",
    description: "Spacious SUV perfect for family trips and luggage",
    price: 75,
    rating: 4.7,
    duration: "Unlimited",
    capacity: 6,
    image: "/images copy.jpg?height=300&width=500",
    from: "Airport",
    to: "Resort Area",
    departureDate: "2023-08-16",
    departureTime: "12:00 PM",
    features: [
      "Air conditioning",
      "Automatic transmission",
      "Bluetooth",
      "GPS navigation",
      "Roof rack",
      "Third-row seating",
    ],
  },
  {
    id: "bus-1",
    type: "bus",
    title: "Express Bus",
    description: "Direct bus service between major destinations",
    price: 25,
    rating: 4.2,
    duration: "2h 15m",
    capacity: 45,
    image: "/images copy.jpg?height=300&width=500",
    from: "Central Station",
    to: "Beach Resort",
    departureDate: "2023-08-17",
    departureTime: "08:30 AM",
    features: ["Air conditioning", "WiFi", "Power outlets", "Restroom"],
  },
  {
    id: "bus-2",
    type: "bus",
    title: "Luxury Coach",
    description: "Premium coach with extra legroom and amenities",
    price: 35,
    rating: 4.6,
    duration: "3h",
    capacity: 30,
    image: "/images copy.jpg?height=300&width=500",
    from: "City Center",
    to: "Mountain Lodge",
    departureDate: "2023-08-18",
    departureTime: "09:00 AM",
    features: [
      "Air conditioning",
      "WiFi",
      "Power outlets",
      "Restroom",
      "Reclining seats",
      "Entertainment system",
    ],
  },
  {
    id: "plane-1",
    type: "plane",
    title: "Economy Flight",
    description: "Standard economy class flight with one carry-on",
    price: 199,
    rating: 4.0,
    duration: "1h 45m",
    capacity: 1,
    image: "/images copy.jpg?height=300&width=500",
    from: "Local Airport",
    to: "International Hub",
    departureDate: "2023-08-19",
    departureTime: "07:15 AM",
    features: [
      "In-flight entertainment",
      "Meal service",
      "One carry-on bag",
      "One checked bag",
    ],
  },
  {
    id: "plane-2",
    type: "plane",
    title: "Business Class",
    description: "Premium business class with priority boarding",
    price: 450,
    rating: 4.8,
    duration: "2h 10m",
    capacity: 1,
    image: "/images copy.jpg?height=300&width=500",
    from: "Main Terminal",
    to: "Vacation Island",
    departureDate: "2023-08-20",
    departureTime: "10:30 AM",
    features: [
      "Priority boarding",
      "Lounge access",
      "Premium meals",
      "Extra legroom",
      "Two checked bags",
      "Dedicated cabin crew",
    ],
  },
];

interface BookingDetailsProps {
  id: string;
}

export function BookingDetails({ id }: BookingDetailsProps) {
  const [booking, setBooking] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with delay
    setIsLoading(true);
    setTimeout(() => {
      const foundBooking = mockBookings.find((booking) => booking.id === id);
      setBooking(foundBooking || null);
      setIsLoading(false);
    }, 1500);
  }, [id]);

  const getIcon = (type: string) => {
    switch (type) {
      case "car":
        return <Car className="h-5 w-5" />;
      case "bus":
        return <Bus className="h-5 w-5" />;
      case "plane":
        return <Plane className="h-5 w-5" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <BookingDetailsSkeleton />;
  }

  if (!booking) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Booking not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={booking.image || "/images copy.jpg"}
            alt={booking.title}
            className="h-full w-full object-cover"
          />
        </div>
        <CardHeader className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <Badge
                variant="outline"
                className="mb-2 flex w-fit items-center gap-1"
              >
                {getIcon(booking.type)}
                {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
              </Badge>
              <CardTitle className="text-2xl">{booking.title}</CardTitle>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-yellow-50 px-2 py-1 text-yellow-700">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              {booking.rating}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6 pt-0">
          <p className="text-gray-600">{booking.description}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium">{booking.from}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium">{booking.to}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Departure Date</p>
                <p className="font-medium">{booking.departureDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Departure Time</p>
                <p className="font-medium">{booking.departureTime}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Features</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {booking.features.map((feature: string) => (
                <li key={feature} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-goldish"></div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Price</span>
              <span className="text-xl font-bold">${booking.price}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-gray-500">Duration</span>
              <span>{booking.duration}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function BookingDetailsSkeleton() {
  return (
    <Card>
      <div className="aspect-video w-full animate-pulse bg-gray-200"></div>
      <CardHeader className="p-6">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
        <div className="mt-2 h-8 w-full animate-pulse rounded bg-gray-200"></div>
      </CardHeader>
      <CardContent className="space-y-6 p-6 pt-0">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="mb-2 h-5 w-20 animate-pulse rounded bg-gray-200"></div>
          <div className="grid gap-2 sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
