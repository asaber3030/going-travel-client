"use client";

import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Share,
  Users,
  Luggage,
  Car,
  Shield,
  Check,
  Clock,
  MapPin,
  Info,
  Star,
  MessageCircle,
  Fuel,
  Gauge,
  Wifi,
  Music,
  Snowflake,
  Wine,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function LimousineDetailsPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingType, setBookingType] = useState("airport");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Sample limousine data - in a real app, you would fetch this based on the ID
  const limousine = {
    id: Number.parseInt(params.id),
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

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras((prev) => (prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]));
  };

  const calculatePrice = () => {
    let basePrice = bookingType === "airport" ? limousine.transferPrice : limousine.hourlyPrice * limousine.minHours;

    // Apply discount if available
    if (limousine.discount) {
      basePrice = basePrice * (1 - limousine.discount / 100);
    }

    // Add extras
    const extrasTotal = selectedExtras.reduce((total, extraId) => {
      const extra = limousine.extras.find((e) => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);

    return {
      basePrice: Math.round(basePrice),
      extrasTotal,
      total: Math.round(basePrice) + extrasTotal,
    };
  };

  const priceDetails = calculatePrice();

  return (
    <div className="bg-gray-50">
      {/* Vehicle Gallery Header */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={limousine.images[currentImageIndex] || "/placeholder.svg"}
          alt={limousine.name}
          fill
          className="object-cover"
          priority
        />
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
                <span>{limousine.passengers} Passengers</span>
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
          {limousine.images.map((_, index) => (
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
          {/* Left Column - Vehicle Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="mb-12">
              <TabsList className="w-full justify-start mb-6 overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-8">
                  {/* Vehicle Description */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">About This Vehicle</h2>
                    <p className="text-muted-foreground mb-4">{limousine.description}</p>
                    <p className="text-muted-foreground">{limousine.longDescription}</p>
                  </section>

                  {/* Key Features */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {limousine.features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                          <div className="bg-primary/10 rounded-full p-2 mb-2">
                            <feature.icon className="h-5 w-5 text-primary" />
                          </div>
                          <span>{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Services Preview */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Available Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {limousine.services.map((service, index) => (
                        <Card key={index}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{service.description.substring(0, 100)}...</p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" size="sm" className="w-full" asChild>
                              <Link href="#services">Learn More</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </section>

                  {/* Pricing */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Airport Transfer</CardTitle>
                          <CardDescription>One-way transfer to/from airport</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg">Base Price</span>
                            <div className="text-right">
                              {limousine.discount > 0 ? (
                                <>
                                  <span className="text-2xl font-bold text-primary">
                                    ${Math.round(limousine.transferPrice * (1 - limousine.discount / 100))}
                                  </span>
                                  <span className="text-muted-foreground line-through ml-2">
                                    ${limousine.transferPrice}
                                  </span>
                                </>
                              ) : (
                                <span className="text-2xl font-bold text-primary">${limousine.transferPrice}</span>
                              )}
                            </div>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span>Professional chauffeur</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span>Flight tracking</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span>Meet & greet service</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span>Luggage assistance</span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" onClick={() => setBookingType("airport")}>
                            Book Airport Transfer
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Hourly Charter</CardTitle>
                          <CardDescription>Minimum {limousine.minHours} hours booking</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg">Per Hour</span>
                            <div className="text-right">
                              {limousine.discount > 0 ? (
                                <>
                                  <span className="text-2xl font-bold text-primary">
                                    ${Math.round(limousine.hourlyPrice * (1 - limousine.discount / 100))}
                                  </span>
                                  <span className="text-muted-foreground line-through ml-2">
                                    ${limousine.hourlyPrice}
                                  </span>
                                </>
                              ) : (
                                <span className="text-2xl font-bold text-primary">${limousine.hourlyPrice}</span>
                              )}
                            </div>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span>Professional chauffeur</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span>Multiple stops</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span>Flexible itinerary</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span>Waiting time included</span>
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" onClick={() => setBookingType("hourly")}>
                            Book Hourly Charter
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </section>
                </motion.div>
              </TabsContent>

              <TabsContent value="features">
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Vehicle Features</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        category: "Comfort",
                        items: [
                          "Premium leather seats",
                          "Spacious interior",
                          "Climate control",
                          "Heated and ventilated seats",
                          "Ambient lighting",
                          "Tinted windows",
                          "Noise insulation",
                          "Adjustable seating",
                        ],
                      },
                      {
                        category: "Entertainment",
                        items: [
                          "Premium sound system",
                          "Bluetooth connectivity",
                          "USB charging ports",
                          "Complimentary WiFi",
                          "Tablet with entertainment options",
                          "Satellite radio",
                          "Headphones",
                        ],
                      },
                      {
                        category: "Refreshments",
                        items: [
                          "Complimentary bottled water",
                          "Ice compartment",
                          "Glassware",
                          "Mini refrigerator",
                          "Coffee/tea on request",
                          "Premium snacks (on request)",
                        ],
                      },
                      {
                        category: "Service",
                        items: [
                          "Professional chauffeur",
                          "Flight tracking",
                          "Meet & greet service",
                          "Luggage assistance",
                          "Door-to-door service",
                          "24/7 customer support",
                          "Multilingual chauffeurs available",
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

                  <div className="bg-muted/30 p-6 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold mb-1">Additional Information</h3>
                        <p className="text-muted-foreground">
                          All our vehicles are meticulously maintained and undergo thorough cleaning and sanitization
                          between each service. Special requests can be accommodated with advance notice. Please contact
                          our customer service team for any specific requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

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

                              <div className="flex justify-end">
                                <Button onClick={() => setBookingType("airport")}>Book Airport Transfer</Button>
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

                              <div className="flex justify-end">
                                <Button onClick={() => setBookingType("hourly")}>Book Hourly Charter</Button>
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

                              <div className="flex justify-end">
                                <Button onClick={() => setBookingType("hourly")}>Book for Special Occasion</Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

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
                      <p className="text-sm text-muted-foreground">
                        Premium fuel with excellent efficiency for a luxury vehicle
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg">
                      <Gauge className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-bold mb-1">Performance</h3>
                      <p className="text-sm text-muted-foreground">
                        Powerful engine with smooth acceleration and handling
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg">
                      <Shield className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-bold mb-1">Safety</h3>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive safety features and regular maintenance
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews">
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    <Button>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Write a Review
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        <div className="md:col-span-1 flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-5xl font-bold mb-2">4.8</div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < 5 ? "fill-amber-500 text-amber-500" : "fill-muted text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">Based on {limousine.reviews.length} reviews</p>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          {[
                            { category: "Service", rating: 5.0 },
                            { category: "Vehicle Condition", rating: 4.9 },
                            { category: "Punctuality", rating: 4.8 },
                            { category: "Comfort", rating: 5.0 },
                            { category: "Value for Money", rating: 4.5 },
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
                    {limousine.reviews.map((review, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-bold">{review.name}</h3>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
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
                  <CardTitle>Book This Vehicle</CardTitle>
                  <CardDescription>Select your service type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={bookingType} onValueChange={setBookingType} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="airport" id="airport" />
                      <Label htmlFor="airport" className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        Airport Transfer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hourly" id="hourly" />
                      <Label htmlFor="hourly" className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Hourly Charter
                      </Label>
                    </div>
                  </RadioGroup>

                  {bookingType === "airport" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickup">Pickup Location</Label>
                        <Input id="pickup" placeholder="Airport or address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dropoff">Destination</Label>
                        <Input id="dropoff" placeholder="Hotel or address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date & Time</Label>
                        <Input id="date" type="datetime-local" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Passengers</Label>
                        <Select defaultValue="2">
                          <SelectTrigger id="passengers">
                            <SelectValue placeholder="Select passengers" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "Passenger" : "Passengers"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickup-hourly">Pickup Location</Label>
                        <Input id="pickup-hourly" placeholder="Address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-hourly">Date</Label>
                        <Input id="date-hourly" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time-hourly">Time</Label>
                        <Input id="time-hourly" type="time" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hours">Duration (hours)</Label>
                        <Select defaultValue={limousine.minHours.toString()}>
                          <SelectTrigger id="hours">
                            <SelectValue placeholder="Select hours" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              limousine.minHours,
                              limousine.minHours + 1,
                              limousine.minHours + 2,
                              limousine.minHours + 3,
                              8,
                              10,
                              12,
                            ].map((hours) => (
                              <SelectItem key={hours} value={hours.toString()}>
                                {hours} hours
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Additional Services</Label>
                    <div className="space-y-2">
                      {limousine.extras.map((extra) => (
                        <div key={extra.id} className="flex items-center justify-between border p-3 rounded-md">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={extra.id}
                              checked={selectedExtras.includes(extra.id)}
                              onCheckedChange={() => handleExtraToggle(extra.id)}
                            />
                            <div>
                              <Label htmlFor={extra.id} className="font-medium">
                                {extra.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">{extra.description}</p>
                            </div>
                          </div>
                          <span className="font-medium">${extra.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Base price</span>
                      <span>${priceDetails.basePrice}</span>
                    </div>
                    {selectedExtras.length > 0 && (
                      <div className="flex justify-between">
                        <span>Additional services</span>
                        <span>${priceDetails.extrasTotal}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${priceDetails.total}</span>
                    </div>
                  </div>

                  <Button className="w-full">Book Now</Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Free cancellation up to 24 hours before pickup
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Cancellation Policy</h3>
                    <p className="text-sm text-muted-foreground">
                      Free cancellation up to 24 hours before pickup. Cancellations made less than 24 hours before
                      pickup are subject to a 50% charge.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-1">Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      We accept all major credit cards. A 20% deposit is required at the time of booking, with the
                      remaining balance due 24 hours before service.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-1">Additional Information</h3>
                    <p className="text-sm text-muted-foreground">
                      All prices include taxes and fees. Gratuity for the chauffeur is not included and is at your
                      discretion.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our customer service team is available 24/7 to assist you with your booking.
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
