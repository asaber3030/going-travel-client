"use client"

import React from "react";

import { motion } from "framer-motion";

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { UILimousine, UILimousineFeature, UILimousineService } from "@/types/ui";

import { TabsContent } from "@radix-ui/react-tabs";
import { Link, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export const OverviewTab = ({ limousine }: Props) => {
  return (
    <TabsContent value="overview">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">About This Vehicle</h2>
          <p className="text-muted-foreground mb-4">{limousine.description}</p>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {limousine.features.map((feature: UILimousineFeature, index: number) => (
              <div key={index} className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 rounded-full p-2 mb-2">{feature.vehicle_features}</div>
                <span>{feature.additional_info}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Services Preview */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {limousine.services.map((service: UILimousineService, index: number) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{service.our_services}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{service.locale.substring(0, 100)}...</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="#services">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Airport Transfer</CardTitle>
                <CardDescription>One-way transfer to/from airport</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg">Base Price</span>
                  <div className="text-right">
                    {limousine.discount > 0 ? (
                      <>
                        <span className="text-2xl font-bold text-primary">
                          ${Math.round(limousine.transferPrice * (1 - limousine.discount / 100))}
                        </span>
                        <span className="text-muted-foreground line-through ml-2">${limousine.transferPrice}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-primary">${limousine.transferPrice}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Professional chauffeur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Flight tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Meet & greet service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Luggage assistance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hourly Charter</CardTitle>
                <CardDescription>Minimum {limousine.minHours} hours booking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg">Per Hour</span>
                  <div className="text-right">
                    {limousine.discount > 0 ? (
                      <>
                        <span className="text-2xl font-bold text-primary">
                          ${Math.round(limousine.hourlyPrice * (1 - limousine.discount / 100))}
                        </span>
                        <span className="text-muted-foreground line-through ml-2">${limousine.hourlyPrice}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-primary">${limousine.hourlyPrice}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Professional chauffeur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Multiple stops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Flexible itinerary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Waiting time included</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </TabsContent>
  );
}
