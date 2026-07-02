
import TodoItem from './TodoItem'

const TodoList = () => {
  return (
    <div className="todo-lists">
        <div>
          <span>Sort by Status</span>
          <select>
            <option value="All">Show All</option>
            <option value="Todo">Todo</option>
            <option value="Done">Done</option>
          </select>
        </div>        
        <ul>
            <li><TodoItem /></li>
        </ul>
    </div>
  )
}

export default TodoList