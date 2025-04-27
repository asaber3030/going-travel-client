import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export default function ContactPage() {
  const t = useTranslations()
  return (
    <div className='container mx-auto px-4 py-12'>
      {/* Hero Section */}
      <div className='relative h-[300px] w-full mb-12 rounded-xl overflow-hidden'>
        <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }} />
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
                    <MapPin className='h-6 w-6 text-emerald-600' />
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-800'>{t("location_title")}</h3>
                    <p className='text-gray-600 mt-1'>{t("location_address")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6'>
                <div className='flex items-start space-x-4'>
                  <div className='bg-emerald-100 p-3 rounded-full'>
                    <Mail className='h-6 w-6 text-emerald-600' />
                  </div>
                  <div>
                    <h3 className='font-medium text-gray-800'>{t("email_us_title")}</h3>
                    <p className='text-gray-600 mt-1'>{t("email_primary")}</p>
                    <p className='text-gray-600'>{t("email_support")}</p>
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
                    <p className='text-gray-600 mt-1'>{t("phone_primary")}</p>
                    <p className='text-gray-600'>{t("phone_secondary")}</p>
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
              <form className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label htmlFor='name' className='text-sm font-medium text-gray-700'>
                      {t("form_name_label")}
                    </label>
                    <Input id='name' placeholder={t("form_name_placeholder")} />
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor='email' className='text-sm font-medium text-gray-700'>
                      {t("form_email_label")}
                    </label>
                    <Input id='email' type='email' placeholder={t("form_email_placeholder")} />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='subject' className='text-sm font-medium text-gray-700'>
                    {t("form_subject_label")}
                  </label>
                  <Input id='subject' placeholder={t("form_subject_placeholder")} />
                </div>

                <div className='space-y-2'>
                  <label htmlFor='message' className='text-sm font-medium text-gray-700'>
                    {t("form_message_label")}
                  </label>
                  <Textarea id='message' placeholder={t("form_message_placeholder")} rows={6} />
                </div>

                <Button type='submit' className='w-full bg-emerald-600 hover:bg-emerald-700'>
                  {t("form_submit_button")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <div className='mt-12'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>{t("map_section_title")}</h2>
        <div className='h-[400px] w-full rounded-xl overflow-hidden border border-gray-200'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1619528762181!5m2!1sen!2s'
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
