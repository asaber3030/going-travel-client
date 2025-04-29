import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Users, Car, Shield, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UILimousine, UILimousineFeature } from "@/types/ui"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
  limousines: UILimousine[]
}

export default function LimousinesList({ limousines }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("recommended")

  // Filter limousines based on search query
  const filteredLimousines = limousines.filter((limo) => {
    const matchesSearch =
      searchQuery === "" ||
      limo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      limo.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      limo.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  // Sort limousines based on selected option
  const sortedLimousines = [...filteredLimousines].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price_per_hour - b.price_per_hour
      case "price-high":
        return b.price_per_hour - a.price_per_hour
      case "capacity":
        return b.max_passengers - a.max_passengers
      default:
        return 0 // Default sorting (no specific order)
    }
  })

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div>
      <div className="lg:col-span-3 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Available Vehicles</h2>
            <p className="text-muted-foreground">
              Showing {sortedLimousines.length} of {limousines.length} vehicles
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-auto"
            />
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
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSortOption("recommended")
              }}
            >
              Reset Filters
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
                              <p className="text-sm text-muted-foreground">Per hour</p>
                              <p className="text-2xl font-bold text-primary">${limo.price_per_hour}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex flex-col items-center text-center p-2 bg-muted/30 rounded-lg">
                              <Users className="h-5 w-5 text-muted-foreground mb-1" />
                              <span className="text-sm font-medium">{limo.max_passengers} Passengers</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-2 bg-muted/30 rounded-lg">
                              <Car className="h-5 w-5 text-muted-foreground mb-1" />
                              <span className="text-sm font-medium">Category ID: {limo.category_id}</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-2 bg-muted/30 rounded-lg">
                              <Shield className="h-5 w-5 text-muted-foreground mb-1" />
                              <span className="text-sm font-medium">Location ID: {limo.location_id}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4">{limo.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {limo.features.map((feature: UILimousineFeature) => (
                              <Badge key={feature.id} variant="outline" className="flex items-center gap-1">
                                <Check className="h-3 w-3" />
                                <span>{feature.vehicle_features}</span>
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
      </div>
    </div>
  )
}
