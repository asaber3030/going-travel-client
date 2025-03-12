"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, MapPin, ArrowUpDown } from "lucide-react"

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

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample destinations data
  const destinations = [
    {
      id: 1,
      name: "Swiss Alps",
      country: "Switzerland",
      continent: "Europe",
      tours: 12,
      image: "/placeholder.svg?height=80&width=120",
      featured: true,
    },
    {
      id: 2,
      name: "Lake Como",
      country: "Italy",
      continent: "Europe",
      tours: 8,
      image: "/placeholder.svg?height=80&width=120",
      featured: false,
    },
    {
      id: 3,
      name: "Mont Blanc",
      country: "France",
      continent: "Europe",
      tours: 10,
      image: "/placeholder.svg?height=80&width=120",
      featured: true,
    },
    {
      id: 4,
      name: "Hallstatt",
      country: "Austria",
      continent: "Europe",
      tours: 6,
      image: "/placeholder.svg?height=80&width=120",
      featured: false,
    },
    {
      id: 5,
      name: "Norwegian Fjords",
      country: "Norway",
      continent: "Europe",
      tours: 9,
      image: "/placeholder.svg?height=80&width=120",
      featured: true,
    },
    {
      id: 6,
      name: "Bavarian Alps",
      country: "Germany",
      continent: "Europe",
      tours: 7,
      image: "/placeholder.svg?height=80&width=120",
      featured: false,
    },
  ]

  // Filter destinations based on search query
  const filteredDestinations = destinations.filter((destination) => {
    return (
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.continent.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Destinations</h1>
          <p className="text-muted-foreground">Manage your tour destinations.</p>
        </div>
        <Button asChild>
          <Link href="/admin/destinations/new">
            <Plus className="mr-2 h-4 w-4" /> Add Destination
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
                placeholder="Search destinations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Destinations Table */}
      <Card>
        <CardHeader className="p-4">
          <CardTitle>All Destinations</CardTitle>
          <CardDescription>
            Showing {filteredDestinations.length} of {destinations.length} destinations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destination</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Continent</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Tours
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDestinations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No destinations found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDestinations.map((destination) => (
                  <TableRow key={destination.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-16 overflow-hidden rounded">
                          <Image
                            src={destination.image || "/placeholder.svg"}
                            alt={destination.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-medium">{destination.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{destination.country}</TableCell>
                    <TableCell>{destination.continent}</TableCell>
                    <TableCell>{destination.tours}</TableCell>
                    <TableCell>
                      {destination.featured ? (
                        <Badge>Featured</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
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
                            <Link href={`/admin/destinations/${destination.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>View Tours</span>
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
            Showing <strong>{filteredDestinations.length}</strong> of <strong>{destinations.length}</strong>{" "}
            destinations
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

