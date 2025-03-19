import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  headerTitle: string;
  trashedTitle: string;
  createTitle: string;
  trashedLink: string;
  createLink: string;
};

export const SubHeader = ({
  headerTitle,
  trashedTitle,
  createTitle,
  trashedLink,
  createLink,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold">{headerTitle}</h1>

      <div className="flex space-x-4">
        <Link
          href={trashedLink}
          className=" flex gap-2 items-center  space-x-4 px-2 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
        >
          <Trash width={20} /> {trashedTitle}
        </Link>
        <Link
          href={createLink}
          className="flex gap-2 items-center  px-2 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary/80 to-primary rounded-lg shadow-lg hover:from-primary hover:to-primary/90 transition-all transform hover:scale-105"
        >
          <Plus width={20} /> {createTitle}
        </Link>
      </div>
    </div>
  );
};
