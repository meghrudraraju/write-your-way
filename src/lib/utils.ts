import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toSnakeCaseKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCaseKeys(item))
  }

  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        key.replace(/([A-Z])/g, "_$1").toLowerCase(),
        toSnakeCaseKeys(value),
      ])
    )
  }

  return obj
}