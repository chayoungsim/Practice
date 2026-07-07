import api from '../api/movieApi'
import { useQuery } from '@tanstack/react-query'
import type { MovieResponse } from '../types/movie'

const fetchTopRatedMovies = () => {
    return api.get<MovieResponse>(`/movie/top_rated`)
}

export const useToRatedMoviesQuery = () => {
    return useQuery({
        queryKey:['movie-top-rated'],
        queryFn: fetchTopRatedMovies,
        select: (result) => result.data
    })
}