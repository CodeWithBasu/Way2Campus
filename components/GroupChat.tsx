'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Send, Plus } from 'lucide-react'

interface GroupChatProps {
  groupName: string
  members: Array<{
    id: number
    name: string
    status: 'online' | 'offline'
  }>
}

export function GroupChat({ groupName, members }: GroupChatProps) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{
    id: number
    sender: string
    text: string
    timestamp: string
  }>>([])

  const sendMessage = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'Tú',
        text: message,
        timestamp: new Date().toLocaleTimeString()
      }])
      setMessage('')
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-[#CCFF00]" />
            {groupName}
          </div>
          <div className="text-sm text-gray-500">
            {members.filter(m => m.status === 'online').length} online
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex gap-4 p-0">
        <div className="w-64 border-r p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Miembros ({members.length})</h3>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {members.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/32?u=${member.id}`} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div 
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                      ${member.status === 'online' ? 'bg-[#CCFF00]' : 'bg-gray-300'}`}
                  />
                </div>
                <span className="text-sm">{member.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'Tú' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] rounded-lg p-3 
                  ${msg.sender === 'Tú' 
                    ? 'bg-[#CCFF00] text-black' 
                    : 'bg-gray-100'
                  }`}
                >
                  <div className="text-sm font-semibold mb-1">{msg.sender}</div>
                  <div>{msg.text}</div>
                  <div className="text-xs text-gray-500 mt-1">{msg.timestamp}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button 
              onClick={sendMessage}
              className="bg-[#CCFF00] text-black hover:bg-[#98bf00]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

