import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, Clock, MapPin, Users, Shield, Star, Wifi, Wine, Music, Tv, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UILimousine } from '@/types/ui'
import { getTranslations } from 'next-intl/server'
import { getUILimousineById } from '../_actions/data'

import { notFound } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function LimousineDetailsPage({params}: Props) {
  const {id} = await params
  
  const t = await getTranslations()
  const limousine = await getUILimousineById(+id)

  if (!limousine) return notFound()

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="container px-4 py-6">
        <Link href="/limousines" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t("backToLimousines")}
        </Link>
      </div>

      {/* Main content */}
      <div className="container px-4 pb-16">
        {/* Image gallery */}
        <div className="relative h-[50vh] md:h-[60vh]">
          <Image src={limousine.images?.[0]?.url || "/placeholder.svg"} alt={"limousine.name"} fill className="object-cover" priority />

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {limousine.images.map((_: any, index: number) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-fulltransition-all`}
              />
            ))}
          </div>
        </div>
      </div>

        <div className='container mx-auto'>
          {/* Content grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold sm:text-4xl">{limousine.name}</h1>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>{limousine.reviews.length}</span>
                  <span className="ml-1 text-muted-foreground">({limousine.reviews.length} {t("reviews")})</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="mr-1 h-5 w-5" />
                  <span>{limousine.max_passengers} {t("passengers")}</span>
                </div>
              </div>
              <p className="text-muted-foreground">{limousine.description}</p>
            </div>

            <Tabs defaultValue="features" className="mb-8">
              <TabsList>
                <TabsTrigger value="features">{t("features")}</TabsTrigger>
                <TabsTrigger value="specifications">{t("specifications")}</TabsTrigger>
                <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {limousine.features.map((feature, index) => (
                    <Card key={`feautes-x-x-x-${feature.id}`}>
                      <CardContent className="flex items-center gap-3 p-4">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{feature.vehicle_features}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {limousine.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature.additional_info}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {Object.entries(limousine.specifications).map(([key, value]) => (
                    <Card key={key}>
                      <CardContent className="p-4">
                        <div className="mb-1 text-sm text-muted-foreground">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                        <div>{value.vehicle_specifications}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                </div>

                <div className="space-y-4">
                  {limousine.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{review.reviewer_name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{review.reviewer_name}</h4>
                              
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{limousine.price_per_hour}</span>
                  <span className="text-sm font-normal text-muted-foreground">per hour</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>{t("pricePerHour")}</span>
                    <span>${limousine.price_per_hour}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t("bookNow")}</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        </div>
      </div>
  )
}
