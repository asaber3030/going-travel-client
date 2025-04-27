import ToursFeaturedDestinations from "./_components/featured-destinations"
import ToursPopularTours from "./_components/popular-tours"
import ToursTestimonialSlider from "./_components/testimonial-slider"
import ToursHeroSlides from "./_components/hero-slides"
import ToursFooter from "./_components/footer"
import ToursSearchBox from "./_components/search-box"
import ToursParallaxBanner from "./_components/parallax-banner"
import ToursWhyChooseUs from "./_components/why-choose-us"

import { getUILocations, getUIPopularTours, getUIReviews } from "./_actions/data"

export default async function ToursPage() {
  const locationsPromise = getUILocations()
  const popularToursPromise = getUIPopularTours()
  const reviewsPromise = getUIReviews()

  const [locations, popularTours, reviews] = await Promise.all([locationsPromise, popularToursPromise, reviewsPromise])

  return (
    <div>
      <section className="relative h-screen">
        <ToursHeroSlides />
      </section>

      <ToursFeaturedDestinations locations={locations} />
      <ToursPopularTours popularTours={popularTours} />
      <ToursWhyChooseUs />
      <ToursParallaxBanner />
      <ToursTestimonialSlider reviews={reviews} />
      <ToursFooter />
    </div>
  )
}
