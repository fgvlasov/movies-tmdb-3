import { getSession } from '@/actions/auth';
import { redirect } from 'next/navigation';

const FavoritesPage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect('/login');
  }
  //console.log(session);

  return (
    <div className="container">
      <h1 className="text-lg font-semibold md:text-2xl">
        My favourites movies:
      </h1>
      <p className="text text-lg">
        <span className="font-bold">{session.fav_movies} </span>{' '}
      </p>
    </div>
  );
};

export default FavoritesPage;
