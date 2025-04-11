import LandingFooter from "./_components/landing-footer";
import LandingHeroSection from "./_components/landing-hero-section";
import ServiceCards from "./_components/service-cards";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <LandingHeroSection />

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our premium travel services designed to make your journey comfortable and memorable
          </p>
        </div>

        <ServiceCards />
      </section>

      <LandingFooter />
    </main>
  );
}

// import ServiceShapes from "./_components/service-shapes";
// import { Compass } from "lucide-react";
// import BackgroundElements from "./_components/background-elements";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden relative">
//       <BackgroundElements />

//       <div className="container mx-auto px-4 py-12 relative z-10">
//         <header className="mb-16 text-center">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
//               <Image src="/logo.svg" width={30} height={30} alt="Logo" className="mb-1" />
//             </div>
//             <h1 className="text-5xl font-bold text-white">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">Going</span>
//               <span className="text-white">Travel</span>
//             </h1>
//           </div>
//           <p className="text-xl text-teal-100 max-w-2xl mx-auto mt-4 leading-relaxed">
//             Discover the world with our premium travel services, designed to make your journey unforgettable
//           </p>
//         </header>

//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-center mb-12 text-white">
//             <span className="inline-block relative">
//               Our Services
//               <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></span>
//             </span>
//           </h2>
//           <ServiceShapes />
//         </section>

//         <footer className="text-center text-teal-200/80 mt-24">
//           <p>© {new Date().getFullYear()} TravelEase. All rights reserved.</p>
//         </footer>
//       </div>
//     </main>
//   );
// }
