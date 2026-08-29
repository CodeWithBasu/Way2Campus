import clsx from "clsx"
import { Bus, MapPin, BellRing, Navigation, ShieldCheck, Zap, Smartphone, Radio } from "lucide-react"
import { FeatureHero } from "./FeatureHero"

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
    return (
        <div className="w-full bg-[#0a0a0a]">
        <section className="relative min-h-[calc(100vh-50px)] overflow-hidden bg-[linear-gradient(to_bottom,#000,#200D42_40%,#4F21A1_74%,#A46EDB_88%_50%)]">

            <div className="absolute left-1/2 top-[calc(100%-90px)]  lg:top-[calc(100%-150px)] h-[500px] w-[700px]   md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[100%] -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-black bg-[radial-gradient(closest-side,#000_82%,#9560EB)]"></div>
            <div className="border-white/10 absolute left-0 top-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b">
                <div className="col-span-1 flex h-full items-center justify-center" />
                <div className="border-white/10 col-span-1 flex h-full items-center justify-center border-x" />
                <div className="col-span-1 flex h-full items-center justify-center" />
            </div>
            <figure className="bg-purple-500/40 pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full blur-[200px]" />
            <figure className="bg-[#200D42] pointer-events-none absolute left-[4vw] top-[64px] z-20 hidden aspect-square w-[32vw] rounded-full opacity-50 blur-[100px] md:block" />
            <figure className="bg-[#4F21A1] pointer-events-none absolute bottom-[-50px] right-[7vw] z-20 hidden aspect-square w-[30vw] rounded-full opacity-50 blur-[100px] md:block" />
            
            <div className="divide-white/10 relative z-10 flex flex-col divide-y pt-[35px]">
                <div className="flex flex-col items-center justify-end">
                    <div className="border-white/10 flex items-center gap-2 !border !border-b-0 px-4 py-2">
                        <p className="text-zinc-300 text-sm tracking-tight">
                            Trusted by 1000+ Students
                        </p>
                    </div>
                </div>
            <div>
                    <div className="mx-auto flex h-[288px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-2 px-2 py-4 sm:px-10 lg:px-24">
                        <h1 className="text-white text-pretty text-center text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(50px,7vw,75px)] font-medium leading-none tracking-[-1.44px] md:max-w-screen-lg md:tracking-[-2.16px]">
                            Real-Time College Bus Tracking for DRIEMS
                        </h1>
                        <h2 className="text-md text-zinc-300 max-w-2xl text-pretty text-center md:text-lg mt-4">
                            Never miss your bus again. Live GPS tracking, instant delay notifications, and accurate ETAs for both students and drivers.
                        </h2>
                    </div>
                </div>

                <div className="divide-white/10 flex items-start justify-center divide-y px-8 sm:px-24">
                    <div className="flex w-full max-w-[80vw] flex-col items-center justify-start md:!max-w-[392px]">
                        <button className="cursor-pointer w-full text-white">
                            <div
                                className={clsx(
                                    "!h-14 flex-col items-center justify-center rounded-none !text-base",
                                    "max-w-sm:!border-x-0 border-white/10 flex w-full !border-x !border-y-0 !bg-transparent backdrop-blur-xl transition-colors duration-150 hover:!bg-white/5",
                                )}
                            >
                                Learn more
                            </div>
                        </button>
                        <button onClick={onStart} className="cursor-pointer w-full">
                            <div
                                className={clsx(
                                    "text-white font-bold boder-2 !h-14 flex-col items-center justify-center rounded-none border-none !text-base",
                                    "flex w-full border-[1.2px] border-white/5 bg-gradient-to-tr from-purple-800 via-purple-700 to-purple-400 hover:opacity-90 transition-opacity",
                                )}
                            >
                                Get started
                            </div>
                        </button>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl">
                    <AnimatedLogoCloud />
                </div>
            </div>
        </section>
        <FeatureHero />
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
          <div
            className="group relative mt-6 flex gap-6 overflow-hidden p-2"
            style={{
              maskImage: "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
            }}
          >
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex shrink-0 animate-x-slider flex-row justify-around gap-6"
                >
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

