import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Package2, CircleUser, LogIn } from 'lucide-react';
import Link from 'next/link';
import { LogoutButton } from '@/app/(auth)/login/logout-button';
import { getSession } from '@/actions/userActions';
import SearchBar from './searchForm';

const Header = async () => {
  const session = await getSession();

  return (
    <div className="container">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Movies TMDB 2</span>
          </Link>
          {/* <Link
            href="/trending"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Trending
          </Link> */}
          <Link
            href="/movies"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Movies
          </Link>
          {/* <Link
            href="/series"
            className="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
          >
            TV Series
          </Link> */}
          {session.username && (
            <Link
              href="/favorites"
              className="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
            >
              My favourites
            </Link>
          )}
          {session.isAdmin && (
            <Link
              href="/users"
              className="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
            >
              Users
            </Link>
          )}
        </nav>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <SearchBar />
          {session.isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/favorites" className="w-full">
                    My Favourites
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <LogoutButton>
                  <DropdownMenuItem className="w-full cursor-pointer">
                    LOGOUT
                  </DropdownMenuItem>
                </LogoutButton>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="secondary"
              size="icon"
              className="rounded-full"
            >
              <Link href="/login">
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
