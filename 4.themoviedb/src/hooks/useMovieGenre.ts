import api from '../api/movieApi'
import { useQuery } from '@tanstack/react-query'
import type { GenreResponse } from '../types/movie'

const fetchMovieGenre = () => {
    return api.get<GenreResponse>(`/genre/movie/list`)
}

export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey:['movie-genre'],
        queryFn: fetchMovieGenre,
        select:(result) => result.data.genres,
        staleTime: 30000,
        //suspense: true,
    })
}