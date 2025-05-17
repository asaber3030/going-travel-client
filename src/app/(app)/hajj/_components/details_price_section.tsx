"use client"
import React from "react"

import { UIHajjPackage } from "@/types/ui"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { PHONE } from "@/lib/constants"

type Props = {
  hajData: UIHajjPackage
}

export const DetailsPriceSection = ({ hajData }: Props) => {
  const router = useRouter()
  return (
    <div className='lg:col-span-1'>
      <Card className='sticky top-8'>
        <CardContent className='p-6'>
          <div className='text-center mb-6'>
            <div className='text-4xl font-bold text-emerald-600 mb-2'>{hajData.price} EGP</div>
            <p className='text-gray-500'>لكل شخص</p>
          </div>

          <div className='space-y-4 mb-6'>
            <div className='flex justify-between py-2 border-b border-gray-100'>
              <span className='text-gray-600'>المدة:</span>
              <span> {Math.floor((new Date(hajData.return_date).getTime() - new Date(hajData.depature_date).getTime()) / (1000 * 60 * 60 * 24))} يومًا</span>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-100'>
              <span className='text-gray-600'>تاريخ المغادرة:</span>
              <span className='font-medium text-gray-800'>{new Date(hajData.depature_date).toLocaleDateString("ar-GB")}</span>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-100'>
              <span className='text-gray-600'>تاريخ العودة:</span>
              <span className='font-medium text-gray-800'>{new Date(hajData.return_date).toLocaleDateString("ar-GB")}</span>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-100'>
              <span className='text-gray-600'>الإقامة:</span>
              <span className='font-medium text-gray-800'>{hajData.hotel}</span>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-100'>
              <span className='text-gray-600'>الوجبات:</span>
              <span className='font-medium text-gray-800'>{hajData.meals}</span>
            </div>
            <div className='flex justify-between py-2'>
              <span className='text-gray-600'>وسائل النقل:</span>
              <span className='font-medium text-gray-800'>{hajData.transportation_type}</span>
            </div>
          </div>

          <Button className='w-full bg-emerald-600 hover:bg-emerald-700 mb-4' onClick={() => router.push("/contact")}>
            للحجز و الاستفسار
          </Button>

          <div className='mt-6 text-center text-sm text-gray-500'>
            <p>هل تحتاج إلى مساعدة في الحجز؟</p>
            <p className='font-medium text-emerald-600'>اتصل بنا على {PHONE}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
