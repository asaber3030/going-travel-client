import { APIResponse } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import moment from "moment";

import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function showResponse<T>(data: APIResponse<T>, execute?: () => void) {
  if (data?.status >= 200 && data?.status <= 299) {
    toast.success(data?.message);
    if (execute) execute();
    return;
  }
  toast.error(data?.message);
  if (execute) execute();
  return;
}

export function diffForHumans(date: Date) {
  return moment(date).fromNow();
}

export function randomNumber() {
  return Math.floor(Math.random() * 10000000);
}
