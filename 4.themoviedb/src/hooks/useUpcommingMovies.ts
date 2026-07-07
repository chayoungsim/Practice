import api from '../api/movieApi'
import { useQuery } from '@tanstack/react-query'
import type { MovieResponse } from '../types/movie'

const fetchUpcommingMoives = (page: number) => {
    return api.get<MovieResponse>(`/movie/upcoming?page=${page}`)
}

export const useUpcommingMoviesQuery = (page: number) => {
    return useQuery({
        queryKey: ['movie-upcomming', page],
        queryFn: () => fetchUpcommingMoives(page),
        select: (result) => result.data
    })
}