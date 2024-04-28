import { supabaseCli } from "@/modules/supabase/init.js"

export const createAuthUser = async (email: string, password: string) => {
  try {
    const { data, error} = await supabaseCli.auth.signUp({
      email, password
    })
    
    if (!error) { 
      return data
    }
    console.log("ERR:", error)
    

  } catch (error) {
    console.error("Error creating auth user", error.message)
    throw error
  }
}