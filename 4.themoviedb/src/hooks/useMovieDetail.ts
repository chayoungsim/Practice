import api from '../api/movieApi'
import { useQuery } from '@tanstack/react-query'
import type { MovieDetail } from '../types/movie'

const fetchMovieDetail = (id: string) => {
    return api.get<MovieDetail>(`/movie/${id}`)
}

export const useMovieDetailQuery = (id: string) => {
    return useQuery({
        queryKey: ['movie-detail', id],
        queryFn: () => fetchMovieDetail(id),
        select: (result) => result.data,
        enabled: !!id,
    })
}
