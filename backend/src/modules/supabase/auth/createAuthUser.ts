import { supabaseCli } from "@/modules/supabase/init.js"

export const createAuthUser = async (email: string, password: string) => {
  try {
    const { data, error} = await supabaseCli.auth.signUp({
      email, password
    })
    
    if (error) { 
      console.log("ERR:", error)
    }
       
    return data.user.id

  } catch (error) {
    console.error("Error creating auth user", error.message)
    throw error
  }
}