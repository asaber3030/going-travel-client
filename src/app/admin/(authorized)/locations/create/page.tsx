import { CreateLocationForm } from "../_components/create-form";

import { Metadata } from "next";
import { PageTitle } from "@/components/common/page-title";

export const metadata: Metadata = {
  title: "Create New Location"
};

const CreateLocation = () => {
  return (
    <div className=''>
      <PageTitle label='Create New Location' />
      <CreateLocationForm />
    </div>
  );
};

export default CreateLocation;
