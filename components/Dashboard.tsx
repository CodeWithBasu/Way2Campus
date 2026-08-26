"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfile } from "./UserProfile"
import { NearbyRiders } from "./NearbyRiders"
import { Settings } from "./Settings"

interface DashboardProps {
  userLocation: string
  userData: {
    name: string
    age: number
    avatar: string
    location: string
    joinDate: string
    style: string
    level: string
    bio: string
  }
  onLogout: () => void
}

export function Dashboard({ userLocation, userData, onLogout }: DashboardProps) {
  const [user, setUser] = useState(userData)
  const [showSettings, setShowSettings] = useState(false)

  const handleUpdateUser = (updatedUser: Partial<typeof user>) => {
    setUser((prev) => ({ ...prev, ...updatedUser }))
  }

  return (
    <div className="min-h-screen bg-black">
      <Tabs defaultValue="riders" className="w-full">
        <TabsList className="fixed bottom-0 left-0 right-0 h-16 grid grid-cols-2 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 z-50">
          <TabsTrigger
            value="riders"
            className="data-[state=active]:bg-transparent data-[state=active]:text-[#CCFF00] text-zinc-400"
          >
            Riders
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-transparent data-[state=active]:text-[#CCFF00] text-zinc-400"
          >
            Profile
          </TabsTrigger>
        </TabsList>
        <TabsContent value="riders" className="m-0 pb-16">
          <NearbyRiders userLocation={userLocation} />
        </TabsContent>
        <TabsContent value="profile" className="m-0 pb-16">
          <UserProfile
            user={user}
            onEditProfile={() => setShowSettings(true)}
            onUpdateUser={handleUpdateUser}
            onLogout={onLogout}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

