"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, MapPin } from "lucide-react"
import { io, Socket } from "socket.io-client"
import dynamic from "next/dynamic"

// Dynamically import the map to avoid SSR "window is not defined" errors
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false })

interface RouteMapProps {
  onClose: () => void
  busNumber: string
}

export function RouteMap({ onClose, busNumber }: RouteMapProps) {
  const [liveLocation, setLiveLocation] = useState<{lat: number, lng: number} | null>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketRef.current = io()
    socketRef.current.emit("joinBus", busNumber)

    socketRef.current.on("locationUpdate", (data) => {
      setLiveLocation({ lat: data.lat, lng: data.lng })
    })

    return () => {
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [busNumber])

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
        className="w-full max-w-4xl bg-zinc-900 rounded-lg overflow-hidden flex flex-col shadow-2xl border border-zinc-800"
      >
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="text-[#CCFF00]" />
            Live Tracker - Bus {busNumber}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="relative h-[70vh] w-full bg-[#1a1a1a]">
            <MapComponent busNumber={busNumber} liveLocation={liveLocation} />
        </div>
        
        <div className="p-4 border-t border-zinc-800 bg-zinc-950">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-zinc-400 text-sm">Status</span>
              <span className="text-white font-medium flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${liveLocation ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}></div> 
                 {liveLocation ? "Live GPS Active" : "Waiting for GPS..."}
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-zinc-400 text-sm">ETA to DRIEMS</span>
              <span className="text-[#CCFF00] font-bold text-lg">15 mins</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

