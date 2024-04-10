import { supabaseCli } from "@/modules/supabase/init.js"

export const get_users = async (req, res) => {

  try {
    const { data: { users }, error } = await supabaseCli.auth.admin.listUsers()
    // console.log("users_table:", users)
    
    res.status(200).send(users)
  
  } catch (error) {
    res.status(400).send("Failed to get users")  
  }
}