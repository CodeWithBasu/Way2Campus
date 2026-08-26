"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypeIcon as type, type LucideIcon } from "lucide-react"

interface ForecastDay {
  day: string
  icon: LucideIcon
  temp: string
}

interface WeatherForecastProps {
  location: string
  forecast?: ForecastDay[]
}

export function WeatherForecast({ location, forecast = [] }: WeatherForecastProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-black">Pronóstico del Tiempo</CardTitle>
      </CardHeader>
      <CardContent>
        {forecast.length > 0 ? (
          <div className="flex justify-between">
            {forecast.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-semibold text-black">{day.day}</p>
                <day.icon className="h-8 w-8 mx-auto my-2 text-black" />
                <p className="text-black">{day.temp}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay pronóstico disponible para {location} en este momento.</p>
        )}
      </CardContent>
    </Card>
  )
}

