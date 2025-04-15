"use server";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getUILimousineById } from "../_actions/data";
import { FeaturesTab } from "../_components/features_tab";
import { SpecificationTab } from "../_components/specifications_tabs";
import { OverviewTab } from "../_components/overview_tab";
import { ReviewsTab } from "../_components/reviews_tab";
import VehicleGalleryHeader from "../_components/vehicle_gallery_header";
import RightCard from "../_components/right_card";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LimousineDetailsPage({ params }: Props) {
  const { id } = await params;
  const limousine = await getUILimousineById(id);

  return (
    <div className="bg-gray-50">
      {/* <VehicleGalleryHeader limousine={limousine} /> */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="mb-12">
              <TabsList className="w-full justify-start mb-6 overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              {/* <OverviewTab limousine={limousine} /> */}
              <FeaturesTab />
              <SpecificationTab />
              <ReviewsTab limousine={limousine} />
            </Tabs>
          </div>
          <RightCard />
        </div>
      </div>
    </div>
  );
}
