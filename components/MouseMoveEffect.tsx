"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function MouseMoveEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity"
      animate={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(204, 255, 0, 0.15), transparent 80%)`,
      }}
    />
  )
}

