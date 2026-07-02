import { useEffect, useState } from 'react'

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: number;
}

const STORAGE_KEY = 'todos' // localStorage에 저장할 키


const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('localStorage 읽기 실패:', error);
      return [];
    }
  })
  const [input, setInput] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('localStorage 쓰기 실패:', error);
    }

  },[todos])


  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo: Todo = {
        id: todos.length + 1,
        text: input,
        completed: false,
        createdAt: Date.now(),
      }
      //setTodos([...todos, newTodo])
      setTodos((prev) => [...prev, newTodo]);  // 이전 상태를 복사하고 새로운 할 일을 추가 ,업데이트 직전의 가장 최신 상태를 참조하여 업데이트
    }
    setInput('');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
      setInput('');
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }
  
  return (
    <div>
        <div>
            <h1>TodoForm</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Todo" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={handleKeyDown}
                />
                <button 
                    type="button" 
                    onClick={addTodo}
                >Add Todo</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                        />
                        {todo.text}
                        <button 
                            type="button"
                            onClick={() => deleteTodo(todo.id)}
                        >Delete</button>
                    </li>
                ))}             
            </ul>
        </div>
    </div>
  )
}

export default TodoPage