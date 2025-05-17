"use client"

import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"
import { EMAIL, PHONE } from "@/lib/constants"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { sendMail } from "@/actions/app"
import { toast } from "react-toastify"
import { LoadingButton } from "@/components/common/loading-button"

export default function ContactPage() {
  const t = useTranslations()
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        subject: z.string().min(1),
        message: z.string().min(1)
      })
    )
  })

  const mut = useMutation({
    mutationFn: (data: any) => sendMail(data),
    onSuccess: () => {
      toast.success("Message sent successfully!")
      form.reset()
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send message")
    }
  })

  const onSubmit = () => {
    mut.mutate(form.getValues())
  }

  return (
    <div className='container mx-auto px-4 py-12'>
      {/* Hero Section */}
      <div className='relative h-[300px] w-full mb-12 rounded-xl overflow-hidden'>
        <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: "url('/contact.avif?height=600&width=1200')" }} />
        <div className='absolute inset-0 bg-black/50' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>{t("contact_us_title")}</h1>
            <p className='text-xl text-white/80 max-w-2xl mx-auto'>{t("contact_us_subtitle")}</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Contact Information */}
        <div className='lg:col-span-1'>
          <h2 className='text-2xl font-bold mb-6 text-gray-800'>{t("get_in_touch_title")}</h2>

          <div className='space-y-6'>
            <Card>
              <CardContent className='p-6'>
                <div className='flex items-start space-x-4'>
                  <div className='bg-emerald-100 p-3 rounded-full'>
                    <Mail className='h-6 w-6 text-emerald-600' />
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-800'>{t("email_us_title")}</h3>
                    <p className='text-gray-600 mt-1'>{EMAIL}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6'>
                <div className='flex items-start space-x-4'>
                  <div className='bg-emerald-100 p-3 rounded-full'>
                    <Phone className='h-6 w-6 text-emerald-600' />
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-800'>{t("call_us_title")}</h3>
                    <p className='text-gray-600 mt-1'>{PHONE}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6'>
                <div className='flex items-start space-x-4'>
                  <div className='bg-emerald-100 p-3 rounded-full'>
                    <Clock className='h-6 w-6 text-emerald-600' />
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-800'>{t("working_hours_title")}</h3>
                    <p className='text-gray-600 mt-1'>{t("working_hours_weekdays")}</p>
                    <p className='text-gray-600'>{t("working_hours_saturday")}</p>
                    <p className='text-gray-600'>{t("working_hours_sunday")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <div className='lg:col-span-2'>
          <Card>
            <CardContent className='p-8'>
              <h2 className='text-2xl font-bold mb-6 text-gray-800'>{t("send_message_title")}</h2>
              <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <InputField name='name' label={t("form_name_label")} placeholder={t("form_name_placeholder")} type='text' control={form.control} />
                    <InputField name='email' label={t("form_email_label")} placeholder={t("form_email_placeholder")} type='email' control={form.control} />
                  </div>
                  <InputField label={t("form_subject_label")} name='subject' placeholder={t("form_subject_placeholder")} control={form.control} />
                  <InputField label={t("form_message_label")} name='message' placeholder={t("form_message_placeholder")} control={form.control} />
                  <LoadingButton loading={mut.isPending} type='submit' className='w-full bg-emerald-600 hover:bg-emerald-700'>
                    {t("form_submit_button")}
                  </LoadingButton>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <div className='mt-12'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>{t("map_section_title")}</h2>
        <div className='h-[400px] w-full rounded-xl overflow-hidden border border-gray-200'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d110615.29141110796!2d31.3691222!3d29.9585056!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583871184fe9f7%3A0xdd5445f17efd4060!2sThe%20Olympic%20Center%20For%20Training%20National%20Teams!5e0!3m2!1sen!2seg!4v1745792223144!5m2!1sen!2seg'
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            title={t("map_iframe_title")}
          />
        </div>
      </div>
    </div>
  )
}
