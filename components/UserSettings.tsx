'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, X } from 'lucide-react'

interface UserSettingsProps {
  onClose: () => void
}

export function UserSettings({ onClose }: UserSettingsProps) {
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Thompson',
    title: 'Snowboard Instructor',
    bio: 'Instructor profesional con más de 8 años de experiencia. Especializado en freeride y backcountry.',
    level: 'expert',
    style: 'freeride',
    yearsExperience: '8'
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-gray-900">Edit profile</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Foto de perfil */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={winterSportsImages[0]} />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Información básica */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={userProfile.title}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                />
              </div>
            </div>

            {/* Experiencia y estilo */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Level</Label>
                <Select
                  value={userProfile.level}
                  onValueChange={(value) => setUserProfile(prev => ({ ...prev, level: value }))}
                >
                  <SelectTrigger>
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
                <Label>Style preferido</Label>
                <Select
                  value={userProfile.style}
                  onValueChange={(value) => setUserProfile(prev => ({ ...prev, style: value }))}
                >
                  <SelectTrigger>
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
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

