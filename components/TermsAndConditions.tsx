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
              <CardTitle className="text-xl text-white">Términos y Condiciones</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[60vh] p-6">
              <div className="space-y-4 text-zinc-300">
                <h2 className="text-lg font-semibold text-white">1. Aceptación de los Términos</h2>
                <p>
                  Al utilizar la aplicación SnowConnect, aceptas estos términos y condiciones en su totalidad. Si no
                  estás de acuerdo con estos términos, por favor, no uses la aplicación.
                </p>

                <h2 className="text-lg font-semibold text-white">2. Uso de la Aplicación</h2>
                <p>
                  SnowConnect es una plataforma para conectar a entusiastas de los deportes de invierno. No debes
                  utilizar la aplicación para fines ilegales o no autorizados.
                </p>

                <h2 className="text-lg font-semibold text-white">3. Privacy</h2>
                <p>
                  Respetamos tu privacidad y protegemos tus datos personales. Consulta nuestra Política de Privacy
                  para obtener más información sobre cómo recopilamos y utilizamos tus datos.
                </p>

                <h2 className="text-lg font-semibold text-white">4. Contenido del Usuario</h2>
                <p>
                  Eres responsable de todo el contenido que publiques en SnowConnect. No debes publicar contenido
                  ofensivo, ilegal o que viole los derechos de otros usuarios.
                </p>

                <h2 className="text-lg font-semibold text-white">5. Seguridad</h2>
                <p>
                  Aunque nos esforzamos por proporcionar una plataforma segura, no podemos garantizar la seguridad
                  absoluta. Utiliza tu mejor juicio al interactuar con otros usuarios y compartir información.
                </p>

                <h2 className="text-lg font-semibold text-white">6. Modificaciones</h2>
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre
                  cambios significativos y tu uso continuado de la aplicación constituirá la aceptación de los nuevos
                  términos.
                </p>

                <h2 className="text-lg font-semibold text-white">7. Contacto</h2>
                <p>
                  Si tienes preguntas sobre estos términos, por favor contáctanos a través de la sección de Soporte en
                  la aplicación.
                </p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

