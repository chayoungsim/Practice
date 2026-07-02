import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"

const TodoPage = () => {
  return (
    <div className="todo-app">
      <h1 className="text-3xl font-bold underline">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default TodoPage