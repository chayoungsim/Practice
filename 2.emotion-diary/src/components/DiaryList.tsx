import { useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import type { Diary } from "../types/diray"
import Button from './Button'
import DiaryItem from "./DiaryItem"


type DiaryListProps = {
  data: Diary[]
}

const DiaryList = ({ data }: DiaryListProps) => {
  const nav = useNavigate()
  const [sortType, setSortType] = useState("latest")

  const onChangeSortType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value)
  }

  const getSortedData = () => {
    return data.toSorted((a, b) => {
        if (sortType === "latest") {
            return b.createdAt.localeCompare(a.createdAt);
        } else {
            return a.createdAt.localeCompare(b.createdAt);
        }
    })
  }
  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType} value={sortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button 
          onClick={() => nav("/new")}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        />
      </div>
      <div className="list_wrapper">
        {sortedData.map((diary) => (
          <DiaryItem key={diary.id} {...diary} />
        ))}
      </div>
      
    </div>
  )
}

export default DiaryList