"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface SettingsProps {
  onClose: () => void
}

export function Settings({ onClose }: SettingsProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-md">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-gray-900">Ajustes</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label>Notifications</Label>
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Dark mode</Label>
              <Switch checked={darkModeEnabled} onCheckedChange={setDarkModeEnabled} />
            </div>
            <Button className="w-full bg-[#CCFF00] text-black hover:bg-[#98bf00]">Save changes</Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
"

