"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface VideoPlayerProps {
  title: string
  description: string
  videoUrl?: string
}

export default function VideoPlayer({ title, description, videoUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
        {isPlaying ? (
          <iframe
            src={videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 absolute inset-0 opacity-50"></div>
            <button
              onClick={handlePlay}
              className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white text-blue-700 hover:bg-blue-50 transition-colors"
              aria-label="Play video"
            >
              <Play className="h-8 w-8 fill-current" />
            </button>
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

