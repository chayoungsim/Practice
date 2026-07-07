
import { useState } from 'react'
import ReactPaginateModule from 'react-paginate'
import MovieList from '../components/movie/MovieList'
import { useUpcommingMoviesQuery } from '../hooks/useUpcommingMovies'

// Vite(rolldown)의 CJS -> ESM 변환 과정에서 default export가 한 겹 더 감싸지는 문제 우회
const ReactPaginate = (ReactPaginateModule as unknown as { default?: typeof ReactPaginateModule }).default
  ?? ReactPaginateModule

const Upcoming = () => {

  const [page, setPage] = useState(1)
  const {data, isLoading, isError, error} = useUpcommingMoviesQuery(page)

  if(isLoading) {
    return <h2>Loading...</h2>
  }

  if(isError) {
    return <h2>{error.message}</h2>
  }

  const totalPages = Math.min(data?.total_pages ?? 0, 500)

  return (
    <div className="static">
      <h1>개봉예정</h1>
      <MovieList movies={data?.results ?? []} />
      {totalPages > 1 && (
        <ReactPaginate
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
          disabledClassName="disabled"
          previousLabel="이전"
          nextLabel="다음"
          breakLabel="..."
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          forcePage={page - 1}
          onPageChange={({ selected }) => setPage(selected + 1)}
        />
      )}
    </div>
  )
}

export default Upcoming