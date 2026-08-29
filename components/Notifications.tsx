"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, BellRing, AlertTriangle, Clock, CheckCircle2 } from "lucide-react"

interface Notification {
  id: number
  type: "status" | "delay" | "emergency"
  title: string
  content: string
  timestamp: string
}

interface NotificationsProps {
  onClose: () => void
  setNotificationCount: (count: number) => void
  busNumber?: string
}

export function Notifications({ onClose, setNotificationCount, busNumber }: NotificationsProps) {
  const defaultBus = busNumber || "15"
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "delay",
      title: `Bus ${defaultBus} Update`,
      content: "Heavy Traffic (Delay). ETA extended by 10 minutes.",
      timestamp: "Just now",
    },
    {
      id: 2,
      type: "status",
      title: `Bus ${defaultBus} Update`,
      content: "On Route / Normal. Leaving Cuttack Square.",
      timestamp: "15 minutes ago",
    },
  ])

  const handleDismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    setNotificationCount(notifications.length - 1)
  }

  const getIcon = (type: string) => {
      switch(type) {
          case "delay": return <Clock className="h-5 w-5 text-yellow-500" />
          case "emergency": return <AlertTriangle className="h-5 w-5 text-red-500" />
          case "status": return <CheckCircle2 className="h-5 w-5 text-green-500" />
          default: return <BellRing className="h-5 w-5 text-[#CCFF00]" />
      }
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
            <CardTitle className="text-xl text-white">Live Updates</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-[#CCFF00]">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[60vh]">
            {notifications.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 flex flex-col items-center">
                    <BellRing className="h-8 w-8 mb-4 opacity-50" />
                    <p>No new updates for Bus {defaultBus}</p>
                </div>
            ) : (
                notifications.map((notification) => (
                <div key={notification.id} className="p-4 border-b border-zinc-800 flex items-start gap-4">
                    <div className="mt-1">
                        {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">{notification.title}</p>
                        <p className="text-sm text-zinc-400 mt-1">{notification.content}</p>
                        <p className="text-xs text-zinc-500 mt-2">{notification.timestamp}</p>
                    </div>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-zinc-500 hover:text-white shrink-0"
                        onClick={() => handleDismiss(notification.id)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                ))
            )}
          </ScrollArea>
        </CardContent>
      </motion.div>
    </motion.div>
  )
}

