"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Star, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestimonialsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "United States",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Our Swiss Alps Adventure was the trip of a lifetime! The itinerary was perfectly balanced between outdoor activities and cultural experiences. Our guide was incredibly knowledgeable and made the experience truly special.",
      tour: "Swiss Alps Adventure Tour",
      date: "2023-08-15",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Canada",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
      text: "The Italian Lakes & Alpine Adventure was a wonderful experience. The scenery was spectacular and the tour was well-organized. I especially enjoyed the boat cruise on Lake Como and the visit to the charming villages.",
      tour: "Italian Lakes & Alpine Adventure",
      date: "2023-07-22",
    },
    {
      id: 3,
      name: "Emma Wilson",
      location: "Australia",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "We took the Mont Blanc Trekking Experience as a family with two teenagers and it was perfect for all of us. There was enough adventure to keep the kids engaged and enough culture and relaxation for the adults.",
      tour: "Mont Blanc Trekking Experience",
      date: "2023-09-05",
    },
    {
      id: 4,
      name: "David Rodriguez",
      location: "Spain",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 3,
      text: "The Norwegian Fjords Explorer tour had breathtaking scenery, but I felt the itinerary was too rushed. We didn't have enough time to truly enjoy each location. The accommodations were good though.",
      tour: "Norwegian Fjords Explorer",
      date: "2023-06-18",
    },
  ]

  // Filter testimonials based on search query
  const filteredTestimonials = testimonials.filter((testimonial) => {
    return (
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">Manage customer testimonials for your tours.</p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <Plus className="mr-2 h-4 w-4" /> Add Testimonial
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search testimonials..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Table */}
      <Card>
        <CardHeader className="p-4">
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>
            Showing {filteredTestimonials.length} of {testimonials.length} testimonials
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Testimonial</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTestimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No testimonials found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{testimonial.tour}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="truncate max-w-[300px]">{testimonial.text}</p>
                    </TableCell>
                    <TableCell>{new Date(testimonial.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredTestimonials.length}</strong> of <strong>{testimonials.length}</strong>{" "}
            testimonials
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

