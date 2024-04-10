import { supabaseCli } from "@/modules/supabase/init.js"

export const deleteAuthUser = async (userId) => {
  if (!userId) {
    throw new Error ("User ID is required")
  }

  try {
    const { error } = await supabaseCli.auth.admin.deleteUser(userId)

    if (error) { throw error }

    return { message: "User successfully deleted"}
    
  } catch (error) {
    console.error("Error deleting user", error)
  }
}