"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MoreHorizontal, Edit, Trash2, Eye, Download, Upload, ImageIcon } from "lucide-react"

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
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function GalleriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTour, setFilterTour] = useState("all")
  const [selectedImages, setSelectedImages] = useState<number[]>([])

  // Sample gallery images data
  const images = [
    {
      id: 1,
      title: "Swiss Alps Mountain View",
      tour: "Swiss Alps Adventure Tour",
      tourId: 1,
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-08-15",
      size: "1.2 MB",
    },
    {
      id: 2,
      title: "Lake Lucerne Boat Cruise",
      tour: "Swiss Alps Adventure Tour",
      tourId: 1,
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-08-15",
      size: "0.9 MB",
    },
    {
      id: 3,
      title: "Zermatt Village with Matterhorn",
      tour: "Swiss Alps Adventure Tour",
      tourId: 1,
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-08-15",
      size: "1.5 MB",
    },
    {
      id: 4,
      title: "Glacier Express Train",
      tour: "Swiss Alps Adventure Tour",
      tourId: 1,
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-08-15",
      size: "1.1 MB",
    },
    {
      id: 5,
      title: "Lake Como Panorama",
      tour: "Italian Lakes & Alpine Adventure",
      tourId: 2,
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-07-22",
      size: "1.3 MB",
    },
    {
      id: 6,
      title: "Mont Blanc Summit",
      tour: "Mont Blanc Trekking Experience",
      tourId: 3,
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-09-05",
      size: "1.4 MB",
    },
    {
      id: 7,
      title: "Norwegian Fjord",
      tour: "Norwegian Fjords Explorer",
      tourId: 6,
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-06-18",
      size: "1.6 MB",
    },
    {
      id: 8,
      title: "Traditional Swiss Chalet",
      tour: "Swiss Alps Adventure Tour",
      tourId: 1,
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-08-15",
      size: "1.0 MB",
    },
  ]

  // Get unique tours for filter
  const tours = Array.from(new Set(images.map((img) => img.tour)))

  // Filter images based on search query and tour filter
  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tour.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTour = filterTour === "all" || image.tour === filterTour

    return matchesSearch && matchesTour
  })

  const toggleImageSelection = (id: number) => {
    setSelectedImages((prev) => (prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]))
  }

  const selectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map((img) => img.id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gallery</h1>
          <p className="text-muted-foreground">Manage images for your tour packages.</p>
        </div>
        <Button asChild>
          <Link href="/admin/galleries/upload">
            <Upload className="mr-2 h-4 w-4" /> Upload Images
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
                placeholder="Search images..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterTour} onValueChange={setFilterTour}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by tour" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tours</SelectItem>
                  {tours.map((tour) => (
                    <SelectItem key={tour} value={tour}>
                      {tour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedImages.length > 0 && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="selectAll"
                  checked={selectedImages.length === filteredImages.length}
                  onCheckedChange={selectAll}
                />
                <label htmlFor="selectAll" className="text-sm font-medium">
                  {selectedImages.length} images selected
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No images found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filters, or upload new images.
            </p>
            <Button asChild>
              <Link href="/admin/galleries/upload">
                <Upload className="mr-2 h-4 w-4" /> Upload Images
              </Link>
            </Button>
          </div>
        ) : (
          filteredImages.map((image) => (
            <Card
              key={image.id}
              className={`overflow-hidden ${selectedImages.includes(image.id) ? "ring-2 ring-primary" : ""}`}
            >
              <div className="relative aspect-square">
                <div className="absolute top-2 left-2 z-10">
                  <Checkbox
                    checked={selectedImages.includes(image.id)}
                    onCheckedChange={() => toggleImageSelection(image.id)}
                    className="h-5 w-5 bg-white/90"
                  />
                </div>
                <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="bg-black/50 text-white border-none">
                        {image.size}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/galleries/${image.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/galleries/${image.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm truncate">{image.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{image.tour}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredImages.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <strong>{filteredImages.length}</strong> of <strong>{images.length}</strong> images
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

