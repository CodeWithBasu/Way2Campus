"use client"

import { useState } from "react"
import { WelcomeScreens } from "../components/WelcomeScreens"
import { Onboarding } from "../components/Onboarding"
import { Dashboard } from "../components/Dashboard"
import { locations, getRandomProfileImage } from "../utils/constants"

type Step = "welcome" | "onboarding" | "main"

export default function Home() {
  const [step, setStep] = useState<Step>("welcome")
  const [userLocation, setUserLocation] = useState<string | null>(null)
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    avatar: "",
    location: "",
    joinDate: "",
    style: "",
    level: "",
    bio: "",
  })

  const handleOnboardingComplete = (data: {
    name: string
    age: number
    style: string
    level: string
    location: string
  }) => {
    if (data.location && locations.includes(data.location) && data.name) {
      const newUserData = {
        ...data,
        avatar: getRandomProfileImage(),
        joinDate: new Date().toLocaleDateString(),
        bio: `${data.name} is a ${data.level} de ${data.style}.`,
      }
      setUserLocation(data.location)
      setUserData(newUserData)
      setStep("main")
    } else {
      console.error("Invalid user data:", data)
      setStep("onboarding")
    }
  }

  const handleLogout = () => {
    setStep("welcome")
    setUserLocation(null)
    setUserData({
      name: "",
      age: 0,
      avatar: "",
      location: "",
      joinDate: "",
      style: "",
      level: "",
      bio: "",
    })
  }

  if (step === "welcome") {
    return <WelcomeScreens onComplete={() => setStep("onboarding")} />
  }

  if (step === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  if (userLocation && userData.name) {
    return <Dashboard userLocation={userLocation} userData={userData} onLogout={handleLogout} />
  }

  return <Onboarding onComplete={handleOnboardingComplete} />
}

