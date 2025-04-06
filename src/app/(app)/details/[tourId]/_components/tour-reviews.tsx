"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { UIReview } from "@/types/ui"

export default function TourReviews({ reviews }: { reviews: UIReview[] }) {
  const [filter, setFilter] = useState("all")

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
    filter === "all"
      ? reviews
      : reviews.filter((review) => review.rating === Number.parseInt(filter))

  return (
    <div className='space-y-6'>
      {/* Rating Summary */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
        <div className='md:col-span-1 flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg'>
          <div className='text-5xl font-bold mb-2'>{averageRating.toFixed(1)}</div>
          <div className='flex items-center gap-1 mb-2'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <p className='text-sm text-muted-foreground'>Based on {totalReviews} reviews</p>
        </div>

        <div className='md:col-span-2 space-y-2'>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className='flex items-center gap-2'>
              <div className='w-12 text-sm'>{rating} stars</div>
              <Progress value={ratingPercentages[rating - 1]} className='h-2' />
              <div className='w-12 text-sm text-right'>{ratingCounts[rating - 1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Controls */}
      <div className='flex flex-wrap gap-2'>
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size='sm'
          onClick={() => setFilter("all")}
        >
          All Reviews
        </Button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <Button
            key={rating}
            variant={filter === rating.toString() ? "default" : "outline"}
            size='sm'
            onClick={() => setFilter(rating.toString())}
            className='flex items-center gap-1'
          >
            {rating} <Star className='w-3 h-3 fill-current' />
            <span className='text-xs'>({ratingCounts[rating - 1]})</span>
          </Button>
        ))}
      </div>

      <Separator />

      {/* Reviews List */}
      <div className='space-y-6'>
        {filteredReviews.map((review) => (
          <div key={review.id} className='space-y-4'>
            <div className='flex items-start gap-4'>
              <Image
                src={"/placeholder.svg"}
                alt={review.client_name}
                width={48}
                height={48}
                className='rounded-full'
              />
              <div className='flex-1'>
                <h3 className='font-bold'>{review.client_name}</h3>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <div className='flex items-center'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className='font-medium mb-2'>{review.title}</h4>
              <p className='text-muted-foreground'>{review.description}</p>
            </div>

            <Separator />
          </div>
        ))}
      </div>
    </div>
  )
}
