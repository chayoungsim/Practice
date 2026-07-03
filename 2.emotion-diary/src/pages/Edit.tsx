
import Header from "../components/Header"
import Button from "../components/Button"
import Editor from "../components/Editor"

import { useNavigate, useParams } from "react-router-dom"

import useDiaryStore from "../store/diaryStore"
import type { Diary } from "../types/diray"

const Edit = () => {
  const nav = useNavigate();
  const {id} = useParams();
  const diaryId = Number(id);


  const getDiaryById = useDiaryStore((state) => state.getDiaryById)
  const updateDiary = useDiaryStore((state) => state.updateDiary)
  const deleteDiary = useDiaryStore((state) => state.deleteDiary)

  const currentDiary = getDiaryById(diaryId);

  const onClickDelete = () => {
    deleteDiary(diaryId)
    nav("/", {replace:true})
  }

  const onSubmit = (input: Omit<Diary, "id">) => {
    updateDiary(diaryId, input.content, input.emotionId, input.createdAt)
    nav("/", {replace:true})
  }

  return (
    <div>
      <Header 
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"<뒤로가기"} />}
        rightChild={<Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />}
      />
      <Editor initData={currentDiary} onSubmit={onSubmit} />
    </div>
  )
}

export default Edit