import { useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../hooks/useMovieDetail'
import './Detail.scss'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'

const Detail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, isError, error } = useMovieDetailQuery(id ?? '')

  console.log(movie)

  if (isLoading) {
    return <h2>Loading ...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  if (!movie) {
    return null
  }

  return (
    <div className="detail">
      {movie.backdrop_path && (
        <div
          className="detail-backdrop"
          style={{ backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})` }}
        />
      )}
      <div className="detail-content static">
        <div className="detail-poster">
          {movie.poster_path && (
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
          )}
        </div>
        <div className="detail-info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          <p className="meta">
            {movie.release_date} · {movie.runtime}분 · ⭐ {movie.vote_average.toFixed(1)}
          </p>
          <ul className="genres">
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default Detail
