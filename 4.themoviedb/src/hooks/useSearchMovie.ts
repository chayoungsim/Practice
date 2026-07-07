import api from '../api/movieApi'
import { useQuery } from '@tanstack/react-query'
import type { MovieResponse } from '../types/movie'

interface SearchMovieParams {
    keyword: string
    page: number
}

const fetchSearchMovie = ({keyword, page}: SearchMovieParams) => {
    return api.get<MovieResponse>(`/search/movie?query=${encodeURIComponent(keyword)}&page=${page}`)
}

export const useSearchMovieQuery = ({keyword, page}: SearchMovieParams, enabled = true) => {
    return useQuery({
        queryKey: ["movie-search",{keyword, page}],
        queryFn: () => fetchSearchMovie({keyword, page}),
        select: (result) => result.data,
        enabled: enabled && !!keyword,
    })
}