import MovieSlider from "../components/movie/MovieSlider"
import { usePopularMoviesQuery } from "../hooks/usePopularMovies"
import Banner from "../components/movie/Banner";
import { ClipLoader } from "react-spinners";

const Home = () => {

  const {data, isLoading, isError, error} = usePopularMoviesQuery(1);

  if(isLoading) {
    return <h2>
      <ClipLoader        
        loading={isLoading}       
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </h2>
  }
  if(isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <div className="static">
      <Banner />

      
      <MovieSlider 
        title="Popular Movies"
        movies={data.results}
      />
    </div>
  )
}

export default Home