import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatarInitials(fullName: string): string {
  if (!fullName) return "";

  const words = fullName.trim().split(/\s+/);

  const firstNameInitial = words[0]?.[0]?.toUpperCase() ?? "";
  const firstLastNameInitial = words[2]?.[0]?.toUpperCase() ?? words[1]?.[0]?.toUpperCase() ?? "";

  return firstNameInitial + firstLastNameInitial;
}
