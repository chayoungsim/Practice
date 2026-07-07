import type { Movie } from '../../types/movie'

interface MovieCardProps {
  movie: Movie
  onClick: () => void
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342"
  return (
    <div className="movie-photo" key={movie.id} onClick={onClick}>
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
    </div>
  )
}

export default MovieCard