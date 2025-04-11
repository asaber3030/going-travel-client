"use client";

import { Label } from "@/components/ui/label";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Calendar,
  Users,
  ChevronRight,
  Wifi,
  Coffee,
  Dumbbell,
  Utensils,
  PocketIcon as Pool,
  Snowflake,
  Tv,
  ParkingCircle,
  Clock,
  Check,
  ArrowLeft,
  Heart,
  Share,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HotelDetailsPage({ params }: { params: { id: string } }) {
  const [selectedRoomType, setSelectedRoomType] = useState("standard");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample hotel data - in a real app, you would fetch this based on the ID
  const hotel = {
    id: Number.parseInt(params.id),
    name: "Grand Alpine Resort & Spa",
    location: "Zermatt, Switzerland",
    price: 350,
    rating: 5,
    reviews: 124,
    description:
      "Nestled in the heart of the Swiss Alps, the Grand Alpine Resort & Spa offers a luxurious mountain retreat with breathtaking views of the Matterhorn. This 5-star property combines traditional Alpine charm with modern luxury, featuring spacious rooms and suites, world-class dining options, and a comprehensive spa and wellness center.",
    longDescription:
      "The resort is ideally located just minutes from the Zermatt ski lifts and hiking trails, making it perfect for both winter and summer adventures. After a day of mountain activities, guests can relax in the award-winning spa featuring indoor and outdoor pools, saunas, steam rooms, and a range of therapeutic treatments. The hotel's restaurants serve gourmet Swiss and international cuisine using locally-sourced ingredients, complemented by an extensive wine cellar featuring the finest Swiss and international selections.",
    images: ["/hotel2.jpg", "/hotel2.jpg", "/hotel2.jpg", "/hotel2.jpg", "/hotel2.jpg", "/hotel2.jpg"],
    amenities: [
      { name: "Free WiFi", icon: Wifi },
      { name: "Spa & Wellness Center", icon: Coffee },
      { name: "Fitness Center", icon: Dumbbell },
      { name: "Gourmet Restaurant", icon: Utensils },
      { name: "Indoor & Outdoor Pools", icon: Pool },
      { name: "Air Conditioning", icon: Snowflake },
      { name: "Flat-screen TV", icon: Tv },
      { name: "Free Parking", icon: ParkingCircle },
      { name: "24-hour Front Desk", icon: Clock },
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Alpine Room",
        price: 350,
        size: "30m²",
        beds: "1 King or 2 Twin",
        occupancy: "2 Adults",
        description: "Comfortable room with mountain views, featuring modern amenities and a private balcony.",
        image: "/hotel.jpg",
      },
      {
        id: "deluxe",
        name: "Deluxe Matterhorn View",
        price: 480,
        size: "40m²",
        beds: "1 King",
        occupancy: "2 Adults",
        description:
          "Spacious room with panoramic views of the Matterhorn, featuring a sitting area and luxury bathroom.",
        image: "/hotel.jpg",
      },
      {
        id: "suite",
        name: "Alpine Suite",
        price: 650,
        size: "60m²",
        beds: "1 King",
        occupancy: "2 Adults, 2 Children",
        description:
          "Luxurious suite with separate living area, two balconies, and premium amenities for the ultimate mountain stay.",
        image: "/hotel.jpg",
      },
    ],
    relatedTours: [
      {
        id: 1,
        name: "Swiss Alps Adventure Tour",
        duration: "7 Days",
        price: 1299,
        image: "/hotel2.jpg",
        description: "Experience the breathtaking beauty of the Swiss Alps on this unforgettable 7-day adventure tour.",
      },
      {
        id: 2,
        name: "Matterhorn Glacier Paradise",
        duration: "1 Day",
        price: 199,
        image: "/hotel2.jpg",
        description: "Take the cable car to Matterhorn Glacier Paradise for stunning views of the iconic mountain.",
      },
      {
        id: 3,
        name: "Zermatt Village Walking Tour",
        duration: "Half Day",
        price: 89,
        image: "/hotel2.jpg",
        description: "Explore the charming car-free village of Zermatt with a knowledgeable local guide.",
      },
    ],
    nearbyAttractions: [
      {
        name: "Matterhorn",
        distance: "Visible from hotel",
        description: "Iconic pyramid-shaped mountain, one of the highest peaks in the Alps.",
      },
      {
        name: "Gornergrat Railway",
        distance: "1.5 km",
        description: "Historic cog railway offering spectacular mountain views.",
      },
      {
        name: "Zermatt Village",
        distance: "0.5 km",
        description: "Charming car-free village with boutiques, restaurants, and alpine charm.",
      },
      {
        name: "Matterhorn Glacier Paradise",
        distance: "Access via cable car",
        description: "Europe's highest cable car station with year-round skiing and panoramic views.",
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

  const selectedRoom = hotel.roomTypes.find((room) => room.id === selectedRoomType);

  return (
    <div className="bg-gray-50">
      {/* Hotel Gallery Header */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={hotel.images[currentImageIndex] || "/placeholder.svg"}
          alt={hotel.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white" asChild>
                <Link href="/hotels">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Hotels
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white">
                <Share className="h-4 w-4" />
              </Button>
            </div>
            <Badge className="mb-2 bg-primary hover:bg-primary w-fit">5-Star Hotel</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{hotel.name}</h1>
            <div className="flex items-center gap-2 text-white/90 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{hotel.location}</span>
            </div>
            <div className="flex items-center gap-1 text-white/90">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < hotel.rating ? "fill-amber-500 text-amber-500" : "text-white/50"}`}
                  />
                ))}
              </div>
              <span className="ml-1">
                {hotel.rating} ({hotel.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {hotel.images.slice(0, 5).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              } transition-all`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="mb-12">
              <TabsList className="w-full justify-start mb-6 overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-8">
                  {/* Hotel Description */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">About This Hotel</h2>
                    <p className="text-muted-foreground mb-4">{hotel.description}</p>
                    <p className="text-muted-foreground">{hotel.longDescription}</p>
                  </section>

                  {/* Key Amenities */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Key Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <amenity.icon className="h-5 w-5 text-primary" />
                          </div>
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Room Types Preview */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">Room Types</h2>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="#rooms">
                          View All <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {hotel.roomTypes.map((room) => (
                        <Card key={room.id} className="overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={room.image || "/placeholder.svg"}
                              alt={room.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold mb-1">{room.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{room.occupancy}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <p className="font-bold text-primary">
                                ${room.price} <span className="text-sm font-normal text-muted-foreground">/ night</span>
                              </p>
                              <Button size="sm" variant="outline" asChild>
                                <Link href="#rooms">View Details</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>

                  {/* Tours from this Hotel */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Tours Available from this Hotel</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {hotel.relatedTours.map((tour) => (
                        <Card key={tour.id} className="overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={tour.image || "/placeholder.svg"}
                              alt={tour.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-primary/90">{tour.duration}</Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold mb-2">{tour.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tour.description}</p>
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-primary">${tour.price}</p>
                              <Button size="sm" asChild>
                                <Link href={`/tour/${tour.id}`}>View Tour</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>

                  {/* Nearby Attractions */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Nearby Attractions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hotel.nearbyAttractions.map((attraction, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold">{attraction.name}</h3>
                                <p className="text-sm text-muted-foreground">{attraction.distance}</p>
                              </div>
                              <Badge variant="outline">{index + 1}</Badge>
                            </div>
                            <p className="text-sm mt-2">{attraction.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                </motion.div>
              </TabsContent>

              <TabsContent value="rooms">
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Available Room Types</h2>

                  {hotel.roomTypes.map((room) => (
                    <Card
                      key={room.id}
                      className={`overflow-hidden mb-6 ${selectedRoomType === room.id ? "ring-2 ring-primary" : ""}`}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-1/3 h-[200px] md:h-auto">
                          <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-bold">{room.name}</h3>
                                <p className="font-bold text-primary">
                                  ${room.price}{" "}
                                  <span className="text-sm font-normal text-muted-foreground">/ night</span>
                                </p>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                                <div className="flex items-center text-sm">
                                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>{room.occupancy}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>{room.size}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>{room.beds}</span>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-4">{room.description}</p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {[
                                  "Free WiFi",
                                  "Air Conditioning",
                                  "Private Bathroom",
                                  "Flat-screen TV",
                                  "Safe",
                                  "Minibar",
                                ].map((amenity, i) => (
                                  <div key={i} className="flex items-center text-sm">
                                    <Check className="h-4 w-4 mr-1 text-green-500" />
                                    <span>{amenity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <Badge variant={selectedRoomType === room.id ? "default" : "outline"}>
                                {selectedRoomType === room.id ? "Selected" : "Select Room"}
                              </Badge>
                              <Button
                                variant={selectedRoomType === room.id ? "default" : "outline"}
                                onClick={() => setSelectedRoomType(room.id)}
                              >
                                {selectedRoomType === room.id ? "Selected" : "Select"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="amenities">
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Hotel Amenities</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        category: "Wellness",
                        items: [
                          "Spa and wellness center",
                          "Indoor swimming pool",
                          "Outdoor swimming pool (seasonal)",
                          "Sauna",
                          "Steam room",
                          "Hot tub/jacuzzi",
                          "Massage services",
                          "Fitness center",
                          "Yoga classes",
                        ],
                      },
                      {
                        category: "Food & Drink",
                        items: [
                          "Restaurant (à la carte)",
                          "Restaurant (buffet)",
                          "Bar/Lounge",
                          "Room service",
                          "Breakfast in the room",
                          "Special diet menus (on request)",
                          "Wine cellar",
                        ],
                      },
                      {
                        category: "Services",
                        items: [
                          "24-hour front desk",
                          "Concierge service",
                          "Luggage storage",
                          "Currency exchange",
                          "Tour desk",
                          "Ticket service",
                          "Babysitting/child services",
                          "Laundry",
                          "Dry cleaning",
                          "Ironing service",
                          "Shoeshine",
                          "Daily housekeeping",
                        ],
                      },
                      {
                        category: "Facilities",
                        items: [
                          "Free WiFi",
                          "Free parking",
                          "Ski storage",
                          "Ski-to-door access",
                          "Ski pass vendor",
                          "Ski school (on site)",
                          "Shuttle service",
                          "Business center",
                          "Meeting/banquet facilities",
                          "Gift shop",
                        ],
                      },
                    ].map((category) => (
                      <Card key={category.category}>
                        <CardHeader>
                          <CardTitle>{category.category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {category.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="location">
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Location</h2>

                  <Card className="overflow-hidden">
                    <div className="relative h-[400px] bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">Interactive map would be displayed here</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Grand Alpine Resort & Spa</h3>
                      <p className="text-muted-foreground mb-4">Bahnhofstrasse 31, 3920 Zermatt, Switzerland</p>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Getting There</h4>
                          <p className="text-sm text-muted-foreground">
                            Zermatt is a car-free village. If arriving by car, you must park in Täsch and take the
                            shuttle train to Zermatt. The hotel offers a free electric taxi service from the Zermatt
                            train station.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Distances</h4>
                          <ul className="space-y-1 text-sm">
                            <li className="flex justify-between">
                              <span>Zermatt Train Station</span>
                              <span>500 m</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Gornergrat Railway</span>
                              <span>1.5 km</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Sunnegga Funicular</span>
                              <span>1 km</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Matterhorn Glacier Paradise</span>
                              <span>4 km</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Geneva Airport</span>
                              <span>240 km</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews">
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-bold">Guest Reviews</h2>
                    <Button>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Write a Review
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        <div className="md:col-span-1 flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-5xl font-bold mb-2">{hotel.rating.toFixed(1)}</div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.round(hotel.rating)
                                    ? "fill-amber-500 text-amber-500"
                                    : "fill-muted text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">Based on {hotel.reviews} reviews</p>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          {[
                            { category: "Cleanliness", rating: 4.9 },
                            { category: "Comfort", rating: 4.8 },
                            { category: "Location", rating: 5.0 },
                            { category: "Facilities", rating: 4.7 },
                            { category: "Staff", rating: 4.9 },
                            { category: "Value for money", rating: 4.5 },
                          ].map((item) => (
                            <div key={item.category} className="flex items-center gap-2">
                              <div className="w-32 text-sm">{item.category}</div>
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${(item.rating / 5) * 100}%` }}
                                ></div>
                              </div>
                              <div className="w-10 text-sm text-right">{item.rating}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {[
                      {
                        name: "Sarah Johnson",
                        country: "United States",
                        date: "August 2023",
                        rating: 5,
                        title: "Exceptional mountain retreat",
                        comment:
                          "Our stay at the Grand Alpine Resort was nothing short of magical. The views of the Matterhorn from our room were breathtaking, and the staff went above and beyond to make our anniversary special. The spa facilities are world-class, and the restaurant served some of the best food we had in Switzerland. Highly recommend for a luxury mountain getaway!",
                      },
                      {
                        name: "Michael Chen",
                        country: "Canada",
                        date: "July 2023",
                        rating: 4,
                        title: "Great location, excellent service",
                        comment:
                          "The hotel is perfectly situated for both skiing and village access. Our room was spacious and comfortable with beautiful alpine decor. The only minor issue was some noise from the hallway at night. The breakfast buffet was outstanding with plenty of options and high-quality ingredients. Would definitely stay again.",
                      },
                      {
                        name: "Emma Wilson",
                        country: "Australia",
                        date: "September 2023",
                        rating: 5,
                        title: "Perfect family vacation",
                        comment:
                          "We stayed in an Alpine Suite which was perfect for our family of four. The children loved the indoor pool, and we appreciated the thoughtful kids' amenities. The concierge helped us plan family-friendly activities each day. The half-board dining option was excellent value, with gourmet meals that even pleased our picky eaters!",
                      },
                    ].map((review, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-bold">{review.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {review.country} • {review.date}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-amber-500 text-amber-500"
                                      : "fill-muted text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <h4 className="font-medium mb-2">{review.title}</h4>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button variant="outline">Load More Reviews</Button>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking & Price */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Your Stay</CardTitle>
                  <CardDescription>Best rate guaranteed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="check-in">Check-in</Label>
                    <Input id="check-in" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-out">Check-out</Label>
                    <Input id="check-out" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Guests</Label>
                    <Select defaultValue="2">
                      <SelectTrigger id="guests">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Adult</SelectItem>
                        <SelectItem value="2">2 Adults</SelectItem>
                        <SelectItem value="3">2 Adults, 1 Child</SelectItem>
                        <SelectItem value="4">2 Adults, 2 Children</SelectItem>
                        <SelectItem value="5">3 Adults</SelectItem>
                        <SelectItem value="6">4 Adults</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room-type">Room Type</Label>
                    <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                      <SelectTrigger id="room-type">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        {hotel.roomTypes.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name} - ${room.price}/night
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Room rate</span>
                      <span>${selectedRoom?.price} × 1 night</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>${Math.round(selectedRoom?.price! * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${selectedRoom?.price! + Math.round(selectedRoom?.price! * 0.1)}</span>
                    </div>
                  </div>

                  <Button className="w-full">Book Now</Button>
                  <p className="text-xs text-center text-muted-foreground">
                    No prepayment needed – pay at the property
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hotel Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Check-in/Check-out</h3>
                    <div className="grid grid-cols-2 text-sm">
                      <p>Check-in from:</p>
                      <p className="font-medium">3:00 PM</p>
                      <p>Check-out until:</p>
                      <p className="font-medium">11:00 AM</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-1">Cancellation Policy</h3>
                    <p className="text-sm text-muted-foreground">
                      Free cancellation up to 7 days before check-in. Cancellations made less than 7 days before
                      check-in are subject to a one-night charge.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-1">Children & Beds</h3>
                    <p className="text-sm text-muted-foreground">
                      Children of all ages are welcome. Children 12 and above are considered adults at this property.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our travel experts are here to assist you with your booking.
                  </p>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
