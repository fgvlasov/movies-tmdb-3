import { deleteAuthUser } from "@/modules/supabase/auth/deleteAuthUser.js"
import { deleteUserByAuthId } from "@/modules/supabase/database/user/deleteUserByAuthId.js"

export const delete_user = async (req, res) => {
  let authId = req.body.auth_id
  // console.log("REQ TO DEL: ", req.body);
  
  try {
    // Delete user from SU DB
    await deleteUserByAuthId(authId)
    
    // Delete user from SU AUTH
    await deleteAuthUser(authId)
    
    res.status(200).send("User successfully deleted")
    
  } catch (error) {
    res.status(400).send("Failed to delete user")
  }
}