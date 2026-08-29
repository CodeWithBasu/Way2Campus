"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Bus, GraduationCap, BusFront } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MouseMoveEffect } from "./MouseMoveEffect"

export interface OnboardingData {
  name: string
  role: "student" | "driver" | ""
  busNumber: string
}

export function Onboarding({ onComplete }: { onComplete: (data: OnboardingData) => void }) {
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<OnboardingData>({
    name: "",
    role: "",
    busNumber: "",
  })

  const updateUserData = (key: keyof OnboardingData, value: string) => {
    setUserData((prev) => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    if (step < 2) {
      setStep((prev) => prev + 1)
    } else {
      onComplete(userData)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  // Generate Bus numbers 1 to 55
  const busNumbers = Array.from({ length: 55 }, (_, i) => (i + 1).toString())

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="name" className="text-white">
                What is your name?
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => updateUserData("name", e.target.value)}
                  className="pl-10 bg-zinc-900 border-zinc-800 text-white"
                  placeholder="Your name"
                />
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-full">
              <Card
                className={`cursor-pointer transition-colors h-full ${
                  userData.role === "student"
                    ? "bg-[#CCFF00]/10 border-[#CCFF00]"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
                onClick={() => updateUserData("role", "student")}
              >
                <CardContent className="p-6 text-center space-y-2 flex flex-col justify-between h-full">
                  <div className="flex justify-center text-[#CCFF00]"><GraduationCap size={40} /></div>
                  <div>
                    <h3 className="font-medium text-white">Student</h3>
                    <p className="text-sm text-zinc-400">I take the bus</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-full">
              <Card
                className={`cursor-pointer transition-colors h-full ${
                  userData.role === "driver"
                    ? "bg-[#CCFF00]/10 border-[#CCFF00]"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
                onClick={() => updateUserData("role", "driver")}
              >
                <CardContent className="p-6 text-center space-y-2 flex flex-col justify-between h-full">
                  <div className="flex justify-center text-[#CCFF00]"><BusFront size={40} /></div>
                  <div>
                    <h3 className="font-medium text-white">Driver</h3>
                    <p className="text-sm text-zinc-400">I drive the bus</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white">
                {userData.role === "driver" ? "Which bus do you drive?" : "Which bus do you take?"}
              </Label>
              <Select value={userData.busNumber} onValueChange={(value) => updateUserData("busNumber", value)}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Select Bus Number" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 max-h-[300px]">
                  {busNumbers.map((busNum) => (
                    <SelectItem key={busNum} value={busNum} className="text-white hover:bg-zinc-800">
                      Bus {busNum}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-6 relative overflow-hidden flex flex-col justify-center">
      <MouseMoveEffect />
      <div className="max-w-md mx-auto space-y-8 relative z-10 w-full">
        {/* Progress */}
        <div>
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#CCFF00] rounded-full transition-all"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-zinc-400">{step + 1}/3</div>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3">
          <Bus className="h-8 w-8 text-[#CCFF00]" />
          <div>
            <h2 className="text-2xl font-bold text-white">
              {step === 0 && "Welcome aboard"}
              {step === 1 && "Select your role"}
              {step === 2 && "Select your bus"}
            </h2>
            <p className="text-zinc-400">
              {step === 0 && "Tell us your name"}
              {step === 1 && "Are you a student or a driver?"}
              {step === 2 && "Choose your route number"}
            </p>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between gap-4 mt-8">
          {step > 0 ? (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex-1 bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white"
            >
              Back
            </Button>
          ) : (
            <div className="flex-1" />
          )}
          <Button
            onClick={nextStep}
            className="flex-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 font-semibold"
            disabled={
              (step === 0 && !userData.name) ||
              (step === 1 && !userData.role) ||
              (step === 2 && !userData.busNumber)
            }
          >
            {step === 2 ? "Get started" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
