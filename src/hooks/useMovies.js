import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/api";

export function useMovies(query) {
  const queryResult = useQuery({
    queryKey: ["movies", query],
    queryFn: ({ signal }) => fetchMovies(query, signal),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return queryResult;
}
