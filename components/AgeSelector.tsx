"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

interface AgeSelectorProps {
  value: number
  onChange: (age: number) => void
  onNext: () => void
  onBack: () => void
}

export function AgeSelector({ value, onChange, onNext, onBack }: AgeSelectorProps) {
  const [selectedAge, setSelectedAge] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const ages = Array.from({ length: 80 }, (_, i) => i + 1) // 1-80 años
  const itemHeight = 48 // altura de cada item

  const y = useSpring(0, { stiffness: 400, damping: 90 })

  const selectedIndex = ages.indexOf(selectedAge)
  const containerHeight = containerRef.current?.clientHeight || 300

  useEffect(() => {
    const targetY = -(selectedIndex * itemHeight) + containerHeight / 2 - itemHeight / 2
    y.set(targetY)
  }, [selectedIndex, y, containerHeight])

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = Math.sign(e.deltaY)
    const newIndex = Math.max(0, Math.min(ages.length - 1, selectedIndex + delta))
    setSelectedAge(ages[newIndex])
    onChange(ages[newIndex])
    triggerHapticFeedback()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    const startY = touch.clientY

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const deltaY = touch.clientY - startY
      const newIndex = Math.max(0, Math.min(ages.length - 1, selectedIndex - Math.round(deltaY / itemHeight)))
      setSelectedAge(ages[newIndex])
      onChange(ages[newIndex])
    }

    const handleTouchEnd = () => {
      triggerHapticFeedback()
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }

    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onNext()
    }
  }

  const triggerHapticFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(10) // vibración de 10ms
    }
  }

  const transformY = useTransform(y, (value) => value) // Moved useTransform outside the map function

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative h-[300px] w-full max-w-[200px] overflow-hidden" ref={containerRef}>
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="h-12 w-full bg-[#CCFF00]/10 border-y-2 border-[#CCFF00]" />
        </div>

        <motion.div
          style={{ y: transformY }} // Use the transformed y value here
          className="absolute left-0 right-0"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          drag="y"
          dragConstraints={{ top: -((ages.length - 1) * itemHeight), bottom: 0 }}
          onDrag={(_, info) => {
            const newIndex = Math.round(-info.point.y / itemHeight)
            if (newIndex >= 0 && newIndex < ages.length) {
              setSelectedAge(ages[newIndex])
              onChange(ages[newIndex])
            }
          }}
          onDragEnd={() => {
            const targetY = -(selectedIndex * itemHeight) + containerHeight / 2 - itemHeight / 2
            y.set(targetY)
            triggerHapticFeedback()
          }}
        >
          {ages.map((age, index) => {
            const distance = Math.abs(index - selectedIndex)
            const opacity = Math.max(1 - distance * 0.3, 0.2)
            const scale = Math.max(1 - distance * 0.1, 0.7)
            
            return (
            <motion.div
              key={age}
              className="h-12 flex items-center justify-center cursor-pointer"
              animate={{ opacity, scale }}
              transition={{ duration: 0.2 }}
            >
              <span
                className={`text-2xl transition-all ${
                  age === selectedAge ? "text-[#CCFF00] font-bold" : "text-zinc-400"
                }`}
              >
                {age}
              </span>
            </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="flex justify-between gap-4 mt-8 w-full max-w-[200px]">
        <Button
          variant="outline"
          className="flex-1 bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white"
          onClick={onBack}
        >
          Back
        </Button>
        <Button className="flex-1 bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

