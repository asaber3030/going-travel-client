"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { LocationSchema } from "@/schema";
import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLocation } from "../_components/actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileField } from "@/components/common/file-field";
import { LoadingButton } from "@/components/common/loading-button";

export const CreateLocationForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(LocationSchema.Create),
    defaultValues: {
      name: "",
      map_url: "",
    },
  });

  type Data = z.infer<typeof LocationSchema.Create>;

  type Mutation = {
    file: File | null;
    data: Data;
  };

  const mutation = useMutation({
    mutationFn: ({ file, data }: Mutation) => createLocation(data, file),
    onSuccess: (data) => {
      showResponse(data);
    },
  });

  const onSubmit = () => {
    mutation.mutate({ file, data: form.getValues() });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter location name"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="map_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter location description"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FileField label="Image" onChange={setFile} />

        <div className="flex justify-center">
          <LoadingButton
            loading={mutation.isPending}
            children={"Create"}
            className="w-fit"
          />
        </div>
      </form>
    </Form>
  );
};
