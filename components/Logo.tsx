'use client'

import { motion } from 'framer-motion'
import { Snowflake } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Logo({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="relative">
            <Snowflake className="w-24 h-24 text-[#CCFF00]" />
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Snowflake className="w-16 h-16 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold text-[#CCFF00]">SnowConnect</h1>
          <p className="text-xl text-gray-400">El mejor ride es acompañado</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Button 
            onClick={onComplete}
            className="bg-[#CCFF00] text-black hover:bg-[#98bf00] px-8 py-6 text-lg rounded-full"
          >
            Get started la aventura
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

