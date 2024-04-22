import { authLogin } from "@/modules/supabase/auth/authLogin.js"

export const post_login = async (req, res, next) => {
  
  let {email, password} = req.body
  
  // console.log("Backend req: ", req.body);
  try {

    let data = await authLogin(email, password)
    
    res.status(200).send(data)

  } catch (error) {
    console.error("Failed to login on SB")

    res.status(400).send(error)
  }  
}
