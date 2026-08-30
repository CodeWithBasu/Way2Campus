"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Bus, ArrowRight, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      toast.error("Invalid credentials. Please try again.");
    } else {
      toast.success("Successfully logged in!");
      // Determine where to go based on the email we used (mock routing)
      if (email === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CCFF00] opacity-[0.05] blur-[100px]" />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_20px_rgba(204,255,0,0.15)]">
            <Bus className="h-8 w-8 text-[#CCFF00]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Way2Campus Portal</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Secure login for DRIEMS students, drivers, and administration.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              User ID / Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                <User className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="driver or admin"
                className="w-full rounded-xl border border-white/10 bg-black/50 py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00] transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-black/50 py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:border-[#CCFF00] focus:outline-none focus:ring-1 focus:ring-[#CCFF00] transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#CCFF00] py-3.5 font-semibold text-black transition-all hover:bg-[#b3e600] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Secure Login"}
            {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
          </button>
        </form>

        <div className="mt-8 text-center space-y-3">
          <p className="text-sm text-zinc-400">
            Don't have an account? <Link href="/signup" className="text-[#CCFF00] hover:underline">Sign up</Link>
          </p>
          <p className="text-xs text-zinc-500">
            For demo purposes, use <strong className="text-white">driver / driver</strong>, <strong className="text-white">student / student</strong>, or <strong className="text-white">admin / admin</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
