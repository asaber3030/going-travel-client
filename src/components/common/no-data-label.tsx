"use client"

import { useTranslations } from "next-intl"

import { ClassValue } from "clsx"
import { cn } from "@/lib/utils"

type Props = {
  label?: string
  className?: ClassValue
}

export const NoDataLabel = ({ className, label = "noDataAvailable" }: Props) => {
  const t = useTranslations()

  return (
    <div
      className={cn(
        "border p-2 px-4 rounded-md shadow-sm text-gray-500 text-lg font-medium",
        className
      )}
    >
      {t(label)}
    </div>
  )
}
