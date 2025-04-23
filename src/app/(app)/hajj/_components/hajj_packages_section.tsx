import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from "react"
import Link from "next/link"
import { Calendar, MapPin, Users } from "lucide-react"
import { UIHajjPackage } from "@/types/ui"
import { PaginatedData } from "@/types"

type Props = {
  data: PaginatedData<UIHajjPackage>
}

export const HajjPackagesSection = ({ data }: Props) => {
  const hajjPackages = data.data || []

  if (hajjPackages.length === 0) {
    return (
      <div className="mb-16 flex flex-col gap-2 items-center bg-gray-50 p-4 rounded-lg" id="hajj-packages">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">باقات الحج الخاصة بنا</h2>
        <p className="text-gray-600">لا توجد باقات متاحة في الوقت الحالي.</p>
      </div>
    )
  }

  return (
    <div className="mb-16" id="hajj-packages">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">باقات الحج الخاصة بنا</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hajjPackages.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={pkg.thumbnail || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{pkg.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
              <div className="text-2xl font-bold text-emerald-600 mb-4">${pkg.price}</div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                  <span>
                    {new Date(pkg.depature_date).toLocaleDateString()} - {new Date(pkg.return_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                  <span>{pkg.hotel}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-emerald-600" />
                  <span>{pkg.transportation_type}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link href={`/hajj/${pkg.id}`} className="w-full">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">عرض التفاصيل</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
