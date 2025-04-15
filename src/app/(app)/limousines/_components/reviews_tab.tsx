"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UILimousine, UILimousineReview } from "@/types/ui";
import { TabsContent } from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { MessageCircle, Star } from "lucide-react";
import React from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

type Props = {
  limousine: UILimousine;
};

export  function ReviewsTab({ limousine }: Props) {
  return (
    <TabsContent value="reviews">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <Button>
            <MessageCircle className="mr-2 h-4 w-4" />
            Write a Review
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1 flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                <div className="text-5xl font-bold mb-2">4.8</div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < 5 ? "fill-amber-500 text-amber-500" : "fill-muted text-muted-foreground"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Based on {limousine.reviews.length} reviews</p>
              </div>

              <div className="md:col-span-2 space-y-2">
                {[
                  { category: "Service", rating: 5.0 },
                  { category: "Vehicle Condition", rating: 4.9 },
                  { category: "Punctuality", rating: 4.8 },
                  { category: "Comfort", rating: 5.0 },
                  { category: "Value for Money", rating: 4.5 },
                ].map((item) => (
                  <div key={item.category} className="flex items-center gap-2">
                    <div className="w-32 text-sm">{item.category}</div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(item.rating / 5) * 100}%` }}></div>
                    </div>
                    <div className="w-10 text-sm text-right">{item.rating}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {limousine.reviews.map((review: UILimousineReview, index: number) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold">{review.reviewer_name}</h3>
                    <p className="text-sm text-muted-foreground">{review.id}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      </motion.div>
    </TabsContent>
  );
}
