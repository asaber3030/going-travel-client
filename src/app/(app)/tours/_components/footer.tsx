"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { toursFooterDestinations, toursFooterQuickLinks } from "./data"
import { useQuery } from "@tanstack/react-query"
import { getUILocations } from "../_actions/data"

export default function ToursFooter() {
  const t = useTranslations()
  const { isLoading, data } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => getUILocations({ take: 6 }),
  })

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Going Travel</h3>
            <p className="text-gray-400 mb-4">{t("toursFooterTitle")}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("destinations")}</h3>
            <ul className="space-y-2">
              {isLoading ? (
                <div className="p-2 text-gray-400">{t("loading")}...</div>
              ) : (
                data?.map((location) => (
                  <li key={location.id}>
                    <Link href={`/destinations/${location.id}`} className="text-gray-400 hover:text-white">
                      {location.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {toursFooterQuickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white">
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t("contactUs")}</h3>
            <ul className="space-y-3 text-gray-400">
              <li>123 Alpine Street, Zurich, Switzerland</li>
              <li>{t("phone")}: +41 123 456 789</li>
              <li>{t("email")}: info@alpineadventures.com</li>
              <li>{t("workingHours")}: Mon-Fri 9am-6pm CET</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>
            © {new Date().getFullYear()} Going Travel. {t("allRightsReserved")}.
          </p>
        </div>
      </div>
    </footer>
  )
}
