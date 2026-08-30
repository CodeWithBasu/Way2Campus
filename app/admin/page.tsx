"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Radio, AlertTriangle } from "lucide-react";
import io from "socket.io-client";
import { toast } from "sonner";
import dynamic from "next/dynamic";

// Dynamically import map so it does not break SSR
const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [socket, setSocket] = useState<any>(null);
  const [announcement, setAnnouncement] = useState("");
  
  // Track all active buses from socket
  const [activeBuses, setActiveBuses] = useState<any>({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if ((session?.user as any)?.role !== "ADMIN") {
        router.push("/dashboard");
      }
    }
  }, [status, session, router]);

  useEffect(() => {
    // Connect to WebSocket server
    const newSocket = io();

    newSocket.on("adminLocationUpdate", (data) => {
      setActiveBuses((prev: any) => ({
        ...prev,
        [data.busNumber]: data
      }));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket || !announcement) return;

    socket.emit("globalAnnouncement", {
      message: announcement,
      timestamp: new Date().toISOString()
    });
    
    toast.success("Announcement broadcasted to all students!");
    setAnnouncement("");
  };

  if (status === "loading" || (session?.user as any)?.role !== "ADMIN") {
    return <div className="flex h-screen items-center justify-center bg-[#0a0a0a] text-white">Loading Admin...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      {/* Top Navbar */}
      <header className="flex items-center justify-between border-b border-white/10 bg-black/50 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
            <Radio className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Master Control Room</h1>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </header>

      <main className="flex flex-1 flex-col p-6 lg:flex-row gap-6">
        
        {/* Left Side: Broadcast Panel & Active Buses List */}
        <div className="flex w-full flex-col gap-6 lg:w-1/3">
          
          {/* Broadcast Panel */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2 text-yellow-500">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Global Broadcast</h2>
            </div>
            <p className="mb-4 text-sm text-zinc-400">
              Send an emergency alert or holiday announcement to all active users instantly.
            </p>
            <form onSubmit={handleBroadcast} className="flex flex-col gap-3">
              <textarea
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="e.g. College is closed today due to heavy rain."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/50 p-3 text-sm text-white placeholder:text-zinc-600 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                rows={3}
                required
              />
              <button
                type="submit"
                className="rounded-xl bg-yellow-500 py-2.5 font-semibold text-black transition-colors hover:bg-yellow-400"
              >
                Send Broadcast
              </button>
            </form>
          </div>

          {/* Active Buses List */}
          <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-lg font-semibold">Active Fleet</h2>
            <div className="flex flex-col gap-3 overflow-y-auto">
              {Object.keys(activeBuses).length === 0 ? (
                <p className="text-sm text-zinc-500">No buses are currently active.</p>
              ) : (
                Object.values(activeBuses).map((bus: any) => (
                  <div key={bus.busNumber} className="flex items-center justify-between rounded-lg border border-white/5 bg-black/40 p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#CCFF00] animate-pulse" />
                      <span className="font-medium text-white">Bus {bus.busNumber}</span>
                    </div>
                    <span className="text-xs text-zinc-400">{bus.speed} km/h</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Master Map */}
        <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="h-full w-full">
            <MapComponent 
              locations={Object.values(activeBuses).length > 0 ? Object.values(activeBuses) : [{ lat: 20.296059, lng: 85.824539 }]} 
            />
          </div>
        </div>

      </main>
    </div>
  );
}
