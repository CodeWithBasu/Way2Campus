"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, LogOut, Camera, Phone } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { EditProfile } from "./EditProfile"
import { SupportChat } from "./SupportChat"
import { TermsAndConditions } from "./TermsAndConditions"

interface UserProfileProps {
  user: {
    name: string
    role: string
    busNumber: string
    avatar: string
    joinDate: string
    phone?: string
  }
  onUpdateUser: (updatedUser: Partial<UserProfileProps["user"]>) => void
  onLogout: () => void
}

export function UserProfile({ user, onUpdateUser, onLogout }: UserProfileProps) {
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showSupportChat, setShowSupportChat] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onUpdateUser({ avatar: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <div className="relative inline-block" onClick={handleAvatarClick}>
            <Avatar className="w-24 h-24 ring-4 ring-[#CCFF00]/20 cursor-pointer hover:ring-[#CCFF00]/40 transition-all">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-zinc-800 text-[#CCFF00]">{user.name[0]}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
          <h2 className="text-xl font-medium text-white mt-4">{user.name}</h2>
          <p className="text-zinc-400 text-sm capitalize">{user.role} - Bus {user.busNumber}</p>
          {user.phone && (
            <p className="text-zinc-400 text-sm mt-2 flex items-center justify-center">
              <Phone className="h-4 w-4 mr-2" />
              {user.phone}
            </p>
          )}
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[#CCFF00] text-sm font-medium">Active Assignment</h3>
                <p className="text-zinc-400 text-sm">Since {new Date().toLocaleDateString()}</p>
              </div>
              <Button variant="outline" className="border-zinc-700 text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black">
                Edit
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-between text-zinc-400 hover:text-[#CCFF00] hover:bg-zinc-800/50"
            onClick={() => setShowEditProfile(true)}
          >
            <span>Edit profile</span>
            <ChevronRight className="h-5 w-5 text-zinc-600" />
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-between text-zinc-400 hover:text-[#CCFF00] hover:bg-zinc-800/50"
            onClick={() => setShowSupportChat(true)}
          >
            <span>Support</span>
            <ChevronRight className="h-5 w-5 text-zinc-600" />
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-between text-zinc-400 hover:text-[#CCFF00] hover:bg-zinc-800/50"
            onClick={() => setShowTerms(true)}
          >
            <span>About Way2Campus</span>
            <ChevronRight className="h-5 w-5 text-zinc-600" />
          </Button>
        </div>

        <Separator className="bg-zinc-800" />

        <Button
          variant="ghost"
          className="w-full text-red-500 hover:text-red-400 hover:bg-red-500/10"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {showEditProfile && (
        <EditProfile user={user} onClose={() => setShowEditProfile(false)} onUpdateUser={onUpdateUser} />
      )}

      {showSupportChat && <SupportChat onClose={() => setShowSupportChat(false)} />}

      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}

      <footer className="fixed bottom-0 left-0 right-0 text-center py-2 text-xs text-zinc-500">
        Made by Dani Bustamante 🏂
      </footer>
    </div>
  )
}

