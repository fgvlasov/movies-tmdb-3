"use client"

import { Button } from "@/components/ui/button"
import { LoginForm } from "./login-form"
import { logout } from "@/actions/auth"

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center h-full">
      <div className="flex flex-col">
        <LoginForm />
        
      </div>
    </div>
  )
}