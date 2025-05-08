import React from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import { UIHajjPackage } from "@/types/ui"

type Props = {
  hajData: UIHajjPackage
}

export const DetailsHeroSection = ({ hajData }: Props) => {
  return (
    <div className='relative h-[400px] w-full mb-8 rounded-xl overflow-hidden'>
      <Image src={hajData.banner || "/placeholder.svg"} alt={hajData.title} fill className='object-cover' priority />
      <div className='absolute inset-0 bg-black/40' />
      <div className='absolute inset-0 flex items-center'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl'>
            <Badge className='mb-4 bg-emerald-600 hover:bg-emerald-700'>باقة الحج</Badge>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>{hajData.title}</h1>
            <p className='text-xl text-white/90 mb-6'>{hajData.description}</p>
            <div className='flex flex-wrap gap-4 text-white/80'>
              <div className='flex items-center'>
                <Calendar className='h-5 w-5 mr-2' />
                <span>
                  {new Date(hajData.depature_date).toLocaleDateString("ar-GB")} - {new Date(hajData.return_date).toLocaleDateString("ar-GB")}
                </span>
              </div>
              <div className='flex items-center'>
                <MapPin className='h-5 w-5 mr-2' />
                <span>{hajData.hotel}</span>
              </div>
              <div className='flex items-center'>
                <Clock className='h-5 w-5 mr-2' />
                <span> {Math.floor((new Date(hajData.return_date).getTime() - new Date(hajData.depature_date).getTime()) / (1000 * 60 * 60 * 24))} يوم</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
