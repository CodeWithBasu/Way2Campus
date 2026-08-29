"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfile } from "./UserProfile"
import { NearbyRiders } from "./NearbyRiders"
import { DriverDashboard } from "./DriverDashboard"
import { Settings } from "./Settings"

interface DashboardProps {
  userData: {
    name: string
    role: string
    busNumber: string
    avatar: string
    joinDate: string
  }
  onLogout: () => void
}

export function Dashboard({ userData, onLogout }: DashboardProps) {
  const [user, setUser] = useState(userData)
  const [showSettings, setShowSettings] = useState(false)

  const handleUpdateUser = (updatedUser: Partial<typeof user>) => {
    setUser((prev) => ({ ...prev, ...updatedUser }))
  }

  return (
    <div className="min-h-screen bg-black">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="fixed bottom-0 left-0 right-0 h-16 grid grid-cols-2 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 z-50">
          <TabsTrigger
            value="dashboard"
            className="data-[state=active]:bg-transparent data-[state=active]:text-[#CCFF00] text-zinc-400"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-transparent data-[state=active]:text-[#CCFF00] text-zinc-400"
          >
            Profile
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="m-0 pb-16">
          {user.role === "driver" ? <DriverDashboard userData={user} /> : <NearbyRiders />}
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

