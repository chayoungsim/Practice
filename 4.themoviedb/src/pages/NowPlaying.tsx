import { useMemo, useState } from 'react'
import { useNowPlayingMoviesQuery } from "../hooks/useNowPlayingMovies"
import { useMovieGenreQuery } from "../hooks/useMovieGenre"
import MovieList from "../components/movie/MovieList"

type SortOption = 'default' | 'rating' | 'popularity'

const NowPlaying = () => {

  const {data, isLoading, isError, error} = useNowPlayingMoviesQuery()
  const { data: genres } = useMovieGenreQuery()

  const [genreId, setGenreId] = useState<number | 'all'>('all')
  const [sort, setSort] = useState<SortOption>('default')

  const movies = useMemo(() => {
    const list = data?.results ?? []
    const filtered = genreId === 'all'
      ? list
      : list.filter((movie) => movie.genre_ids.includes(genreId))

    if (sort === 'rating') {
      return [...filtered].sort((a, b) => b.vote_average - a.vote_average)
    }
    if (sort === 'popularity') {
      return [...filtered].sort((a, b) => b.popularity - a.popularity)
    }
    return filtered
  }, [data, genreId, sort])

  if (isLoading) {
    return <h2>Loading ....</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <div className="static">
        <h1>현재 상영 영화</h1>
        <div className="filter-bar">
          <select
            aria-label="장르 필터"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          >
            <option value="all">전체 장르</option>
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
          <select
            aria-label="정렬 기준"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="default">기본순</option>
            <option value="rating">평점순</option>
            <option value="popularity">인기순</option>
          </select>
        </div>
        <div>
          {movies.length === 0 ? (
            <p className="noResult">영화가 없습니다.</p>
          ) : (
            <MovieList movies={movies} />
          )}
        </div>
    </div>
  )
}

export default NowPlaying
