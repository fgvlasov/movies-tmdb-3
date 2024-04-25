import { authLogin } from "@/modules/supabase/auth/authLogin.js"
import { getUserByAuthId } from "@/modules/supabase/database/user/getUserByAuthId"

export const post_login = async (req, res, next) => {
  
  let {email, password} = req.body
  

  try {

    let data = await authLogin(email, password)
    let user = await getUserByAuthId(data.user.id)
    // console.log("Backend req: ", data);
    // return
    res.status(200).send({data, user})

  } catch (error) {
    console.error("Failed to login on SB")

    res.status(400).send(error)
  }  
}
