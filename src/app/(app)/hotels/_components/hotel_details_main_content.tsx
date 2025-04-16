import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { Wifi, Coffee, Dumbbell, Utensils, Snowflake, Tv, ParkingCircle, Clock, MessageCircle, PocketIcon as Pool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { UIHotel } from "@/types/ui";

type Props = {
  hotel: UIHotel;
};
export function HotelDetailsMainContent({ hotel }: Props) {
  const t = useTranslations();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2  ">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-start">{t("hotelsPage.aboutThisHotel")}</h2>
              <p className="text-muted-foreground mb-4">{hotel.translations?.[0]?.short_description ?? "N/A"}</p>
              <p className="text-muted-foreground">{hotel.translations?.[0]?.description ?? "N/A"}</p>
            </section>

            {/* Key Amenities */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-start"> {t("hotelsPage.keyAmenities")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenity.free_wifi && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Wifi className="h-5 w-5 text-primary" />
                    </div>
                    <span> {t("hotelsPage.freeWifi")}</span>
                  </div>
                )}
                {hotel.amenity.spa_wellness_center && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Coffee className="h-5 w-5 text-primary" />
                    </div>
                    <span>{t("hotelsPage.spa")}</span>
                  </div>
                )}
                {hotel.amenity.fitness_center && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <span>{t("hotelsPage.fitnessCenter")}</span>
                  </div>
                )}
                {hotel.amenity.gourmet_restaurant && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Utensils className="h-5 w-5 text-primary" />
                    </div>
                    <span>{t("hotelsPage.gourmetRestaurant")}</span>
                  </div>
                )}
                {hotel.amenity.indoor_outdoor_pools && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Pool className="h-5 w-5 text-primary" />
                    </div>
                    <span>{t("hotelsPage.pools")}</span>
                  </div>
                )}
                {hotel.amenity.air_conditioning && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Snowflake className="h-5 w-5 text-primary" />
                    </div>
                    <span>{t("hotelsPage.airConditioner")}</span>
                  </div>
                )}
                {hotel.amenity.flat_screen_tv && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Tv className="h-5 w-5 text-primary" />
                    </div>
                    <span>{t("hotelsPage.flatTvScreen")}</span>
                  </div>
                )}
                {hotel.amenity.free_parking && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <ParkingCircle className="h-5 w-5 text-primary" />
                    </div>
                    <span>{t("hotelsPage.freeParking")}</span>
                  </div>
                )}
                {hotel.amenity.front_desk_24h && (
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <span>{t("hotelsPage.frontDesk")}</span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Right Column - Booking & Price */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("hotelsPage.bookYourStay")}</CardTitle>
                <CardDescription>{t("hotelsPage.bestRateGuarantied")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t("hotelsPage.averageRoomRate")}</span>
                    <span>
                      ${hotel.price} × 1 {t("hotelsPage.night")}
                    </span>
                  </div>
                </div>

                <Button className="w-full">{t("hotelsPage.bookNow")}</Button>
                <p className="text-xs text-center text-muted-foreground">{t("hotelsPage.noPaymentNeeded")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("hotelsPage.hotelPolicies")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{hotel.translations?.[0]?.policy ?? "N/A"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">{t("hotelsPage.needHelp")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("hotelsPage.ourTravel")}</p>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("hotelsPage.contactUs")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
