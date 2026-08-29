"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, X } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "support"
  timestamp: string
}

const supportResponses = [
  "Thank you for contacting Way2Campus Support. How can I help you today?",
  "I understand. Let me check your account and I will give you more information in a moment.",
  "Is there anything else I can help you with?",
  "If you have more questions, please do not hesitate to ask. We are here to help.",
  "Thank you for your patience. I have reviewed your account and everything seems to be in order.",
  "Would you like me to explain how to use a specific feature of the app?",
]

export function SupportChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, messagesEndRef])

  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        text: supportResponses[0],
        sender: "support",
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }, [])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, userMessage])
      setNewMessage("")

      setTimeout(() => {
        const supportMessage: Message = {
          id: Date.now(),
          text: supportResponses[Math.floor(Math.random() * supportResponses.length)],
          sender: "support",
          timestamp: new Date().toLocaleTimeString(),
        }
        setMessages((prev) => [...prev, supportMessage])
      }, 1000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-lg h-[600px]">
        <Card className="h-full flex flex-col bg-zinc-900 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/support-avatar.png" />
                  <AvatarFallback>W2C</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-white font-medium">Way2Campus Support</h2>
                  <p className="text-sm text-zinc-400">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-[#CCFF00] text-black" : "bg-zinc-800 text-white"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-black/60" : "text-zinc-400"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t border-zinc-800">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-zinc-800 border-zinc-700 text-white"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

