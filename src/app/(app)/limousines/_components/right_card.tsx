import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { MessageCircle } from "lucide-react";
import React from "react";

export default function RightCard() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Booking Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Cancellation Policy</h3>
            <p className="text-sm text-muted-foreground">
              Free cancellation up to 24 hours before pickup. Cancellations made less than 24 hours before pickup are subject to a 50%
              charge.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-1">Payment</h3>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards. A 20% deposit is required at the time of booking, with the remaining balance due 24 hours
              before service.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-1">Additional Information</h3>
            <p className="text-sm text-muted-foreground">
              All prices include taxes and fees. Gratuity for the chauffeur is not included and is at your discretion.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-bold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">Our customer service team is available 24/7 to assist you with your booking.</p>
          <Button variant="outline" className="w-full">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
