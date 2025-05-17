"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Wifi, Coffee, Dumbbell, Utensils, Snowflake, Tv, ParkingCircle, Clock, MessageCircle, PocketIcon as Pool, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { UIHotel } from "@/types/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, Flag, ChevronDown, ChevronUp } from "lucide-react"
import { NoDataLabel } from "@/components/common/no-data-label"
import { diffForHumans } from "@/lib/utils"
import { WHATSAPP } from "@/lib/constants"

type Props = {
  hotel: UIHotel
}

export function HotelDetailsMainContent({ hotel }: Props) {
  const t = useTranslations()
  const [expandedReviews, setExpandedReviews] = useState<number[]>([])

  const toggleReviewExpansion = (reviewId: number) => {
    setExpandedReviews((prev) => (prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]))
  }

  const isReviewExpanded = (reviewId: number) => expandedReviews.includes(reviewId)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>{t("overview")}</TabsTrigger>
          <TabsTrigger value='reviews'>{t("reviews")}</TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2  '>
              <div className='space-y-8'>
                <section>
                  <h2 className='text-2xl font-bold mb-4 text-start'>{t("hotelsPage.aboutThisHotel")}</h2>
                  <p className='text-muted-foreground mb-4'>{hotel?.short_description ?? "N/A"}</p>
                  <p className='text-muted-foreground'>{hotel?.description ?? "N/A"}</p>
                </section>

                {/* Key Amenities */}
                <section>
                  <h2 className='text-2xl font-bold mb-4 text-start'> {t("hotelsPage.keyAmenities")}</h2>
                  {hotel.amenity ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                      {hotel.amenity.free_wifi == true ? (
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 rounded-full p-2'>
                            <Wifi className='h-5 w-5 text-primary' />
                          </div>
                          <span> {t("hotelsPage.freeWifi")}</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <div className='bg-red-500/10 rounded-full p-2'>
                            <X className='h-5 w-5 text-red-500' />
                          </div>
                          <span> {t("hotelsPage.freeWifi")}</span>
                        </div>
                      )}
                      {hotel.amenity.spa_wellness_center == true ? (
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 rounded-full p-2'>
                            <Coffee className='h-5 w-5 text-primary' />
                          </div>
                          <span>{t("hotelsPage.spa")}</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <div className='bg-red-500/10 rounded-full p-2'>
                            <X className='h-5 w-5 text-red-500' />
                          </div>
                          <span>{t("hotelsPage.spa")}</span>
                        </div>
                      )}
                      {hotel.amenity.fitness_center == true ? (
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 rounded-full p-2'>
                            <Dumbbell className='h-5 w-5 text-primary' />
                          </div>
                          <span>{t("hotelsPage.fitnessCenter")}</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <div className='bg-red-500/10 rounded-full p-2'>
                            <X className='h-5 w-5 text-red-500' />
                          </div>
                          <span>{t("hotelsPage.fitnessCenter")}</span>
                        </div>
                      )}
                      {hotel.amenity.gourmet_restaurant == true ? (
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 rounded-full p-2'>
                            <Utensils className='h-5 w-5 text-primary' />
                          </div>
                          <span>{t("hotelsPage.gourmetRestaurant")}</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <div className='bg-red-500/10 rounded-full p-2'>
                            <X className='h-5 w-5 text-red-500' />
                          </div>
                          <span>{t("hotelsPage.gourmetRestaurant")}</span>
                        </div>
                      )}
                      {hotel.amenity.indoor_outdoor_pools == true ? (
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 rounded-full p-2'>
                            <Pool className='h-5 w-5 text-primary' />
                          </div>
                          <span>{t("hotelsPage.pools")}</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <div className='bg-red-500/10 rounded-full p-2'>
                            <X className='h-5 w-5 text-red-500' />
                          </div>
                          <span>{t("hotelsPage.pools")}</span>
                        </div>
                      )}
                      {hotel.amenity.air_conditioning == true ? (
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 rounded-full p-2'>
                            <Snowflake className='h-5 w-5 text-primary' />
                          </div>
                          <span>{t("hotelsPage.airConditioner")}</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <div className='bg-red-500/10 rounded-full p-2'>
                            <X className='h-5 w-5 text-red-500' />
                          </div>
                          <span>{t("hotelsPage.airConditioner")}</span>
                        </div>
                      )}
                      {hotel.amenity.flat_screen_tv == true ? (
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 rounded-full p-2'>
                            <Tv className='h-5 w-5 text-primary' />
                          </div>
                          <span>{t("hotelsPage.flatTvScreen")}</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <div className='bg-red-500/10 rounded-full p-2'>
                            <X className='h-5 w-5 text-red-500' />
                          </div>
                          <span>{t("hotelsPage.flatTvScreen")}</span>
                        </div>
                      )}
                      {hotel.amenity.free_parking == true ? (
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 rounded-full p-2'>
                            <ParkingCircle className='h-5 w-5 text-primary' />
                          </div>
                          <span>{t("hotelsPage.freeParking")}</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <div className='bg-red-500/10 rounded-full p-2'>
                            <X className='h-5 w-5 text-red-500' />
                          </div>
                          <span>{t("hotelsPage.freeParking")}</span>
                        </div>
                      )}
                      {hotel.amenity.front_desk_24h == true ? (
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 rounded-full p-2'>
                            <Clock className='h-5 w-5 text-primary' />
                          </div>
                          <span>{t("hotelsPage.frontDesk")}</span>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <div className='bg-red-500/10 rounded-full p-2'>
                            <X className='h-5 w-5 text-red-500' />
                          </div>
                          <span>{t("hotelsPage.frontDesk")}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className='text-muted-foreground'>N/A</p>
                  )}
                </section>
              </div>
            </div>

            {/* Right Column - Booking & Price */}
            <div className='lg:col-span-1'>
              <div className='sticky top-24 space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("hotelsPage.bookYourStay")}</CardTitle>
                    <CardDescription>{t("hotelsPage.bestRateGuarantied")}</CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-4'>
                      <div className='flex justify-between'>
                        <span>{t("hotelsPage.averageRoomRate")}</span>
                        <span>
                          ${hotel.price} ×1 {t("hotelsPage.night")}
                        </span>
                      </div>
                    </div>

                    <a href={WHATSAPP} className='w-full' target='_blank'>
                      <Button className='w-full'>{t("hotelsPage.bookNow")}</Button>
                    </a>
                    <p className='text-xs text-center text-muted-foreground'>{t("hotelsPage.noPaymentNeeded")}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("hotelsPage.hotelPolicies")}</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div>
                      <p className='text-sm text-muted-foreground'>{hotel?.policy ?? "N/A"}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className='p-4'>
                    <h3 className='font-bold mb-2'>{t("hotelsPage.needHelp")}</h3>
                    <p className='text-sm text-muted-foreground mb-4'>{t("hotelsPage.ourTravel")}</p>
                    <a href={WHATSAPP} className='w-full' target='_blank'>
                      <Button variant='outline' className='w-full'>
                        <MessageCircle className='mr-2 h-4 w-4' />
                        {t("hotelsPage.contactUs")}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='reviews'>
          {hotel.reviews.length > 0 ? (
            <div className='w-full py-9 space-y-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold'>{t("guestReviews")}</h2>
                <div className='flex items-center gap-2'>
                  <Badge variant='outline' className='text-sm'>
                    4.2 {t("overallRating")}
                  </Badge>
                  <Badge variant='outline' className='text-sm'>
                    {hotel.reviews.length} {t("reviews")}
                  </Badge>
                </div>
              </div>

              <div className='space-y-4'>
                {hotel.reviews.map((review) => (
                  <Card key={review.id} className='overflow-hidden'>
                    <CardHeader className='pb-2'>
                      <div className='flex justify-between items-start'>
                        <div className='flex items-center gap-3'>
                          <Avatar className='h-10 w-10 border'>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${getInitials(review.client_name)}`} alt={review.client_name} />
                            <AvatarFallback>{getInitials(review.client_name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className='font-medium'>{review.client_name}</h3>
                            <p className='text-xs text-muted-foreground'>{diffForHumans(review.created_at)}</p>
                          </div>
                        </div>
                        <div className='flex items-center'>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='pb-3'>
                      <p className={`text-sm ml-12 ${!isReviewExpanded(review.id) && review.message.length > 150 ? "line-clamp-3" : ""}`}>{review.message}</p>
                      {review.message.length > 150 && (
                        <Button variant='ghost' size='sm' className='mt-1 h-6 px-2 text-xs' onClick={() => toggleReviewExpansion(review.id)}>
                          {isReviewExpanded(review.id) ? (
                            <span className='flex items-center'>
                              Show less <ChevronUp className='ml-1 h-3 w-3' />
                            </span>
                          ) : (
                            <span className='flex items-center'>
                              Show more <ChevronDown className='ml-1 h-3 w-3' />
                            </span>
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <NoDataLabel />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
