import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "going-travel.laravel.cloud",
        port: "",
        pathname: "/uploads/**",
        search: ""
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
        search: ""
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com"
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    }
  }
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
