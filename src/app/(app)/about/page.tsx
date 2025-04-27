"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Shield } from "lucide-react"

import { useTranslations } from "next-intl"

export default function AboutPage() {
  const t = useTranslations()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full mb-12 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/aboutUs2.jpg?height=600&width=1200')" }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("about_us_title")}</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">{t("about_us_subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">{t("our_story_title")}</h2>
          <div className="space-y-4 text-gray-600">
            <p>{t("our_story_paragraph_1")}</p>
            <p>{t("our_story_paragraph_2")}</p>
            <p>{t("our_story_paragraph_3")}</p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image src="/aboutUs.jpg?height=800&width=600" alt={t("about_company_image_alt")} fill className="object-cover" />
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="bg-emerald-50 border-emerald-100">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-emerald-800">{t("our_mission_title")}</h3>
            <p className="text-gray-700">{t("our_mission_description")}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-amber-800">{t("our_vision_title")}</h3>
            <p className="text-gray-700">{t("our_vision_description")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">{t("our_values_title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{t("value_passion_title")}</h3>
              <p className="text-gray-600">{t("value_passion_description")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{t("value_integrity_title")}</h3>
              <p className="text-gray-600">{t("value_integrity_description")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{t("value_excellence_title")}</h3>
              <p className="text-gray-600">{t("value_excellence_description")}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">{t("our_achievements_title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">{t("years_of_experience")}</div>
            <p className="text-gray-700">{t("years_of_experience_label")}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">{t("happy_travelers")}</div>
            <p className="text-gray-700">{t("happy_travelers_label")}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">{t("destinations")}</div>
            <p className="text-gray-700">{t("destinations_label")}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">{t("hajj_and_umrah_groups")}</div>
            <p className="text-gray-700">{t("hajj_and_umrah_groups_label")}</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">{t("testimonials_title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">{t("testimonial", { index: i })}</p>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={`/placeholder.svg?height=100&width=100&text=C${i}`}
                      alt={t("client_image_alt", { index: i })}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t("client_name")}</h4>
                    <p className="text-sm text-gray-500">{t("client_description")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
