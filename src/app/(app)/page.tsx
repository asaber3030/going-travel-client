/* import { getTranslations } from "next-intl/server"
import LandingFooter from "./_components/landing-footer"
import LandingHeroSection from "./_components/landing-hero-section"
import ServiceCards from "./_components/service-cards"
import { getServiceCards } from "@/actions/services"
 */
export default async function Home() {
  /*   const t = await getTranslations()
  const services = await getServiceCards() */

  return (
    <main className='min-h-screen bg-white'>
      {/* <LandingHeroSection />

      <section className='container mx-auto px-4 py-16'>
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>{t("homePageTitle")}</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>{t("homePageDescription")}</p>
        </div>

        <ServiceCards services={services} />
      </section>


      <LandingFooter /> */}
      MYAPP
    </main>
  )
}
