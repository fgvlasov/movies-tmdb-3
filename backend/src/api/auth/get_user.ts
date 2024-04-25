import { getUserByAuthId } from "@/modules/supabase/database/user/getUserByAuthId"

export const get_user = async (req, res) => {
  try {
    const userData = await getUserByAuthId(req.body.userId)
    console.log("getUserbyId:", userData)
    
    res.status(200).send(userData)
  
  } catch (error) {
    res.status(400).send("Failed to get user")  
  }
}
