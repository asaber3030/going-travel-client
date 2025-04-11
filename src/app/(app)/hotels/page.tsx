"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Wifi, Coffee, Dumbbell, Utensils, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [starRating, setStarRating] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("recommended");
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "/hotel.jpg",
      title: "Luxury Stays in Paradise",
      subtitle: "Discover our handpicked collection of premium hotels",
    },
    {
      image: "/hotel.jpg",
      title: "Urban Retreats",
      subtitle: "Find your perfect city escape",
    },
    {
      image: "/hotel.jpg",
      title: "Mountain Lodges",
      subtitle: "Wake up to breathtaking alpine views",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sample hotels data
  const hotels = [
    {
      id: 1,
      name: "Grand Alpine Resort & Spa",
      location: "Zermatt, Switzerland",
      price: 350,
      rating: 5,
      reviews: 124,
      image: "/hotel.jpg",
      amenities: ["wifi", "spa", "gym", "restaurant", "pool"],
      description:
        "Luxury mountain resort with stunning views of the Matterhorn, featuring a world-class spa and gourmet dining options.",
      featured: true,
      discount: 15,
    },
    {
      id: 2,
      name: "Lake View Hotel",
      location: "Lucerne, Switzerland",
      price: 280,
      rating: 4.5,
      reviews: 86,
      image: "/hotel.jpg",
      amenities: ["wifi", "restaurant", "pool"],
      description:
        "Elegant hotel situated on the shores of Lake Lucerne, offering panoramic water views and easy access to the city center.",
      featured: false,
    },
    {
      id: 3,
      name: "Boutique Chalet Collection",
      location: "Interlaken, Switzerland",
      price: 420,
      rating: 4.8,
      reviews: 92,
      image: "/hotel.jpg",
      amenities: ["wifi", "spa", "restaurant"],
      description:
        "Charming luxury chalets nestled between two lakes, providing a perfect base for exploring the Jungfrau region.",
      featured: true,
    },
    {
      id: 4,
      name: "Urban Retreat Hotel",
      location: "Zurich, Switzerland",
      price: 310,
      rating: 4.6,
      reviews: 78,
      image: "/hotel.jpg",
      amenities: ["wifi", "gym", "restaurant"],
      description: "Contemporary hotel in the heart of Zurich, combining modern design with Swiss hospitality.",
      featured: false,
      discount: 10,
    },
    {
      id: 5,
      name: "Mountain Lodge & Spa",
      location: "Grindelwald, Switzerland",
      price: 390,
      rating: 4.9,
      reviews: 104,
      image: "/hotel.jpg",
      amenities: ["wifi", "spa", "gym", "restaurant", "pool"],
      description:
        "Traditional Swiss lodge with modern amenities, offering direct access to hiking trails and ski slopes.",
      featured: true,
    },
    {
      id: 6,
      name: "Lakeside Luxury Hotel",
      location: "Lugano, Switzerland",
      price: 450,
      rating: 5,
      reviews: 116,
      image: "/hotel.jpg",
      amenities: ["wifi", "spa", "gym", "restaurant", "pool"],
      description:
        "Mediterranean-inspired luxury hotel on the shores of Lake Lugano, featuring lush gardens and an infinity pool.",
      featured: false,
    },
  ];

  // Filter hotels based on search and filters
  const filteredHotels = hotels.filter((hotel) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Price range filter
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];

    // Star rating filter
    const matchesRating = starRating.length === 0 || starRating.includes(Math.floor(hotel.rating).toString());

    // Amenities filter
    const matchesAmenities = amenities.length === 0 || amenities.every((amenity) => hotel.amenities.includes(amenity));

    return matchesSearch && matchesPrice && matchesRating && matchesAmenities;
  });

  // Sort hotels based on selected option
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
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

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "spa":
        return <Coffee className="h-4 w-4" />;
      case "gym":
        return <Dumbbell className="h-4 w-4" />;
      case "restaurant":
        return <Utensils className="h-4 w-4" />;
      default:
        return null;
    }
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

        {/* Search Box */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-10">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Destination</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Where are you going?" className="pl-9" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Check-in / Check-out</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Guests</label>
                  <Select defaultValue="2">
                    <SelectTrigger>
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Search Hotels</Button>
                </div>
              </div>
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
                      defaultValue={[50, 500]}
                      min={50}
                      max={500}
                      step={10}
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
                    <h4 className="font-medium mb-2">Star Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={starRating.includes(rating.toString())}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setStarRating([...starRating, rating.toString()]);
                              } else {
                                setStarRating(starRating.filter((r) => r !== rating.toString()));
                              }
                            }}
                          />
                          <Label htmlFor={`rating-${rating}`} className="ml-2 flex items-center">
                            {[...Array(rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                            ))}
                            {[...Array(5 - rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-muted-foreground" />
                            ))}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Amenities</h4>
                    <div className="space-y-2">
                      {[
                        { id: "wifi", label: "Free WiFi" },
                        { id: "spa", label: "Spa" },
                        { id: "gym", label: "Fitness Center" },
                        { id: "restaurant", label: "Restaurant" },
                        { id: "pool", label: "Swimming Pool" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center">
                          <Checkbox
                            id={`amenity-${item.id}`}
                            checked={amenities.includes(item.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setAmenities([...amenities, item.id]);
                              } else {
                                setAmenities(amenities.filter((a) => a !== item.id));
                              }
                            }}
                          />
                          <Label htmlFor={`amenity-${item.id}`} className="ml-2">
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
                  setPriceRange([50, 500]);
                  setStarRating([]);
                  setAmenities([]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Hotels List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Available Hotels</h2>
                <p className="text-muted-foreground">
                  Showing {sortedHotels.length} of {hotels.length} hotels
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
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sortedHotels.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No hotels found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setPriceRange([50, 500]);
                    setStarRating([]);
                    setAmenities([]);
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedHotels.map((hotel, index) => (
                  <motion.div
                    key={hotel.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-1/3 h-[200px] md:h-auto">
                          {hotel.discount && (
                            <Badge className="absolute top-2 left-2 z-10 bg-red-500">{hotel.discount}% OFF</Badge>
                          )}
                          {hotel.featured && <Badge className="absolute top-2 right-2 z-10">Featured</Badge>}
                          <Image
                            src={hotel.image || "/placeholder.svg"}
                            alt={hotel.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-bold">{hotel.name}</h3>
                                <div className="flex items-center">
                                  <Star className="h-5 w-5 fill-amber-500 text-amber-500 mr-1" />
                                  <span className="font-medium">{hotel.rating}</span>
                                  <span className="text-muted-foreground text-sm ml-1">({hotel.reviews})</span>
                                </div>
                              </div>
                              <div className="flex items-center text-muted-foreground mb-4">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{hotel.location}</span>
                              </div>
                              <p className="text-muted-foreground mb-4">{hotel.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {hotel.amenities.map((amenity) => (
                                  <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                                    {getAmenityIcon(amenity)}
                                    <span className="capitalize">{amenity}</span>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Price per night</p>
                                <div className="flex items-baseline">
                                  {hotel.discount ? (
                                    <>
                                      <span className="text-2xl font-bold text-primary">
                                        ${Math.round(hotel.price * (1 - hotel.discount / 100))}
                                      </span>
                                      <span className="text-muted-foreground line-through ml-2">${hotel.price}</span>
                                    </>
                                  ) : (
                                    <span className="text-2xl font-bold text-primary">${hotel.price}</span>
                                  )}
                                </div>
                              </div>
                              <Button asChild>
                                <Link href={`/hotels/${hotel.id}`}>View Details</Link>
                              </Button>
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
            {sortedHotels.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Hotels
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Popular Locations</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Hotel Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular hotel destinations with exceptional accommodations and experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Zermatt", country: "Switzerland", image: "/hotel.jpg", hotels: 12 },
              { name: "Lucerne", country: "Switzerland", image: "/hotel.jpg", hotels: 8 },
              {
                name: "Interlaken",
                country: "Switzerland",
                image: "/hotel.jpg",
                hotels: 10,
              },
              { name: "Zurich", country: "Switzerland", image: "/hotel.jpg", hotels: 15 },
            ].map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group rounded-xl overflow-hidden h-[250px]"
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center text-white/90 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{destination.country}</span>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">{destination.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-sm">{destination.hotels} hotels</span>
                      <Link
                        href={`#${destination.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-white flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Explore <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get Exclusive Hotel Deals</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for exclusive hotel deals, special offers, and travel inspiration
            </p>

            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input placeholder="Your email address" className="flex-1" />
              <Button>Subscribe</Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive travel-related emails
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
