"use client"

import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center h-full">
      <div className="flex flex-col">
        <LoginForm />        
      </div>
    </div>
  )
}