"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Snowflake } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { locations } from "../utils/constants"
import { AgeSelector } from "./AgeSelector"
import { MouseMoveEffect } from "./MouseMoveEffect"

const styles = [
  { id: "freeride", name: "Freeride", icon: "🏔️", description: "Off-piste adventures" },
  { id: "freestyle", name: "Freestyle", icon: "🎪", description: "Tricks and jumps" },
  { id: "all-mountain", name: "All-Mountain", icon: "🗻", description: "Total versatility" },
  { id: "alpine", name: "Alpine", icon: "⛷️", description: "Speed and technique" },
]

const experiences = [
  { id: "beginner", name: "Beginner", icon: "🌱", description: "First time or few trips" },
  { id: "intermediate", name: "Intermediate", icon: "🌿", description: "1-3 seasons" },
  { id: "advanced", name: "Advanced", icon: "🌲", description: "3+ seasons" },
  { id: "expert", name: "Expert", icon: "🎯", description: "Competitive level" },
]

interface OnboardingData {
  name: string
  age: number
  style: string
  experience: string
  location: string
}

export function Onboarding({ onComplete }: { onComplete: (data: OnboardingData) => void }) {
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<OnboardingData>({
    name: "",
    age: 25,
    style: "",
    experience: "",
    location: "",
  })

  const updateUserData = (key: keyof OnboardingData, value: string | number) => {
    setUserData((prev) => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    if (step < 4) {
      setStep((prev) => prev + 1)
    } else {
      onComplete(userData)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

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
          <AgeSelector
            value={userData.age}
            onChange={(age) => updateUserData("age", age)}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 2:
        return (
          <div className="grid grid-cols-2 gap-4">
            {styles.map((style) => (
              <motion.div key={style.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card
                  className={`cursor-pointer transition-colors ${
                    userData.style === style.id
                      ? "bg-[#CCFF00]/10 border-[#CCFF00]"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                  onClick={() => updateUserData("style", style.id)}
                >
                  <CardContent className="p-6 text-center space-y-2">
                    <div className="text-4xl">{style.icon}</div>
                    <h3 className="font-medium text-white">{style.name}</h3>
                    <p className="text-sm text-zinc-400">{style.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="grid grid-cols-2 gap-4">
            {experiences.map((exp) => (
              <motion.div key={exp.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-full">
                <Card
                  className={`cursor-pointer transition-colors h-full ${
                    userData.experience === exp.id
                      ? "bg-[#CCFF00]/10 border-[#CCFF00]"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                  onClick={() => updateUserData("experience", exp.id)}
                >
                  <CardContent className="p-6 text-center space-y-2 flex flex-col justify-between h-full">
                    <div className="text-4xl">{exp.icon}</div>
                    <div>
                      <h3 className="font-medium text-white">{exp.name}</h3>
                      <p className="text-sm text-zinc-400">{exp.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white">Select your location</Label>
              <Select value={userData.location} onValueChange={(value) => updateUserData("location", value)}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Choose a ski resort" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {locations.map((location) => (
                    <SelectItem key={location} value={location} className="text-white">
                      {location}
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
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-6 relative overflow-hidden">
      <MouseMoveEffect />
      <div className="max-w-md mx-auto space-y-8 relative z-10">
        {/* Progress */}
        <div>
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#CCFF00] rounded-full transition-all"
              style={{ width: `${((step + 1) / 5) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-zinc-400">{step + 1}/5</div>
        </div>

        {/* Header */}
        <div className="flex items-center gap-2">
          <Snowflake className="h-6 w-6 text-[#CCFF00]" />
          <div>
            <h2 className="text-2xl font-bold text-white">
              {step === 0 && "Welcome rider"}
              {step === 1 && "Your age"}
              {step === 2 && "Your style"}
              {step === 3 && "Your level"}
              {step === 4 && "Your location"}
            </h2>
            <p className="text-zinc-400">
              {step === 0 && "Tell us about yourself"}
              {step === 1 && "How old are you?"}
              {step === 2 && "How do you like to slide?"}
              {step === 3 && "What is your experience?"}
              {step === 4 && "Where are you?"}
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
        {step !== 1 && (
          <div className="flex justify-between gap-4">
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
              className="flex-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90"
              disabled={
                (step === 0 && !userData.name) ||
                (step === 2 && !userData.style) ||
                (step === 3 && !userData.experience) ||
                (step === 4 && !userData.location)
              }
            >
              {step === 4 ? "Get started" : "Next"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

