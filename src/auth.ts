import { loginSchema } from "@/lib/validations/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate credentials
          const validatedFields = loginSchema.safeParse(credentials);

          if (!validatedFields.success) {
            return null;
          }

          const { email, password } = validatedFields.data;

          // Call your custom API
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(result.message || "Authentication failed");
          }

          const { accessToken, user } = result.data;

          // Return user object that will be stored in the JWT
          return {
            id: user._id,
            email: user.email,
            name: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            isVerified: user.isVerified,
            ageVerification: user.ageVerification,
            country: user.country,
            state: user.state,
            city: user.city,
            address: user.address,
            points: user.points,
            isActive: user.isActive,
            isPaid: user.isPaid,
            imageLink: user.imageLink,
            role: user.role,
            accessToken,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist user data and access token to the token
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.isVerified = user.isVerified;
        token.ageVerification = user.ageVerification;
        token.imageLink = user.imageLink;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string | null;
        session.user.lastName = token.lastName as string | null;
        session.user.isVerified = token.isVerified as boolean;
        session.user.ageVerification = token.ageVerification as boolean;
        session.user.imageLink = token.imageLink as string | null;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
