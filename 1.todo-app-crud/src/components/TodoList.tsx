import { useState } from 'react'
import TodoItem from './TodoItem'
import type { Todo } from '../types/todo'

type StatusFilter = 'All' | 'Todo' | 'Done';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

const TodoList = ({todos, onDelete, onToggle, onEdit}: TodoListProps) => {

  const [filter, setFilter] = useState<StatusFilter>('All')

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Todo') return !todo.completed
    if (filter === 'Done') return todo.completed
    return true
  })

  return (
    <div className="todo-lists">
        <div className="search">
          <span>Sort by Status</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as StatusFilter)}
          >
            <option value="All">Show All</option>
            <option value="Todo">Todo</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={`${todo.completed ? "completed" : ""}`}>
              <TodoItem todo={todo} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
            </li>
          ))}
        </ul>
    </div>
  )
}

export default TodoList