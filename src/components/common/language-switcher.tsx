"use client";

import Cookies from "js-cookie";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { GlobeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Languages } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function LanguageSwitcher() {
  const t = useTranslations();
  const router = useRouter();

  const changeLanguage = (lang: string) => {
    Cookies.set("language", lang);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <GlobeIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("changeLanguage")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Languages.map((lang) => (
          <DropdownMenuItem onClick={() => changeLanguage(lang.code)} key={lang.code}>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
