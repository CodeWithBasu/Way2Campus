"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Users, Check } from "lucide-react"

interface Rider {
  id: number
  name: string
  avatar: string
}

interface Group {
  id: number
  name: string
  members: Rider[]
}

interface CreateGroupProps {
  onClose: () => void
  riders: Rider[]
  onCreateGroup: (group: { name: string; members: Rider[] }) => void
  onEditGroup?: (group: Group) => void
  editingGroup?: Group
}

export function CreateGroup({ onClose, riders, onCreateGroup, onEditGroup, editingGroup }: CreateGroupProps) {
  const [groupName, setGroupName] = useState(editingGroup?.name || "")
  const [selectedRiders, setSelectedRiders] = useState<Rider[]>(editingGroup?.members || [])

  useEffect(() => {
    if (editingGroup) {
      setGroupName(editingGroup.name)
      setSelectedRiders(editingGroup.members)
    }
  }, [editingGroup])

  const handleSelectRider = (rider: Rider) => {
    setSelectedRiders((prev) => {
      if (!prev) return [rider]
      return prev.find((r) => r.id === rider.id) ? prev.filter((r) => r.id !== rider.id) : [...prev, rider]
    })
  }

  const handleSaveGroup = () => {
    if (editingGroup) {
      onEditGroup?.({ ...editingGroup, name: groupName, members: selectedRiders })
    } else {
      onCreateGroup({ name: groupName, members: selectedRiders })
    }
    onClose()
  }

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
        className="w-full max-w-md h-[90vh] sm:h-auto bg-zinc-900 rounded-lg overflow-hidden"
      >
        <CardHeader className="border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white">
              {editingGroup ? "Editar grupo" : "Create group de riders"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div>
            <Input
              placeholder="Group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white mb-2">Selecciona riders</h3>
            <ScrollArea className="h-48 sm:h-64">
              {riders.map((rider) => (
                <div
                  key={rider.id}
                  className="flex items-center justify-between p-2 hover:bg-zinc-800 cursor-pointer"
                  onClick={() => handleSelectRider(rider)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={rider.avatar} />
                      <AvatarFallback>{rider.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-white">{rider.name}</span>
                  </div>
                  {selectedRiders.find((r) => r.id === rider.id) && <Check className="h-4 w-4 text-[#CCFF00]" />}
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-zinc-400">
              <Users className="h-4 w-4" />
              <span>{selectedRiders.length} seleccionados</span>
            </div>
            <Button
              onClick={handleSaveGroup}
              className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
              disabled={!groupName || selectedRiders.length === 0}
            >
              {editingGroup ? "Save changes" : "Create group"}
            </Button>
          </div>
        </CardContent>
      </motion.div>
    </motion.div>
  )
}

