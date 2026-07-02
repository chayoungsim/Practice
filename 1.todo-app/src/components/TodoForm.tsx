import { useState } from 'react'

const TodoForm = ({ onAddTodo }: { onAddTodo: (input: string) => void }) => {

  const [input, setInput] = useState('')

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      onAddTodo(input)
      setInput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div>
      <h1>TodoForm</h1>
      <div>
        <input type="text" placeholder="Todo" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}/>
        <button type="button" onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  )
}

export default TodoForm