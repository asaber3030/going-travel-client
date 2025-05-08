import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Utensils, Bus, Info, AlertTriangle, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DetailsHeroSection } from "../_components/details_hero_section"
import { Cairo } from "next/font/google"
import { OverviewTab } from "../_components/overview_tab"
import { ItineraryTab } from "../_components/itinerary_tab"
import { AccommodationTab } from "../_components/accomodations_tab"
import { DetailsPriceSection } from "../_components/details_price_section"
import { getUIHajjPackageById } from "../_actions/data"

const font = Cairo({ subsets: ["arabic"] })

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function HajjDetailsPage({ params }: Props) {
  const { id } = await params
  const hajData = await getUIHajjPackageById(+id)

  return (
    <div className={`container mx-auto px-4 py-12 ${font.className} `} dir='rtl'>
      {/* Back Button */}
      <div className='mb-6'>
        <Link href='/hajj' className='flex items-center text-emerald-600 hover:text-emerald-700'>
          <ArrowLeft className='h-4 w-4 mr-2' />
          <span>العودة إلى باقات الحج</span>
        </Link>
      </div>

      {/* Hero Section */}
      <DetailsHeroSection hajData={hajData} />
      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column - Package Details */}
        <div className='lg:col-span-2'>
          <Tabs defaultValue='overview' dir='rtl'>
            <TabsList className='grid grid-cols-3 mb-8'>
              <TabsTrigger value='overview'>نظرة عامة</TabsTrigger>
              <TabsTrigger value='accommodation'>الإقامة</TabsTrigger>
            </TabsList>
            <OverviewTab hajData={hajData} />
            <ItineraryTab hajData={hajData} />

            <AccommodationTab />
          </Tabs>
        </div>

        {/* Right Column - Booking & Price */}
        <DetailsPriceSection hajData={hajData} />
      </div>
    </div>
  )
}
