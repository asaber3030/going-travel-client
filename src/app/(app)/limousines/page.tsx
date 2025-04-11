"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Clock, MapPin, Car, Shield, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LimousinesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const [passengerCount, setPassengerCount] = useState<string[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("recommended");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("airport");

  const heroSlides = [
    {
      image: "/lemo.jpg",
      title: "Luxury Transportation",
      subtitle: "Travel in style with our premium limousine service",
    },
    {
      image: "/lemo.jpg",
      title: "Airport Transfers",
      subtitle: "Start your journey with a seamless airport pickup",
    },
    {
      image: "/lemo.jpg",
      title: "Special Occasions",
      subtitle: "Make your special day even more memorable",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sample limousines data
  const limousines = [
    {
      id: 1,
      name: "Mercedes-Benz S-Class",
      type: "Sedan",
      passengers: 3,
      luggage: 3,
      price: 150,
      hourlyPrice: 120,
      image: "/lemo2.jpg",
      features: ["Free WiFi", "Bottled Water", "Leather Seats", "Climate Control"],
      description: "Luxury sedan perfect for business travel or small groups, offering comfort and elegance.",
      featured: true,
      discount: 10,
    },
    {
      id: 2,
      name: "BMW 7 Series",
      type: "Sedan",
      passengers: 3,
      luggage: 3,
      price: 140,
      hourlyPrice: 110,
      image: "/lemo2.jpg",
      features: ["Free WiFi", "Bottled Water", "Leather Seats", "Climate Control"],
      description: "Premium sedan with advanced technology and spacious interior for a comfortable journey.",
      featured: false,
    },
    {
      id: 3,
      name: "Cadillac Escalade",
      type: "SUV",
      passengers: 6,
      luggage: 6,
      price: 220,
      hourlyPrice: 180,
      image: "/lemo2.jpg",
      features: ["Free WiFi", "Bottled Water", "Leather Seats", "Climate Control", "Entertainment System"],
      description: "Luxury SUV with ample space for passengers and luggage, perfect for group travel.",
      featured: true,
    },
    {
      id: 4,
      name: "Mercedes-Benz V-Class",
      type: "Van",
      passengers: 7,
      luggage: 7,
      price: 250,
      hourlyPrice: 200,
      image: "/lemo2.jpg",
      features: ["Free WiFi", "Bottled Water", "Leather Seats", "Climate Control", "Entertainment System"],
      description: "Spacious luxury van ideal for larger groups or family travel with maximum comfort.",
      featured: false,
      discount: 15,
    },
    {
      id: 5,
      name: "Rolls-Royce Phantom",
      type: "Luxury",
      passengers: 3,
      luggage: 3,
      price: 500,
      hourlyPrice: 450,
      image: "/lemo2.jpg",
      features: ["Free WiFi", "Premium Bar", "Leather Seats", "Climate Control", "Entertainment System"],
      description: "Ultimate luxury experience with chauffeur service, perfect for special occasions and VIP travel.",
      featured: true,
    },
    {
      id: 6,
      name: "Tesla Model S",
      type: "Electric",
      passengers: 4,
      luggage: 3,
      price: 180,
      hourlyPrice: 150,
      image: "/lemo2.jpg",
      features: ["Free WiFi", "Bottled Water", "Leather Seats", "Climate Control", "Zero Emissions"],
      description:
        "Eco-friendly luxury electric vehicle combining sustainability with premium comfort and performance.",
      featured: false,
    },
  ];

  // Filter limousines based on search and filters
  const filteredLimousines = limousines.filter((limo) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      limo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      limo.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      limo.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Price range filter
    const matchesPrice = limo.price >= priceRange[0] && limo.price <= priceRange[1];

    // Passenger count filter
    const matchesPassengers = passengerCount.length === 0 || passengerCount.includes(limo.passengers.toString());

    // Vehicle type filter
    const matchesType = vehicleTypes.length === 0 || vehicleTypes.includes(limo.type.toLowerCase());

    return matchesSearch && matchesPrice && matchesPassengers && matchesType;
  });

  // Sort limousines based on selected option
  const sortedLimousines = [...filteredLimousines].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "capacity":
        return b.passengers - a.passengers;
      default:
        return b.featured ? 1 : -1;
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
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh]">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40">
              <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 30 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-3xl"
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                </motion.div>
              </div>
            </div>
          </div>
        ))}

        {/* Booking Tabs */}
        <div className="absolute bottom-0 left-0 right-0 top-1/3 translate-y-1/2 z-10">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
              <Tabs defaultValue="airport" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="airport">Airport Transfer</TabsTrigger>
                  <TabsTrigger value="hourly">Hourly Charter</TabsTrigger>
                  <TabsTrigger value="special">Special Occasion</TabsTrigger>
                </TabsList>

                <TabsContent value="airport" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Airport or address" className="pl-9" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Destination</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Hotel or address" className="pl-9" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date & Time</label>
                      <Input type="datetime-local" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Passengers</label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Passenger" : "Passengers"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Luggage</label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select luggage" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Piece" : "Pieces"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">Search Vehicles</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="hourly" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Address" className="pl-9" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Time</label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Duration (hours)</label>
                      <Select defaultValue="4">
                        <SelectTrigger>
                          <SelectValue placeholder="Select hours" />
                        </SelectTrigger>
                        <SelectContent>
                          {[2, 3, 4, 5, 6, 8, 10, 12].map((hours) => (
                            <SelectItem key={hours} value={hours.toString()}>
                              {hours} hours
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Passengers</label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Passenger" : "Passengers"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">Search Vehicles</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="special" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Occasion Type</label>
                      <Select defaultValue="wedding">
                        <SelectTrigger>
                          <SelectValue placeholder="Select occasion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="prom">Prom Night</SelectItem>
                          <SelectItem value="anniversary">Anniversary</SelectItem>
                          <SelectItem value="birthday">Birthday</SelectItem>
                          <SelectItem value="corporate">Corporate Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Time</label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Address" className="pl-9" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Passengers</label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Passenger" : "Passengers"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">Search Vehicles</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-5 space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-4">Filters</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <Slider
                      defaultValue={[100, 1000]}
                      min={100}
                      max={1000}
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Passenger Capacity</h4>
                    <div className="space-y-2">
                      {[3, 4, 6, 7].map((count) => (
                        <div key={count} className="flex items-center">
                          <Checkbox
                            id={`passengers-${count}`}
                            checked={passengerCount.includes(count.toString())}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setPassengerCount([...passengerCount, count.toString()]);
                              } else {
                                setPassengerCount(passengerCount.filter((c) => c !== count.toString()));
                              }
                            }}
                          />
                          <Label htmlFor={`passengers-${count}`} className="ml-2 flex items-center">
                            {count} passengers
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Vehicle Type</h4>
                    <div className="space-y-2">
                      {[
                        { id: "sedan", label: "Sedan" },
                        { id: "suv", label: "SUV" },
                        { id: "van", label: "Van" },
                        { id: "luxury", label: "Luxury" },
                        { id: "electric", label: "Electric" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center">
                          <Checkbox
                            id={`type-${item.id}`}
                            checked={vehicleTypes.includes(item.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setVehicleTypes([...vehicleTypes, item.id]);
                              } else {
                                setVehicleTypes(vehicleTypes.filter((t) => t !== item.id));
                              }
                            }}
                          />
                          <Label htmlFor={`type-${item.id}`} className="ml-2">
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange([100, 1000]);
                  setPassengerCount([]);
                  setVehicleTypes([]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Limousines List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Available Vehicles</h2>
                <p className="text-muted-foreground">
                  Showing {sortedLimousines.length} of {limousines.length} vehicles
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm whitespace-nowrap">Sort by:</span>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="capacity">Passenger Capacity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sortedLimousines.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No vehicles found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setPriceRange([100, 1000]);
                    setPassengerCount([]);
                    setVehicleTypes([]);
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedLimousines.map((limo, index) => (
                  <motion.div
                    key={limo.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-1/3 h-[200px] md:h-auto">
                          {limo.discount && (
                            <Badge className="absolute top-2 left-2 z-10 bg-red-500">{limo.discount}% OFF</Badge>
                          )}
                          {limo.featured && <Badge className="absolute top-2 right-2 z-10">Featured</Badge>}
                          <Image src={limo.image || "/placeholder.svg"} alt={limo.name} fill className="object-cover" />
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-bold">{limo.name}</h3>
                                  <Badge variant="outline" className="mt-1">
                                    {limo.type}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  {activeTab === "airport" ? (
                                    <div>
                                      <p className="text-sm text-muted-foreground">One-way transfer</p>
                                      <p className="text-2xl font-bold text-primary">
                                        $
                                        {limo.discount
                                          ? Math.round(limo.price * (1 - limo.discount / 100))
                                          : limo.price}
                                      </p>
                                      {limo.discount && (
                                        <p className="text-sm text-muted-foreground line-through">${limo.price}</p>
                                      )}
                                    </div>
                                  ) : (
                                    <div>
                                      <p className="text-sm text-muted-foreground">Per hour</p>
                                      <p className="text-2xl font-bold text-primary">
                                        $
                                        {limo.discount
                                          ? Math.round(limo.hourlyPrice * (1 - limo.discount / 100))
                                          : limo.hourlyPrice}
                                      </p>
                                      {limo.discount && (
                                        <p className="text-sm text-muted-foreground line-through">
                                          ${limo.hourlyPrice}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="flex flex-col items-center text-center p-2 bg-muted/30 rounded-lg">
                                  <Users className="h-5 w-5 text-muted-foreground mb-1" />
                                  <span className="text-sm font-medium">{limo.passengers} Passengers</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-2 bg-muted/30 rounded-lg">
                                  <Car className="h-5 w-5 text-muted-foreground mb-1" />
                                  <span className="text-sm font-medium">{limo.luggage} Luggage</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-2 bg-muted/30 rounded-lg">
                                  <Shield className="h-5 w-5 text-muted-foreground mb-1" />
                                  <span className="text-sm font-medium">Free Cancellation</span>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-4">{limo.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {limo.features.map((feature) => (
                                  <Badge key={feature} variant="outline" className="flex items-center gap-1">
                                    <Check className="h-3 w-3" />
                                    <span>{feature}</span>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <Button variant="outline" asChild>
                                <Link href={`/limousines/${limo.id}`}>View Details</Link>
                              </Button>
                              <Button>Book Now</Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {sortedLimousines.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Vehicles
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Transportation Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our range of luxury transportation options for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Airport Transfers",
                description:
                  "Start and end your journey in comfort with our reliable airport transfer service. Our professional chauffeurs will monitor your flight and adjust for any delays.",
                icon: Plane,
                features: ["Flight monitoring", "Meet & greet service", "Luggage assistance", "No hidden fees"],
              },
              {
                title: "Hourly Charters",
                description:
                  "Hire a luxury vehicle with a professional chauffeur by the hour for business meetings, sightseeing, shopping, or any other occasion requiring multiple stops.",
                icon: Clock,
                features: ["Flexible duration", "Multiple stops", "Professional chauffeurs", "Luxury vehicles"],
              },
              {
                title: "Special Occasions",
                description:
                  "Make your special day even more memorable with our luxury transportation services for weddings, anniversaries, proms, and other important celebrations.",
                icon: Gift,
                features: [
                  "Decorated vehicles",
                  "Red carpet service",
                  "Complimentary champagne",
                  "Professional attire",
                ],
              },
            ].map((service, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2 text-left w-full">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
            {[
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
            ].map((testimonial, index) => (
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

      {/* CTA Section */}
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
    </div>
  );
}

// These components are used in the Services section but aren't imported
// In a real app, you would import these from lucide-react
function Plane(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function Gift(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

function Check(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
