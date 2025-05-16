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
      { hostname: "18.199.171.124" },
      { hostname: "127.0.0.1" },
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
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        pathname: "/**",
        search: ""
      },
      {
        protocol: "https",
        hostname: "gratisography.com",
        pathname: "/**",
        search: ""
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
