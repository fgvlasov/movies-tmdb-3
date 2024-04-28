import { signup } from '@/actions/auth';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/app/(auth)/login/submit-button';
import { Input } from '@/components/ui/input';
import Link from 'next/link'

export function SignupForm() {
  const [state, formAction] = useFormState(signup, undefined);

  return (
    <form
      action={formAction}
      className="w-[400px] p-4 border shadow-md my-20 flex flex-col gap-4 rounded-sm"
    >
      <div className="grid grid-cols-[20%,auto] items-center  gap-2">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 border rounded-sm w-full"
        />
      </div>
      {state?.errors?.email && (
        <p className="text-red-400">{state.errors.email}</p>
      )}
      <div className="grid grid-cols-[20%,auto] items-center gap-2">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          className="p-2 border rounded-sm w-full"
        />
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
      <SubmitButton label="SIGNUP" />
      <p className="text-center"><Link href="/login" className="underline">LOGIN</Link></p>
    </form>
  );
}
