import { updateUserByAuthId } from "@/modules/supabase/database/user/updateUserByAuthId.js"

export const put_user = async (req, res) => {
  // console.log("REQ DATA BODY: ", [req.body.auth_id, req.body.is_admin]);
  // console.log("REQ DATA: USER", req.user.auth_id);

  let authId = !req.body.auth_id ? req.user.auth_id : req.body.auth_id
  // console.log("authId: ", authId);
  // return
  
  try {
    let dataToUpdate = {
      username: req.body.username, 
      is_admin: req.body.is_admin,
      fav_movie: req.body.fav_movies
    }
    await updateUserByAuthId(authId, dataToUpdate)
    
    res.status(200).send("Successfully updated user")

  } catch (error) {
    console.error(error)
    res.status(400).send("Failed to update user")    
  }
}