import NextAuth, { SessionStrategy, TokenSet } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/app/db/dbConnect"
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { redirect } from "next/dist/server/api-utils";

// Define the extended user type
type ExtendedSessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
};

// Define the extended session type
type ExtendedSession = Session & {
  user: ExtendedSessionUser;
};

export interface session extends Session {
  user: {
    id: string;
    jwtToken: string;
    role: string;
    email: string;
    name: string;
  };
}

export const authOptions = {
  providers: [
      GoogleProvider({
        clientId : process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        
      }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session : {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    session: async ({ session, token }:any) => {

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email as string,
        },
      });

      if(!user){
        throw new Error("User not found");
      }
      session.user.id = user?.id as string;   
   
      return session;
    },
    redirect : async ({url, baseUrl}:any) =>{
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };