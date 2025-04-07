import { db } from "@/db"
import { notifications } from "@/db/schema"
import { getCurrentUser } from "@/lib/auth"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { markAllNotificationsAsRead } from "@/actions/notifications"
import { toast } from "@/components/ui/use-toast"

export default async function NotificationsPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const allNotifications = await db.query.notifications.findMany({
    where: (notifications, { eq }) => eq(notifications.userId, user.id),
    orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
  })

  const unreadNotifications = allNotifications.filter(notification => !notification.read)
  const readNotifications = allNotifications.filter(notification => notification.read)

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead(user.id)
      toast({
        title: "Success",
        description: "All notifications marked as read",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {unreadNotifications.length > 0 && (
          <Button onClick={handleMarkAllAsRead}>Mark All as Read</Button>
        )}
      </div>

      <Tabs defaultValue="unread" className="space-y-4">
        <TabsList>
          <TabsTrigger value="unread">
            Unread ({unreadNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All ({allNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({readNotifications.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="unread" className="space-y-4">
          {unreadNotifications.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No unread notifications
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {unreadNotifications.map((notification) => (
                <Card key={notification.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4 p-6">
                      <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="grid gap-1">
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <time dateTime={notification.createdAt.toISOString()}>
                            {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                          </time>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          {allNotifications.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No notifications
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {allNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`overflow-hidden ${!notification.read ? "bg-muted/50" : ""}`}
                >
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4 p-6">
                      <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="grid gap-1">
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <time dateTime={notification.createdAt.toISOString()}>
                            {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                          </time>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="read" className="space-y-4">
          {readNotifications.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No read notifications
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {readNotifications.map((notification) => (
                <Card key={notification.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4 p-6">
                      <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="grid gap-1">
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <time dateTime={notification.createdAt.toISOString()}>
                            {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                          </time>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}