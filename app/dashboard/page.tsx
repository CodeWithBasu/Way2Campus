"use client";

import { useSession } from "next-auth/react";
import { Dashboard } from "@/components/Dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRandomProfileImage } from "@/utils/constants";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      } else if (status === "authenticated" && session.user) {
      setUserData({
        name: session.user.name,
        role: ((session.user as any).role || "student").toLowerCase(),
        busNumber: (session.user as any).busNumber || "15", // dynamic bus number
        avatar: getRandomProfileImage(),
        joinDate: new Date().toLocaleDateString(),
      });
    }
  }, [status, session, router]);

  if (!userData) {
    return <div className="flex h-screen items-center justify-center bg-[#0a0a0a] text-white">Loading...</div>;
  }

  return <Dashboard userData={userData} onLogout={() => router.push("/")} />;
}
