"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bus, MapPin, AlertCircle, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { MouseMoveEffect } from "./MouseMoveEffect"
import { io, Socket } from "socket.io-client"
import { toast } from "sonner"
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false })

interface DriverDashboardProps {
  userData: {
    name: string
    role: string
    busNumber: string
    avatar: string
    joinDate: string
  }
}

export function DriverDashboard({ userData }: DriverDashboardProps) {
  const [status, setStatus] = useState<string>("On Route")
  const socketRef = useRef<Socket | null>(null)
  const watchIdRef = useRef<number | null>(null)
  const [gpsActive, setGpsActive] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null)

  const [isSharing, setIsSharing] = useState(false)
  const [tripDirection, setTripDirection] = useState<"To College" | "Return Home">("To College")

  useEffect(() => {
    // Connect to Socket.IO server
    socketRef.current = io()
    socketRef.current.emit("joinBus", userData.busNumber)

    return () => {
      stopTracking()
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [userData.busNumber])

  const startTracking = () => {
    setIsSharing(true)
    handleStatusUpdate(`Trip Started (${tripDirection})`, "status")

    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          setGpsActive(true)
          setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
          
          if (socketRef.current) {
            socketRef.current.emit("updateLocation", {
              busNumber: userData.busNumber,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              timestamp: position.timestamp,
              speed: position.coords.speed
            })
          }
        },
        (error) => {
          console.error("Error getting location:", error)
          setGpsActive(false)
          toast.error("Real GPS failed. Using Mock Location for Demo.")
          const mockLat = 20.5367 
          const mockLng = 85.9388
          
          setCurrentLocation({ lat: mockLat, lng: mockLng })
          if (socketRef.current) {
             socketRef.current.emit("updateLocation", {
               busNumber: userData.busNumber,
               lat: mockLat,
               lng: mockLng,
               timestamp: Date.now(),
               speed: 0
             })
          }
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 }
      )
    }
  }

  const stopTracking = () => {
    setIsSharing(false)
    setGpsActive(false)
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    handleStatusUpdate("Trip Ended - Reached Destination", "status")
  }

  const handleStatusUpdate = (newStatus: string, type: string) => {
    setStatus(newStatus)
    
    if (socketRef.current) {
      socketRef.current.emit("updateStatus", {
        busNumber: userData.busNumber,
        type: type,
        title: `Bus ${userData.busNumber} Update`,
        content: newStatus,
        timestamp: new Date().toLocaleTimeString()
      })
      toast.success(`Status broadcasted: ${newStatus}`)
    }
  }

  const stops = ["Cuttack Square", "Link Road", "College Square", "DRIEMS Campus"]
  const [currentStop, setCurrentStop] = useState<string>("Cuttack Square")

  const handleStopUpdate = (stop: string) => {
    setCurrentStop(stop)
    if (socketRef.current) {
      socketRef.current.emit("updateCurrentStop", {
        busNumber: userData.busNumber,
        stop: stop,
        timestamp: new Date().toLocaleTimeString()
      })
      toast.success(`Current stop updated to: ${stop}`)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <MouseMoveEffect />
      
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bus className="h-5 w-5 text-[#CCFF00]" />
            <span className="text-white font-medium">Driving Bus {userData.busNumber}</span>
          </div>
          <div className="flex items-center space-x-2">
             <span className="text-zinc-400 text-sm">Status: <strong className="text-white">{status}</strong></span>
          </div>
        </div>
      </div>

      <div className="pt-24 px-4 space-y-6 pb-20 relative z-10 max-w-md mx-auto">
        <section>
          <h2 className="text-white font-medium text-lg mb-4 text-center">Trip Control</h2>
          <Card className="bg-zinc-900 border-zinc-800 p-4 space-y-4">
            {!isSharing ? (
              <div className="space-y-4">
                <div className="flex bg-black p-1 rounded-xl">
                  <button 
                    onClick={() => setTripDirection("To College")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${tripDirection === "To College" ? "bg-[#CCFF00] text-black" : "text-zinc-400 hover:text-white"}`}
                  >
                    To College
                  </button>
                  <button 
                    onClick={() => setTripDirection("Return Home")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${tripDirection === "Return Home" ? "bg-[#CCFF00] text-black" : "text-zinc-400 hover:text-white"}`}
                  >
                    Return Home
                  </button>
                </div>
                <Button 
                  onClick={startTracking}
                  className="w-full bg-green-500 hover:bg-green-600 text-white h-14 text-lg font-bold"
                >
                  Start Sharing Location
                </Button>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#CCFF00]/10 text-[#CCFF00] rounded-full border border-[#CCFF00]/20 font-medium">
                  <div className="h-2 w-2 rounded-full bg-[#CCFF00] animate-pulse" />
                  Trip Active: {tripDirection}
                </div>
                <Button 
                  onClick={stopTracking}
                  className="w-full bg-red-500 hover:bg-red-600 text-white h-14 text-lg font-bold"
                >
                  Reached Destination (Stop)
                </Button>
              </div>
            )}
          </Card>
        </section>

        <section>
          <h2 className="text-white font-medium text-lg mb-4 text-center mt-6">Quick Status Updates</h2>
          <p className="text-zinc-400 text-sm mb-8 text-center">Tap to instantly notify all students tracking Bus {userData.busNumber}</p>
          
          <div className="grid grid-cols-1 gap-4">
            <Button
              onClick={() => handleStatusUpdate("On Route / Normal", "status")}
              className="h-16 bg-zinc-900 border border-zinc-800 hover:border-green-500 hover:bg-green-500/10 text-white flex justify-start px-6 transition-all"
            >
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-4" />
              <span className="text-lg">On Route / Normal</span>
            </Button>

            <Button
              onClick={() => handleStatusUpdate("Heavy Traffic (Delay)", "delay")}
              className="h-16 bg-zinc-900 border border-zinc-800 hover:border-yellow-500 hover:bg-yellow-500/10 text-white flex justify-start px-6 transition-all"
            >
              <Clock className="h-6 w-6 text-yellow-500 mr-4" />
              <span className="text-lg">Heavy Traffic (Delay)</span>
            </Button>

            <Button
              onClick={() => handleStatusUpdate("Puncture / Breakdown", "emergency")}
              className="h-16 bg-zinc-900 border border-zinc-800 hover:border-orange-500 hover:bg-orange-500/10 text-white flex justify-start px-6 transition-all"
            >
              <AlertTriangle className="h-6 w-6 text-orange-500 mr-4" />
              <span className="text-lg">Puncture / Breakdown</span>
            </Button>

            <Button
              onClick={() => handleStatusUpdate("Emergency", "emergency")}
              className="h-16 bg-zinc-900 border border-zinc-800 hover:border-red-500 hover:bg-red-500/10 text-white flex justify-start px-6 transition-all"
            >
              <AlertCircle className="h-6 w-6 text-red-500 mr-4" />
              <span className="text-lg">Emergency</span>
            </Button>
          </div>
        </section>

        <section className="pt-8">
          <h2 className="text-white font-medium text-lg mb-4 text-center">Route Progress</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2">
            {stops.map((stop) => (
              <Button
                key={stop}
                onClick={() => handleStopUpdate(stop)}
                variant="outline"
                className={`w-full justify-start h-12 transition-all ${
                  currentStop === stop 
                  ? "bg-[#CCFF00]/10 border-[#CCFF00] text-[#CCFF00]" 
                  : "bg-black border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                <MapPin className={`mr-3 h-5 w-5 ${currentStop === stop ? "text-[#CCFF00]" : "text-zinc-600"}`} />
                {stop}
                {currentStop === stop && <span className="ml-auto text-xs font-bold uppercase">Current</span>}
              </Button>
            ))}
          </div>
        </section>

        <section className="pt-8 space-y-6">
            <Card className="bg-zinc-900 border-zinc-800 p-6 text-center">
                <MapPin className={`h-8 w-8 mx-auto mb-4 ${gpsActive ? "text-green-500" : "text-zinc-600"}`} />
                <h3 className="text-white font-medium mb-2">Location Broadcasting Live</h3>
                <p className="text-zinc-400 text-sm">
                  {gpsActive 
                    ? `Your GPS location is being securely shared with students waiting for Bus ${userData.busNumber}.` 
                    : "Waiting for GPS signal..."}
                </p>
            </Card>

            <div className="w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
              {currentLocation ? (
                <MapComponent locations={[{ ...currentLocation, busNumber: userData.busNumber, speed: 0 }]} />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-zinc-500 text-sm">
                  Waiting for GPS location to display map...
                </div>
              )}
            </div>
        </section>
      </div>
    </div>
  )
}

