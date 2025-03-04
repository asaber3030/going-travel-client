import { Suspense } from "react";
import { Plane, Car, Bus, Filter, Calendar, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "./_components/date-range-picker";
import { ListingsGrid, ListingsSkeleton } from "./_components/listings-grid";

export default function ListingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Travel Bookings
              </h1>
              <p className="mt-1 text-gray-500">
                Find and book your perfect transportation
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Calendar className="h-4 w-4" />
                Dates
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <MapPin className="h-4 w-4" />
                Destination
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 rounded-lg border bg-card p-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                From
              </label>
              <Input className="mt-1" placeholder="Departure location" />
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                To
              </label>
              <Input className="mt-1" placeholder="Destination" />
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                When
              </label>
              <DatePickerWithRange className="mt-1" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="cars" className="gap-1">
              <Car className="h-4 w-4" />
              Cars
            </TabsTrigger>
            <TabsTrigger value="buses" className="gap-1">
              <Bus className="h-4 w-4" />
              Buses
            </TabsTrigger>
            <TabsTrigger value="planes" className="gap-1">
              <Plane className="h-4 w-4" />
              Planes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Suspense fallback={<ListingsSkeleton />}>
              <ListingsGrid type="all" />
            </Suspense>
          </TabsContent>

          <TabsContent value="cars" className="mt-0">
            <Suspense fallback={<ListingsSkeleton />}>
              <ListingsGrid type="car" />
            </Suspense>
          </TabsContent>

          <TabsContent value="buses" className="mt-0">
            <Suspense fallback={<ListingsSkeleton />}>
              <ListingsGrid type="bus" />
            </Suspense>
          </TabsContent>

          <TabsContent value="planes" className="mt-0">
            <Suspense fallback={<ListingsSkeleton />}>
              <ListingsGrid type="plane" />
            </Suspense>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
