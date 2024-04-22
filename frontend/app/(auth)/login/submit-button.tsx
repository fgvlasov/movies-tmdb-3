'use client'
 
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  label: string
}

export const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus()
 
  return (
    <Button aria-disabled={pending} type="submit">
      {pending ? 'Submitting...' : label}
    </Button>
  )
}