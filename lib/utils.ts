// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// export function formatPrice(price: number): string {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(price / 100)
// }

// export function formatDate(date: Date | string): string {
//   return new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   }).format(new Date(date))
// }

// export function formatDateTime(date: Date | string): string {
//   return new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//   }).format(new Date(date))
// }

// export function truncate(str: string, length: number): string {
//   return str.length > length ? `${str.substring(0, length)}...` : str
// }

// export function slugify(str: string): string {
//   return str
//     .toLowerCase()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/[\s_-]+/g, "-")
//     .replace(/^-+|-+$/g, "")
// }

// export function generateRandomString(length: number): string {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
//   let result = ""
//   for (let i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length))
//   }
//   return result
// }


import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function getInitials(firstName: string | null, lastName: string | null): string {
  const first = firstName ? firstName.charAt(0).toUpperCase() : ""
  const last = lastName ? lastName.charAt(0).toUpperCase() : ""
  return first + last || "U"
}

export function generatePaginationArray(currentPage: number, totalPages: number): (number | string)[] {
  const delta = 1
  const left = currentPage - delta
  const right = currentPage + delta + 1
  const range: (number | string)[] = []
  const rangeWithDots: (number | string)[] = []
  let l: number = 0

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i < right)) {
      range.push(i)
    }
  }

  for (const i of range) {
    if (l) {
      if (typeof i === "number" && i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (typeof i === "number" && i - l !== 1) {
        rangeWithDots.push("...")
      }
    }
    rangeWithDots.push(i)
    l = i as number
  }

  return rangeWithDots
}

export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-teal-100 text-teal-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    paid: "bg-green-100 text-green-800",
    unpaid: "bg-red-100 text-red-800",
    partial: "bg-yellow-100 text-yellow-800",
  }

  return statusMap[status.toLowerCase()] || "bg-gray-100 text-gray-800"
}

export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 10)
}

export function calculateTotalPrice(items: { price: number; quantity: number }[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[0-9]{10,15}$/
  return phoneRegex.test(phone)
}

export function getFullName(firstName: string | null, lastName: string | null): string {
  if (!firstName && !lastName) return "Unknown User"
  return `${firstName || ""} ${lastName || ""}`.trim()
}

