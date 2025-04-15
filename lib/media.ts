import { v4 as uuidv4 } from "uuid"

// This is a placeholder for actual media upload functionality
// In a real application, you would use a service like AWS S3, Cloudinary, or Vercel Blob Storage

export async function uploadMedia(file: File): Promise<string> {
  // In a real implementation, this would upload the file to a storage service
  // and return the URL of the uploaded file

  // For now, we'll just return a placeholder URL
  const fileExtension = file.name.split(".").pop()
  const fileName = `${uuidv4()}.${fileExtension}`
  return `/uploads/${fileName}`
}

export function getMediaUrl(path: string): string {
  // In a real implementation, this would construct the full URL to the media file
  // based on your storage service configuration

  // For now, we'll just return the path as is
  return path
}

export function isImageFile(fileName: string): boolean {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"]
  const extension = fileName.split(".").pop()?.toLowerCase() || ""
  return imageExtensions.includes(extension)
}

export function isDocumentFile(fileName: string): boolean {
  const documentExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"]
  const extension = fileName.split(".").pop()?.toLowerCase() || ""
  return documentExtensions.includes(extension)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
