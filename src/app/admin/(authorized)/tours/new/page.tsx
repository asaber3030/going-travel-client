"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function NewTourPage() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    location: "",
    duration: "",
    groupSize: "",
    price: "",
    description: "",
    longDescription: "",
    status: "draft",
    featured: false,
    highlights: ["", ""],
    inclusions: ["", ""],
    exclusions: ["", ""],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleArrayChange = (arrayName: string, index: number, value: string) => {
    setFormData((prev) => {
      const newArray = [...(prev[arrayName as keyof typeof prev] as string[])]
      newArray[index] = value
      return { ...prev, [arrayName]: newArray }
    })
  }

  const addArrayItem = (arrayName: string) => {
    setFormData((prev) => {
      const newArray = [...(prev[arrayName as keyof typeof prev] as string[]), ""]
      return { ...prev, [arrayName]: newArray }
    })
  }

  const removeArrayItem = (arrayName: string, index: number) => {
    setFormData((prev) => {
      const newArray = [...(prev[arrayName as keyof typeof prev] as string[])]
      newArray.splice(index, 1)
      return { ...prev, [arrayName]: newArray }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your API
    console.log("Form submitted:", formData)
    // Redirect to tours list or show success message
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/tours">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Add New Tour</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button type="submit" form="tour-form">
            <Save className="mr-2 h-4 w-4" />
            Publish Tour
          </Button>
        </div>
      </div>

      {/* Form */}
      <form id="tour-form" onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-xl">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of your tour package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tour Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter tour name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      placeholder="tour-name-slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This will be used for the tour URL: example.com/tour/[slug]
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. Switzerland, Europe"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        name="duration"
                        placeholder="e.g. 7 Days / 6 Nights"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="groupSize">Group Size</Label>
                      <Input
                        id="groupSize"
                        name="groupSize"
                        placeholder="e.g. Max 12 people"
                        value={formData.groupSize}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price (per person)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">$</span>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        className="pl-7"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tour Status</CardTitle>
                <CardDescription>Set the visibility and featured status of this tour</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">Featured Tour</Label>
                    <p className="text-sm text-muted-foreground">
                      Featured tours appear on the homepage and top of listings
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tour Highlights</CardTitle>
                <CardDescription>Add key highlights of this tour package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={`Highlight ${index + 1}`}
                      value={highlight}
                      onChange={(e) => handleArrayChange("highlights", index, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("highlights", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => addArrayItem("highlights")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Highlight
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inclusions</CardTitle>
                  <CardDescription>What's included in the tour price</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.inclusions.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Inclusion ${index + 1}`}
                        value={item}
                        onChange={(e) => handleArrayChange("inclusions", index, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayItem("inclusions", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => addArrayItem("inclusions")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Inclusion
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exclusions</CardTitle>
                  <CardDescription>What's not included in the tour price</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.exclusions.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Exclusion ${index + 1}`}
                        value={item}
                        onChange={(e) => handleArrayChange("exclusions", index, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayItem("exclusions", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => addArrayItem("exclusions")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Exclusion
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tour Description</CardTitle>
                <CardDescription>Provide detailed information about the tour</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief overview of the tour (displayed in listings)"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription">Full Description</Label>
                  <Textarea
                    id="longDescription"
                    name="longDescription"
                    placeholder="Detailed description of the tour experience"
                    rows={6}
                    value={formData.longDescription}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
                <CardDescription>Add day-by-day itinerary details</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The itinerary builder will be available after saving the basic tour information.
                </p>
                <Button variant="outline" disabled>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Itinerary Day
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tour Images</CardTitle>
                <CardDescription>Upload images for this tour package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Drag and drop an image, or click to browse</p>
                      <p className="text-xs text-muted-foreground">Recommended size: 1200 x 800 pixels</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Gallery Images</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    The gallery manager will be available after saving the tour.
                  </p>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        You can add multiple gallery images after creating the tour
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/tours">Cancel</Link>
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Publish Tour
          </Button>
        </div>
      </form>
    </div>
  )
}

