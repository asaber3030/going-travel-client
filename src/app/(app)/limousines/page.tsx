"use server"

import { LimousineHeroSlides } from "./_components/hero-slides"
import { getUILimousines } from "./_actions/data"
import { FilterWithLimousineList } from "./_components/filter_with_limousine_list"
import { LimousineServices } from "./_components/limousine_services"
import {LimousineTestimonials} from "./_components/limousine_testimonials"
import { CTASection } from "./_components/cta_section"

export default async function LimousinesPage() {
  const limousines = await getUILimousines()

  return (
    <div>
      <LimousineHeroSlides />
      <FilterWithLimousineList data={limousines} />
      <LimousineServices />
      <LimousineTestimonials />
      <CTASection />
    </div>
  )
}
