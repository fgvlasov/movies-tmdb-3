import { login } from '@/actions/auth'
import { useFormState } from 'react-dom'
import { SubmitButton } from './submit-button'
import { Input } from '@/components/ui/input'
 
export function LoginForm() {
  const [state, action] = useFormState(login, undefined)

  return (
    <form action={action} className="w-[400px] p-4 border shadow-md my-20 flex flex-col gap-4 rounded-sm">
      <div className="grid grid-cols-[20%,auto] items-center  gap-2">
        <label htmlFor="email">Email</label>
        <Input id="email" name="email" type="email" placeholder="Email" className="p-2 border rounded-sm w-full" />
      </div>
      {state?.errors?.email && <p className="text-red-400">{state.errors.email}</p>}
      <div className="grid grid-cols-[20%,auto] items-center gap-2">
        <label htmlFor="password">Password</label>
        <Input id="password" name="password" type="password" className="p-2 border rounded-sm w-full" />
      </div>
      {state?.errors?.password && (
        <div className="text-red-400">
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton label="LOGIN" />
    </form>
  )
}