import { useState } from "react";
import { useTodoStore } from "../store/todoStore"
import TodoItem from "./TodoItem"

type StatusFilter = 'All' | 'Todo' |'Done';

const TodoList = () => {
  // todos, toggleTodo, deleteTodo를 각각 개별 선택
  // -> 한 번에 useTodoStore((state) => state) 처럼 전체를 가져오면
  //    스토어의 아무 값이나 바뀔 때마다 리렌더링되니 주의

  const todos = useTodoStore((state) => state.todos);

  const [filter, setFilter] = useState<StatusFilter>('All')

  const filteredTodos = todos.filter((todo) => {
    if(filter ==='Todo') return !todo.completed
    if(filter ==='Done') return todo.completed
    return true
  })


  if(todos.length === 0) {
    return(
      <p>할 일이 없어요</p>
    )
  }

  return (
    <div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as StatusFilter)}
      >
        <option value="All">All</option>
        <option value="Todo">Todo</option>
        <option value="Done">Done</option>
      </select>
      <ul className="todo-lists">
        {filteredTodos.map((todo) =>(
          <li key={todo.id} className={`${todo.completed ? "completed" : ""}`}>
            <TodoItem todo={todo} />       
          </li>
        ))}
      </ul>
    </div>  
  )
}

export default TodoList