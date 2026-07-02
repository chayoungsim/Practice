import { useState } from 'react'
import type { Todo } from '../types/todo'

interface TodoListProps {
  todo: Todo,
  onToggle :(id:number) => void;
  onDelete :(id:number) => void;
  onEdit :(id:number, text:string) => void;
}

const formatDate = (timestamp:number) => {
  return new Date(timestamp).toLocaleDateString('en-CA')
}

const TodoItem = ({todo, onDelete, onToggle, onEdit} : TodoListProps) => {

  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEditClick = () => {
    if (isEditing) {
      if (editText.trim() !== '') {
        onEdit(todo.id, editText)
      }
      setIsEditing(false)
    } else {
      setEditText(todo.text)
      setIsEditing(true)
    }
  }

  const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEditClick()
  }

  return (
    <div className="todo-item">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
              />
              <span className="cont">{todo.text}</span>
              <span className="date">{formatDate(todo.createdAt)}</span>
          </label>
        )}

        <div className="btns">
            <button onClick={handleEditClick}>{isEditing ? '저장' : '수정'}</button>
            <button
              onClick={() => onDelete(todo.id)}
            >삭제</button>
        </div>
    </div>
  )
}

export default TodoItem