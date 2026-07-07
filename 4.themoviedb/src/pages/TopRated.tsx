import { useToRatedMoviesQuery } from "../hooks/useTopRatedMovies"
import MovieList from "../components/movie/MovieList"

const TopRated = () => {

  const {data, isLoading, isError, error} = useToRatedMoviesQuery()

  if(isLoading) {
    return <h2>Loading...</h2>
  }

  if(isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <div className="static">
      <h1>Top Rated</h1>
      <MovieList movies={data?.results ?? []} metric="rating" />
    </div>
  )
}

export default TopRated