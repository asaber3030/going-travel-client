import { Card, CardContent } from "@/components/ui/card"
import React from "react"

export const FAQSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">الأسئلة الشائعة</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2 text-gray-800">متى يجب أن أحجز باقة الحج الخاصة بي؟</h3>
            <p className="text-gray-600">
              نوصي بحجز باقة الحج الخاصة بك قبل 6-8 أشهر على الأقل لضمان التوافر وإتاحة الوقت الكافي لمعالجة التأشيرة.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2 text-gray-800">ما الذي تتضمنه باقات الحج الخاصة بكم؟</h3>
            <p className="text-gray-600">
              عادةً ما تشمل باقاتنا الرحلات الجوية، الإقامة، النقل، الوجبات، معالجة التأشيرات، وإرشادات من قادة جولات ذوي خبرة.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2 text-gray-800">هل تقدمون تدريباً قبل الحج؟</h3>
            <p className="text-gray-600">نعم، نقدم ندوات قبل الحج ومواد تعليمية لمساعدة الحجاج على فهم الشعائر والاستعداد لرحلتهم.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2 text-gray-800">ما هي الوثائق المطلوبة للحج؟</h3>
            <p className="text-gray-600">
              تشمل الوثائق المطلوبة جواز سفر صالح، تأشيرة الحج، شهادات التطعيم، ووثائق أخرى تحددها السلطات السعودية.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
