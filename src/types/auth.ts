import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      isVerified: boolean;
      ageVerification: boolean;
      imageLink: string | null;
      role: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
    isVerified: boolean;
    ageVerification: boolean;
    imageLink: string | null;
    role: string;
    accessToken: string;
  }
}

declare module "next-auth" {
  interface JWT {
    accessToken: string;
    id: string;
    firstName: string | null;
    lastName: string | null;
    isVerified: boolean;
    ageVerification: boolean;
    imageLink: string | null;
    role: string;
  }
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    _id: string;
    firstName: string | null;
    lastName: string | null;
    userName: string;
    email: string;
    phone: string | null;
    isVerified: boolean;
    ageVerification: boolean;
    country: string | null;
    state: string | null;
    city: string | null;
    address: string | null;
    texId: string | null;
    points: number;
    isActive: boolean;
    isPaid: boolean;
    imageLink: string | null;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}
