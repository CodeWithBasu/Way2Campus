"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, MapPin } from "lucide-react"

interface SkiMapProps {
  onClose: () => void
  riders: any[]
}

export function SkiMap({ onClose, riders }: SkiMapProps) {
  const [selectedRider, setSelectedRider] = useState<any | null>(null)

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
        className="w-full max-w-3xl bg-zinc-900 rounded-lg overflow-hidden"
      >
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Mapa del Centro de Ski</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="relative h-[60vh]">
          {/* Placeholder para el mapa real */}
          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-500 text-lg">Resort map de ski</span>
          </div>

          {/* Marcadores de riders */}
          {riders.map((rider) => (
            <motion.div
              key={rider.id}
              className="absolute"
              style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` }}
              whileHover={{ scale: 1.1 }}
            >
              <Button variant="ghost" size="icon" className="rounded-full p-0" onClick={() => setSelectedRider(rider)}>
                <Avatar className="h-8 w-8 ring-2 ring-[#CCFF00]">
                  <AvatarImage src={rider.avatar} />
                  <AvatarFallback>{rider.name[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </motion.div>
          ))}
        </div>
        {selectedRider && (
          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedRider.avatar} />
                <AvatarFallback>{selectedRider.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white font-medium">{selectedRider.name}</h3>
                <p className="text-sm text-zinc-400 flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-[#CCFF00]" />
                  Run Azul "El Cóndor"
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

