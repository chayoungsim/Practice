import api from '../api/movieApi'
import { useQuery } from '@tanstack/react-query'
import type { MovieResponse } from '../types/movie'

const fetchNowPlayingMovies = () => {
    return api.get<MovieResponse>(`/movie/now_playing`)
}

export const useNowPlayingMoviesQuery = () => {
    return useQuery({
        queryKey:['Now-Playing'],
        queryFn: fetchNowPlayingMovies,
        select: (result) => result.data
    })
}