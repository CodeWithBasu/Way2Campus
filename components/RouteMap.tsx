"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, MapPin, Bus } from "lucide-react"
import { io, Socket } from "socket.io-client"

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
        className="w-full max-w-3xl bg-zinc-900 rounded-lg overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="text-[#CCFF00]" />
            Live Tracker - Bus {busNumber}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="relative h-[60vh] bg-[#1a1a1a] overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: "radial-gradient(circle at center, #333 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
          </div>
          
          {/* Mock Route Path */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
             <path d="M 50 300 Q 150 150 300 150 T 600 50" stroke="#333" strokeWidth="8" fill="transparent" strokeDasharray="10 10"/>
             <path d="M 50 300 Q 150 150 300 150 T 600 50" stroke="#CCFF00" strokeWidth="4" fill="transparent" />
          </svg>
          
          {/* DRIEMS University Location Marker */}
          <div className="absolute right-[10%] top-[10%] flex flex-col items-center">
              <MapPin className="h-8 w-8 text-white" />
              <span className="text-xs font-bold mt-1 text-white bg-black px-2 py-1 rounded border border-zinc-800">DRIEMS</span>
          </div>

          {/* Bus Location Marker */}
          <motion.div
            className="absolute"
            animate={
              liveLocation 
              ? { x: `${(liveLocation.lng % 100)}%`, y: `${(liveLocation.lat % 100)}%` }
              : { x: ["10%", "30%", "60%", "80%"], y: ["80%", "50%", "45%", "15%"] }
            }
            transition={liveLocation ? { duration: 1, ease: "linear" } : { duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative group cursor-pointer">
              <div className="h-12 w-12 bg-[#CCFF00] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.5)]">
                <Bus className="h-6 w-6 text-black" />
              </div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-[#CCFF00] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap opacity-100 transition-opacity border border-zinc-800">
                Bus {busNumber} {liveLocation ? "(Live)" : "(Simulating)"}
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="p-4 border-t border-zinc-800 bg-zinc-950">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-zinc-400 text-sm">Status</span>
              <span className="text-white font-medium flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${liveLocation ? "bg-green-500" : "bg-yellow-500"}`}></div> 
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

