import React from "react"

export const HajjWelcomeSection = () => {
  return (
    <div className="relative h-[400px] w-full mb-12 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hajj.jpg')" }} />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">باقات الحج</h1>
          <p className="text-xl text-white/80 mb-8">انطلق في رحلة روحانية مع باقات الحج الشاملة المصممة لتوفير تجربة حج مريحة وذات معنى.</p>
          <a href="#hajj-packages" className="bg-goldish hover:bg-lightgoldish text-white px-8 py-3 text-lg rounded-lg">
            استكشاف الباقات
          </a>
        </div>
      </div>
    </div>
  )
}
