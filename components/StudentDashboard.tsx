"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Bell, Bus, Map, Clock } from "lucide-react"
import { RouteMap } from "./RouteMap"
import { Notifications } from "./Notifications"
import { MouseMoveEffect } from "./MouseMoveEffect"
import { io, Socket } from "socket.io-client"

interface StudentDashboardProps {
  userData: {
    name: string
    role: string
    busNumber: string
    avatar: string
    joinDate: string
  }
}

export function StudentDashboard({ userData }: StudentDashboardProps) {
  const [showMap, setShowMap] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const [liveStatus, setLiveStatus] = useState("On Route")
  const socketRef = useRef<Socket | null>(null)
  
  // Custom hook for notifications could be extracted, keeping it here for simplicity
  const [liveNotifications, setLiveNotifications] = useState<any[]>([])
  const [currentStop, setCurrentStop] = useState<string>("Cuttack Square")

  const routeStops = ["Cuttack Square", "Link Road", "College Square", "DRIEMS Campus"]

  useEffect(() => {
    socketRef.current = io()
    socketRef.current.emit("joinBus", userData.busNumber)

    socketRef.current.on("statusUpdate", (data) => {
      setLiveStatus(data.content)
      setNotificationCount(prev => prev + 1)
      setLiveNotifications(prev => [{
        id: Date.now(),
        type: data.type,
        title: data.title,
        content: data.content,
        timestamp: data.timestamp
      }, ...prev])
    })

    socketRef.current.on("currentStopUpdate", (data) => {
      setCurrentStop(data.stop)
      setNotificationCount(prev => prev + 1)
      setLiveNotifications(prev => [{
        id: Date.now(),
        type: "status",
        title: "Stop Reached",
        content: `Bus has reached: ${data.stop}`,
        timestamp: data.timestamp
      }, ...prev])
    })

    socketRef.current.on("globalAnnouncement", (data) => {
      setLiveStatus("URGENT: " + data.message)
      setNotificationCount(prev => prev + 1)
      setLiveNotifications(prev => [{
        id: Date.now(),
        type: "urgent",
        title: "Global Announcement",
        content: data.message,
        timestamp: data.timestamp
      }, ...prev])
    })

    return () => {
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [userData.busNumber])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <MouseMoveEffect />
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bus className="h-5 w-5 text-[#CCFF00]" />
            <span className="text-white font-medium">Bus {userData.busNumber} Tracking</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-[#CCFF00] transition-colors duration-200 relative"
              onClick={() => {
                setShowNotifications(true)
                setNotificationCount(0)
              }}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-24 px-4 space-y-6 pb-20 max-w-md mx-auto relative z-10">
        <section>
          <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 bg-[#CCFF00]/10 rounded-full flex items-center justify-center">
               <Clock className="h-8 w-8 text-[#CCFF00]" />
            </div>
            <div>
               <h2 className="text-zinc-400 text-sm">Estimated Time to DRIEMS</h2>
               <p className="text-4xl font-bold text-white mt-2 mb-2">15 mins</p>
               <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                   liveStatus.includes("Delay") || liveStatus.includes("Puncture") || liveStatus.includes("Emergency")
                   ? "bg-red-500/10 text-red-500 border-red-500/20"
                   : "bg-green-500/10 text-green-500 border-green-500/20"
               }`}>
                 {liveStatus}
               </span>
            </div>
          </Card>
        </section>

        {/* Live Map Button */}
        <section>
          <Button
            className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 h-14 text-lg flex items-center justify-center space-x-3 font-semibold rounded-xl"
            onClick={() => setShowMap(true)}
          >
            <Map className="h-6 w-6" />
            <span>Open Live Tracker Map</span>
          </Button>
        </section>

        {/* Bus Stops Timeline */}
        <section className="pt-4">
          <h2 className="text-white font-medium text-lg mb-6 flex items-center gap-2">
             <MapPin className="h-5 w-5 text-[#CCFF00]" />
             Route Stops
          </h2>
          
          <div className="space-y-4 pl-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-zinc-800">
            {routeStops.map((point, index) => {
                // Determine logic for passed, current, and future stops
                const currentIndex = routeStops.indexOf(currentStop);
                const isCurrent = point === currentStop;
                const isPassed = index < currentIndex;

                return (
                  <div key={index} className={`relative flex items-center gap-6 ${isPassed ? "opacity-50" : ""}`}>
                    <div className={`w-4 h-4 rounded-full border-2 border-black z-10 flex-shrink-0 ${isCurrent ? "bg-[#CCFF00]" : isPassed ? "bg-zinc-400" : "bg-zinc-800"}`}></div>
                    <div className={`flex-1 p-4 rounded-xl border shadow-sm ${isCurrent ? "border-[#CCFF00]/30 bg-[#CCFF00]/5" : "border-zinc-800 bg-zinc-900/50"}`}>
                      <div className="flex items-center justify-between">
                          <div className={`font-medium ${isCurrent ? "text-[#CCFF00]" : "text-white"}`}>{point}</div>
                          <span className="text-sm text-zinc-500">
                              {isCurrent ? "Current" : isPassed ? "Passed" : `${8 + index}:00 AM`}
                          </span>
                      </div>
                    </div>
                  </div>
                )
            })}
          </div>
        </section>
      </div>

      {showMap && <RouteMap onClose={() => setShowMap(false)} busNumber={userData.busNumber} />}

      {showNotifications && (
        <Notifications
          onClose={() => setShowNotifications(false)}
          setNotificationCount={setNotificationCount}
          busNumber={userData.busNumber}
          liveData={liveNotifications}
        />
      )}
    </div>
  )
}

