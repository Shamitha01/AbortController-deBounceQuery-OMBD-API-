import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useMovies } from "./hooks/useMovies";
import Spinner from "./components/Spinner";

export default function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 5000); //5 seconds
  const { data: movies, isLoading, isError, error } = useMovies(debouncedQuery);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-6xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">🎬 Search Movies</h1>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a movie name..."
          className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {isLoading && (
          <div className="mt-6 text-gray-600">
            <Spinner />
          </div>
        )}

        {isError && (
          <div className="mt-6 text-red-600">
            <p>{error.message}</p>
            <p className="text-sm mt-1 text-gray-500">
              Try being more specific with your search.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mt-10">
          {movies?.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white rounded shadow p-4 flex flex-col items-center"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={movie.Title}
                className="w-full h-64 object-cover mb-4 rounded"
              />
              <h2 className="font-semibold text-lg">{movie.Title}</h2>
              <p className="text-sm text-gray-500">{movie.Year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
