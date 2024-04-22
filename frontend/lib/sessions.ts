"use server"
import { cookies } from 'next/headers'
 
export async function createSession(userId: string) {
  // const expiresAt = 
  // const session = await encrypt({ userId, expiresAt })
 
  cookies().set('local_session', userId, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession() {
  const session = cookies().get('local_session')?.value
  // const payload = await decrypt(session) 
  // if (!session || !payload) {  

  if (!session) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  cookies().delete('local_session')
}