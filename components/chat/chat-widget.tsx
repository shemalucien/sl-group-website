"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "./chat-interface"
import { cn } from "@/lib/utils"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
      return
    }
    setIsOpen(!isOpen)
  }

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div
          className={cn(
            "bg-white rounded-lg shadow-lg mb-4 transition-all duration-300 ease-in-out overflow-hidden",
            isMinimized ? "w-72 h-14" : "w-80 sm:w-96 h-[500px]",
          )}
        >
          <div
            className="bg-primary text-white p-3 flex justify-between items-center cursor-pointer"
            onClick={isMinimized ? toggleChat : undefined}
          >
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              <h3 className="font-medium">SL Group Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:text-white hover:bg-primary-foreground/20"
                onClick={minimizeChat}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:text-white hover:bg-primary-foreground/20"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && <ChatInterface />}
        </div>
      )}

      <Button
        onClick={toggleChat}
        size="lg"
        className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}
