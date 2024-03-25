IDEA
Make our own backend APIs to handle the searchByTitle, searchByFilters, and getById functionalities of Streaming Availability API.

Build Backend server.js by Express and streaming-availability libraries. JWT for the access token.

Frontend can then make GET requests to these APIs to retrieve the desired data.

STRUCTURE
We will have Next.js project with backend functionality, example to organize folder structure to separate the frontend and backend:

project-root/
│
├── frontend/
│ ├── pages/
│ │ ├── index.tsx
│ │ ├── title.tsx
│ │ └── ...
│ ├── components/
│ │ └── ...
│ └── ...
│
└── backend/
├── controllers/
│ ├── movieController.js
│ └── ...
├── services/
│ ├── movieService.js
│ └── ...
├── routes/
│ ├── movieRoutes.js
│ └── ...
└── ...
controllers: Controllers handle incoming requests, perform any necessary processing, and send back responses.
services: Services encapsulate the business logic of your application. They interact with models and external services.
routes: Routes define the API endpoints and map them to controller methods.
Example for searching by Title:


const handleSearch = async () => {
try {
const response = await fetch(/api/movies/searchByTitle?title=${searchTerm});
if (!response.ok) {
throw new Error('Failed to search by title');
}
const data = await response.json();
setSearchResults(data.movies);
} catch (error) {
console.error('Error searching by title:', error);
}
};
