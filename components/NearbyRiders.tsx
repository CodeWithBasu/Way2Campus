"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MapPin, MessageCircle, Settings, Users, Map, Coffee, AlertTriangle, Bell, UserPlus } from "lucide-react"
import { Chat } from "./Chat"
import { RiderProfile } from "./RiderProfile"
import { SkiMap } from "./SkiMap"
import { Notifications } from "./Notifications"
import { mockRiders } from "../utils/constants"
import { CreateGroup } from "./CreateGroup"
import { MouseMoveEffect } from "./MouseMoveEffect"

interface NearbyRidersProps {
  userLocation: string
}

interface Group {
  id: number
  name: string
  members: any[]
}

export function NearbyRiders({ userLocation }: NearbyRidersProps) {
  const [showChat, setShowChat] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [selectedRider, setSelectedRider] = useState<any | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [notificationCount, setNotificationCount] = useState(2)
  const [groups, setGroups] = useState<Group[]>([])
  const [friends, setFriends] = useState<any[]>([])
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const riders = mockRiders[userLocation] ?? []
  const onlineRiders = riders.slice(0, 8)

  const handleRiderClick = (rider: any) => {
    setSelectedRider(rider)
    setShowProfile(true)
  }

  const handleStartChat = (group?: Group) => {
    setShowProfile(false)
    setSelectedGroup(group || null)
    setShowChat(true)
  }

  const handleCreateGroup = (group: { name: string; members: any[] }) => {
    const newGroup = { id: Date.now(), ...group }
    setGroups([...groups, newGroup])
  }

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group)
    setShowCreateGroup(true)
  }

  const handleSaveEditedGroup = (editedGroup: Group) => {
    setGroups(groups.map((g) => (g.id === editedGroup.id ? editedGroup : g)))
    setEditingGroup(null)
  }

  const handleAcceptFriendRequest = (rider: any) => {
    setFriends([...friends, rider])
    setNotificationCount(notificationCount - 1)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <MouseMoveEffect />
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-[#CCFF00]" />
            <span className="text-white text-sm">{userLocation}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-[#CCFF00] transition-colors duration-200"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-[#CCFF00] transition-colors duration-200"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-20 px-2 sm:px-4 space-y-6 sm:space-y-8 pb-20">
        {/* Connected riders */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#CCFF00]" />
              <h2 className="text-white font-medium text-lg">Online now</h2>
            </div>
            <Badge variant="outline" className="bg-[#CCFF00]/10 text-[#CCFF00] border-0">
              {onlineRiders.length} online
            </Badge>
          </div>

          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {onlineRiders.map((rider) => (
                <button
                  key={rider.id}
                  className="flex flex-col items-center space-y-2"
                  onClick={() => handleRiderClick(rider)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16 ring-2 ring-[#CCFF00]/20">
                      <AvatarImage src={rider.avatar} />
                      <AvatarFallback>{rider.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#CCFF00] ring-2 ring-black`} />
                  </div>
                  <span className="text-sm text-zinc-400">{rider.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </section>

        {/* Groups */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#CCFF00]" />
              <h2 className="text-white font-medium text-lg">Groups</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-black bg-[#CCFF00] border-[#CCFF00] hover:bg-[#CCFF00]/90 hover:text-black"
              onClick={() => setShowCreateGroup(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create group
            </Button>
          </div>

          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {groups.map((group) => (
                <button
                  key={group.id}
                  className="flex flex-col items-center space-y-2"
                  onClick={() => handleStartChat(group)}
                >
                  <Avatar className="h-16 w-16 ring-2 ring-[#CCFF00]/20">
                    <AvatarFallback>{group.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-zinc-400">{group.name}</span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </section>

        {/* Friends */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#CCFF00]" />
              <h2 className="text-white font-medium text-lg">Friends</h2>
            </div>
          </div>

          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {friends.map((friend) => (
                <button
                  key={friend.id}
                  className="flex flex-col items-center space-y-2"
                  onClick={() => handleStartChat()}
                >
                  <Avatar className="h-16 w-16 ring-2 ring-[#CCFF00]/20">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-zinc-400">{friend.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </section>

        {/* Ski Map Button */}
        <section>
          <Button
            className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 h-12 text-lg flex items-center justify-center space-x-2"
            onClick={() => setShowMap(true)}
          >
            <Map className="h-5 w-5" />
            <span>View ski resort map</span>
          </Button>
        </section>

        {/* Meeting Points */}
        <section>
          <h2 className="text-white font-medium text-lg mb-4">Meeting points</h2>
          <div className="grid grid-cols-2 gap-4">
            {["Central Cafeteria", "Equipment Rental", "Main Chairlift Base", "Ski School"].map(
              (point, index) => (
                <Card key={index} className="bg-zinc-900 border-zinc-800 p-4 flex items-center space-x-3">
                  <Coffee className="h-6 w-6 text-[#CCFF00]" />
                  <span className="text-white text-sm">{point}</span>
                </Card>
              ),
            )}
          </div>
        </section>

        {/* Slope Status */}
        <section>
          <h2 className="text-white font-medium text-lg mb-4">Slope status</h2>
          <div className="space-y-3">
            {[
              "Black Run: Open",
              "Red Run: Closed for maintenance",
              "Blue Run: Open",
              "Green Run: Open",
            ].map((status, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${status.includes("Abierta") ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-zinc-300 text-sm">{status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Nearby riders grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-medium text-lg">Nearby Riders</h2>
            <span className="text-sm text-zinc-400">{riders.length} available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {riders.map((rider) => (
              <Card key={rider.id} className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800/50 transition-all">
                <div className="p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleRiderClick(rider)}>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={rider.avatar} />
                        <AvatarFallback>{rider.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-white font-medium">{rider.name}</h3>
                        <p className="text-sm text-zinc-400">{rider.style}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-transparent border-zinc-700 text-zinc-400">
                      12 km
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 bg-white/10 text-white hover:bg-[#CCFF00] hover:text-black transition-colors"
                      onClick={() => handleStartChat()}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 bg-white/10 text-white hover:bg-[#CCFF00] hover:text-black transition-colors"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      S.O.S
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {showProfile && selectedRider && (
        <RiderProfile rider={selectedRider} onClose={() => setShowProfile(false)} onStartChat={handleStartChat} />
      )}

      {showChat && (
        <Chat
          onClose={() => setShowChat(false)}
          otherUser={selectedRider}
          group={selectedGroup}
          onEditGroup={handleEditGroup}
        />
      )}

      {showMap && <SkiMap onClose={() => setShowMap(false)} riders={onlineRiders} />}

      {showNotifications && (
        <Notifications
          onClose={() => setShowNotifications(false)}
          setNotificationCount={setNotificationCount}
          onAcceptFriendRequest={handleAcceptFriendRequest}
        />
      )}

      {showCreateGroup && (
        <CreateGroup
          onClose={() => {
            setShowCreateGroup(false)
            setEditingGroup(null)
          }}
          riders={[...riders, ...friends]}
          onCreateGroup={handleCreateGroup}
          onEditGroup={handleSaveEditedGroup}
          editingGroup={editingGroup}
        />
      )}
    </div>
  )
}

