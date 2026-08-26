"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, UserPlus, MessageCircle } from "lucide-react"

interface Notification {
  id: number
  type: "friend_request" | "message"
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
}

interface NotificationsProps {
  onClose: () => void
  setNotificationCount: (count: number) => void
  onAcceptFriendRequest: (user: any) => void
}

export function Notifications({ onClose, setNotificationCount, onAcceptFriendRequest }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "friend_request",
      user: { name: "Ana García", avatar: "/placeholder.svg" },
      content: "Sent you a friend request",
      timestamp: "5 minutes ago",
    },
    {
      id: 2,
      type: "message",
      user: { name: "Carlos Rodríguez", avatar: "/placeholder.svg" },
      content: "Do you want to join our group to ski tomorrow?",
      timestamp: "20 minutes ago",
    },
  ])

  const handleNotificationAction = (id: number, action: "accept" | "decline") => {
    const notification = notifications.find((n) => n.id === id)
    if (notification && notification.type === "friend_request") {
      if (action === "accept") {
        onAcceptFriendRequest(notification.user)
      }
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    setNotificationCount(notifications.length - 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900 rounded-lg overflow-hidden"
      >
        <CardHeader className="border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white">Notifications</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-[#CCFF00]">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[60vh]">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 border-b border-zinc-800">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={notification.user.avatar} />
                    <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{notification.user.name}</p>
                    <p className="text-xs text-zinc-400">{notification.content}</p>
                    <p className="text-xs text-zinc-500 mt-1">{notification.timestamp}</p>
                  </div>
                  {notification.type === "friend_request" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                        onClick={() => handleNotificationAction(notification.id, "accept")}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-700 text-zinc-400 hover:text-white"
                        onClick={() => handleNotificationAction(notification.id, "decline")}
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                  {notification.type === "message" && (
                    <Button
                      size="sm"
                      className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                      onClick={() => handleNotificationAction(notification.id, "accept")}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </motion.div>
    </motion.div>
  )
}

