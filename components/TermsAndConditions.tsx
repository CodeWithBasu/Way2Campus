"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"

export function TermsAndConditions({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-2xl">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white">About Way2Campus</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[60vh] p-6">
              <div className="space-y-4 text-zinc-300">
                <h2 className="text-lg font-semibold text-white">1. Introduction</h2>
                <p>
                  Welcome to Way2Campus, the official college bus tracking application designed exclusively for students and drivers of DRIEMS UNIVERSITY.
                </p>

                <h2 className="text-lg font-semibold text-white">2. App Usage</h2>
                <p>
                  Way2Campus is intended to provide real-time location updates and status notifications for the DRIEMS UNIVERSITY bus fleet (Buses 1 through 55).
                  Drivers are expected to report their accurate status, and students must use the information responsibly for commuting purposes.
                </p>

                <h2 className="text-lg font-semibold text-white">3. Privacy & Location Data</h2>
                <p>
                  When you use the app as a driver, your location is shared to provide real-time ETAs to students. We respect your privacy and this data is strictly limited to active bus routes.
                  Student data is kept confidential and is not shared with any third parties.
                </p>

                <h2 className="text-lg font-semibold text-white">4. User Responsibilities</h2>
                <p>
                  You are responsible for the information provided in the app. Misuse of the emergency or delay notification features by drivers may result in administrative action by DRIEMS UNIVERSITY authorities.
                </p>

                <h2 className="text-lg font-semibold text-white">5. Service Availability</h2>
                <p>
                  While we strive to ensure 100% uptime for Way2Campus, connectivity issues or GPS inaccuracies might occur. Always plan your commute with a slight buffer.
                </p>

                <h2 className="text-lg font-semibold text-white">6. Policy Updates</h2>
                <p>
                  DRIEMS UNIVERSITY reserves the right to update these terms as new features are added to Way2Campus. Continued use of the app implies acceptance of any changes.
                </p>

                <h2 className="text-lg font-semibold text-white">7. Contact & Support</h2>
                <p>
                  If you experience any issues or need to report a bug, please contact the DRIEMS UNIVERSITY transport administration through the Support section.
                </p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

