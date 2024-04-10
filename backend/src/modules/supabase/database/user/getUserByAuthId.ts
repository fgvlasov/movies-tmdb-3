import { supabaseCli } from "@/modules/supabase/init.js"

export const getUserByAuthId = async (authId) => {

  if (!authId) {
    throw new Error ("Auth ID is required")
  }

 try {
  const { data, error } = await supabaseCli
    .from('user')
    .select("*")
    .eq("auth_id", authId)
    .single()
  if (error) { throw error }
  
  return data

 } catch (error) {
  console.error("Failed to get user by AuthID", error)
  throw error
 }
}