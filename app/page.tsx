"use client"

import { useState } from "react"
import { WelcomeScreens } from "../components/WelcomeScreens"
import { Onboarding } from "../components/Onboarding"
import { Dashboard } from "../components/Dashboard"
import { locations, getRandomProfileImage } from "../utils/constants"

type Step = "welcome" | "onboarding" | "main"

export default function Home() {
  const [step, setStep] = useState<Step>("welcome")
  const [userData, setUserData] = useState({
    name: "",
    role: "",
    busNumber: "",
    avatar: "",
    joinDate: "",
  })

  const handleOnboardingComplete = (data: {
    name: string
    role: string
    busNumber: string
  }) => {
    if (data.name && data.role && data.busNumber) {
      const newUserData = {
        ...data,
        avatar: getRandomProfileImage(),
        joinDate: new Date().toLocaleDateString(),
      }
      setUserData(newUserData)
      setStep("main")
    } else {
      console.error("Invalid user data:", data)
      setStep("onboarding")
    }
  }

  const handleLogout = () => {
    setStep("welcome")
    setUserData({
      name: "",
      role: "",
      busNumber: "",
      avatar: "",
      joinDate: "",
    })
  }

  if (step === "welcome") {
    return <WelcomeScreens onComplete={() => setStep("onboarding")} />
  }

  if (step === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  if (userData.name) {
    return <Dashboard userData={userData} onLogout={handleLogout} />
  }

  return <Onboarding onComplete={handleOnboardingComplete} />
}

