"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function TourReviews() {
  const [filter, setFilter] = useState("all")

  // Sample review data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "August 2023",
      title: "Unforgettable Swiss Adventure",
      content:
        "This tour exceeded all my expectations! The itinerary was perfectly balanced between outdoor activities and cultural experiences. Our guide, Thomas, was incredibly knowledgeable about Swiss history and nature. The Glacier Express train ride was definitely a highlight - the panoramic views were breathtaking. Highly recommend this tour to anyone who loves nature and wants to experience the best of Switzerland.",
      helpful: 24,
      images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      date: "July 2023",
      title: "Great tour with minor hiccups",
      content:
        "Overall a wonderful experience exploring the Swiss Alps. The accommodations were comfortable and the food was excellent. I especially enjoyed the hike near Zermatt with views of the Matterhorn. The only reason I'm giving 4 stars instead of 5 is because one of the activities was canceled due to weather and the alternative wasn't as exciting. Still, I would recommend this tour to friends and family.",
      helpful: 12,
      images: [],
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "September 2023",
      title: "Perfect family vacation",
      content:
        "We took this tour as a family with two teenagers and it was perfect for all of us. There was enough adventure to keep the kids engaged and enough culture and relaxation for the adults. The chocolate factory tour was a hit with everyone! The guide was patient and accommodating, and the small group size meant we got personalized attention. The scenery throughout the tour was absolutely stunning. Worth every penny!",
      helpful: 18,
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: 4,
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 3,
      date: "June 2023",
      title: "Beautiful scenery but rushed itinerary",
      content:
        "Switzerland is undoubtedly beautiful and this tour covers many amazing locations. However, I felt the itinerary was too packed, with not enough time to truly enjoy each place. We were often rushing from one activity to the next. The accommodations and transportation were good, and our guide was knowledgeable, but I would have preferred a more relaxed pace with perhaps one or two fewer destinations.",
      helpful: 8,
      images: [],
    },
  ]

  // Calculate rating statistics
  const totalReviews = reviews.length
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews

  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++
  })

  const ratingPercentages = ratingCounts.map((count) => (count / totalReviews) * 100)

  // Filter reviews based on selected filter
  const filteredReviews =
    filter === "all" ? reviews : reviews.filter((review) => review.rating === Number.parseInt(filter))

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1 flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
          <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
        </div>

        <div className="md:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <div className="w-12 text-sm">{rating} stars</div>
              <Progress value={ratingPercentages[rating - 1]} className="h-2" />
              <div className="w-12 text-sm text-right">{ratingCounts[rating - 1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          All Reviews
        </Button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <Button
            key={rating}
            variant={filter === rating.toString() ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(rating.toString())}
            className="flex items-center gap-1"
          >
            {rating} <Star className="w-3 h-3 fill-current" />
            <span className="text-xs">({ratingCounts[rating - 1]})</span>
          </Button>
        ))}
      </div>

      <Separator />

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="space-y-4">
            <div className="flex items-start gap-4">
              <Image
                src={review.avatar || "/placeholder.svg"}
                alt={review.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-bold">{review.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-muted-foreground">{review.content}</p>
            </div>

            {review.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {review.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Review image ${index + 1}`}
                    width={120}
                    height={80}
                    className="rounded-md object-cover"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful ({review.helpful})
              </Button>
            </div>

            <Separator />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}

