import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePopularMoviesQuery } from '../hooks/usePopularMovies'
import { useSearchMovieQuery } from '../hooks/useSearchMovie'
import MovieList from "../components/movie/MovieList"
import type { Movie } from '../types/movie'

const Movies = () => {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('q') ?? ''

  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState<Movie[]>([])
  const [loadedPage, setLoadedPage] = useState(0)
  const [prevKeyword, setPrevKeyword] = useState(keyword)

  if (keyword !== prevKeyword) {
    setPrevKeyword(keyword)
    setPage(1)
    setMovies([])
    setLoadedPage(0)
  }

  const popularQuery = usePopularMoviesQuery(page, !keyword)
  const searchQuery = useSearchMovieQuery({ keyword, page }, !!keyword)
  const { data, isLoading, isFetching, isError, error } = keyword ? searchQuery : popularQuery

  if (data && data.page !== loadedPage) {
    setLoadedPage(data.page)
    setMovies((prev) => (data.page === 1 ? data.results : [...prev, ...data.results]))
  }

  if (isLoading && movies.length === 0) {
    return <h2>Loading ....</h2>
  }

  if (isError) {
    return <h2>{error?.message}</h2>
  }

  const totalPages = data?.total_pages ?? 0
  const hasMore = page < totalPages

  return (
    <div className="static">
        <h1>{keyword ? `'${keyword}' 검색 결과` : '인기 영화'}</h1>
        {keyword && movies.length === 0 && <p>검색 결과가 없습니다.</p>}
        <MovieList movies={movies} />

        {/* ?.는 Optional Chaining : data가 있으면 results를 가져오고, 없으면 undefined를 반환한다. */}
        {/* ?? 왼쪽 값이 null 또는 undefined면 빈 배열([])을 사용한다. */}

        {hasMore && (
          <button className="load-more" onClick={() => setPage((p) => p + 1)} disabled={isFetching}>
            {isFetching ? '불러오는 중...' : `영화 더 불러오기 (${page} / ${totalPages} 페이지)`}
          </button>
        )}
    </div>
  )
}

export default Movies