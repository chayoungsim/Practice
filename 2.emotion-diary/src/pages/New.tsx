import { useNavigate } from "react-router-dom"

import Header from "../components/Header"
import Button from "../components/Button"
import Editor from "../components/Editor"
import useDiaryStore from "../store/diaryStore"
import type { Diary } from "../types/diray"


const New = () => {
  const nav = useNavigate();
  const addDiary = useDiaryStore((state) => state.addDiary)

  const onSubmit = (input: Omit<Diary, "id">) => {
    addDiary(input.content, input.emotionId, input.createdAt)
    nav("/", {replace:true})
  }

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)}/>}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  )
}

export default New