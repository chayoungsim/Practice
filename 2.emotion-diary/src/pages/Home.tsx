import { useState } from "react"

import Button from "../components/Button"
import Header from "../components/Header"
import DiaryList from "../components/DiaryList"

import useDiaryStore from "../store/diaryStore"

const Home = () => {

  const [pivotDate, setPivotDate] = useState(new Date())
  const diaries = useDiaryStore((state) => state.diaries )


  //감소
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))  
  }

  //증가
  const onInCreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
  }

  return (
    <div>
        <Header 
          leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
          title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() +1}월 `}
          rightChild={<Button text={">"} onClick={onInCreaseMonth} />}
        />
        <DiaryList data={diaries} />
    </div>
  )
}

export default Home