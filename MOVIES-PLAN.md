## IDEA

Movies lists website with authorization and checking My favourite movies.

Make my own backend APIs to work with users and data from database Supabase.
Movies information taken from https://developer.themoviedb.org/reference/configuration-details.
I use such functionalities of TheMovieDB API: Movies list, Trending movies, Search by keyword.
Frontend can then make GET requests to these APIs to retrieve the desired data.

Build Backend by Express.js with user endpoints and keepeng data in Supabase DB.
Authorization info is keeping in session after login.
Users can SignUp, see a list of Users, become Admins by revoking.
If you are an Admin - you can delete other users.

## STRUCTURE

We will have Next.js project for frontend, frontend and backend are separated in different folders:

- **actions:** Actions handle incoming requests, perform any necessary processing, and send back responses Use for operating with Favourites movies and all user Actions like Login, Signup, Delete.
- **hooks:** Here I made hooks for sorting movies by Genre.
- **components:** All components for Layout, user interface, showing movies.
- **lib:** Auth Wrapper, middleware, helpers with session, schemes for typescript.

## TECHNOLOGIES

- Next.js
- Supabase
- Express.js
- Tailwind + Radix.ui for interface
