"use client"
import { SignupForm } from "./signup-form"

export default function SignupPage() {
  return (
    <div className="container flex items-center justify-center h-full">
      <div className="flex flex-col">
        <SignupForm />    
      </div>
    </div>
  )
}