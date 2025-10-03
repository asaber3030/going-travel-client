"use client"

import { useTranslations } from "next-intl"
import React from "react"

export function CTASection() {
  const t = useTranslations()

  return (
    <section className='relative py-16 bg-gray-900 text-white'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-4'>{t("cta.title")}</h2>
          <p className='mb-8'>{t("cta.subtitle")}</p>
        </div>
      </div>
    </section>
  )
}
