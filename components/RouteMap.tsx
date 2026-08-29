"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, MapPin, Bus } from "lucide-react"
import { io, Socket } from "socket.io-client"
import Map, { Marker, NavigationControl } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"

interface RouteMapProps {
  onClose: () => void
  busNumber: string
}

const DRIEMS_COORDS = { latitude: 20.5593, longitude: 85.9328 }

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

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

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
          {!mapboxToken || mapboxToken === "your_mapbox_token_here" ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-zinc-400">
               <MapPin className="h-12 w-12 mb-4 opacity-50" />
               <h3 className="text-white font-bold text-lg mb-2">Mapbox API Key Required</h3>
               <p className="max-w-md">
                 Please add your Mapbox public token to the <code className="bg-zinc-800 px-1 py-0.5 rounded text-white">.env.local</code> file as <code className="bg-zinc-800 px-1 py-0.5 rounded text-[#CCFF00]">NEXT_PUBLIC_MAPBOX_TOKEN</code> to render the live map.
               </p>
             </div>
          ) : (
             <Map
                mapboxAccessToken={mapboxToken}
                initialViewState={{
                  longitude: DRIEMS_COORDS.longitude,
                  latitude: DRIEMS_COORDS.latitude,
                  zoom: 12
                }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                attributionControl={false}
             >
                <NavigationControl position="bottom-right" />
                
                {/* DRIEMS University Marker */}
                <Marker longitude={DRIEMS_COORDS.longitude} latitude={DRIEMS_COORDS.latitude} anchor="bottom">
                    <div className="flex flex-col items-center">
                        <MapPin className="h-8 w-8 text-white fill-red-500" />
                        <span className="text-xs font-bold mt-1 text-black bg-white px-2 py-1 rounded-full shadow-lg">DRIEMS</span>
                    </div>
                </Marker>

                {/* Bus Live Location Marker */}
                {liveLocation && (
                    <Marker longitude={liveLocation.lng} latitude={liveLocation.lat} anchor="center">
                        <div className="relative group cursor-pointer">
                            <div className="h-12 w-12 bg-[#CCFF00] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.6)]">
                                <Bus className="h-6 w-6 text-black" />
                            </div>
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-[#CCFF00] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg border border-zinc-800">
                                Bus {busNumber} (Live)
                            </div>
                        </div>
                    </Marker>
                )}
             </Map>
          )}
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

