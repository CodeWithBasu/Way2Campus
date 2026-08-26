"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, X, UserPlus } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: string
  timestamp: string
}

interface ChatProps {
  onClose: () => void
  otherUser?: { name: string; avatar: string }
  group?: { id: number; name: string; members: { id: number; name: string; avatar: string }[] }
  onEditGroup?: (groupId: number) => void
}

const generateResponse = (message: string, otherUser: any): string => {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("ride") || lowerMessage.includes("esquiar")) {
    return `¡Claro! Me encantaría hacer un ride. ¿Te parece encontrarnos en la base de ${otherUser.location} a las 10:00 AM?`
  }

  if (lowerMessage.includes("hora") || lowerMessage.includes("cuando")) {
    return "¿Te parece bien a las 10:00 AM? Es un buen momento para empezar, la nieve estará perfecta."
  }

  if (lowerMessage.includes("donde") || lowerMessage.includes("lugar")) {
    return `Nos podemos encontrar en la base principal de ${otherUser.location}, junto al café. Es fácil de ubicar.`
  }

  if (lowerMessage.includes("nivel") || lowerMessage.includes("experiencia")) {
    return `Soy un rider de nivel ${otherUser.level}, principalmente me gusta el estilo ${otherUser.style}. ¿Qué tal tú?`
  }

  if (lowerMessage.includes("ok") || lowerMessage.includes("perfecto") || lowerMessage.includes("genial")) {
    return "¡Excelente! Nos vemos entonces. ¡Va a estar increíble! 🏂"
  }

  return "¡Hola! ¿Te gustaría compartir un ride hoy? La nieve está perfecta para practicar."
}

export function Chat({ onClose, otherUser, group, onEditGroup }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom]) // Added scrollToBottom to dependencies

  const sendMessage = (text: string) => {
    if (text.trim()) {
      const userMessage = {
        id: Date.now(),
        text: text,
        sender: "Tú",
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, userMessage])
      setNewMessage("")

      // Simular respuesta
      if (!group) {
        setTimeout(() => {
          const response = generateResponse(text, otherUser)
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              text: response,
              sender: otherUser?.name || "Usuario",
              timestamp: new Date().toLocaleTimeString(),
            },
          ])
        }, 1000)
      } else {
        // Simular respuestas de otros miembros del grupo
        setTimeout(() => {
          const randomMember = group.members[Math.floor(Math.random() * group.members.length)]
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              text: `¡Genial idea! Estoy de acuerdo con ${userMessage.sender}.`,
              sender: randomMember.name,
              timestamp: new Date().toLocaleTimeString(),
            },
          ])
        }, 1500)
      }
    }
  }

  const quickMessages = [
    "Voy a la pista azul",
    "Nos encontramos en la base en 10 min",
    "¿Quieres hacer un descanso para tomar café?",
    "Estoy en la cafetería",
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-lg h-[90vh] sm:h-[600px]"
      >
        <Card className="h-full flex flex-col bg-zinc-900 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {group ? (
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="border-2 border-zinc-900">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    {group.members.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-white">
                        +{group.members.length - 3}
                      </div>
                    )}
                  </div>
                ) : (
                  <Avatar>
                    <AvatarImage src={otherUser?.avatar} />
                    <AvatarFallback>{otherUser?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <h2 className="text-white font-medium">{group ? group.name : otherUser?.name || "Usuario"}</h2>
                  <p className="text-sm text-zinc-400">{group ? `${group.members.length} miembros` : "En línea"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {group && onEditGroup && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditGroup(group.id)}
                    className="text-zinc-400 hover:text-[#CCFF00] transition-colors duration-200"
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-zinc-400 hover:text-[#CCFF00] transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === "Tú" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "Tú" ? "bg-[#CCFF00] text-black" : "bg-zinc-800 text-white"
                  }`}
                >
                  {group && message.sender !== "Tú" && <p className="text-xs font-medium mb-1">{message.sender}</p>}
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "Tú" ? "text-black/60" : "text-zinc-400"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t border-zinc-800 space-y-4">
            <div className="flex flex-wrap gap-2">
              {quickMessages.map((msg, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="bg-zinc-800 text-white border-zinc-700 hover:bg-[#CCFF00] hover:text-black"
                  onClick={() => sendMessage(msg)}
                >
                  {msg}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 bg-zinc-800 border-zinc-700 text-white"
                onKeyPress={(e) => e.key === "Enter" && sendMessage(newMessage)}
              />
              <Button onClick={() => sendMessage(newMessage)} className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

