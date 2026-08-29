"use client"
import { Navigation, BellRing, Bus, Clock, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Navigation,
    title: "Live GPS Tracking",
    desc: "Watch your bus move in real-time on an interactive map. No more guessing when it will arrive.",
  },
  {
    icon: BellRing,
    title: "Instant Push Alerts",
    desc: "Receive immediate notifications for heavy traffic, delays, or emergency route changes.",
    highlight: true,
  },
  {
    icon: Bus,
    title: "Dedicated Driver App",
    desc: "A simple one-tap interface for drivers to broadcast their location and status effortlessly.",
  },
  {
    icon: Clock,
    title: "Real-Time ETAs",
    desc: "Highly accurate arrival times calculated instantly based on live traffic and bus speed.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    desc: "Built exclusively for DRIEMS. Only verified students and faculty can access the transit data.",
  },
]

export const FeatureHero = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] px-6 relative">
      {/* Dark mode background patterns instead of the light blue ones */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[repeating-linear-gradient(45deg,#ffffff05_0px_1px,transparent_1px_8px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(125%_125%_at_50%_10%,rgba(0,0,0,0)_40%,rgba(164,110,219,0.15)_100%)] pointer-events-none"></div>

      <div className="py-24 px-6 max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 text-balance">
            Empower Your Commute <br /> with Real-Time Precision
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-20 text-pretty">
            Leverage cutting-edge WebSockets and GPS routing to track your college bus, 
            receive instant alerts, and never be late to class again.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12">
          {features.slice(0, 3).map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}

          <div className="md:col-span-3 flex flex-col md:flex-row justify-center gap-y-16 gap-x-12">
            {features.slice(3).map((f, i) => (
              <div key={i} className="md:w-1/3 text-center">
                <FeatureCard {...f} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon: Icon, title, desc, highlight }: any) => (
  <div
    className={cn(
      "flex flex-col items-center group transition-all duration-200",
      highlight && "md:scale-105"
    )}
  >
    <div
      className={cn(
        "h-12 w-12 rounded-full flex items-center justify-center mb-6 transition-colors duration-200",
        highlight
          ? "bg-[#CCFF00] text-black shadow-xl shadow-[#CCFF00]/20"
          : "bg-white/5 text-[#CCFF00] group-hover:bg-white/10"
      )}
    >
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white tracking-tight">
      {title}
    </h3>
    <p className="text-zinc-400 leading-relaxed text-sm max-w-xs mx-auto text-pretty">
      {desc}
    </p>
  </div>
)

