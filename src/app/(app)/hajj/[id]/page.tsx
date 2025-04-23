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

// const hajData = {
//   id: 1,
//   title: "مرحبا",
//   description: "وصف قصير للحج",
//   long_description: "وصف طويل للحج",
//   price: "9999.00",
//   banner: "http://localhost:8000/uploads/hajss/1745261215_Ellipse 179.png",
//   thumbnail: "http://localhost:8000/uploads/hajss/1745261215_Ellipse 179.png",
//   hotel: "فندق مكة",
//   meals: "وجبات يومية",
//   transportation_type: "حافلات مكيفة",
//   depature_date: "2025-01-06",
//   return_date: "2025-02-06",
//   notes: "ملاحظات هامة",
//   cautions: "تحذيرات وإرشادات",
//   created_by: 1,
//   updated_by: 1,
//   deleted_by: null,
//   deleted_at: null,
//   created_at: "2025-04-21T18:34:12.000000Z",
//   updated_at: "2025-04-21T18:46:55.000000Z",
//   days: [
//     {
//       id: 1,
//       haj_id: 1,
//       title: "اليوم الأول",
//       description: "وصف اليوم الأول",
//       icon: "",
//       created_at: "2025-04-21T18:56:29.000000Z",
//       updated_at: "2025-04-21T18:57:31.000000Z",
//     },
//     {
//       id: 2,
//       haj_id: 1,
//       title: "اليوم الثاني",
//       description: "وصف اليوم الثاني",
//       icon: "",
//       created_at: "2025-04-21T18:56:58.000000Z",
//       updated_at: "2025-04-21T18:56:58.000000Z",
//     },
//   ],
// }
type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function HajjDetailsPage({ params }: Props) {
  const { id } = await params
  const hajData = await getUIHajjPackageById(+id)

  return (
    <div className={`container mx-auto px-4 py-12 ${font.className} `} dir="rtl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/hajj" className="flex items-center text-emerald-600 hover:text-emerald-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>العودة إلى باقات الحج</span>
        </Link>
      </div>

      {/* Hero Section */}
      <DetailsHeroSection hajData={hajData} />
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Package Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full" dir="rtl">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="itinerary">البرنامج اليومي</TabsTrigger>
              <TabsTrigger value="accommodation">الإقامة</TabsTrigger>
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
