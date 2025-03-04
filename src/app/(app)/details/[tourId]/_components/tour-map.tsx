"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export default function TourMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for map initialization
    // In a real application, you would use a library like Leaflet or Google Maps

    if (mapRef.current) {
      const mapElement = mapRef.current

      // Simulate map with a colored background and some text
      mapElement.innerHTML = `
        <div style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #e2e8f0; color: #475569; font-weight: bold;">
          <div style="text-align: center;">
            <p>Interactive Map</p>
            <p style="font-size: 0.8rem; font-weight: normal; margin-top: 0.5rem;">
              In a real application, this would be an interactive map showing the tour route through Switzerland.
            </p>
          </div>
        </div>
      `
    }
  }, [])

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div ref={mapRef} className="w-full h-[400px]"></div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="p-4">
            <h3 className="font-bold mb-2">Tour Route</h3>
            <p className="text-sm text-muted-foreground">
              Zurich → Lucerne → Mount Pilatus → Glacier Express → Zermatt → Matterhorn → Montreux → Geneva
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="font-bold mb-2">Distance</h3>
            <p className="text-sm text-muted-foreground">
              Total journey of approximately 350 km through the Swiss Alps, with varied transportation methods for the
              best experience.
            </p>
          </div>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          This tour takes you through some of Switzerland's most iconic locations. The journey begins in Zurich and ends
          in Geneva, covering the breathtaking landscapes of the Swiss Alps, charming villages, and pristine lakes along
          the way.
        </p>
      </div>
    </div>
  )
}

