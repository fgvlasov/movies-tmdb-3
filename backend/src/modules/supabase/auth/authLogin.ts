import { supabaseCli } from "@/modules/supabase/init.js"

export const authLogin = async (email, password) => {
  try {
    const { data: { session }, error} = await supabaseCli.auth.signInWithPassword({
      email, password
    })
    if (error) throw error

    return session
  } catch (error) {
    console.error("Error login in.", error.message)
    throw error
  }
}