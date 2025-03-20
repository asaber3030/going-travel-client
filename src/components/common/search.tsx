"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { build } from "search-params";

import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchFilter = () => {
  const router = useRouter();
  const sp = useSearchParams();

  const [search, setSearch] = useState(sp.get("search") ?? "");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = build({ search });
    router.push(params ? `?${params}` : "");
  };

  return (
    <form className='relative flex gap-1 items-center' onSubmit={handleSearch}>
      <div className='relative w-full'>
        <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500' />
        <Input
          placeholder='Search for...'
          className='pl-8'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search && (
        <Button size='icon' variant='outline'>
          <SearchIcon className='size-4' />
        </Button>
      )}
    </form>
  );
};
