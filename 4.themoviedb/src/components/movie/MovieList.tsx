import { useNavigate } from 'react-router-dom'
import MovieCard from './MovieCard'
import type { Movie } from '../../types/movie'

interface MovieListProps {
  movies: Movie[]
  metric?: 'date' | 'rating'
}

const MovieList = ({ movies, metric = 'date' }: MovieListProps) => {
  const navigate = useNavigate()

  const handleClick = (id: number) => {
    navigate(`/detail/${id}`)
  }

  return (
    <ul className="movie-list">
      {movies.map((movie, index) => (
        <li
          key={movie.id}
          className="movie-item"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          {movie.poster_path && (
            <MovieCard movie={movie} onClick={() => handleClick(movie.id)}/>
          )}
          <p>{movie.title}</p>
          <p>{metric === 'rating' ? movie.vote_average.toFixed(1) : movie.release_date}</p>
        </li>
      ))}
    </ul>
  )
}

export default MovieList
