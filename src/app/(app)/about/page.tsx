import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full mb-12 rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover our story, our mission, and the team behind your unforgettable travel experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Founded in 2010, our travel company has been dedicated to providing exceptional travel experiences to our
              clients. What started as a small team of passionate travelers has grown into a trusted name in the travel
              industry.
            </p>
            <p>
              We specialize in creating personalized travel itineraries that cater to the unique preferences and needs
              of our clients. From luxury tours to budget-friendly adventures, we ensure that every journey is memorable
              and hassle-free.
            </p>
            <p>
              Our expertise in Hajj and Umrah services has made us a preferred choice for pilgrims seeking a spiritual
              journey. We understand the significance of these sacred pilgrimages and strive to make them comfortable
              and meaningful for our clients.
            </p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image src="/placeholder.svg?height=800&width=600" alt="About Our Company" fill className="object-cover" />
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="bg-emerald-50 border-emerald-100">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-emerald-800">Our Mission</h3>
            <p className="text-gray-700">
              To provide exceptional travel experiences that create lasting memories, while ensuring the highest levels
              of service, safety, and satisfaction for our clients. We aim to make travel accessible, enjoyable, and
              enriching for everyone.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-amber-800">Our Vision</h3>
            <p className="text-gray-700">
              To become the leading travel company known for innovation, excellence, and customer-centric approach. We
              envision a world where travel breaks barriers, builds connections, and promotes understanding between
              cultures.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Passion</h3>
              <p className="text-gray-600">
                We are passionate about travel and committed to sharing that enthusiasm with our clients.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Integrity</h3>
              <p className="text-gray-600">
                We operate with honesty, transparency, and ethical standards in all our dealings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto bg-emerald-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from planning to execution.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=Team Member ${i}`}
                    alt={`Team Member ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-800">Team Member {i}</h3>
                <p className="text-emerald-600 mb-3">Position Title</p>
                <p className="text-gray-600 text-sm">
                  Brief description about the team member and their expertise in the travel industry.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">10+</div>
            <p className="text-gray-700">Years of Experience</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">5000+</div>
            <p className="text-gray-700">Happy Travelers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
            <p className="text-gray-700">Destinations</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">100+</div>
            <p className="text-gray-700">Hajj & Umrah Groups</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam."
                </p>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={`/placeholder.svg?height=100&width=100&text=C${i}`}
                      alt={`Client ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Client Name</h4>
                    <p className="text-sm text-gray-500">Hajj Pilgrim, 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
