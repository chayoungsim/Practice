import { useState, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"

const SearchBox = () => {

    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const keyword = searchValue.trim()
        if (!keyword) return
        navigate(`/movies?q=${encodeURIComponent(keyword)}`)
        setSearchValue("")
    }

  return (
    <form role="search" onSubmit={handleSubmit}>
        <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="영화를 검색하세요."
            aria-label="영화 검색"
        />
        <button type="submit">Search</button>
    </form>
  )
}

export default SearchBox