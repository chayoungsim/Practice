import { useEffect, useState } from "react"
import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import type { Todo } from "../types/todo"



const STORAGE_KEY = 'todos'


const TodoPage = () => {

  const [todos, setTodos] = useState<Todo[]>(() => {
    try{
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];

    } catch(error) {
      console.error('localStorage 읽기실패', error);
      return [];
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch(error) {
      console.error('localStorage 쓰기 실패',error)
    }
  },[todos])


  const addTodo = (text:string) => {
    const newTodo:Todo = {
      id: Date.now(),
      text,
      completed:false,
      createdAt:Date.now()
    }
    setTodos((prev) => [...prev, newTodo])
 }

  const deleteTodo = (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const todoToggle = (id:number) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? {...todo, completed:!todo.completed} : todo))
  }

  const editTodo = (id:number, text:string) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? {...todo, text} : todo))
  }



  return (
    <div className="todo-page">
        <h1>Todo App</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={todoToggle}
          onEdit={editTodo}
        />
    </div>
  )
}

export default TodoPage