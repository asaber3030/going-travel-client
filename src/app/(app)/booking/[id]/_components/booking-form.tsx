"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface BookingFormProps {
  id: string;
}

export function BookingForm({ id }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      // Move to next step with animation
      setStep(step + 1);
      return;
    }

    // Final submission
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 2000);
  };

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='bg-gray-50 p-6'>
        <CardTitle>Booking Information</CardTitle>
        <div className='mt-2 flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 1 ? "bg-teal-500 text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span className={step >= 1 ? "font-medium" : "text-gray-500"}>Personal</span>
          </div>

          <div className='h-px w-12 bg-gray-300'></div>
          <div className='flex items-center gap-2'>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 2 ? "bg-teal-500 text-white" : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span className={step >= 2 ? "font-medium" : "text-gray-500"}>Confirm</span>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className='p-6'>
          <AnimatePresence mode='wait'>
            {step === 1 && (
              <motion.div
                key='step1'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className='space-y-4'
              >
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='first-name'>First Name</Label>
                    <Input id='first-name' required />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='last-name'>Last Name</Label>
                    <Input id='last-name' required />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' type='email' required />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <Input id='phone' type='tel' required />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='special-requests'>Special Requests (Optional)</Label>
                  <Textarea id='special-requests' />
                </div>
              </motion.div>
            )}

            {step === 2 && !isComplete && (
              <motion.div
                key='step3'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className='space-y-4'
              >
                <div className='rounded-lg bg-gray-50 p-4'>
                  <h3 className='font-medium'>Booking Summary</h3>
                  <div className='mt-4 space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-gray-500'>Booking ID</span>
                      <span>{id}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-500'>Name</span>
                      <span>John Doe</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-500'>Email</span>
                      <span>john.doe@example.com</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-500'>Payment Method</span>
                      <span>Credit Card</span>
                    </div>
                    <div className='border-t my-2'></div>
                    <div className='flex justify-between font-medium'>
                      <span>Total</span>
                      <span>$199.00</span>
                    </div>
                  </div>
                </div>

                <div className='rounded-md border border-yellow-200 bg-yellow-50 p-4'>
                  <p className='text-sm text-yellow-800'>
                    Please review your booking details before confirming. Once confirmed,
                    cancellation policies will apply.
                  </p>
                </div>
              </motion.div>
            )}

            {isComplete && (
              <motion.div
                key='complete'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col items-center justify-center py-8 text-center'
              >
                <div className='mb-4 rounded-full bg-green-100 p-3'>
                  <CheckCircle2 className='h-12 w-12 text-green-600' />
                </div>
                <h3 className='text-2xl font-bold'>Booking Confirmed!</h3>
                <p className='mt-2 text-gray-500'>
                  Your booking has been successfully confirmed. A confirmation email has been sent
                  to your email address.
                </p>
                <div className='mt-6 rounded-md bg-gray-50 p-4 text-left w-full'>
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>Booking Reference</span>
                    <span className='font-medium'>
                      BK-
                      {Math.floor(Math.random() * 10000)
                        .toString()
                        .padStart(4, "0")}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {!isComplete && (
          <CardFooter className='flex justify-between border-t bg-gray-50 p-6'>
            {step > 1 ? (
              <Button type='button' variant='outline' onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Processing
                </>
              ) : step < 3 ? (
                "Continue"
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
}

export function BookingFormSkeleton() {
  return (
    <Card>
      <CardHeader className='bg-gray-50 p-6'>
        <div className='h-6 w-40 animate-pulse rounded bg-gray-200'></div>
        <div className='mt-2 flex items-center justify-between'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex items-center gap-2'>
              <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200'></div>
              <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
            </div>
          ))}
          <div className='h-px w-12 bg-gray-300'></div>
          <div className='h-px w-12 bg-gray-300'></div>
        </div>
      </CardHeader>
      <CardContent className='p-6'>
        <div className='space-y-4'>
          <div className='grid gap-4 sm:grid-cols-2'>
            {[1, 2].map((i) => (
              <div key={i} className='space-y-2'>
                <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
                <div className='h-10 w-full animate-pulse rounded bg-gray-200'></div>
              </div>
            ))}
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className='space-y-2'>
              <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
              <div className='h-10 w-full animate-pulse rounded bg-gray-200'></div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='flex justify-between border-t bg-gray-50 p-6'>
        <div className='h-10 w-20 animate-pulse rounded bg-gray-200'></div>
        <div className='h-10 w-24 animate-pulse rounded bg-gray-200'></div>
      </CardFooter>
    </Card>
  );
}
