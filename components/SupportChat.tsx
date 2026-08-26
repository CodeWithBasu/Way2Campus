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
  "Gracias por contactar al soporte de SnowConnect. ¿En qué puedo ayudarte hoy?",
  "Entiendo tu preocupación. Voy a revisar tu cuenta y te daré más información en un momento.",
  "¿Hay algo más en lo que pueda ayudarte?",
  "Si tienes más preguntas, no dudes en hacerlas. Estamos aquí para ayudarte.",
  "Gracias por tu paciencia. He revisado tu cuenta y todo parece estar en orden.",
  "¿Te gustaría que te explique cómo usar alguna función específica de la app?",
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
  }, [messages, messagesEndRef]) // Added messagesEndRef to dependencies

  useEffect(() => {
    // Message inicial del soporte
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
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, userMessage])
      setNewMessage("")

      // Simular respuesta del soporte
      setTimeout(() => {
        const supportMessage = {
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
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-white font-medium">Soporte SnowConnect</h2>
                  <p className="text-sm text-zinc-400">En línea</p>
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
                placeholder="Escribe tu mensaje..."
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

