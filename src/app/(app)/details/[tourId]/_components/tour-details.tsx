"use client"

import { useLocale, useTranslations } from "next-intl"

import { ChevronRight, MessageCircle } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UIFullTour, UITour } from "@/types/ui"

import RelatedTours from "@/app/(app)/details/[tourId]/_components/related-tours"
import TourDetailsBanner from "./banner"
import TourStickyBar from "./booking-sticky-bar"
import TourDetailsOverviewTab from "./overview-tab"
import TourTabsList from "./tabs-list"
import TourItineraryTab from "./itinerary-tab"
import TourGalleryTab from "./gallery"
import TourReviewsTab from "./reviews"

export default function TourDetails({ tour, relatedTours }: { tour: UIFullTour; relatedTours: UITour[] }) {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <div className="relative">
      <TourDetailsBanner tour={tour} />

      <TourStickyBar tour={tour} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="mb-12" dir={locale == "ar" ? "rtl" : "ltr"}>
              <TourTabsList />
              <TourDetailsOverviewTab tour={tour} />
              <TourItineraryTab tour={tour} />
              <TourGalleryTab tour={tour} />
              <TourReviewsTab tour={tour} />
            </Tabs>

            {/* Related Tours */}
            <section className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t("relatedTours")}</h2>
                <LinkBtn href="/tours" variant="ghost" size="sm">
                  {t("viewAll")} <ChevronRight className="ml-1 h-4 w-4" />
                </LinkBtn>
              </div>
              <RelatedTours relatedTours={relatedTours} />
            </section>
          </div>

          {/* Right Column - Booking & Price */}
          <div className="lg:col-span-1 ">
            <div className="sticky top-28">
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">{t("priceStart")}</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary">${tour.price_start}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between font-bold">
                      <span>{t("priceStart")}</span>
                      <span>${tour.price_start}</span>
                    </div>
                    <div className='flex justify-between font-bold'>
                      <span>{t("type")}</span>
                      <span>{t(tour.type)}</span>
                    </div>
                    <div className='flex justify-between font-bold'>
                      <span>{t("pickupLocation")}</span>
                      <span>{t(tour.pickup_location.name ?? "N/A")}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t("bookNow")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4">{t("needHelp")}</h3>
                  <div className="space-y-4">
                    <div>

                      <p className='text-sm font-medium'>{t("haveQuestionsAboutThisTour")}</p>
                      <p className='text-sm text-muted-foreground'>{t("ourTravelExpertsAreHereToAssist")}</p>

                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {t("chat")}
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        {t("callUs")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
