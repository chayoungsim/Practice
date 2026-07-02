import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"




const TodoPage = () => {
  return (
    <div className="todo-page">
        <h1>Todo App</h1>
        <TodoForm />
        <TodoList />
    </div>
  )
}

export default TodoPage