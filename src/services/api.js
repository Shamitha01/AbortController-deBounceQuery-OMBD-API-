const API_KEY = "f84fc31d"; // replace with your real key

export async function fetchMovies(query, signal) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
    { signal }
  );

  if (!res.ok) throw new Error("Failed to fetch movies");

  const data = await res.json();

  if (data.Response === "False") throw new Error(data.Error || "No results found");

  return data.Search; // array of movie objects
}
