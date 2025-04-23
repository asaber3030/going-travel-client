import React from "react"

export const WyhChooseUsSection = () => {
  return (
    <div className="bg-gray-50 rounded-xl p-8 mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">لماذا تختار خدمات الحج الخاصة بنا</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-gray-800">فريق ذو خبرة</h3>
          <p className="text-gray-600">يتمتع فريقنا بسنوات من الخبرة في تنظيم رحلات الحج، مما يضمن رحلة سلسة وخالية من المتاعب.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-gray-800">خدمة مخصصة</h3>
          <p className="text-gray-600">نقدم خدمات مخصصة تلبي الاحتياجات والتفضيلات الخاصة بحجاجنا.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-gray-800">إقامة عالية الجودة</h3>
          <p className="text-gray-600">نوفر إقامة مريحة ومناسبة بالقرب من المواقع المقدسة لضمان إقامة هادئة.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-gray-800">دعم شامل</h3>
          <p className="text-gray-600">فريق الدعم الخاص بنا متاح على مدار الساعة لمساعدة الحجاج في أي استفسارات أو مخاوف أثناء رحلتهم.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-gray-800">إرشاد تعليمي</h3>
          <p className="text-gray-600">نقدم جلسات تعليمية ومواد لمساعدة الحجاج على فهم الشعائر وأهمية الحج.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-3 text-gray-800">باقات شاملة</h3>
          <p className="text-gray-600">تشمل باقاتنا جميع الأساسيات: الرحلات الجوية، الإقامة، النقل، الوجبات، ومعالجة التأشيرات.</p>
        </div>
      </div>
    </div>
  )
}
