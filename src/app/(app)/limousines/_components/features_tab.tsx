import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import React from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function FeaturesTab() {
  return (
    <TabsContent value="features">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Vehicle Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              category: "Comfort",
              items: [
                "Premium leather seats",
                "Spacious interior",
                "Climate control",
                "Heated and ventilated seats",
                "Ambient lighting",
                "Tinted windows",
                "Noise insulation",
                "Adjustable seating",
              ],
            },
            {
              category: "Entertainment",
              items: [
                "Premium sound system",
                "Bluetooth connectivity",
                "USB charging ports",
                "Complimentary WiFi",
                "Tablet with entertainment options",
                "Satellite radio",
                "Headphones",
              ],
            },
            {
              category: "Refreshments",
              items: [
                "Complimentary bottled water",
                "Ice compartment",
                "Glassware",
                "Mini refrigerator",
                "Coffee/tea on request",
                "Premium snacks (on request)",
              ],
            },
            {
              category: "Service",
              items: [
                "Professional chauffeur",
                "Flight tracking",
                "Meet & greet service",
                "Luggage assistance",
                "Door-to-door service",
                "24/7 customer support",
                "Multilingual chauffeurs available",
              ],
            },
          ].map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold mb-1">Additional Information</h3>
              <p className="text-muted-foreground">
                All our vehicles are meticulously maintained and undergo thorough cleaning and sanitization between each service. Special
                requests can be accommodated with advance notice. Please contact our customer service team for any specific requirements.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </TabsContent>
  );
}
