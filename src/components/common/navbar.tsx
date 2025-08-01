"use client"

import Link from "next/link"
import Image from "next/image"

import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { getUILocations } from "@/app/(app)/destinations/_actions/data"
import { setCookie } from "cookies-next"

import { EMAIL, LANGUAGE_COOKIE, Languages, PHONE, WHATSAPP } from "@/lib/constants"

import { Menu, MapPin, ChevronDown, Phone, MailIcon, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { AvailableLanguages } from "@/lib/lists" // This seems unused, can be removed if not used elsewhere
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function TourismNavbar() {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()

  console.log(pathname.startsWith("/hajj"))

  const { isLoading, data } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => getUILocations({ take: 6 })
  })

  const handleLanguage = (lang: string) => {
    setCookie(LANGUAGE_COOKIE, lang)
    router.refresh()
  }

  // Define common mobile nav link classes for consistency
  const mobileNavLinkClasses =
    'group flex h-10 w-full items-center rounded-md px-3 hover:bg-teal-50 text-lg font-medium';

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white'>
      <div className='hidden border-b bg-teal-600 text-white lg:block px-6'>
        <div className='container flex h-10 items-center mx-auto justify-between'>
          <div className='flex items-center gap-4 text-sm'>
            <div className='flex items-center gap-1'>
              <Phone className='h-3 w-3' />
              <span>{PHONE}</span>
            </div>
            <div className='flex items-center gap-1'>
              <MailIcon className='h-3 w-3' />
              <span>{EMAIL}</span>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Link href='/about' className='text-sm hover:underline'>
              {t("about")}
            </Link>
            <a href={WHATSAPP} target='_blank' className='text-sm hover:underline'>
              {t("contact")}
            </a>
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

                <Link href='/' className={mobileNavLinkClasses}>
                  {t("home")}
                </Link>

                <Link href='/contact' className={mobileNavLinkClasses}>
                  {t("contact")}
                </Link>

                <Link href='/about' className={mobileNavLinkClasses}>
                  {t("about")}
                </Link>

                {!pathname.startsWith("/hajj") && (
                  <>
                    <Link href='/tours' className={mobileNavLinkClasses}>
                      {t("tours")}
                    </Link>

                    {/* CORRECTED DROPDOWN MENU FOR DESTINATIONS */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {/* Apply common mobile nav link classes to the Button */}
                        <Button
                          variant='ghost' // Use ghost variant to remove default button styles
                          className={`${mobileNavLinkClasses} justify-between px-3 pr-2`} // Adjusted padding
                        >
                          {t("destinations")}
                          <ChevronDown className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align='start'
                        // Adjusted positioning for better visual alignment in the sheet
                        className='w-[calc(100%-48px)] ml-6 mt-2 bg-white shadow-md rounded-md border'
                      >
                        {isLoading ? (
                          <div className='p-2 text-sm text-gray-500'>{t("loading")}...</div>
                        ) : (
                          data?.map((location) => (
                            <Link href={`/destinations/${location.id}`} key={`navbar-destination-${location.id}`}>
                              {/* Apply consistency to DropdownMenuItem */}
                              <DropdownMenuItem className='flex h-8 items-center rounded-md px-3 text-sm hover:bg-teal-50 cursor-pointer'>
                                {location.name}
                              </DropdownMenuItem>
                            </Link>
                          ))
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* END CORRECTED DROPDOWN MENU */}

                    <Link href='/limousines' className={mobileNavLinkClasses}>
                      {t("limousines")}
                    </Link>

                    <Link href='/categories' className={mobileNavLinkClasses}>
                      {t("categories")}
                    </Link>

                    <Link href='/hotels' className={mobileNavLinkClasses}>
                      {t("hotels")}
                    </Link>
                  </>
                )}

                <Link href='/hajj' className={mobileNavLinkClasses}>
                  {t("Hajj")} {/* Assuming you have a translation key for Hajj */}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href='/' className='flex items-center gap-2 font-bold'>
            <Image src='/logo.svg' width={30} height={30} alt='Logo' />
            <span className='mt-1'>GoingTravel</span>
          </Link>
        </div>

        {/* Regular desktop navigation (no changes needed here based on the issue) */}
        <nav className='mx-6 hidden items-center gap-4 lg:flex lg:space-x-6'>
          <Link href='/' className='text-sm font-medium transition-colors hover:text-teal-600'>
            {t("home")}
          </Link>

          {!pathname.startsWith("/hajj") && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='link' className='flex items-center gap-1 px-0 text-sm font-medium transition-colors hover:text-teal-600'>
                    {t("destinations")}
                    <ChevronDown className='h-4 w-4 ' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='center' className='w-[200px] z-50'>
                  {isLoading ? (
                    <div className='p-2'>{t("loading")}...</div>
                  ) : (
                    data?.map((location) => (
                      <Link href={`/destinations/${location.id}`} key={`navbar-destination-${location.id}`}>
                        <DropdownMenuItem className='cursor-pointer'>{location.name}</DropdownMenuItem>
                      </Link>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href='/tours' className='text-sm font-medium transition-colors hover:text-teal-600'>
                {t("tours")}
              </Link>

              <Link href='/categories' className='text-sm font-medium transition-colors hover:text-teal-600'>
                {t("categories")}
              </Link>

              <Link href='/hotels' className='text-sm font-medium transition-colors hover:text-teal-600'>
                {t("hotels")}
              </Link>

              <Link href='/limousines' className='text-sm font-medium transition-colors hover:text-teal-600'>
                {t("limousines")}
              </Link>
            </>
          )}

          <Link href='/about' className='text-sm font-medium transition-colors hover:text-teal-600'>
            {t("about")}
          </Link>

          <Link href='/contact' className='text-sm font-medium transition-colors hover:text-teal-600'>
            {t("contact")}
          </Link>

          <Link href='/hajj' className='text-sm font-medium transition-colors hover:text-teal-600'>
            {t("Hajj")}
          </Link>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='link' className='flex items-center gap-1 p-0 text-sm font-medium transition-colors hover:text-teal-600'>
              {t("language")}
              <ChevronDown className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='center' className='w-[200px] cursor-pointer'>
            {Languages.map((lang) => (
              <DropdownMenuItem className='hover:cursor-pointer cursor-pointer' onClick={() => handleLanguage(lang.code)} key={`lang-${lang.code}`}>
                <Image src={lang.flag} alt={lang.name} width={20} height={20} />
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}