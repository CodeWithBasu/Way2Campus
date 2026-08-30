import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email/ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Mock users for DRIEMS if DB is empty
        if (credentials.email === "admin" && credentials.password === "admin") {
          return { id: "1", name: "DRIEMS Admin", email: "admin", role: "ADMIN" };
        }
        if (credentials.email === "driver" && credentials.password === "driver") {
          return { id: "2", name: "Bus 15 Driver", email: "driver", role: "DRIVER" };
        }
        if (credentials.email === "student" && credentials.password === "student") {
          return { id: "3", name: "Demo Student", email: "student", role: "STUDENT" };
        }

        const user = await prisma.user.findFirst({
          where: { 
            OR: [
              { email: credentials.email },
              { phone: credentials.email }
            ]
          },
        });

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            busNumber: user.busNumber, // new field
          } as any;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.busNumber = (user as any).busNumber;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).busNumber = token.busNumber;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: "way2campus-super-secret-key-for-dev-only",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
