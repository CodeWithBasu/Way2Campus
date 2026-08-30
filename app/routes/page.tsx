import { Bus, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const mockRoutes = [
  { bus: "15", from: "Cuttack (Badambadi)", to: "DRIEMS Campus", time: "07:30 AM", stops: ["Badambadi", "Link Road", "Olatpur", "DRIEMS"] },
  { bus: "02", from: "Bhubaneswar (Jaydev Vihar)", to: "DRIEMS Campus", time: "07:00 AM", stops: ["Jaydev Vihar", "Vani Vihar", "Rasulgarh", "DRIEMS"] },
  { bus: "45", from: "Jagatpur", to: "DRIEMS Campus", time: "08:15 AM", stops: ["Jagatpur", "Choudwar", "DRIEMS"] },
];

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 bg-black/50 px-6 py-4 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/20">
            <Bus className="h-5 w-5 text-[#CCFF00]" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Bus Timetables</h1>
        </div>
        <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
          Back to Home
        </Link>
      </header>

      <main className="mx-auto max-w-4xl p-6 lg:p-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">DRIEMS Fleet Schedules</h2>
          <p className="mt-2 text-zinc-400">Offline schedules and route maps for all college buses.</p>
        </div>

        <div className="grid gap-6">
          {mockRoutes.map((route) => (
            <div key={route.bus} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#CCFF00]/50 transition-colors">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-black border border-white/10 shadow-[0_0_15px_rgba(204,255,0,0.1)]">
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">BUS</span>
                    <span className="text-xl font-black text-[#CCFF00]">{route.bus}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{route.from} <span className="text-zinc-500 mx-2">→</span> {route.to}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <span>Departs at {route.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 max-w-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-zinc-500" />
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Major Stops</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {route.stops.map((stop, idx) => (
                      <span key={idx} className="rounded-md bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-zinc-300">
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
