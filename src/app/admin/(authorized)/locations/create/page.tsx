import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateLocationForm } from "../_components/create-form";

const CreateLocation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create New Location
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Add a new location to your collection
          </p>
        </CardHeader>
        <CardContent>
          <CreateLocationForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateLocation;
