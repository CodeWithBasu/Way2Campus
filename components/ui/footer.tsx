import React from "react";
import { Bus, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-[#0a0a0a] pt-20 pb-10">
      {/* Futuristic Glow Effects */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-[300px] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[120px] w-[400px] -translate-x-1/2 bg-[#CCFF00] opacity-[0.03] blur-[80px]" />
      <div className="pointer-events-none absolute -left-[10%] bottom-0 h-[300px] w-[300px] rounded-full bg-purple-600 opacity-10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-[10%] bottom-0 h-[300px] w-[300px] rounded-full bg-purple-600 opacity-10 blur-[120px]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 lg:flex-row lg:items-start lg:px-12 relative z-10">
        
        {/* Brand Section */}
        <div className="flex flex-col items-center lg:items-start max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(204,255,0,0.15)]">
              <Bus className="h-5 w-5 text-[#CCFF00]" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">Way2Campus</span>
          </div>
          <p className="text-center text-sm text-zinc-400 lg:text-left leading-relaxed">
            The next-generation transit platform built exclusively for DRIEMS University. 
            Real-time tracking, instant alerts, and zero guesswork.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="flex flex-col gap-4 text-sm">
            <h4 className="font-semibold text-white tracking-widest uppercase text-xs">Product</h4>
            <a href="#" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Student App</a>
            <a href="#" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Driver Portal</a>
            <a href="#" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Live Map</a>
            <a href="#" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Updates</a>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <h4 className="font-semibold text-white tracking-widest uppercase text-xs">Resources</h4>
            <a href="#" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Documentation</a>
            <a href="#" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Help Center</a>
            <a href="#" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Contact Support</a>
            <a href="/routes" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Bus Timetables</a>
          </div>

          <div className="col-span-2 flex flex-col gap-4 text-sm sm:col-span-1">
            <h4 className="font-semibold text-white tracking-widest uppercase text-xs">Legal</h4>
            <a href="#" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Privacy Policy</a>
            <a href="#" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Terms of Service</a>
            <a href="#" className="text-zinc-400 transition-colors hover:text-[#CCFF00]">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Way2Campus for DRIEMS. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-zinc-500 transition-colors hover:text-[#CCFF00]">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-zinc-500 transition-colors hover:text-[#CCFF00]">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="text-zinc-500 transition-colors hover:text-[#CCFF00]">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="text-zinc-500 transition-colors hover:text-[#CCFF00]">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
