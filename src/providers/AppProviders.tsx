"use client";
import { SessionProvider } from "@/components/providers/session-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

const AppProviders = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
