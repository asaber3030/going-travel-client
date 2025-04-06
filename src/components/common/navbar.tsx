"use client"

import Link from "next/link"
import Image from "next/image"

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { getUILocations } from "@/app/(app)/destinations/_actions/data"
import { setCookie } from "cookies-next"

import { LANGUAGE_COOKIE } from "@/lib/constants"

import { Menu, MapPin, ChevronDown, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AvailableLanguages } from "@/lib/lists"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export default function TourismNavbar() {
  const t = useTranslations()
  const router = useRouter()

  const { isLoading, data } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => getUILocations({ take: 6 })
  })

  const handleLanguage = (lang: string) => {
    setCookie(LANGUAGE_COOKIE, lang)
    router.refresh()
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white'>
      <div className='hidden border-b bg-teal-600 text-white lg:block px-6'>
        <div className='container flex h-10 items-center mx-auto justify-between'>
          <div className='flex items-center gap-4 text-sm'>
            <div className='flex items-center gap-1'>
              <Phone className='h-3 w-3' />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className='flex items-center gap-1'>
              <MapPin className='h-3 w-3' />
              <span>123 Adventure St, Travel City</span>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Link href='#' className='text-sm hover:underline'>
              {t("faq")}
            </Link>
            <Link href='#' className='text-sm hover:underline'>
              {t("support")}
            </Link>
          </div>
        </div>
      </div>
      <div className='container flex h-16 items-center justify-between mx-auto px-4'>
        <div className='flex items-center'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='mr-2 lg:hidden'>
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[300px] sm:w-[350px]'>
              <nav className='grid gap-6 text-lg font-medium p-6'>
                <Link href='#' className='flex items-center gap-2 text-lg font-semibold'>
                  <Image src='/logo.svg' width={30} height={30} alt='Logo' />
                  <span className='mt-1'>GoingTravel</span>
                </Link>
                <Link
                  href='#'
                  className='group flex h-10 w-full items-center rounded-md px-3 hover:bg-teal-50'
                >
                  {t("home")}
                </Link>
                <div className='grid gap-3 pl-3'>
                  <h4 className='font-semibold text-teal-600'>{t("destinations")}</h4>
                  <Link
                    href='#'
                    className='group flex h-8 w-full items-center rounded-md px-3 hover:bg-teal-50'
                  >
                    Tours
                  </Link>
                </div>
                <Link
                  href='#'
                  className='group flex h-10 w-full items-center rounded-md px-3 hover:bg-teal-50'
                >
                  Tour Packages
                </Link>

                <Link
                  href='#'
                  className='group flex h-10 w-full items-center rounded-md px-3 hover:bg-teal-50'
                >
                  About Us
                </Link>
                <Link
                  href='#'
                  className='group flex h-10 w-full items-center rounded-md px-3 hover:bg-teal-50'
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href='/' className='flex items-center gap-2 font-bold'>
            <Image src='/logo.svg' width={30} height={30} alt='Logo' />
            <span className='mt-1'>GoingTravel</span>
          </Link>
        </div>
        <nav className='mx-6 hidden items-center gap-4 lg:flex lg:space-x-6'>
          <Link href='/' className='text-sm font-medium transition-colors hover:text-teal-600'>
            {t("home")}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='link'
                className='flex items-center gap-1 px-0 text-sm font-medium transition-colors hover:text-teal-600'
              >
                {t("destinations")}
                <ChevronDown className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='center' className='w-[200px]'>
              {isLoading ? (
                <div className='p-2'>{t("loading")}...</div>
              ) : (
                data?.map((location) => (
                  <Link
                    href={`/destinations/${location.id}`}
                    key={`navbar-destination-${location.id}`}
                  >
                    <DropdownMenuItem>{location.name}</DropdownMenuItem>
                  </Link>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href='/tours' className='text-sm font-medium transition-colors hover:text-teal-600'>
            {t("tours")}
          </Link>

          <Link
            href='/categories'
            className='text-sm font-medium transition-colors hover:text-teal-600'
          >
            {t("categories")}
          </Link>

          <Link href='/about' className='text-sm font-medium transition-colors hover:text-teal-600'>
            {t("aboutUs")}
          </Link>
          <Link
            href='/contact'
            className='text-sm font-medium transition-colors hover:text-teal-600'
          >
            {t("contact")}
          </Link>
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='link'
              className='flex items-center gap-1 p-0 text-sm font-medium transition-colors hover:text-teal-600'
            >
              {t("language")}
              <ChevronDown className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='center' className='w-[200px]'>
            {AvailableLanguages.map((lang) => (
              <DropdownMenuItem onClick={() => handleLanguage(lang.code)} key={`lang-${lang.code}`}>
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
