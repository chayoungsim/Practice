export interface Movie {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

export interface GenreResponse {
  genres: Genre[]
}

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {   // Movie의 대부분을 그대로 사용하고, genre_ids만 제외한 타입을 상속한다는 뜻입니다.
  genres: Genre[]
  runtime: number
  tagline: string
  status: string
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface VideoResponse {
  id: number
  results: Video[]
}
