import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from "react"
import Link from "next/link"
import { Calendar, MapPin, Users, DollarSign, ArrowRight } from "lucide-react" // Added DollarSign, ArrowRight
import { UIHajjPackage } from "@/types/ui"
import { PaginatedData } from "@/types"

type Props = {
  data: PaginatedData<UIHajjPackage>
}

// Helper component to render a single section of Hajj/Omrah packages
const PackageSection = ({
  title,
  packages,
}: {
  title: string
  packages: UIHajjPackage[]
}) => {
  if (packages.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm text-center'>
        <h3 className='text-2xl font-semibold mb-4 text-gray-700'>{title}</h3>
        <p className='text-gray-500'>عذراً، لا توجد باقات متاحة في هذا القسم حاليًا. يرجى التحقق لاحقًا!</p>
      </div>
    )
  }

  return (
    <section className='mb-20' id={`hajj-packages-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h3 className='text-3xl md:text-4xl font-extrabold text-center text-emerald-800 mb-10 relative after:content-[""] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-emerald-600 after:rounded-full'>
        {title}
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {packages.map((pkg) => (
          <Card key={pkg.id} className='overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
            <div className='relative h-56 w-full'> {/* Increased height */}
              <Image
                src={pkg.thumbnail || "/placeholder.svg"}
                alt={pkg.title}
                fill
                className='object-cover transition-transform duration-300 hover:scale-105'
              />
            </div>
            <CardContent className='p-6 bg-white'>
              <h4 className='text-2xl font-bold mb-3 text-gray-800 leading-tight'>{pkg.title}</h4> {/* Larger title, tighter leading */}
              <p className='text-gray-600 mb-4 text-sm line-clamp-3'>{pkg.description}</p> {/* Truncate description */}
              <div className='flex items-center text-3xl font-extrabold text-emerald-700 mb-4'>
                <DollarSign className='h-6 w-6 mr-1 text-emerald-600' /> EGP {pkg.price}
              </div>
              <div className='space-y-3 text-sm text-gray-700'> {/* Increased spacing */}
                <div className='flex items-center'>
                  <Calendar className='h-5 w-5 mr-3 text-emerald-600' /> {/* Larger icons */}
                  <span>
                    <span className="font-semibold">تاريخ السفر:</span> {new Date(pkg.depature_date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                    <br />
                    <span className="font-semibold">تاريخ العودة:</span> {new Date(pkg.return_date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div className='flex items-center'>
                  <MapPin className='h-5 w-5 mr-3 text-emerald-600' />
                  <span className="font-semibold">الإقامة:</span> {pkg.hotel}
                </div>
                <div className='flex items-center'>
                  <Users className='h-5 w-5 mr-3 text-emerald-600' />
                  <span className="font-semibold">المواصلات:</span> {pkg.transportation_type}
                </div>
              </div>
            </CardContent>
            <CardFooter className='p-6 pt-0 bg-white'>
              <Link href={`/hajj/${pkg.id}`} className='w-full'>
                <Button className='w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white py-3 rounded-lg text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2'>
                  عرض التفاصيل <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

// Main HajjPackagesSection component
export const HajjPackagesSection = ({ data }: Props) => {
  const allHajjPackages = data.data || []

  // Filter packages by type
  const directHajPackages = allHajjPackages.filter((pkg) => pkg.type === "direct")
  const luckHajPackages = allHajjPackages.filter((pkg) => pkg.type === "luck")
  const omrahPackages = allHajjPackages.filter((pkg) => pkg.type === "omrah")

  if (allHajjPackages.length === 0) {
    return (
      <div className='min-h-[50vh] flex flex-col gap-4 items-center justify-center bg-gray-50 p-8 rounded-lg shadow-md text-center'>
        <h2 className='text-4xl font-extrabold mb-4 text-emerald-800'>باقات الحج والعمرة</h2>
        <p className='text-lg text-gray-700'>
          نعتذر، لا توجد باقات حج أو عمرة متاحة في الوقت الحالي. <br />
          تابعونا لمعرفة آخر العروض والتحديثات قريباً!
        </p>
        <Image src="/no-packages.png" alt="No packages available" width={200} height={200} className="mt-6 opacity-70" /> {/* Add a relevant image */}
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-16'> {/* Added container and padding */}
      <h2 className='text-5xl font-extrabold text-center text-emerald-900 mb-16 leading-tight relative'>
        استكشف باقات الحج والعمرة
        <span className="block text-2xl font-medium text-gray-600 mt-2">رحلتك الإيمانية تبدأ من هنا</span>
        <span className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-28 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
      </h2>

      {/* Direct Haj Section */}
      <PackageSection title="باقات الحج المباشر" packages={directHajPackages} />

      {/* Luck Haj Section */}
      <PackageSection title="باقات حج القرعة" packages={luckHajPackages} />

      {/* Omrah Section */}
      <PackageSection title="باقات العمرة" packages={omrahPackages} />
    </div>
  )
}