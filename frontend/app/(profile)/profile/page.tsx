import { changeAdmin, getSession } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

const ProfilePage = async () => {
  const session = await getSession()

  if(!session.isLoggedIn) {
    redirect("/login")
  }

  return (
    <div className="container w-full my-8">
      <h1 className="text-xl text-center font-bold">Your Profile</h1>
      <p className="text-center text-lg">You are logged in as <span className="font-bold">{session.username} </span> </p>
      <p className="text-center text-sm">
        (<span>You are <b>{session.isAdmin ? "ADMIN" : "NOT ADMIN"}</b> user</span>)
      </p>
      <div className="w-1/3 mx-auto flex items-center justify-center p-8">
        {/* <form action={changeAdmin}>
          <Button type="submit">{session.isAdmin ? "Revoke Admin" : "Grant Admin"} priveleges</Button>
        </form> */}
      </div>
      <div className="container p-4 w-full">
        <ul className="w-1/4 overflow-hidden">
          <li className="truncate"><b>Token:</b> {session.token}</li>
          <li className="truncate"><b>User ID:</b> {session.userId}</li>
          <li><b>Email:</b> {session.email}</li>
          <li><b>Username:</b> {session.username}</li>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePage