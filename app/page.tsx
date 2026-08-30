"use client";

import { LandingPage } from "@/components/LandingPage";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return <LandingPage onStart={() => router.push("/login")} />;
}
