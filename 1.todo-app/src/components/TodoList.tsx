
import type { Todo } from '../types/todo'


interface TodoListProps {
  todos: Todo[],
  onToggle :(id: number) => void;
  onDelete :(id: number) => void;
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-CA') // YYYY-MM-DD
}


const TodoList = ({todos, onToggle, onDelete } : TodoListProps) => {
  return (
    <ul className="todoLists">
        {todos.map(todo => (
          <li key={todo.id} 
            className={`${todo.completed === true ? "completed" : ""}`}
          >
              <input type="checkbox" 
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
              />
              <div>
                  <span>{todo.text}</span>
                  <span>{formatDate(todo.createdAt)}</span>
              </div>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
          </li>  
        ))}
    </ul>
  )
}

export default TodoList