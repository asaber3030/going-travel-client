"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MoreHorizontal, Trash2, Star, ArrowUpDown, CheckCircle, XCircle, MessageSquare } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      title: "Unforgettable Swiss Adventure",
      text: "This tour exceeded all my expectations! The itinerary was perfectly balanced between outdoor activities and cultural experiences. Our guide, Thomas, was incredibly knowledgeable about Swiss history and nature.",
      tour: "Swiss Alps Adventure Tour",
      date: "2023-08-15",
      status: "published",
      hasImages: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
      title: "Great tour with minor hiccups",
      text: "Overall a wonderful experience exploring the Swiss Alps. The accommodations were comfortable and the food was excellent. I especially enjoyed the hike near Zermatt with views of the Matterhorn.",
      tour: "Swiss Alps Adventure Tour",
      date: "2023-07-22",
      status: "published",
      hasImages: false,
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      title: "Perfect family vacation",
      text: "We took this tour as a family with two teenagers and it was perfect for all of us. There was enough adventure to keep the kids engaged and enough culture and relaxation for the adults.",
      tour: "Mont Blanc Trekking Experience",
      date: "2023-09-05",
      status: "published",
      hasImages: true,
    },
    {
      id: 4,
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 3,
      title: "Beautiful scenery but rushed itinerary",
      text: "Switzerland is undoubtedly beautiful and this tour covers many amazing locations. However, I felt the itinerary was too packed, with not enough time to truly enjoy each place.",
      tour: "Swiss Alps Adventure Tour",
      date: "2023-06-18",
      status: "pending",
      hasImages: false,
    },
    {
      id: 5,
      name: "Lisa Thompson",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 2,
      title: "Disappointing experience",
      text: "The tour did not meet our expectations. The accommodations were below the standard promised and the guide seemed disinterested. The only redeeming quality was the natural beauty of the locations.",
      tour: "Norwegian Fjords Explorer",
      date: "2023-05-30",
      status: "rejected",
      hasImages: false,
    },
  ]

  // Filter reviews based on search query and status filter
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || review.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground">Manage customer reviews for your tours.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="rounded-full">
            Total: {reviews.length}
          </Badge>
          <Badge variant="default" className="rounded-full">
            Published: {reviews.filter((r) => r.status === "published").length}
          </Badge>
          <Badge variant="outline" className="rounded-full">
            Pending: {reviews.filter((r) => r.status === "pending").length}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader className="p-4">
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>
            Showing {filteredReviews.length} of {reviews.length} reviews
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No reviews found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-medium">{review.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{review.tour}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{review.title}</p>
                        <p className="truncate max-w-[200px] text-sm text-muted-foreground">{review.text}</p>
                        {review.hasImages && (
                          <Badge variant="outline" className="mt-1">
                            Has Images
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          review.status === "published"
                            ? "default"
                            : review.status === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
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
                            <Link href={`/admin/reviews/${review.id}`}>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </Link>
                          </DropdownMenuItem>
                          {review.status === "pending" && (
                            <>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                <span>Approve</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                <span>Reject</span>
                              </DropdownMenuItem>
                            </>
                          )}
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
            Showing <strong>{filteredReviews.length}</strong> of <strong>{reviews.length}</strong> reviews
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

