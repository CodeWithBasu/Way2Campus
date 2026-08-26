"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MouseMoveEffect } from "./MouseMoveEffect"

export function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    onLogin()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-4">
      <MouseMoveEffect />
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <motion.div whileHover={{ scale: 1.05 }} className="p-8 bg-zinc-900/80 rounded-lg shadow-xl backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">SnowConnect</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

