import { PageTitle } from "@/components/common/page-title";
import { CreateTourForm } from "../_components/create/create-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Tour"
};

export default function CreateTourPage() {
  return (
    <div>
      <PageTitle label='Create Tour' />
      <CreateTourForm />
    </div>
  );
}
