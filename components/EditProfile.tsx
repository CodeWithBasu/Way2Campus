"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, X } from "lucide-react"
import { getRandomProfileImage } from "../utils/constants"

interface EditProfileProps {
  user: {
    name: string
    role: string
    busNumber: string
    avatar: string
    joinDate: string
    phone?: string
  }
  onClose: () => void
  onUpdateUser: (updatedUser: Partial<EditProfileProps["user"]>) => void
}

export function EditProfile({ user, onClose, onUpdateUser }: EditProfileProps) {
  const [userProfile, setUserProfile] = useState(user)

  const handleSave = () => {
    onUpdateUser(userProfile)
    onClose()
  }

  const handleChangeAvatar = () => {
    const newAvatar = getRandomProfileImage()
    setUserProfile((prev) => ({ ...prev, avatar: newAvatar }))
  }

  const busNumbers = Array.from({ length: 55 }, (_, i) => (i + 1).toString())

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-white">Edit profile</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
                  onClick={handleChangeAvatar}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-white">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={userProfile.phone || ""}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-white">Role</Label>
                <Select
                  value={userProfile.role}
                  onValueChange={(value) => setUserProfile((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="student" className="text-white">Student</SelectItem>
                    <SelectItem value="driver" className="text-white">Driver</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label className="text-white">Bus Number</Label>
                <Select
                  value={userProfile.busNumber}
                  onValueChange={(value) => setUserProfile((prev) => ({ ...prev, busNumber: value }))}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select Bus" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 max-h-[200px]">
                    {busNumbers.map((busNum) => (
                      <SelectItem key={busNum} value={busNum} className="text-white">
                        Bus {busNum}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose} className="bg-zinc-800 text-white hover:bg-zinc-700">
                Cancel
              </Button>
              <Button className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90" onClick={handleSave}>
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

