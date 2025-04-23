import React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { TabsContent } from "@radix-ui/react-tabs"
import { UIHajjPackage } from "@/types/ui"

type Props = {
  hajData: UIHajjPackage
}

export const ItineraryTab = ({ hajData }: Props) => {
  return (
    <TabsContent value="itinerary" className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">البرنامج اليومي</h2>

          <div className="space-y-8">
            {hajData.days.map((day, index) => (
              <div key={day.id} className="relative pr-8 pb-4 border-r-2 border-emerald-200 last:border-0 last:pb-0">
                <div className="absolute right-[-10px] top-0 bg-emerald-500 w-5 h-5 rounded-full"></div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    Day {index + 1}: {day.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{day.description}</p>
                <div className="flex items-center gap-2">
                  <Image src={day.icon || "/placeholder.svg"} alt={`Day ${index + 1} Icon`} width={40} height={40} className="rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
