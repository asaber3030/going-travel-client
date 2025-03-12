"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  Star,
} from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample tours data
  const tours = [
    {
      id: 1,
      name: "Swiss Alps Adventure Tour",
      location: "Switzerland",
      duration: "7 Days",
      price: 1299,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=80&width=120",
      status: "active",
      featured: true,
    },
    {
      id: 2,
      name: "Italian Lakes & Alpine Adventure",
      location: "Italy & Switzerland",
      duration: "10 Days",
      price: 1799,
      rating: 4.7,
      reviews: 86,
      image: "/placeholder.svg?height=80&width=120",
      status: "active",
      featured: false,
    },
    {
      id: 3,
      name: "Mont Blanc Trekking Experience",
      location: "France & Switzerland",
      duration: "8 Days",
      price: 1499,
      rating: 4.9,
      reviews: 112,
      image: "/placeholder.svg?height=80&width=120",
      status: "active",
      featured: false,
    },
    {
      id: 4,
      name: "Swiss Chocolate & Cheese Tour",
      location: "Switzerland",
      duration: "5 Days",
      price: 999,
      rating: 4.8,
      reviews: 74,
      image: "/placeholder.svg?height=80&width=120",
      status: "active",
      featured: false,
    },
    {
      id: 5,
      name: "Alpine Winter Wonderland",
      location: "Switzerland & Austria",
      duration: "7 Days",
      price: 1399,
      rating: 4.6,
      reviews: 58,
      image: "/placeholder.svg?height=80&width=120",
      status: "draft",
      featured: false,
    },
    {
      id: 6,
      name: "Norwegian Fjords Explorer",
      location: "Norway",
      duration: "9 Days",
      price: 1699,
      rating: 4.9,
      reviews: 92,
      image: "/placeholder.svg?height=80&width=120",
      status: "active",
      featured: true,
    },
    {
      id: 7,
      name: "Bavarian Alps Hiking Tour",
      location: "Germany",
      duration: "6 Days",
      price: 1199,
      rating: 4.5,
      reviews: 42,
      image: "/placeholder.svg?height=80&width=120",
      status: "inactive",
      featured: false,
    },
  ]

  // Filter tours based on search query and status filter
  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || tour.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tours</h1>
          <p className="text-muted-foreground">Manage your tour packages and details.</p>
        </div>
        <Button asChild>
          <Link href="/admin/tours/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Tour
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tours..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tours Table */}
      <Card>
        <CardHeader className="p-4">
          <CardTitle>All Tours</CardTitle>
          <CardDescription>
            Showing {filteredTours.length} of {tours.length} tours
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Price
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTours.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No tours found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-16 overflow-hidden rounded">
                          <Image src={tour.image || "/placeholder.svg"} alt={tour.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-medium">{tour.name}</div>
                          {tour.featured && (
                            <Badge variant="secondary" className="mt-1">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                        {tour.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                        {tour.duration}
                      </div>
                    </TableCell>
                    <TableCell>${tour.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" />
                        <span>{tour.rating}</span>
                        <span className="text-muted-foreground text-xs ml-1">({tour.reviews})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tour.status === "active" ? "default" : tour.status === "draft" ? "outline" : "secondary"
                        }
                      >
                        {tour.status}
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
                            <Link href={`/admin/tours/${tour.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/tours/${tour.id}/edit`}>
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
            Showing <strong>{filteredTours.length}</strong> of <strong>{tours.length}</strong> tours
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

