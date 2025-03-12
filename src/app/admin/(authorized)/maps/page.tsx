"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  MapIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MapsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample maps data
  const maps = [
    {
      id: 1,
      title: "Swiss Alps Adventure Tour Route",
      tour: "Swiss Alps Adventure Tour",
      tourId: 1,
      preview: "/placeholder.svg?height=300&width=400",
      locations: 7,
      lastUpdated: "2023-08-15",
    },
    {
      id: 2,
      title: "Italian Lakes & Alpine Adventure Route",
      tour: "Italian Lakes & Alpine Adventure",
      tourId: 2,
      preview: "/placeholder.svg?height=300&width=400",
      locations: 9,
      lastUpdated: "2023-07-22",
    },
    {
      id: 3,
      title: "Mont Blanc Trekking Experience Route",
      tour: "Mont Blanc Trekking Experience",
      tourId: 3,
      preview: "/placeholder.svg?height=300&width=400",
      locations: 6,
      lastUpdated: "2023-09-05",
    },
    {
      id: 4,
      title: "Swiss Chocolate & Cheese Tour Route",
      tour: "Swiss Chocolate & Cheese Tour",
      tourId: 4,
      preview: "/placeholder.svg?height=300&width=400",
      locations: 5,
      lastUpdated: "2023-06-18",
    },
    {
      id: 5,
      title: "Norwegian Fjords Explorer Route",
      tour: "Norwegian Fjords Explorer",
      tourId: 6,
      preview: "/placeholder.svg?height=300&width=400",
      locations: 8,
      lastUpdated: "2023-05-30",
    },
  ];

  // Filter maps based on search query
  const filteredMaps = maps.filter((map) => {
    return (
      map.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      map.tour.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tour Maps</h1>
          <p className="text-muted-foreground">
            Manage interactive maps for your tour packages.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/maps/new">
            <Plus className="mr-2 h-4 w-4" /> Create New Map
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search maps..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Maps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMaps.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <MapIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No maps found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search, or create a new map.
            </p>
            <Button asChild>
              <Link href="/admin/maps/new">
                <Plus className="mr-2 h-4 w-4" /> Create New Map
              </Link>
            </Button>
          </div>
        ) : (
          filteredMaps.map((map) => (
            <Card key={map.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={map.preview || "/placeholder.svg"}
                  alt={map.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <Badge
                      variant="outline"
                      className="bg-black/50 text-white border-none"
                    >
                      {map.locations} locations
                    </Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">{map.title}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {map.tour}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    Last updated:{" "}
                    {new Date(map.lastUpdated).toLocaleDateString()}
                  </p>
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
                        <Link href={`/admin/maps/${map.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/maps/${map.id}/edit`}>
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
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredMaps.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <strong>{filteredMaps.length}</strong> of{" "}
            <strong>{maps.length}</strong> maps
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
  );
}
