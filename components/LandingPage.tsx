import clsx from "clsx"
import { Bus, MapPin, BellRing, Navigation, ShieldCheck, Zap, Smartphone, Radio } from "lucide-react"
import { FeatureHero } from "./FeatureHero"
import HowItWorks from "@/components/ui/how-it-works"
import FAQ from "@/components/ui/faq-monochrome"
import Footer from "@/components/ui/footer"

const way2CampusSteps = [
  {
    title: "Open the App",
    description: "Launch Way2Campus and choose whether you are a Student or a Bus Driver.",
    colorTheme: "purple" as const,
  },
  {
    title: "Select Your Bus",
    description: "Pick your designated route number (e.g., Bus 15) to connect to the right tracking channel.",
    colorTheme: "blue" as const,
  },
  {
    title: "Track & Update",
    description: "Students watch the bus move live. Drivers can instantly broadcast delays or emergencies.",
    colorTheme: "orange" as const,
  }
];

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
    return (
        <div className="w-full bg-[#0a0a0a]">
        <section className="relative min-h-[calc(100vh-50px)] overflow-hidden bg-[linear-gradient(to_bottom,#000,#200D42_40%,#4F21A1_74%,#A46EDB_88%_50%)]">
            {/* Header / Logo */}
            <header className="relative z-50 w-full flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl">
                <img src="/logo.png" alt="DRIEMS Logo" className="h-8 sm:h-10 w-auto" />
                <span className="text-white font-bold tracking-wider hidden sm:block">WAY2CAMPUS</span>
              </div>
            </header>

            {/* Background elements */}
            <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay mt-20">
              <img src="/college.jpeg" alt="DRIEMS College" className="w-full h-full object-cover" />
            </div>

            <div className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[100%] -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-black bg-[radial-gradient(closest-side,#000_82%,#9560EB)]"></div>
            <div className="border-white/10 absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b">
                <div className="col-span-1 flex h-full items-center justify-center" />
                <div className="border-white/10 col-span-1 flex h-full items-center justify-center border-x" />
                <div className="col-span-1 flex h-full items-center justify-center" />
            </div>
            <figure className="bg-purple-500/40 pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full blur-[200px]" />
            <figure className="bg-[#200D42] pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden aspect-square w-[32vw] rounded-full opacity-50 blur-[100px] md:block" />
            <figure className="bg-[#4F21A1] pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden aspect-square w-[30vw] rounded-full opacity-50 blur-[100px] md:block" />
            
            <div className="relative z-10 flex flex-col items-center justify-center pt-8 sm:pt-[35px] pb-24">
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="border-white/10 flex items-center gap-2 border px-4 py-2 rounded-full backdrop-blur-md bg-black/30">
                        <p className="text-zinc-300 text-xs sm:text-sm tracking-tight">
                            Trusted by 1000+ Students at DRIEMS
                        </p>
                    </div>
                </div>
                
                <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 sm:px-10 lg:px-24 text-center">
                    <h1 className="text-white text-pretty text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(50px,7vw,75px)] font-bold leading-tight tracking-[-1.44px] md:tracking-[-2.16px]">
                        Real-Time College Bus Tracking for DRIEMS
                    </h1>
                    <h2 className="text-sm text-zinc-300 max-w-2xl text-pretty md:text-lg drop-shadow-md">
                        Never miss your bus again. Live GPS tracking, instant delay notifications, and accurate ETAs for both students and drivers.
                    </h2>
                    
                    <button onClick={onStart} className="mt-8 cursor-pointer w-full max-w-[280px] text-black">
                        <div className="h-14 flex items-center justify-center rounded-xl text-base font-bold bg-[#CCFF00] transition-all duration-150 hover:bg-[#b3e600] active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                            Enter App
                        </div>
                    </button>
                </div>
            </div>
                <div className="mx-auto max-w-7xl">
                    <AnimatedLogoCloud />
                </div>
        </section>

        {/* Our Fleet Section */}
        <section className="py-24 bg-black relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Mega Fleet</h2>
              <p className="mt-4 text-lg text-zinc-400">Over 55+ buses covering all major routes across Cuttack and Bhubaneswar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="aspect-[4/3] w-full">
                  <img src="/bus1.jpeg" alt="DRIEMS Bus Fleet" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Modern Transportation</h3>
                    <p className="text-zinc-300">Comfortable seating and safe journeys for all students.</p>
                  </div>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="aspect-[4/3] w-full">
                  <img src="/bus2.jpeg" alt="DRIEMS Bus On Route" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Live GPS Enabled</h3>
                    <p className="text-zinc-300">Every bus is now connected to the Way2Campus live network.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeatureHero />
        
        {/* How It Works Section */}
        <section className="dark bg-[#0a0a0a] py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-20">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                    How Way2Campus Works
                </h2>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                    Three simple steps to connect students and drivers in real-time.
                </p>
            </div>
            <HowItWorks features={way2CampusSteps} />
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Futuristic Footer */}
        <Footer />
        </div>
    )
}

const features = [
    { name: "Live GPS", icon: Navigation },
    { name: "Instant Alerts", icon: BellRing },
    { name: "Student App", icon: Smartphone },
    { name: "Driver App", icon: Bus },
    { name: "Real-Time ETAs", icon: Zap },
    { name: "Secure", icon: ShieldCheck },
    { name: "WebSockets", icon: Radio },
    { name: "Route Maps", icon: MapPin },
]

const AnimatedLogoCloud = () => {
    return (
      <div className="w-full py-12">
        <div className="mx-auto w-full px-4 md:px-8">
          <div className="group relative mt-6 flex gap-6 overflow-hidden p-2" style={{ maskImage: "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)" }}>
            {Array(5).fill(null).map((_, index) => (
                <div key={index} className="flex shrink-0 animate-x-slider flex-row justify-around gap-6">
                  {features.map((feature, key) => {
                    const Icon = feature.icon;
                    return (
                      <div key={key} className="flex items-center justify-center gap-2 px-6 flex-none text-white/50 font-medium text-lg">
                         <Icon className="h-6 w-6" />
                         <span>{feature.name}</span>
                      </div>
                    )
                  })}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
}

