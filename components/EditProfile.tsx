"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, X } from "lucide-react"
import { getRandomProfileImage } from "../utils/constants"

interface EditProfileProps {
  user: {
    name: string
    age: number
    avatar: string
    location: string
    joinDate: string
    style: string
    level: string
    bio: string
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

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
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
            {/* Foto de perfil */}
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

            {/* Información básica */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="age" className="text-white">
                  Edad
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, age: Number(e.target.value) }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-white">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={userProfile.phone || ""}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, phone: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio" className="text-white">
                  Biografía
                </Label>
                <Textarea
                  id="bio"
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>

            {/* Experiencia y estilo */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label className="text-white">Level</Label>
                <Select
                  value={userProfile.level}
                  onValueChange={(value) => setUserProfile((prev) => ({ ...prev, level: value }))}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Selecciona tu nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label className="text-white">Style preferido</Label>
                <Select
                  value={userProfile.style}
                  onValueChange={(value) => setUserProfile((prev) => ({ ...prev, style: value }))}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Selecciona tu estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freeride">Freeride</SelectItem>
                    <SelectItem value="freestyle">Freestyle</SelectItem>
                    <SelectItem value="all-mountain">All-Mountain</SelectItem>
                    <SelectItem value="alpine">Alpine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botones de acción */}
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

