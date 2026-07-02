import { useState } from "react"
import { useTodoStore } from "../store/todoStore"

const TodoForm = () => {

  const addTodo = useTodoStore((state) => state.addTodo);
  const [input, setInput] = useState('');


  const handleSubmit = () => {
    if(input.trim() !== "") {
      addTodo(input);
      setInput('')
    }
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') handleSubmit();
  }

  return (
    <div className="todo-form">
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요"
        className="input"
      />
      <button
        type="button"
        onClick={handleSubmit}
      >일정추가</button>
    </div>
  )
}

export default TodoForm