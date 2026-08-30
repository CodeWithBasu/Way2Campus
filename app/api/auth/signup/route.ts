import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, phone, password, role, busNumber, inviteCode } = await req.json();

    if (!name || !password || !role || !busNumber) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (role === "STUDENT" && !email) {
      return NextResponse.json({ error: "Email is required for students" }, { status: 400 });
    }
    if (role === "DRIVER") {
      if (!phone) {
        return NextResponse.json({ error: "Phone number is required for drivers" }, { status: 400 });
      }
      if (inviteCode !== "DRIEMS-KEY-2026") {
        return NextResponse.json({ error: "Invalid Driver Invite Code" }, { status: 403 });
      }
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: role === "STUDENT" ? email : null,
        phone: role === "DRIVER" ? phone : null,
        password, // In prod, hash this with bcrypt!
        role,
        busNumber,
      },
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email or Phone already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
