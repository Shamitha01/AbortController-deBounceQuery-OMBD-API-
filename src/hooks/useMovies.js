import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../services/api';

export function useMovies(query) {
  return useQuery({
    queryKey: ['movies', query],
    queryFn: ({ signal }) => fetchMovies(query, signal),
    enabled: !!query, // Only run query if query string is non-empty
    staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
  });
}
