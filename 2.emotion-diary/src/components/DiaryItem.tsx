import Button from './Button'
import './DiaryItem.scss'
import { useNavigate } from 'react-router-dom'
import { getEmotionImage } from '../util/get-emotion-image'
import type { Diary } from '../types/diray'

const DiaryItem = ({id, emotionId, createdAt, content}: Diary) => {

   const nav = useNavigate();

   const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA')
  }


  return (
    <div className="DiaryItem">
        <div
            className={`img_section img_section_${emotionId}`}
            onClick={() => nav(`/diary/${id}`)}
        >
            <img src={getEmotionImage(emotionId)} alt={String(emotionId)} />
        </div>
        <div className="info_section" onClick={() => nav(`/diary/${id}`)}>
            <div className="created_date">{formatDate(createdAt)}</div>
            <div className="content">{content}</div>
        </div>
        <div className="button_section">
            <Button 
                text={"수정하기"} 
                onClick={() => nav(`/edit/${id}`)}
            />
        </div>
    </div>
  )
}

export default DiaryItem