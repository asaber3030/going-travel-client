"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plane, Car, Bus, Star, Clock, Users, ArrowRight } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data for listings
const mockListings = [
  {
    id: "car-1",
    type: "car",
    title: "Economy Car",
    description: "Compact and fuel-efficient car for city travel",
    price: 45,
    rating: 4.5,
    duration: "Unlimited",
    capacity: 4,
    image: "/hq720.jpg?height=200&width=300",
    from: "Downtown",
    to: "Airport",
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
    image: "/hq720.jpg?height=200&width=300",
    from: "Airport",
    to: "Resort Area",
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
    image: "/hq720.jpg?height=200&width=300",
    from: "Central Station",
    to: "Beach Resort",
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
    image: "/hq720.jpg?height=200&width=300",
    from: "City Center",
    to: "Mountain Lodge",
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
    image: "/hq720.jpg?height=200&width=300",
    from: "Local Airport",
    to: "International Hub",
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
    image: "/hq720.jpg?height=200&width=300",
    from: "Main Terminal",
    to: "Vacation Island",
  },
]

interface ListingsGridProps {
  type: "all" | "car" | "bus" | "plane"
}

export function ListingsGrid({ type }: ListingsGridProps) {
  const [listings, setListings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with delay
    setIsLoading(true)
    setTimeout(() => {
      const filteredListings = type === "all" ? mockListings : mockListings.filter((listing) => listing.type === type)
      setListings(filteredListings)
      setIsLoading(false)
    }, 1000)
  }, [type])

  const getIcon = (type: string) => {
    switch (type) {
      case "car":
        return <Car className="h-5 w-5" />
      case "bus":
        return <Bus className="h-5 w-5" />
      case "plane":
        return <Plane className="h-5 w-5" />
      default:
        return null
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (isLoading) {
    return <ListingsSkeleton />
  }

  return (
    <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={container} initial="hidden" animate="show">
      {listings.map((listing) => (
        <motion.div key={listing.id} variants={item}>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={listing.image || "/hq720.jpg"}
                alt={listing.title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="mb-2 flex w-fit items-center gap-1">
                    {getIcon(listing.type)}
                    {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}
                  </Badge>
                  <CardTitle className="text-xl">{listing.title}</CardTitle>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-yellow-50 px-2 py-1 text-sm text-yellow-700">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  {listing.rating}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                <div>{listing.from}</div>
                <ArrowRight className="h-3 w-3" />
                <div>{listing.to}</div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-500">{listing.description}</p>
              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {listing.duration}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-4 w-4 text-gray-400" />
                  {listing.capacity}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              <div className="text-lg font-bold">${listing.price}</div>
              <Link href={`/booking/${listing.id}`}>
                <Button>Inquire</Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

export function ListingsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-video w-full animate-pulse bg-gray-200"></div>
          <CardHeader className="p-4">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="mt-2 h-6 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200"></div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="mt-1 h-4 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="mt-4 flex gap-4">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 pt-0">
            <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-9 w-24 animate-pulse rounded bg-gray-200"></div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
