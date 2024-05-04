'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ShieldOff, Trash2 } from 'lucide-react';
import { changeUserAdmin, deleteUser } from '@/actions/userActions';

const AdminPage = () => {
  const [users, setUsers] = useState<[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const getUsers = async () => {
    const data = await fetch(`http://localhost:8080/users`, {
      method: 'GET',
    });
    const users = await data.json();
    setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h2 className="font-bold mb-8">Authenticated users: {users?.length}</h2>
      <div>
        {loading && <div>Loading Users</div>}
        {users &&
          users.map((user: any) => (
            <div
              className="grid grid-cols-3 border-b p-2 items-center"
              key={user.id}
            >
              <div className="flex w-full truncate text-wrap justify-start p-2 text-xs md:text-base">
                Email: {user.email}
              </div>
              <div className="flex w-full border-l truncate text-wrap justify-star p-2 text-xs md:text-base">
                Admin: {user.is_admin ? 'Yes' : 'No'}
              </div>
              <div className="flex w-full border-l truncate text-wrap justify-star p-2 text-xs md:text-base">
                Favourites: {user.fav_movies}
              </div>
              <div className="flex justify-around border-l">
                {user.is_admin ? (
                  <form action={changeUserAdmin} className="flex items-center">
                    <input type="hidden" name="authId" value={user.auth_id} />
                    <input type="hidden" name="isAdmin" value={user.is_admin} />
                    <Button className="flex gap-1" variant="ghost">
                      <ShieldOff className="h-5 w-5" />
                      Revoke "Admin" {user.is_admin}
                    </Button>
                  </form>
                ) : (
                  <form action={changeUserAdmin} className="flex items-center">
                    <input type="hidden" name="authId" value={user.auth_id} />
                    <input type="hidden" name="isAdmin" value={user.is_admin} />
                    <Button
                      type="submit"
                      variant="ghost"
                      className="flex gap-1"
                    >
                      <ShieldCheck className="h-5 w-5" />
                      Grant "Admin" {user.is_admin}
                    </Button>
                  </form>
                )}
                <form action={deleteUser} className="flex items-center">
                  <input type="hidden" name="authId" value={user.auth_id} />
                  <Button type="submit" variant="ghost" className="flex gap-1">
                    <Trash2 className="h-5 w-5" />
                    Delete this user
                  </Button>
                </form>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminPage;
