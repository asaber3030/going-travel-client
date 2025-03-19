"use client";
import React from "react";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Category } from "@/types";

import { ArrowLeft, Edit, Globe, MoreHorizontal, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Languages } from "@/lib/constants";
import { DeleteModal } from "./delete-modal";
import { deleteCategory } from "./actions";

// Format date for display
const formatDate = (dateString: string) => {
  return format(new Date(dateString), "PPP");
};

type Props = {
  categoryData: Category;
};

export const SingleCategoryComponent = ({ categoryData }: Props) => {
  const [activeTab, setActiveTab] = useState("en");
  const router = useRouter();

  const activeTranslation = categoryData.translations?.find(
    (t) => t.locale === activeTab
  ) ?? {
    locale: "en",
    name: "N/A",
    description: "N/A",
  };
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                router.push("/admin/categories");
              }}
              variant="ghost"
              size="icon"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-lg font-semibold">Category Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                router.push(`/admin/categories/${categoryData.id}/update`);
              }}
              variant="outline"
              size="sm"
              className="hidden md:flex"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Category
            </Button>
            <DeleteModal
              redirect={() => {
                router.push("/admin/categories");
              }}
              action={deleteCategory}
              id={categoryData.id}
              children={
                <Button
                  variant="destructive"
                  size="sm"
                  className="hidden md:flex"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              }
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">More actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/admin/categories/${categoryData.id}/update`);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Category
                </DropdownMenuItem>

                <DeleteModal
                  action={deleteCategory}
                  id={categoryData.id}
                  children={
                    <DropdownMenuItem
                      className="text-destructive"
                      onSelect={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  }
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Category Image */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Category Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={"/placeholder.svg"}
                  alt={categoryData.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Category Details */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Category Information</CardTitle>
              <CardDescription>ID: {categoryData.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Created On
                    </h3>
                    <p>{formatDate(categoryData.created_at.toString())}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Last Updated
                    </h3>
                    <p>{formatDate(categoryData.updated_at.toString())}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Created By
                    </h3>
                    <p>User ID: {categoryData.created_by}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Updated By
                    </h3>
                    <p>User ID: {categoryData.updated_by}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">Available Translations</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {categoryData.translations?.map((translation) => (
                      <Badge
                        key={translation.locale}
                        variant={
                          activeTab === translation.locale
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => setActiveTab(translation.locale)}
                      >
                        {
                          Languages.find(
                            (lang) => lang.code === translation.locale
                          )?.name
                        }
                      </Badge>
                    ))}
                  </div>

                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="hidden">
                      {categoryData.translations?.map((translation) => (
                        <TabsTrigger
                          key={translation.locale}
                          value={translation.locale}
                        >
                          {
                            Languages.find(
                              (lang) => lang.code === translation.locale
                            )?.name
                          }
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">
                            {
                              Languages.find(
                                (lang) => lang.code === activeTranslation.locale
                              )?.name
                            }
                            Translation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Name
                              </h3>
                              <p className="text-lg font-medium">
                                {activeTranslation.name}
                              </p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Description
                              </h3>
                              <p className="whitespace-pre-wrap">
                                {activeTranslation.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
