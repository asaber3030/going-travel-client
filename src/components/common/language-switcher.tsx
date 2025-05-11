"use client"

import Cookies from "js-cookie"
import Image from "next/image"

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import { GlobeIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Languages } from "@/lib/constants"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LanguageSwitcher() {
  const t = useTranslations()
  const router = useRouter()

  const changeLanguage = (lang: string) => {
    Cookies.set("language", lang)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <GlobeIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("changeLanguage")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Languages.map((lang) => (
          <DropdownMenuItem className='cursor-pointer flex gap-2 items-center' onClick={() => changeLanguage(lang.code)} key={lang.code}>
            <Image src={lang.flag} alt={lang.name} width={20} height={20} />
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
