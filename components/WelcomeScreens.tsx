"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bus, MapPin, Bell, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MouseMoveEffect } from "./MouseMoveEffect"

const screens = [
  {
    id: 1,
    title: "Welcome to Way2Campus",
    description: "Track your college bus and stay updated",
    color: "bg-zinc-900",
    icon: Bus,
  },
  {
    id: 2,
    title: "Never Miss Your Bus",
    description: "Get real-time locations and alerts for buses 1-55",
    color: "bg-zinc-900",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Instant Driver Updates",
    description: "Receive instant notifications for delays, punctures, or traffic",
    color: "bg-zinc-900",
    icon: Bell,
  },
]

interface WelcomeScreensProps {
  onComplete: () => void
}

export function WelcomeScreens({ onComplete }: WelcomeScreensProps) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleNext = () => {
    if (currentScreen === screens.length - 1) {
      onComplete()
    } else {
      setCurrentScreen((prev) => prev + 1)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete()
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
      <MouseMoveEffect />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="min-h-screen w-full"
        >
          <div className={`min-h-screen w-full bg-transparent px-6 py-12 flex flex-col`}>
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {React.createElement(screens[currentScreen].icon, {
                    className: "w-24 h-24 text-[#CCFF00]",
                  })}
                </div>
              </div>
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white">{screens[currentScreen].title}</h1>
                <p className="text-lg text-zinc-400">{screens[currentScreen].description}</p>
              </div>
            </div>

            {currentScreen === screens.length - 1 ? (
              <div className="w-full max-w-sm mx-auto space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 h-12 text-lg">
                    Login
                  </Button>
                </form>
                <div className="text-center">
                  <Button variant="link" className="text-zinc-400 hover:text-[#CCFF00]">
                    Don't have an account? Sign up
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 w-full max-w-sm mx-auto">
                <div className="flex justify-center space-x-2">
                  {screens.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentScreen ? "w-8 bg-[#CCFF00]" : "w-2 bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 h-12 text-lg"
                >
                  Next
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

