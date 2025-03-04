import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  BookingDetails,
  BookingDetailsSkeleton,
} from "./_components/booking-details";
import { BookingForm, BookingFormSkeleton } from "./_components/booking-form";

export default function BookingPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <Link
          href="/listings"
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Complete Your Booking
            </h1>
            <p className="mt-2 text-gray-500">
              Fill in your details to confirm your reservation
            </p>

            <div className="mt-6">
              <Suspense fallback={<BookingDetailsSkeleton />}>
                <BookingDetails id={params.id} />
              </Suspense>
            </div>
          </div>

          <div>
            <Suspense fallback={<BookingFormSkeleton />}>
              <BookingForm id={params.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
