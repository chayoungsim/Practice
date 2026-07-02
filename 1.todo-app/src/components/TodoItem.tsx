import React from 'react'

interface TodoItemProps {
  onToggle :(id: number) => void;
  onDelete :(id: number) => void;
}


const TodoItem = ({todo, onToggle, onDelete}:TodoItemProps) => {
  return (
    <div className="todo-item">
        <input type="checkbox" />
        <span>{todo.text}</span>
        <button>Delete</button>
    </div>
  )
}

export default TodoItem