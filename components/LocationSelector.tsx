import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin } from 'lucide-react'

interface LocationSelectorProps {
  updateUserData: (data: { location: string }) => void
  onComplete: () => void
}

export function LocationSelector({ updateUserData, onComplete }: LocationSelectorProps) {
  const [location, setLocation] = useState('')

  const handleManualLocation = () => {
    updateUserData({ location })
    onComplete()
  }

  const handleGeolocation = () => {
    // Simular geolocalización
    setTimeout(() => {
      updateUserData({ location: 'Cerro Catedral' })
      onComplete()
    }, 2000)
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Label htmlFor="location">Centro de esquí</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ingresa el nombre del centro"
          className="mt-1"
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Button onClick={handleManualLocation} className="w-full mb-2">
          Confirmar ubicación
        </Button>
        <Button onClick={handleGeolocation} variant="outline" className="w-full">
          <MapPin className="mr-2 h-4 w-4" /> Usar mi ubicación actual
        </Button>
      </motion.div>
    </div>
  )
}

