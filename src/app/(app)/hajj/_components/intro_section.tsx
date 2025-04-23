import { Users, MapPin, Clock } from "lucide-react"
import React from "react"

export const IntroSection = () => {
  return (
    <div className="mb-12 text-center max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">رحلتك المقدسة تبدأ هنا</h2>
      <p className="text-gray-600 mb-6">
        نحن ندرك أهمية الحج كأحد أركان الإسلام الخمسة. تم تصميم باقات الحج لدينا بعناية لتوفير تجربة مريحة وروحانية للحجاج، مما يسمح لهم
        بالتركيز على عبادتهم بينما نتولى نحن جميع الخدمات اللوجستية.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="text-center">
          <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">مرشدون ذوو خبرة</h3>
          <p className="text-gray-600 text-sm">مرشدون ذوو معرفة وخبرة لمساعدتك طوال رحلتك.</p>
        </div>
        <div className="text-center">
          <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">إقامة ذات جودة عالية</h3>
          <p className="text-gray-600 text-sm">إقامة مريحة وملائمة بالقرب من المواقع المقدسة.</p>
        </div>
        <div className="text-center">
          <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">خدمات شاملة</h3>
          <p className="text-gray-600 text-sm">باقات شاملة تتضمن النقل والوجبات وخدمات الدعم.</p>
        </div>
      </div>
    </div>
  )
}
