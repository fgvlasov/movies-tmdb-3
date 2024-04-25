import { changeAdmin, getSession } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import useMovieStore from '@/stores/moviesStore';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const session = await getSession();
  const { favMovies } = useMovieStore.getState();
  console.log(favMovies);

  if (!session.isLoggedIn) {
    redirect('/login');
  }

  return (
    <div className="container w-full my-8">
      <h1 className="text-xl text-center font-bold">My Profile</h1>
      <p className="text-center text-lg">
        You are logged in as{' '}
        <span className="font-bold">{session.username} </span> ({session.email})
      </p>
      <p className="text-center text-sm">
        (
        <span>
          You are <b>{session.isAdmin ? 'ADMIN' : 'NOT ADMIN'}</b> user
        </span>
        )
      </p>
      <div className="w-1/3 mx-auto flex items-center justify-center p-8">
        {/* <form action={changeAdmin}>
          <Button type="submit">{session.isAdmin ? "Revoke Admin" : "Grant Admin"} priveleges</Button>
        </form> */}
      </div>
      <p>{favMovies}</p>
    </div>
  );
};

export default ProfilePage;
