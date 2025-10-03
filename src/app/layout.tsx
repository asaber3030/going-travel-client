import "./globals.css"

import { loadFont, loadPageDirection } from "@/lib/fonts"

import { ReactQueryClientProvider, StoreProvider } from "@/providers"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { Toaster } from "@/components/ui/toaster"
import { ToastContainer } from "react-toastify"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kaza Travel",
  description: "Kaza Travel",
  keywords: ["Travel", "Tourism", "Adventure", "Kaza Travel"]
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} dir={loadPageDirection(locale)}>
      <body className={loadFont(locale)}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ReactQueryClientProvider>
            <StoreProvider>{children}</StoreProvider>
            <Toaster />
            <ToastContainer />
          </ReactQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
