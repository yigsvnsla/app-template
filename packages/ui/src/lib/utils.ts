import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function slugify(text: string): string {
//   return text
//     .toString() // por si no es string
//     .normalize("NFD") // separa acentos
//     .replace(/[\u0300-\u036f]/g, "") // elimina acentos
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-") // reemplaza todo lo que no es alfanumérico por "-"
//     .replace(/^-+|-+$/g, ""); // quita guiones extra al inicio o final
// }

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Eliminar caracteres especiales
    .replace(/[\s_-]+/g, "-") // Reemplazar espacios y guiones bajos con guiones
    .replace(/^-+|-+$/g, ""); // Eliminar guiones al inicio y final
}
