import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Star,
  Wifi,
  Coffee,
  Dumbbell,
  Utensils,
  PocketIcon as Pool,
  Snowflake,
  Tv,
  ParkingCircle,
  Clock,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUIHotelById } from "../_actions/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function HotelDetailsPage({ params }: Props) {
  const id = (await params).id;
  const hotel = await getUIHotelById(+id);

  return (
    <div className="bg-gray-50">
      {/* Hotel Gallery Header */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image src={hotel.banner || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white" asChild>
                <Link href="/hotels">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Hotels
                </Link>
              </Button>
            </div>
            <Badge className="mb-2 bg-primary hover:bg-primary w-fit">5-Star Hotel</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{hotel.name}</h1>
            <div className="flex items-center gap-2 text-white/90 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{hotel.location.name}</span>
            </div>
            <div className="flex items-center gap-1 text-white/90">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < hotel.stars ? "fill-amber-500 text-amber-500" : "text-white/50"}`} />
                ))}
              </div>
              <span className="ml-1">{hotel.stars}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="mb-12">
              <TabsContent value="overview">
                <div className="space-y-8">
                  {/* Hotel Description */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">About This Hotel</h2>
                    <p className="text-muted-foreground mb-4">{hotel.translations?.[0]?.short_description ?? "N/A"}</p>
                    <p className="text-muted-foreground">{hotel.translations?.[0]?.description ?? "N/A"}</p>
                  </section>

                  {/* Key Amenities */}
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Key Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hotel.amenity.free_wifi && (
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Wifi className="h-5 w-5 text-primary" />
                          </div>
                          <span>{"Free WiFi"}</span>
                        </div>
                      )}
                      {hotel.amenity.spa_wellness_center && (
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Coffee className="h-5 w-5 text-primary" />
                          </div>
                          <span>{"Spa & Wellness Center"}</span>
                        </div>
                      )}
                      {hotel.amenity.fitness_center && (
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Dumbbell className="h-5 w-5 text-primary" />
                          </div>
                          <span>{"Fitness Center"}</span>
                        </div>
                      )}
                      {hotel.amenity.gourmet_restaurant && (
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Utensils className="h-5 w-5 text-primary" />
                          </div>
                          <span>{"Gourmet Restaurant"}</span>
                        </div>
                      )}
                      {hotel.amenity.indoor_outdoor_pools && (
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Pool className="h-5 w-5 text-primary" />
                          </div>
                          <span>{"Indoor & Outdoor Pools"}</span>
                        </div>
                      )}
                      {hotel.amenity.air_conditioning && (
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Snowflake className="h-5 w-5 text-primary" />
                          </div>
                          <span>{"Air Conditioning"}</span>
                        </div>
                      )}
                      {hotel.amenity.flat_screen_tv && (
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Tv className="h-5 w-5 text-primary" />
                          </div>
                          <span>{"Flat-screen TV"}</span>
                        </div>
                      )}
                      {hotel.amenity.free_parking && (
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <ParkingCircle className="h-5 w-5 text-primary" />
                          </div>
                          <span>{"Free Parking"}</span>
                        </div>
                      )}
                      {hotel.amenity.front_desk_24h && (
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <span>{"24-hour Front Desk"}</span>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking & Price */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Book Your Stay</CardTitle>
                  <CardDescription>Best rate guaranteed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Average Room rate</span>
                      <span>${hotel.price} × 1 night</span>
                    </div>
                  </div>

                  <Button className="w-full">Book Now</Button>
                  <p className="text-xs text-center text-muted-foreground">No prepayment needed – pay at the property</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hotel Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{hotel.translations?.[0]?.policy ?? "N/A"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Our travel experts are here to assist you with your booking.</p>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
