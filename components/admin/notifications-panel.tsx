"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { markNotificationAsRead } from "@/actions/notifications"
import { formatDistanceToNow } from "date-fns"
import { toast } from "@/components/ui/use-toast"

interface Notification {
  id: number
  title: string
  message: string
  type: string
  read: boolean
  createdAt: Date
}

interface NotificationsPanelProps {
  notifications: Notification[]
  count: number
}

export function NotificationsPanel({ notifications, count }: NotificationsPanelProps) {
  const [open, setOpen] = useState(false)
  const [localNotifications, setLocalNotifications] = useState(notifications)
  const [localCount, setLocalCount] = useState(count)

  const handleMarkAsRead = async (id: number) => {
    try {
      const result = await markNotificationAsRead(id)

      if (result.success) {
        setLocalNotifications(
          localNotifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          ),
        )
        setLocalCount((prev) => Math.max(0, prev - 1))
        toast({
          title: "Notification marked as read",
          description: "The notification has been marked as read.",
        })
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
      toast({
        title: "Error",
        description: "Failed to mark notification as read.",
        variant: "destructive",
      })
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <div className="h-2 w-2 rounded-full bg-blue-500" />
      case "appointment":
        return <div className="h-2 w-2 rounded-full bg-green-500" />
      case "message":
        return <div className="h-2 w-2 rounded-full bg-yellow-500" />
      default:
        return <div className="h-2 w-2 rounded-full bg-gray-500" />
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {localCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {localCount > 99 ? "99+" : localCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-medium">Notifications</h4>
          {localCount > 0 && <span className="text-xs text-muted-foreground">{localCount} unread</span>}
        </div>
        <div className="max-h-80 overflow-auto">
          {localNotifications.length === 0 ? (
            <div className="flex items-center justify-center p-6 text-center text-sm text-muted-foreground">
              No new notifications
            </div>
          ) : (
            <div className="grid gap-1">
              {localNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 hover:bg-muted ${!notification.read ? "bg-muted/50" : ""}`}
                >
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="grid gap-1">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-muted-foreground">{notification.message}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <time dateTime={notification.createdAt.toISOString()}>
                        {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                      </time>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs font-normal"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t p-3">
          <Button variant="ghost" size="sm" className="w-full justify-center">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

