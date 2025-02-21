import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
import dotenv from "dotenv";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


dotenv.config(); 

export const authOptions = {
  pages: {
   signIn : '/'
  },
providers: [
  CredentialsProvider({
   
    name: "Credentials",
    credentials: {
      name: { label: "name", type: "name"},
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      if (!credentials?.name || !credentials?.password) {
        throw new Error('Please enter an email and password')
      }
    
      const existingUser = await db.user.findFirst ({
        where: {name: credentials?.name},
      });
      if (!existingUser) {
        throw new Error('No user found')
      }
      

      const passwordMatch = await compare (credentials.password, existingUser.password);

      if (!passwordMatch) {
        throw new Error('Incorrect password')
      }

      return {
        id:  `${existingUser.id}`,
        name: existingUser.name,
        email: existingUser.email,
        
      }
    }
  })
],
adapter: PrismaAdapter(db),
secret: process.env.NEXTAUTH_SECRET,
session: {
  strategy : 'jwt',
  maxAge: 24 * 60 * 60
},
debug: process.env.NODE_ENV === "development",

callbacks: {
  async jwt ({token, user}) {
    if (user) {
      return {
        ...token,
        name: user.name,
        
      };
    }
    return token
  },
  async session ({ session, token}) {
    return {
      ...session,
      user: {
        ...session.user,
        name: token.name,
        
      }
    };
  },
}
}