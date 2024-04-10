export const get_user = async (req, res) => {
  // console.log("GET USER: ", req.user)
  
  res.status(200).send(req.user)
}
