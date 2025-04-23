import { Card, CardContent } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import Image from "next/image"
import React from "react"

export const AccommodationTab = () => {
  return (
    <TabsContent value="accommodation" className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">تفاصيل الإقامة</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image src="/makkah.jpg?height=400&width=600&text=فندق مكة" alt="فندق مكة" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">إقامة في مكة</h3>
              <p className="text-gray-600 mb-4">إقامة مريحة تقع بالقرب من المسجد الحرام، مما يتيح سهولة الوصول للصلاة.</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-emerald-600 mr-2" />
                  <span className="text-gray-600">غرف مكيفة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-emerald-600 mr-2" />
                  <span className="text-gray-600">حمامات خاصة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-emerald-600 mr-2" />
                  <span className="text-gray-600">تنظيف يومي</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image src="/madina.jpg?height=400&width=600&text=فندق المدينة" alt="فندق المدينة" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">إقامة في المدينة</h3>
              <p className="text-gray-600 mb-4">إقامة مريحة تقع بالقرب من المسجد النبوي، مما يتيح سهولة الوصول للصلاة.</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-emerald-600 mr-2" />
                  <span className="text-gray-600">غرف مكيفة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-emerald-600 mr-2" />
                  <span className="text-gray-600">حمامات خاصة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-emerald-600 mr-2" />
                  <span className="text-gray-600">تنظيف يومي</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
