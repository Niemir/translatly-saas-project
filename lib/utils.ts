import { Subscription } from "@/types/Subscription";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isProUser = (
  subscription: Subscription | null | undefined
): boolean => subscription?.role === "pro" && subscription.status === "active";
