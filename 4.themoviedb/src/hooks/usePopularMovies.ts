import api from "../api/movieApi"
import { useQuery } from "@tanstack/react-query"
import type { MovieResponse } from "../types/movie"

const fetchPopularMovies = (page: number) => {
    return api.get<MovieResponse>(`/movie/popular?page=${page}`)
}

export const usePopularMoviesQuery = (page: number, enabled = true) => {  // 검색어 없음 인기영화 조회
    return useQuery({
        queryKey:['movie-popular', page],  //데이터를 식별하는 고유한 이름
        queryFn: () => fetchPopularMovies(page),  //실제로 API를 호출하는 함수
        select:(result) => result.data,
        enabled,
    })
}