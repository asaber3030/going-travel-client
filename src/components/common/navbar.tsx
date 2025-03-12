"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import {
  Menu,
  X,
  MapPin,
  ChevronDown,
  Search,
  User,
  Phone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function TourismNavbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="hidden border-b bg-teal-600 text-white lg:block px-6">
        <div className="container flex h-10 items-center mx-auto justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>123 Adventure St, Travel City</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm hover:underline">
              FAQ
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Support
            </Link>
          </div>
        </div>
      </div>
      <div className="container flex h-16 items-center justify-between mx-auto  px-4">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <nav className="grid gap-6 text-lg font-medium p-6">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Image src="/logo.svg" width={30} height={30} alt="Logo" />
                  <span className="mt-1">GoingTravel</span>
                </Link>
                <Link
                  href="#"
                  className="group flex h-10 w-full items-center rounded-md px-3 hover:bg-teal-50"
                >
                  Home
                </Link>
                <div className="grid gap-3 pl-3">
                  <h4 className="font-semibold text-teal-600">Destinations</h4>
                  <Link
                    href="#"
                    className="group flex h-8 w-full items-center rounded-md px-3 hover:bg-teal-50"
                  >
                    Beach Getaways
                  </Link>
                  <Link
                    href="#"
                    className="group flex h-8 w-full items-center rounded-md px-3 hover:bg-teal-50"
                  >
                    Mountain Adventures
                  </Link>
                  <Link
                    href="#"
                    className="group flex h-8 w-full items-center rounded-md px-3 hover:bg-teal-50"
                  >
                    City Explorations
                  </Link>
                  <Link
                    href="#"
                    className="group flex h-8 w-full items-center rounded-md px-3 hover:bg-teal-50"
                  >
                    Cultural Tours
                  </Link>
                </div>
                <Link
                  href="#"
                  className="group flex h-10 w-full items-center rounded-md px-3 hover:bg-teal-50"
                >
                  Tour Packages
                </Link>
                <Link
                  href="#"
                  className="group flex h-10 w-full items-center rounded-md px-3 hover:bg-teal-50"
                >
                  Reservations
                </Link>
                <Link
                  href="#"
                  className="group flex h-10 w-full items-center rounded-md px-3 hover:bg-teal-50"
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  className="group flex h-10 w-full items-center rounded-md px-3 hover:bg-teal-50"
                >
                  Contact
                </Link>
                <div className="mt-4 grid gap-2">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Book Now
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image src="/logo.svg" width={30} height={30} alt="Logo" />
            <span className="mt-1">GoingTravel</span>
          </Link>
        </div>
        <nav className="mx-6 hidden items-center space-x-4 lg:flex lg:space-x-6">
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-teal-600"
          >
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                className="flex items-center gap-1 p-0 text-sm font-medium transition-colors hover:text-teal-600"
              >
                Destinations
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[200px]">
              <DropdownMenuItem asChild>
                <Link href="#">Beach Getaways</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Mountain Adventures</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">City Explorations</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#">Cultural Tours</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-teal-600"
          >
            Tour Packages
          </Link>
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-teal-600"
          >
            Reservations
          </Link>
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-teal-600"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-teal-600"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative hidden lg:block">
              <Input
                type="search"
                placeholder="Search destinations..."
                className="w-[200px] pr-8"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <X
                className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="hidden lg:flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button className="hidden bg-teal-600 hover:bg-teal-700 lg:inline-flex">
            Book Now
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
      {isSearchOpen && (
        <div className="border-t p-2 lg:hidden">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search destinations..."
              className="w-full pr-8"
              autoFocus
            />
            <X
              className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
}
