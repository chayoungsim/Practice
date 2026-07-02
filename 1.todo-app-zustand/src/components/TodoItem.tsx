import { useState } from "react"
import { useTodoStore } from "../store/todoStore";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
}

const formatDate = (timestamp:number) => {
  return new Date(timestamp).toLocaleDateString('en-CA')
}

const TodoItem = ({todo}: TodoItemProps) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.editTodo)

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);


  const handleEditClick = () => {
      if(isEditing) {
        if(editText.trim() !==''){
          editTodo(todo.id, editText)
        }
        setIsEditing(false)
      } else {
        setEditText(todo.text)
        setIsEditing(true)
      }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key==='Enter') handleEditClick()
  }

  return (
    <div className="todo-item">
      {isEditing ? (
        <input 
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <label>
            <input 
              type="checkbox" 
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="text">{todo.text}</span>
            <span className="date">{formatDate(todo.createdAt)}</span>
        </label>
      )}
      
      <div className="btns">
        <button
          type="button"
          onClick={handleEditClick}
        >{isEditing ? '저장' : '수정'}</button>
        <button 
          type="button"
          onClick={() => deleteTodo(todo.id)}
        >삭제</button>
      </div>
      
    </div>
  )
}

export default TodoItem