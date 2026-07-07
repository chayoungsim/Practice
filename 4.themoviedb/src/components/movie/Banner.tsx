import { useMovieVideosQueries } from "../../hooks/useMovieVideos"
import './Banner.scss'
import { useNavigate } from "react-router-dom"

const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'

const Banner = () => {

  const { banner, isLoading, isError, error } = useMovieVideosQueries()
  const nav = useNavigate();

  if(isLoading) {
    return <h2>Loading ... </h2>
  }

  if(isError) {
    return <h2>{error?.message}</h2>
  }

  if (!banner) {
    return null
  }

  const { movie, trailer } = banner

  return (
    <div className="banner">
      {trailer ? (
        <iframe
          key={trailer.key}
          className="banner-video"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}`}
          title={movie.title}
          allow="autoplay; encrypted-media"
        />
      ) : (
        movie.backdrop_path && (
          <div
            className="banner-image"
            style={{ backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})` }}
          />
        )
      )}
      <div className="banner-content">
        <h1>{movie.title}</h1>
        <p className="overview">{movie.overview}</p>
        <button onClick={() => nav(`/movie/${movie.id}`)}>상세보기</button>
      </div>
    </div>
  )
}

export default Banner