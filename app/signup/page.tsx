"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bus, ArrowRight, UserCircle, Phone, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function SignupPage() {
  const [role, setRole] = useState<"STUDENT" | "DRIVER">("STUDENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busNumber, setBusNumber] = useState("15");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, role, busNumber }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created! Please log in.");
        router.push("/login");
      } else {
        toast.error(data.error || "Failed to sign up");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CCFF00] opacity-[0.05] blur-[100px]" />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_20px_rgba(204,255,0,0.15)]">
            <Bus className="h-8 w-8 text-[#CCFF00]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Create Account</h1>
          <p className="mt-2 text-sm text-zinc-400">Join Way2Campus Network</p>
        </div>

        <div className="mb-6 flex rounded-xl bg-black p-1">
          <button 
            type="button"
            onClick={() => setRole("STUDENT")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${role === "STUDENT" ? "bg-[#CCFF00] text-black" : "text-zinc-400 hover:text-white"}`}
          >
            Student
          </button>
          <button 
            type="button"
            onClick={() => setRole("DRIVER")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${role === "DRIVER" ? "bg-[#CCFF00] text-black" : "text-zinc-400 hover:text-white"}`}
          >
            Driver
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500"><UserCircle className="h-4 w-4" /></div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00]" />
            </div>
          </div>

          {role === "STUDENT" ? (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500"><Mail className="h-4 w-4" /></div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00]" />
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500"><Phone className="h-4 w-4" /></div>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full rounded-xl border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00]" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Bus Number</label>
            <select value={busNumber} onChange={(e) => setBusNumber(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00]">
              <option value="15">Bus 15 (Cuttack Route)</option>
              <option value="02">Bus 02 (Bhubaneswar Route)</option>
              <option value="45">Bus 45 (Jagatpur Route)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500"><ShieldCheck className="h-4 w-4" /></div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={4} className="w-full rounded-xl border border-white/10 bg-black/50 py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00]" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#CCFF00] py-3.5 mt-6 font-semibold text-black transition-all hover:bg-[#b3e600] active:scale-[0.98] disabled:opacity-50">
            {loading ? "Creating Account..." : "Sign Up"}
            {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-400">
            Already have an account? <Link href="/login" className="text-[#CCFF00] hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
