"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Users,
  Star,
  Check,
  X,
  Globe,
  ImageIcon,
  MessageSquare,
  Tag,
  Eye,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function TourDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample tour data - in a real app, you would fetch this based on the ID
  const tour = {
    id: Number.parseInt(params.id),
    name: "Swiss Alps Adventure Tour",
    slug: "swiss-alps-adventure-tour",
    location: "Switzerland, Europe",
    duration: "7 Days / 6 Nights",
    groupSize: "Max 12 people",
    price: 1299,
    rating: 4.8,
    reviews: 124,
    description:
      "Experience the breathtaking beauty of the Swiss Alps on this unforgettable 7-day adventure tour. From snow-capped peaks to crystal-clear lakes, you'll discover the natural wonders of Switzerland while enjoying comfortable accommodations and expert-guided excursions.",
    longDescription:
      "This carefully crafted itinerary combines thrilling outdoor activities with cultural experiences, giving you a comprehensive taste of Swiss life. Whether you're hiking through alpine meadows, visiting charming villages, or sampling local cuisine, every day offers new and exciting discoveries.",
    status: "active",
    featured: true,
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    highlights: [
      "Hike through stunning alpine landscapes",
      "Visit the picturesque town of Zermatt",
      "Ride the famous Glacier Express panoramic train",
      "Explore the vibrant city of Lucerne",
      "Enjoy a traditional Swiss fondue dinner",
      "Take a boat cruise on Lake Geneva",
      "Visit a local chocolate factory",
      "Experience Swiss hospitality in mountain lodges",
    ],
    inclusions: [
      "6 nights accommodation",
      "Daily breakfast and 3 dinners",
      "Professional English-speaking guide",
      "All transportation during the tour",
      "Glacier Express train ticket",
      "Lake Geneva boat cruise",
      "Chocolate factory tour",
      "All entrance fees as per itinerary",
      "Welcome drink and farewell dinner",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Meals not mentioned in the itinerary",
      "Personal expenses",
      "Optional activities",
      "Gratuities for guides and drivers",
      "Visa fees (if applicable)",
    ],
    itinerary: [
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
        description: "After breakfast, transfer to Geneva Airport for your departure flight. End of services.",
      },
    ],
    relatedTours: [
      {
        id: 2,
        name: "Italian Lakes & Alpine Adventure",
        location: "Italy & Switzerland",
        duration: "10 Days",
        price: 1799,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        name: "Mont Blanc Trekking Experience",
        location: "France & Switzerland",
        duration: "8 Days",
        price: 1499,
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 4,
        name: "Swiss Chocolate & Cheese Tour",
        location: "Switzerland",
        duration: "5 Days",
        price: 999,
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/tours">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{tour.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{tour.location}</span>
              {tour.featured && <Badge>Featured</Badge>}
              <Badge variant={tour.status === "active" ? "default" : tour.status === "draft" ? "outline" : "secondary"}>
                {tour.status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/tour/${tour.slug}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View Live
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/tours/${tour.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Tour
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the tour and all associated data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Tour Image */}
      <div className="relative h-[300px] rounded-lg overflow-hidden">
        <Image src={tour.image || "/placeholder.svg"} alt={tour.name} fill className="object-cover" />
      </div>

      {/* Tour Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tour Information</CardTitle>
            <CardDescription>Detailed information about this tour package</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="related">Related</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground mb-4">{tour.description}</p>
                  <p className="text-muted-foreground">{tour.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Tour Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tour.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="mt-1 bg-primary/10 rounded-full p-1">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <p className="text-sm">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What's Included</h3>
                    <ul className="space-y-1">
                      {tour.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What's Not Included</h3>
                    <ul className="space-y-1">
                      {tour.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="itinerary" className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Tour Itinerary</h3>
                <div className="space-y-6">
                  {tour.itinerary.map((day, index) => (
                    <div key={index} className="relative pl-8 pb-6 border-l border-muted last:border-0 last:pb-0">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold">
                          {day.day}: {day.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mt-1">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="gallery">
                <h3 className="text-lg font-semibold mb-4">Tour Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tour.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Tour image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="related">
                <h3 className="text-lg font-semibold mb-4">Related Tours</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tour.relatedTours.map((relatedTour) => (
                    <Card key={relatedTour.id}>
                      <div className="relative h-40">
                        <Image
                          src={relatedTour.image || "/placeholder.svg"}
                          alt={relatedTour.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{relatedTour.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {relatedTour.location}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary">${relatedTour.price}</span>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/tours/${relatedTour.id}`}>View</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tour Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-bold">${tour.price} per person</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Duration</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{tour.duration}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Group Size</span>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{tour.groupSize}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-amber-500 text-amber-500" />
                  <span>{tour.rating}</span>
                  <span className="text-muted-foreground text-xs ml-1">({tour.reviews} reviews)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/admin/tours/${tour.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Tour Details
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/admin/galleries?tour=${tour.id}`}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Manage Gallery
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/admin/maps?tour=${tour.id}`}>
                  <Globe className="mr-2 h-4 w-4" />
                  Edit Tour Map
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/admin/reviews?tour=${tour.id}`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Reviews
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/admin/tours/categories`}>
                  <Tag className="mr-2 h-4 w-4" />
                  Manage Categories
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

