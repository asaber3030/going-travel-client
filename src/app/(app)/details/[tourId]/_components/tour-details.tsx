"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Check,
  X,
  Heart,
  ChevronRight,
  Star,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import TourGallery from "@/app/(app)/details/[tourId]/_components/tour-gallery";
import TourMap from "@/app/(app)/details/[tourId]/_components/tour-map";
import TourReviews from "@/app/(app)/details/[tourId]/_components/tour-reviews";
import RelatedTours from "@/app/(app)/details/[tourId]/_components/related-tours";

export default function TourDetails() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Image
          src="/zermatt-matterhorn-best-view-1.jpg?height=1080&width=1920"
          alt="Beautiful mountain landscape with lake"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <Badge className="mb-4 w-fit bg-primary hover:bg-primary">
              7 Days Tour
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              Swiss Alps Adventure Tour
            </h1>
            <div className="flex items-center gap-2 text-white/90 mb-4">
              <MapPin className="h-4 w-4" />
              <span>Switzerland, Europe</span>
            </div>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Available all year</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>7 Days / 6 Nights</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Max 12 people</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8 (124 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Booking Bar */}
      <div
        className={`z-50 bg-white border-b shadow-sm transition-all duration-300`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">Swiss Alps Adventure Tour</h2>
            <p className="text-primary font-bold">
              $1,299{" "}
              <span className="text-muted-foreground font-normal text-sm">
                per person
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm">Book Now</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="mb-12">
              <TabsList className="w-full justify-start mb-6 overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="space-y-8"
                >
                  {/* Tour Description */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
                    <p className="text-muted-foreground mb-4">
                      Experience the breathtaking beauty of the Swiss Alps on
                      this unforgettable 7-day adventure tour. From snow-capped
                      peaks to crystal-clear lakes, you'll discover the natural
                      wonders of Switzerland while enjoying comfortable
                      accommodations and expert-guided excursions.
                    </p>
                    <p className="text-muted-foreground">
                      This carefully crafted itinerary combines thrilling
                      outdoor activities with cultural experiences, giving you a
                      comprehensive taste of Swiss life. Whether you're hiking
                      through alpine meadows, visiting charming villages, or
                      sampling local cuisine, every day offers new and exciting
                      discoveries.
                    </p>
                  </section>

                  {/* Tour Highlights */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Tour Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Hike through stunning alpine landscapes",
                        "Visit the picturesque town of Zermatt",
                        "Ride the famous Glacier Express panoramic train",
                        "Explore the vibrant city of Lucerne",
                        "Enjoy a traditional Swiss fondue dinner",
                        "Take a boat cruise on Lake Geneva",
                        "Visit a local chocolate factory",
                        "Experience Swiss hospitality in mountain lodges",
                      ].map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="mt-1 bg-primary/10 rounded-full p-1">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <p>{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Inclusions & Exclusions */}
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">
                        What's Included
                      </h2>
                      <ul className="space-y-2">
                        {[
                          "6 nights accommodation",
                          "Daily breakfast and 3 dinners",
                          "Professional English-speaking guide",
                          "All transportation during the tour",
                          "Glacier Express train ticket",
                          "Lake Geneva boat cruise",
                          "Chocolate factory tour",
                          "All entrance fees as per itinerary",
                          "Welcome drink and farewell dinner",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-4">
                        What's Not Included
                      </h2>
                      <ul className="space-y-2">
                        {[
                          "International flights",
                          "Travel insurance",
                          "Meals not mentioned in the itinerary",
                          "Personal expenses",
                          "Optional activities",
                          "Gratuities for guides and drivers",
                          "Visa fees (if applicable)",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* Essential Trip Information */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">
                      Essential Trip Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="font-bold mb-2">Best Time to Visit</h3>
                          <p className="text-muted-foreground">
                            June to September offers the best weather for hiking
                            and outdoor activities. Winter months
                            (December-March) are ideal for winter sports
                            enthusiasts.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="font-bold mb-2">Physical Rating</h3>
                          <p className="text-muted-foreground">
                            Moderate - Some activities require a reasonable
                            level of fitness. Hiking distances range from 5-10km
                            per day with moderate elevation gain.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="font-bold mb-2">Accommodation</h3>
                          <p className="text-muted-foreground">
                            3-4 star hotels and mountain lodges. All rooms have
                            private bathrooms and essential amenities.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <h3 className="font-bold mb-2">Transportation</h3>
                          <p className="text-muted-foreground">
                            Private minivan, scenic train rides, and occasional
                            public transportation for authentic local
                            experience.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Read Before You Go */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">
                      Read Before You Go
                    </h2>
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <div>
                          <h3 className="font-bold mb-1">Packing Essentials</h3>
                          <p className="text-muted-foreground">
                            Comfortable hiking boots, layered clothing, rain
                            jacket, sunscreen, hat, daypack, water bottle, and
                            camera. Detailed packing list will be provided after
                            booking.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Currency</h3>
                          <p className="text-muted-foreground">
                            Swiss Franc (CHF) is the local currency. Credit
                            cards are widely accepted, but it's advisable to
                            carry some cash for small purchases.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Weather</h3>
                          <p className="text-muted-foreground">
                            Mountain weather can change rapidly. Be prepared for
                            sudden temperature drops and occasional rain, even
                            in summer.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Travel Insurance</h3>
                          <p className="text-muted-foreground">
                            Comprehensive travel insurance is strongly
                            recommended, covering medical emergencies, trip
                            cancellation, and adventure activities.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </section>
                </motion.div>
              </TabsContent>

              <TabsContent value="itinerary">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-4">Tour Itinerary</h2>

                  {[
                    {
                      day: "Day 1",
                      title: "Arrival in Zurich",
                      description:
                        "Arrive at Zurich Airport where you'll be met by your guide. Transfer to your hotel in the city center. Enjoy a welcome dinner and briefing about the upcoming adventure.",
                    },
                    {
                      day: "Day 2",
                      title: "Zurich to Lucerne",
                      description:
                        "After breakfast, take a scenic drive to Lucerne. Explore the charming old town, visit the iconic Chapel Bridge, and enjoy a boat cruise on Lake Lucerne. Overnight in Lucerne.",
                    },
                    {
                      day: "Day 3",
                      title: "Mount Pilatus Excursion",
                      description:
                        "Experience the famous Golden Round Trip to Mount Pilatus, combining a boat ride, the world's steepest cogwheel railway, and a panoramic gondola. Enjoy breathtaking views of the Swiss Alps.",
                    },
                    {
                      day: "Day 4",
                      title: "Glacier Express to Zermatt",
                      description:
                        "Board the legendary Glacier Express panoramic train for a spectacular journey through the heart of the Alps. Arrive in Zermatt, a car-free village at the foot of the Matterhorn.",
                    },
                    {
                      day: "Day 5",
                      title: "Matterhorn Glacier Paradise",
                      description:
                        "Take the cable car to Matterhorn Glacier Paradise for stunning views of the iconic mountain. Optional hiking or visit to the Glacier Palace. Enjoy a traditional Swiss fondue dinner.",
                    },
                    {
                      day: "Day 6",
                      title: "Zermatt to Montreux",
                      description:
                        "Travel to Montreux on Lake Geneva. Visit the famous Chillon Castle and take a relaxing boat cruise on the lake. Farewell dinner featuring local specialties.",
                    },
                    {
                      day: "Day 7",
                      title: "Departure Day",
                      description:
                        "After breakfast, transfer to Geneva Airport for your departure flight. End of services.",
                    },
                  ].map((day, index) => (
                    <div
                      key={index}
                      className="relative pl-8 pb-8 border-l border-muted last:border-0 last:pb-0"
                    >
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {day.day}: {day.title}
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="gallery">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-2xl font-bold mb-6">Tour Gallery</h2>
                  <TourGallery />
                </motion.div>
              </TabsContent>

              <TabsContent value="map">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-2xl font-bold mb-6">Tour Map</h2>
                  <TourMap />
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <h2 className="text-2xl font-bold mb-6">Tour Reviews</h2>
                  <TourReviews />
                </motion.div>
              </TabsContent>

              <TabsContent value="faq">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-4">
                    Frequently Asked Questions
                  </h2>

                  {[
                    {
                      question: "Is this tour suitable for solo travelers?",
                      answer:
                        "Many of our guests are solo travelers. It's a great way to meet like-minded people and share the experience of exploring Switzerland.",
                    },
                    {
                      question: "What is the group size?",
                      answer:
                        "We keep our groups small with a maximum of 12 participants to ensure a personalized experience and minimize environmental impact.",
                    },
                    {
                      question: "How physically demanding is this tour?",
                      answer:
                        "This tour has a moderate physical rating. You should be able to walk for 3-4 hours at a relaxed pace with some elevation gain. The hikes can be adjusted based on group preferences.",
                    },
                    {
                      question: "What type of accommodation can I expect?",
                      answer:
                        "We stay in a mix of comfortable 3-4 star hotels and authentic mountain lodges. All accommodations have private bathrooms and essential amenities.",
                    },
                    {
                      question:
                        "Is there a single supplement for solo travelers?",
                      answer:
                        "Yes, there is a single supplement if you prefer a private room. Please contact us for details. We can also match you with another solo traveler of the same gender to avoid the supplement.",
                    },
                    {
                      question: "What is the cancellation policy?",
                      answer:
                        "Full refund if canceled 60 days before departure. 50% refund if canceled 30-59 days before departure. No refund if canceled less than 30 days before departure. We strongly recommend travel insurance.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>

            {/* Related Tours */}
            <section className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Related Tours</h2>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <RelatedTours />
            </section>
          </div>

          {/* Right Column - Booking & Price */}
          <div className="lg:col-span-1 ">
            <div className="sticky top-28">
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Starting from
                    </p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary">
                        $1,299
                      </span>
                      <span className="text-muted-foreground ml-1">
                        per person
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      *Based on double occupancy
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Base price × 2 travelers</span>
                      <span>$2,598</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>$156</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total price</span>
                      <span>$2,754</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full">Book Now</Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Inquire
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4">Need Help?</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">
                        Have questions about this tour?
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Our travel experts are ready to assist you.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Call Us
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
