"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, MessageCircle, MapPin, Calendar, Star, AlertTriangle } from "lucide-react"

interface RiderProfileProps {
  rider: {
    id: number
    name: string
    age: number
    style: string
    level: string
    avatar: string
    location: string
    joinDate: string
    bio: string
    trips?: Array<{ location: string; date: string }>
  }
  onClose: () => void
  onStartChat: () => void
}

export function RiderProfile({ rider, onClose, onStartChat }: RiderProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md h-[90vh] sm:h-auto overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute inset-0 bg-cover bg-center blur-md opacity-30 z-0"
          style={{ backgroundImage: `url(${rider.avatar})` }}
        />
        <Card className="bg-zinc-900/90 border-zinc-800 relative z-10">
          <div className="relative p-4 sm:p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-zinc-400 hover:text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={rider.avatar} alt={rider.name} />
                <AvatarFallback>{rider.name[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-white mb-1">{rider.name}</h2>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{rider.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-sm text-zinc-400">Style</div>
                <div className="text-white font-medium">{rider.style}</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-sm text-zinc-400">Level</div>
                <div className="text-white font-medium">{rider.level}</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-400 mb-2">Sobre mí</h3>
              <p className="text-white">{rider.bio}</p>
            </div>

            {rider.trips && rider.trips.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-zinc-400 mb-2">Últimos viajes</h3>
                <div className="space-y-2">
                  {rider.trips.map((trip, index) => (
                    <div key={index} className="flex items-center justify-between bg-black/20 rounded-lg p-3">
                      <span className="text-white">{trip.location}</span>
                      <div className="flex items-center text-zinc-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {trip.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-400 mb-2">Reseñas de otros riders</h3>
              <div className="space-y-2">
                {[
                  { name: "Ana", rating: 5, comment: "Excelente compañero, muy puntual y divertido." },
                  { name: "Carlos", rating: 4, comment: "Buen nivel, nos divertimos mucho en las pistas." },
                ].map((review, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{review.name}</span>
                      <div className="flex items-center">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-[#CCFF00]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90" onClick={onStartChat}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Iniciar chat
              </Button>
              <Button className="flex-1 bg-red-500 text-white hover:bg-red-600">
                <AlertTriangle className="h-4 w-4 mr-2" />
                S.O.S
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

