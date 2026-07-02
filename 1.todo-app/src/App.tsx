
import {useEffect, useState} from 'react'
import type { Todo } from './types/todo'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'



const STORAGE_KEY = 'todos';


function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('localStorage 읽기 실패', error)
      return [];
    }
  });

  useEffect(() => {
    try{
      localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
    } catch(error) {
      console.error('localStorage 저장 실패 :', error)
    }

  },[todos])


  const addTodo = (text:string) => {    
     const newTodo : Todo = {
       id: Date.now(),
       text,
       completed:false,
       createdAt:Date.now()
     }
     setTodos((prev) => [...prev, newTodo])
  }

  const toggleTodo = (id:number) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? {...todo, completed:!todo.completed} : todo))
  }

  const deleteTodo = (id:number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  return (
    <>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </>
  )
}

export default App
