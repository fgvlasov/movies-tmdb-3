'use client';
import { useEffect, useState } from 'react';
import useUserStore from '@/lib/userStore';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/actions/auth';

const AdminPage = () => {
  const [users, setUsers] = useState();
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
    <div>
      <h1 className="text-lg font-semibold md:text-2xl m-2">
        Authenticated users:
      </h1>
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden sm:table-cell">Role</TableHead>
              <TableHead className="hidden sm:table-cell">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && <div>Loading Users</div>}
            {users &&
              users?.map((user: any) => (
                <TableRow className="bg-accent" key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {user.role}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Button
                      size="sm"
                      className="h-7 gap-1"
                      onClick={() => deleteUser(user.id)}
                    >
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Delete
                      </span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
