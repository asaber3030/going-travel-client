import { Card, CardContent } from "@/components/ui/card"
import { UIHajjPackage } from "@/types/ui"
import { TabsContent } from "@radix-ui/react-tabs"
import { Calendar, MapPin, Utensils, Bus, Check } from "lucide-react"
import React from "react"

type Props = {
  hajData: UIHajjPackage
}

export const OverviewTab = ({ hajData }: Props) => {
  return (
    <TabsContent value='overview' className='space-y-6'>
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-2xl font-bold mb-4 text-gray-800'>نظرة عامة على الباقة</h2>
          <p className='text-gray-600 mb-6'>{hajData.long_description}</p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <div className='flex items-start'>
              <div className='bg-emerald-100 p-2 rounded-full mr-3'>
                <Calendar className='h-5 w-5 text-emerald-600' />
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>المدة</h3>
                <p className='text-gray-600'>{Math.floor((new Date(hajData.return_date).getTime() - new Date(hajData.depature_date).getTime()) / (1000 * 60 * 60 * 24))} يومًا</p>
              </div>
            </div>
            <div className='flex items-start'>
              <div className='bg-emerald-100 p-2 rounded-full mr-3'>
                <MapPin className='h-5 w-5 text-emerald-600' />
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>الإقامة</h3>
                <p className='text-gray-600'>{hajData.hotel}</p>
              </div>
            </div>
            {/*             <div className='flex items-start'>
              <div className='bg-emerald-100 p-2 rounded-full mr-3'>
                <Utensils className='h-5 w-5 text-emerald-600' />
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>الوجبات</h3>
                <p className='text-gray-600'>{hajData.meals}</p>
              </div>
            </div> */}
            <div className='flex items-start'>
              <div className='bg-emerald-100 p-2 rounded-full mr-3'>
                <Bus className='h-5 w-5 text-emerald-600' />
              </div>
              <div>
                <h3 className='font-medium text-gray-800'>وسائل النقل</h3>
                <p className='text-gray-600'>{hajData.transportation_type}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
