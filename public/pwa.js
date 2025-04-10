// Register the service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope)
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error)
        })
    })
  }
  
  // Handle manifest loading issues
  document.addEventListener("DOMContentLoaded", () => {
    // Check if the manifest link exists
    const manifestLink = document.querySelector('link[rel="manifest"]')
  
    if (!manifestLink) {
      console.warn("Manifest link not found in the document")
      // Add the manifest link if it doesn't exist
      const link = document.createElement("link")
      link.rel = "manifest"
      link.href = "/manifest.json"
      document.head.appendChild(link)
    }
  
    // Fallback to API route if direct access fails
    fetch("/manifest.json")
      .then((response) => {
        if (!response.ok) {
          console.warn("Manifest fetch failed, trying API route")
          return fetch("/api/manifest")
        }
        return response
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Manifest loaded successfully")
      })
      .catch((error) => {
        console.error("Failed to load manifest:", error)
      })
  })
  