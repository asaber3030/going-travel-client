"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FeaturedDestinations from "@/app/(app)/_components/featured-destinations";
import PopularTours from "@/app/(app)/_components/popular-tours";
import TestimonialSlider from "@/app/(app)/_components/testimonial-slider";

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "/Hurghada.jpg?height=1080&width=1920",
      title: "Discover Hurghada",
      subtitle: "Dive into the crystal-clear waters of the Red Sea",
    },
    {
      image: "/Aswan.jpg?height=1080&width=1920",
      title: "Explore Aswan's Timeless Beauty",
      subtitle: "Journey through ancient history and vibrant culture",
    },
    {
      image: "/Cairo.jpg?height=1080&width=1920",
      title: "Cairo's Mystical Adventures",
      subtitle: "Uncover the secrets of the pyramids and bustling bazaars",
    },
    {
      image: "/HurghadaSea.jpg?height=1080&width=1920",
      title: "Hurghada's Serene Escapes",
      subtitle: "Sail across the serene waters of the Red Sea",
    },
    {
      image: "/Cairo2.jpg?height=1080&width=1920",
      title: "Pharaonic Village Time Travel",
      subtitle: "Step back in time to the era of the Pharaohs",
    },
    {
      image: "/Alexandria2.jpg?height=1080&width=1920",
      title: "Alexandria's Legendary Legacy",
      subtitle: "Explore the legendary city of Alexander the Great",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
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
                  animate={{
                    opacity: index === currentSlide ? 1 : 0,
                    y: index === currentSlide ? 0 : 30,
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-3xl"
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                  <Button size="lg" className="rounded-full px-8">
                    Explore Tours <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        ))}

        {/* Search Box */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-10">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Destination
                  </label>
                  <Input placeholder="Where do you want to go?" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">When</label>
                  <Input type="date" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Search</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Explore the World</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Destinations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of breathtaking destinations
              around the globe
            </p>
          </div>

          <FeaturedDestinations />
        </div>
      </section>

      {/* Popular Tours */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Best Selling Tours</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Tour Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular tour packages loved by travelers
              worldwide
            </p>
          </div>

          <PopularTours />

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Tours <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative h-[500px] rounded-xl overflow-hidden"
            >
              <Image
                src="/Cairo2.jpg?height=600&width=800"
                alt="Travel experience"
                fill
                className="object-cover"
              />

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">10+ Years of Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      Crafting unforgettable travel experiences since 2013
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-6"
            >
              <Badge>About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Creating Unforgettable Travel Experiences
              </h2>
              <p className="text-muted-foreground">
                At Going Travel, we believe that travel should be
                transformative. Our expertly crafted tours combine breathtaking
                destinations with authentic experiences, allowing you to truly
                connect with the places you visit.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {[
                  {
                    title: "Expert Local Guides",
                    description:
                      "Our guides are passionate locals with deep knowledge of each destination",
                  },
                  {
                    title: "Small Group Sizes",
                    description:
                      "Maximum of 12 travelers for a more personalized experience",
                  },
                  {
                    title: "Sustainable Travel",
                    description:
                      "Committed to responsible tourism practices that respect local communities",
                  },
                  {
                    title: "24/7 Support",
                    description:
                      "Dedicated support team available throughout your journey",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="border-none shadow-none bg-muted/50"
                  >
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button>
                Learn More About Us <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parallax Banner */}
      <section
        className="relative h-[400px] bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/Hurghada.jpg?height=1080&width=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black/60">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl mb-8 max-w-2xl">
              Join thousands of satisfied travelers who have experienced our
              carefully crafted tours
            </p>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Start Planning Today
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2">Traveler Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Read authentic reviews from travelers who have experienced our
              tours
            </p>
          </div>

          <TestimonialSlider />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get Inspired for Your Next Trip
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for exclusive travel tips, special
              offers, and destination insights
            </p>

            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input placeholder="Your email address" className="flex-1" />
              <Button>Subscribe</Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive travel-related emails
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Alpine Adventures</h3>
              <p className="text-gray-400 mb-4">
                Creating unforgettable travel experiences since 2013. Our
                mission is to help you discover the world in comfort and style.
              </p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "youtube"].map(
                  (social) => (
                    <Link
                      key={social}
                      href={`#${social}`}
                      className="bg-gray-800 hover:bg-primary transition-colors p-2 rounded-full"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="w-5 h-5"></div>
                    </Link>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Destinations</h3>
              <ul className="space-y-2">
                {[
                  "Switzerland",
                  "Italy",
                  "France",
                  "Austria",
                  "Germany",
                  "Norway",
                ].map((destination) => (
                  <li key={destination}>
                    <Link
                      href={`#${destination.toLowerCase()}`}
                      className="text-gray-400 hover:text-white"
                    >
                      {destination}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: "About Us", href: "#about" },
                  { name: "Tours", href: "#tours" },
                  { name: "Destinations", href: "#destinations" },
                  { name: "Blog", href: "#blog" },
                  { name: "Contact", href: "#contact" },
                  { name: "FAQ", href: "#faq" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-gray-400">
                <li>123 Alpine Street, Zurich, Switzerland</li>
                <li>Phone: +41 123 456 789</li>
                <li>Email: info@alpineadventures.com</li>
                <li>Hours: Mon-Fri 9am-6pm CET</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>
              © {new Date().getFullYear()} Alpine Adventures. All rights
              reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#terms" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="#cookies" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
