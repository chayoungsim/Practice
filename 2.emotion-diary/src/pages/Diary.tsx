import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header"
import Viewer from "../components/Viewer"
import Button from "../components/Button"
import useDiaryStore from "../store/diaryStore"

const Diary = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const getDiaryById = useDiaryStore((state) => state.getDiaryById)
  const currentDiary = getDiaryById(Number(id))

  if (!currentDiary) {
    return <div>존재하지 않는 일기입니다.</div>
  }

  const { emotionId, createdAt, content } = currentDiary

  return (
    <div>
      <Header 
        title={`${createdAt} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={<Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />}
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  )
}

export default Diary