import { HajjWelcomeSection } from "./_components/hajj_welcome_section"
import { IntroSection } from "./_components/intro_section"
import { WyhChooseUsSection } from "./_components/why_choose_us_section"
import { FAQSection } from "./_components/faq_section"
import { getUIHajjPackages } from "./_actions/data"
import { HajjPackagesSection } from "./_components/hajj_packages_section"
import { CTASection } from "./_components/cta_section"
import { Cairo } from "next/font/google"
import { TSearchParams } from "@/types"

const font = Cairo({ subsets: ["arabic"] })

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function HajjPage({ searchParams }: Props) {
  const sp = await searchParams
  const hajjPackages = await getUIHajjPackages(sp)

  return (
    <div className={`container mx-auto px-4 py-12  rtl ${font.className}`} dir='rtl'>
      {/* قسم الترحيب */}
      <HajjWelcomeSection />

      {/* المقدمة */}
      <IntroSection />

      {/* Hajj Packages */}
      <HajjPackagesSection data={hajjPackages} />

      {/* Why Choose Us */}
      <WyhChooseUsSection />

      {/* CTA Section */}
      <CTASection />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  )
}
