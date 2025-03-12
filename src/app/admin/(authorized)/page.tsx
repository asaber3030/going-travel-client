"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Users,
  Map,
  Star,
  Calendar,
  DollarSign,
  BarChart3,
  ArrowRight,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week")

  // Sample data for dashboard
  const stats = [
    {
      title: "Total Bookings",
      value: "1,284",
      change: "+12.5%",
      trend: "up",
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "Total Revenue",
      value: "$86,429",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Active Users",
      value: "3,427",
      change: "+5.7%",
      trend: "up",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "bg-amber-500",
    },
  ]

  const popularTours = [
    {
      id: 1,
      name: "Swiss Alps Adventure Tour",
      bookings: 142,
      revenue: "$184,600",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Italian Lakes & Alpine Adventure",
      bookings: 98,
      revenue: "$176,400",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Mont Blanc Trekking Experience",
      bookings: 87,
      revenue: "$130,500",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Norwegian Fjords Explorer",
      bookings: 76,
      revenue: "$129,200",
      rating: 4.9,
    },
    {
      id: 5,
      name: "Alpine Winter Wonderland",
      bookings: 64,
      revenue: "$89,600",
      rating: 4.6,
    },
  ]

  const recentBookings = [
    {
      id: "B-7829",
      customer: "Sarah Johnson",
      tour: "Swiss Alps Adventure Tour",
      date: "2023-11-15",
      amount: "$1,299",
      status: "confirmed",
    },
    {
      id: "B-7830",
      customer: "Michael Chen",
      tour: "Italian Lakes & Alpine Adventure",
      date: "2023-11-14",
      amount: "$1,799",
      status: "pending",
    },
    {
      id: "B-7831",
      customer: "Emma Wilson",
      tour: "Mont Blanc Trekking Experience",
      date: "2023-11-14",
      amount: "$1,499",
      status: "confirmed",
    },
    {
      id: "B-7832",
      customer: "David Rodriguez",
      tour: "Norwegian Fjords Explorer",
      date: "2023-11-13",
      amount: "$1,699",
      status: "confirmed",
    },
    {
      id: "B-7833",
      customer: "Lisa Thompson",
      tour: "Alpine Winter Wonderland",
      date: "2023-11-12",
      amount: "$1,399",
      status: "cancelled",
    },
  ]

  const topDestinations = [
    { name: "Switzerland", bookings: 324, percentage: 28 },
    { name: "Italy", bookings: 256, percentage: 22 },
    { name: "France", bookings: 198, percentage: 17 },
    { name: "Norway", bookings: 167, percentage: 14 },
    { name: "Austria", bookings: 142, percentage: 12 },
    { name: "Germany", bookings: 87, percentage: 7 },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, Admin!</h1>
          <p className="text-muted-foreground">Here's what's happening with your tours today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="week" className="w-[300px]" onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.color} p-2 rounded-full text-white`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center pt-1 text-xs">
                  <span className={`flex items-center ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-1">from previous {timeRange}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Total revenue breakdown by tour category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-16 w-16 mx-auto mb-2 text-muted-foreground/50" />
              <p>Revenue chart visualization would appear here</p>
              <p className="text-sm">Showing data for the selected {timeRange}</p>
            </div>
          </CardContent>
        </Card>

        {/* Top Destinations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Destinations</CardTitle>
              <CardDescription>Most popular destinations by bookings</CardDescription>
            </div>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDestinations.map((destination) => (
                <div key={destination.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{destination.name}</p>
                    <p className="text-sm text-muted-foreground">{destination.bookings} bookings</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{destination.percentage}%</span>
                    <Progress value={destination.percentage} className="w-24 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/admin/destinations">
                View All Destinations <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Popular Tours and Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Tours */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Tours</CardTitle>
            <CardDescription>Your best performing tours by bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularTours.map((tour, index) => (
                <div key={tour.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tour.name}</p>
                      <p className="text-xs text-muted-foreground">{tour.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-medium">{tour.revenue}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
                        {tour.rating}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/tours/${tour.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/admin/tours">
                View All Tours <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest tour bookings and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{booking.customer}</p>
                    <p className="text-xs text-muted-foreground">{booking.tour}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-medium">{booking.amount}</p>
                      <p className="text-xs text-muted-foreground">{booking.date}</p>
                    </div>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">
              View All Bookings <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

