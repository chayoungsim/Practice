// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar} from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import './MovieSlider.scss'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
//import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import MovieCard from './MovieCard';
import type { Movie } from '../../types/movie';

interface MovieSliderProps {
    title: string
    movies: Movie[]
}

const MovieSlider = ({title, movies}: MovieSliderProps) => {

 const nav = useNavigate()

const handleClick = (id:number) => {
    nav(`/detail/${id}`)
}
    

  return (
    <div>
        <h3>{title}</h3>
        <Swiper
            modules={[Navigation, Scrollbar]}
            spaceBetween={10}
            slidesPerView={2}
            navigation
            //pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 15 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
                1440: { slidesPerView: 5, spaceBetween: 30 },
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {movies.map((movie, index) =>(
                <SwiperSlide>
                    <MovieCard movie={movie} key={index} onClick={() => handleClick(movie.id)} />
                </SwiperSlide>
            ))}       
        </Swiper>
    </div>
  )
}

export default MovieSlider