import { getEmotionImage } from '../util/get-emotion-image'
import { emotionList } from '../util/constansts'
import './Viewer.scss'

type ViewerProps = {
    emotionId: number,
    content: string,
}

const Viewer = ({ emotionId, content }: ViewerProps) => {
    const emotionItem = emotionList.find((emotion) => emotion.emotionId === emotionId)?.emotionName

    return (
        <div className="Viewer">
            <section className="img_section">
                <h4>오늘의 감정</h4>
                <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
                    <img src={getEmotionImage(emotionId)} />
                    <div>{emotionItem}</div>
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{content}</p>
                </div>
            </section>
        </div>
    )
}

export default Viewer