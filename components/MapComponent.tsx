"use client"

import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect } from "react"

interface MapComponentProps {
  busNumber: string
  liveLocation: {lat: number, lng: number} | null
}

const DRIEMS_COORDS = { lat: 20.5593, lng: 85.9328 }

export default function MapComponent({ busNumber, liveLocation }: MapComponentProps) {
  useEffect(() => {
    // Add CSS for dark mode map tiles dynamically
    const style = document.createElement("style")
    style.innerHTML = `
      .dark-map-tiles {
        filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
      }
      .leaflet-container {
        background: #1a1a1a !important;
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  // Custom icon for DRIEMS
  const driemsIcon = L.divIcon({
    className: "custom-icon",
    html: `<div class="flex flex-col items-center">
             <div class="h-8 w-8 text-white bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg text-lg font-bold">D</div>
             <span class="text-xs font-bold mt-1 text-black bg-white px-2 py-1 rounded-full shadow-lg whitespace-nowrap">DRIEMS</span>
           </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  })

  // Custom icon for Live Bus
  const busIcon = L.divIcon({
    className: "custom-icon",
    html: `<div class="relative group cursor-pointer flex flex-col items-center">
             <div class="h-12 w-12 bg-[#CCFF00] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.6)] border-2 border-black z-20">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
             </div>
             <div class="absolute -top-8 bg-black text-[#CCFF00] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg border border-zinc-800 z-30">
               Bus ${busNumber} (Live)
             </div>
           </div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24]
  })

  return (
    <MapContainer
        center={[DRIEMS_COORDS.lat, DRIEMS_COORDS.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={false}
    >
        {/* Standard OpenStreetMap tiles (100% Free, NO API Key) with CSS Dark Mode filter */}
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
            className="dark-map-tiles"
        />
        
        <Marker position={[DRIEMS_COORDS.lat, DRIEMS_COORDS.lng]} icon={driemsIcon} />

        {liveLocation && (
            <Marker position={[liveLocation.lat, liveLocation.lng]} icon={busIcon} />
        )}
    </MapContainer>
  )
}

