import Link from "next/link"
import React from "react"

export const CTASection = () => {
  return (
    <div className="relative h-[300px] w-full rounded-xl overflow-hidden mb-16">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }} />
      <div className="absolute inset-0 bg-emerald-900/70" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <h2 className="text-3xl font-bold text-white mb-4">هل أنت مستعد لبدء رحلتك المقدسة؟</h2>
          <p className="text-white/80 mb-6">تواصل مع فريقنا اليوم لمعرفة المزيد عن باقات الحج الخاصة بنا وابدأ في التخطيط لرحلتك.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/contact"} className="bg-white text-emerald-800 hover:bg-gray-100">
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
