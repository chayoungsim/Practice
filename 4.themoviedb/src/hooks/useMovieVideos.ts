import { useMemo } from 'react'
import api from '../api/movieApi'
import { useQueries } from '@tanstack/react-query'
import type { Video, VideoResponse } from '../types/movie'
import { usePopularMoviesQuery } from './usePopularMovies'

const fetchMovieVideos = (id: number) => {
    return api.get<VideoResponse>(`/movie/${id}/videos`)
}

const findTrailer = (videos?: Video[]) => {
    return videos?.find((video) => video.site === 'YouTube' && video.type === 'Trailer')
}

export const useMovieVideosQueries = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery(1)
    const movies = useMemo(() => data?.results ?? [], [data])

    const videoQueries = useQueries({
        queries: movies.map((movie) => ({
            queryKey: ['movie-videos', movie.id],
            queryFn: () => fetchMovieVideos(movie.id),
            select: (result: { data: VideoResponse }) => result.data.results,
            staleTime: 5 * 60 * 1000,
        })),
    })

    const banner = useMemo(() => {
        if (movies.length === 0) return null
        const index = videoQueries.findIndex((query) => findTrailer(query.data))
        const movie = index !== -1 ? movies[index] : movies[0]
        const trailer = index !== -1 ? findTrailer(videoQueries[index].data) : undefined
        return { movie, trailer }
    }, [videoQueries, movies])

    return { banner, isLoading, isError, error }
}
