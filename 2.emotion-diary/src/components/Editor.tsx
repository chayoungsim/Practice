import { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import type { Diary } from '../types/diray'
import Button from './Button'
import { emotionList } from "../util/constansts";
import EmotionItem from './EmotionItem';

import './Editor.scss'

type EditorProps = {
  initData?: Diary
  onSubmit: (input: Omit<Diary, "id">) => void
}

const Editor = ({ initData, onSubmit }: EditorProps) => {

    const nav= useNavigate();
    const [input, setInput] = useState<Omit<Diary, "id">>({
        createdAt: (initData?.createdAt ?? new Date().toISOString().slice(0, 10)),
        emotionId: Number(initData?.emotionId ?? 4),
        content: initData?.content ?? ""
    })

    const onChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setInput((prev) => ({
            ...prev,
            [name] : name === "emotionId" ? Number(value) : value
        }))
    }

    const onClickEmotion = (emotionId: number) => {
        setInput((prev) => ({...prev, emotionId}))
    }

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
            type="date"
            name="createdAt"
            onChange={onChangeInput}
            value={input.createdAt}
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
            {emotionList.map((item) => (
                <EmotionItem
                    key={item.emotionId}
                    {...item}
                    isSelected={item.emotionId === input.emotionId}
                    onClick={() => onClickEmotion(item.emotionId)}
                />
            ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
            name="content"
            placeholder="오늘 있었던 일을 자유롭게 적어보세요."
            onChange={onChangeInput}
            value={input.content}
        />
      </section>
      <section className="button_section">
        <Button
            text={"취소하기"}
            onClick={() => nav(-1)}
        />
        <Button
            text={"작성완료"}
            onClick={() => onSubmit(input)}
            type={"POSITIVE"}
        />
      </section>

    </div>
  )
}

export default Editor
