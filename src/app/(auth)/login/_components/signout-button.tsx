"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'

export function SignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  )
}
