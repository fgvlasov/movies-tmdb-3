import { login } from '@/actions/userActions';
import { useFormState } from 'react-dom';
import { SubmitButton } from './submit-button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form
      action={formAction}
      className="w-[400px] p-4 border shadow-md my-20 flex flex-col gap-4 rounded-sm"
    >
      <div className="grid grid-cols-[20%,auto] items-center  gap-2">
        <label htmlFor="email">Username</label>
        <Input
          id="username"
          name="username"
          type="username"
          placeholder="Username"
          className="p-2 border rounded-sm w-full"
        />
      </div>
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
      <SubmitButton label="LOGIN" />
      <p className="text-center">
        <Link href="/signup" className="underline">
          SIGNUP
        </Link>
      </p>
    </form>
  );
}
