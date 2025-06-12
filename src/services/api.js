import axios from "axios";

const API_KEY = "f84fc31d";

export async function fetchMovies(query, signal) {
  console.log("📦 fetching movies for:", query); // 👈 Add here

  try {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: API_KEY,
        s: query,
      },
      signal,
    });

    const data = response.data;

    if (data.Response === "False") {
      throw new Error(data.Error || "No results found");
    }

    return data.Search;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("🚫 Request canceled:", err.message);
    }
    throw err;
  }
}
